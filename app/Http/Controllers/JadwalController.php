<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\JadwalTenagaMedis;
use App\Models\ShiftHarian;

class JadwalController extends Controller
{
    // =====================
    // GENERATE (PYTHON)
    // =====================
    public function generate()
    {
        $response = Http::post('http://127.0.0.1:8001/generate-jadwal');

        if ($response->failed()) {
            return back()->withErrors('Gagal generate jadwal');
        }

        return back()->with('success', 'Jadwal berhasil digenerate otomatis');
    }

    // =====================
    // SEMUA JADWAL DOKTER
    // =====================
    public function index()
    {
        $jadwal = JadwalTenagaMedis::with([
            'tenagaMedis:id_tenaga_medis,nama_tenaga_medis,spesialisasi',
            // TAMBAHAN: Load relasi 'periode' untuk mengambil statusnya
            'shiftHarian.periode:id_periode,status,tanggal_mulai,tanggal_selesai',
            'shiftHarian.shift:id_shift,nama_shift,jam_mulai,jam_selesai'
        ])
            ->orderBy(
                ShiftHarian::select('tanggal')
                    ->whereColumn('shift_harian.id_shift_harian', 'jadwal_tenaga_medis.id_shift_harian')
            )
            ->get();

        return Inertia::render('Jadwal/Index', [
            'jadwal' => $jadwal,
            'canGenerate' => Auth::user()->jenis_tenaga_medis === 'kepala klinik'
        ]);
    }
    // =====================
    // JADWAL SAYA
    // =====================
    public function jadwalSaya()
    {
        $jadwal = JadwalTenagaMedis::with([
            'shiftHarian.shift:id_shift,nama_shift,jam_mulai,jam_selesai'
        ])
            ->where('id_tenaga_medis', Auth::id())
            ->get();

        return Inertia::render('Jadwal/Saya', [
            'jadwal' => $jadwal
        ]);
    }
}
