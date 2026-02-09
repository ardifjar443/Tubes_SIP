<?php

namespace App\Http\Controllers;

use App\Models\Cuti;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CutiController extends Controller
{
    /**
     * LIST CUTI & STATISTIK
     */
    public function index(Request $request)
    {
        $user = auth()->user();

        // Base Query
        $query = Cuti::with('tenagaMedis');

        // Filter Role: Dokter hanya lihat data sendiri
        if ($user->jenis_tenaga_medis === 'dokter') {
            $query->where('id_tenaga_medis', $user->id_tenaga_medis);
        }

        // --- HITUNG STATISTIK (Hanya yang Approved) ---
        // Kita clone query agar tidak mengganggu list utama
        $statsQuery = clone $query;

        $cutiBulanIni = (clone $statsQuery)
            ->where('status', 'approved')
            ->whereMonth('tanggal_mulai', Carbon::now()->month)
            ->whereYear('tanggal_mulai', Carbon::now()->year)
            ->count();

        $cutiTahunIni = (clone $statsQuery)
            ->where('status', 'approved')
            ->whereYear('tanggal_mulai', Carbon::now()->year)
            ->count();

        return Inertia::render('Cuti/Index', [
            'cuti' => $query->orderBy('created_at', 'desc')->get(),
            'role' => $user->jenis_tenaga_medis,
            'stats' => [
                'bulanIni' => $cutiBulanIni,
                'tahunIni' => $cutiTahunIni,
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Cuti/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'required|date|after_or_equal:tanggal_mulai',
            'jenis_cuti' => 'required|in:izin,sakit,dinas,cuti',
            'keterangan' => 'nullable|string|max:255',
        ]);

        Cuti::create([
            'id_tenaga_medis' => auth()->user()->id_tenaga_medis,
            'tanggal_mulai' => $request->tanggal_mulai,
            'tanggal_selesai' => $request->tanggal_selesai,
            'jenis_cuti' => $request->jenis_cuti,
            'keterangan' => $request->keterangan,
            'status' => 'request',
        ]);

        return redirect()
            ->route('cuti.index')
            ->with('success', 'Pengajuan cuti berhasil dikirim');
    }

    public function updateStatus(Request $request, Cuti $cuti)
    {
        $request->validate([
            'status' => 'required|in:approved,rejected',
        ]);

        // Array untuk menampung tanggal yang perlu di-regenerate
        $datesToRegenerate = [];

        DB::beginTransaction();

        try {
            $cuti->update([
                'status' => $request->status,
                'approved_by' => auth()->user()->id_tenaga_medis,
                'approved_at' => Carbon::now(),
            ]);

            if ($request->status === 'approved') {
                $dokterId = $cuti->id_tenaga_medis;
                $start = Carbon::parse($cuti->tanggal_mulai);
                $end = Carbon::parse($cuti->tanggal_selesai);

                while ($start <= $end) {
                    $currentDate = $start->toDateString();

                    // Simpan tanggal ke array untuk diproses nanti
                    $datesToRegenerate[] = $currentDate;

                    $exists = DB::table('availability_tenaga_medis')
                        ->where('id_tenaga_medis', $dokterId)
                        ->where('tanggal', $currentDate)
                        ->exists();

                    if (!$exists) {
                        $shifts = DB::table('shift')->get();
                        foreach ($shifts as $shift) {
                            DB::table('availability_tenaga_medis')->insert([
                                'id_tenaga_medis' => $dokterId,
                                'tanggal' => $currentDate,
                                'id_shift' => $shift->id_shift,
                                'available' => 0, // Set CUTI
                            ]);
                        }
                    } else {
                        DB::table('availability_tenaga_medis')
                            ->where('id_tenaga_medis', $dokterId)
                            ->where('tanggal', $currentDate)
                            ->update(['available' => 0]); // Set CUTI
                    }

                    $start->addDay();
                }
            }

            // 1. COMMIT DULU AGAR DATA TERSIMPAN KE DB
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()
                ->route('cuti.index')
                ->with('error', 'Terjadi kesalahan database: ' . $e->getMessage());
        }

        // 2. BARU PANGGIL PYTHON (DATA SUDAH FRESH)
        // Kita lakukan di luar try-catch transaksi DB, agar tidak rollback jika API gagal
        if (!empty($datesToRegenerate)) {
            foreach ($datesToRegenerate as $date) {
                try {
                    Http::timeout(5)->post(
                        'http://127.0.0.1:8001/regenerate-harian',
                        ['tanggal' => $date]
                    );
                } catch (\Exception $e) {
                    Log::warning("Gagal auto-regenerate jadwal tanggal $date: " . $e->getMessage());
                    // Kita tidak return error ke user karena cuti sudah approved, 
                    // user bisa regenerate manual lewat dashboard jika perlu.
                }
            }
        }

        return redirect()
            ->route('cuti.index')
            ->with('success', 'Status cuti berhasil diperbarui & jadwal disesuaikan.');
    }
}
