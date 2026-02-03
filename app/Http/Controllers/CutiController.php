<?php

namespace App\Http\Controllers;

use App\Models\Cuti;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class CutiController extends Controller
{
    /**
     * LIST CUTI
     * - Dokter: hanya lihat cutinya sendiri
     * - Kepala Klinik: lihat semua request
     */
    public function index(Request $request)
    {
        $user = auth()->user();

        $query = Cuti::with('tenagaMedis');

        if ($user->jenis_tenaga_medis === 'dokter') {
            $query->where('id_tenaga_medis', $user->id_tenaga_medis);
        }

        return Inertia::render('Cuti/Index', [
            'cuti' => $query->orderBy('created_at', 'desc')->get(),
            'role' => $user->jenis_tenaga_medis,
        ]);
    }

    /**
     * FORM AJUKAN CUTI (DOKTER)
     */
    public function create()
    {
        return Inertia::render('Cuti/Create');
    }

    /**
     * SIMPAN PENGAJUAN CUTI
     */
    public function store(Request $request)
    {
        $request->validate([
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'required|date|after_or_equal:tanggal_mulai',
            'jenis_cuti' => 'required|in:cuti,sakit,dinas',
        ]);

        Cuti::create([
            'id_tenaga_medis' => auth()->user()->id_tenaga_medis,
            'tanggal_mulai' => $request->tanggal_mulai,
            'tanggal_selesai' => $request->tanggal_selesai,
            'jenis_cuti' => $request->jenis_cuti,
            'status' => 'request',
        ]);

        return redirect()
            ->route('cuti.index')
            ->with('success', 'Pengajuan cuti berhasil dikirim');
    }

    /**
     * APPROVE / REJECT (KEPALA KLINIK)
     */
    public function updateStatus(Request $request, Cuti $cuti)
    {
        $request->validate([
            'status' => 'required|in:approved,rejected',
        ]);

        $cuti->update([
            'status' => $request->status,
            'approved_by' => auth()->user()->id_tenaga_medis,
            'approved_at' => Carbon::now(),
        ]);

        return redirect()
            ->route('cuti.index')
            ->with('success', 'Status cuti berhasil diperbarui');
    }
}
