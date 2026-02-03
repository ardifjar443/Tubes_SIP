<?php

namespace App\Http\Controllers;

use App\Models\TenagaMedis;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class TenagaMedisController extends Controller
{
    /**
     * Tampilkan daftar tenaga medis
     */
    public function index()
    {
        return Inertia::render('TenagaMedis/Index', [
            'tenagaMedis' => TenagaMedis::orderBy('nama_tenaga_medis')->get(),
        ]);
    }

    /**
     * Form tambah tenaga medis
     */
    public function create()
    {
        return Inertia::render('TenagaMedis/Create');
    }

    /**
     * Simpan tenaga medis baru
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama_tenaga_medis' => 'required|string|max:255',
            'email' => 'required|email|unique:tenaga_medis,email',
            'password' => 'required|min:8',
            'jenis_tenaga_medis' => 'required|in:dokter,perawat,admin,kepala klinik',
            'spesialisasi' => 'nullable|string|max:100',
        ]);

        // KUNCI LOGIKA SPESIALISASI
        if (in_array($request->jenis_tenaga_medis, ['admin', 'kepala klinik'])) {
            $spesialisasi = 'none';
        } else {
            $spesialisasi = $request->spesialisasi;
        }

        TenagaMedis::create([
            'nama_tenaga_medis' => $request->nama_tenaga_medis,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'jenis_tenaga_medis' => $request->jenis_tenaga_medis,
            'spesialisasi' => $spesialisasi,
            'status_aktif' => true,
        ]);

        return redirect()
            ->route('tenaga-medis.index')
            ->with('success', 'Tenaga medis berhasil ditambahkan');
    }


    /**
     * Form edit tenaga medis
     */
    public function edit(TenagaMedis $tenagaMedi)
    {
        return Inertia::render('TenagaMedis/Edit', [
            'tenagaMedis' => $tenagaMedi,
        ]);
    }

    /**
     * Update data tenaga medis
     */
    public function update(Request $request, TenagaMedis $tenagaMedi)
    {
        $request->validate([
            'nama_tenaga_medis' => 'required|string|max:255',
            'email' => 'required|email|unique:tenaga_medis,email,'
                . $tenagaMedi->id_tenaga_medis . ',id_tenaga_medis',
            'jenis_tenaga_medis' => 'required|in:dokter,perawat,admin,kepala klinik',
            'spesialisasi' => 'nullable|string|max:100',
            'password' => 'nullable|min:8',
        ]);

        // KUNCI LOGIKA SPESIALISASI
        if (in_array($request->jenis_tenaga_medis, ['admin', 'kepala klinik'])) {
            $spesialisasi = 'none';
        } else {
            $spesialisasi = $request->spesialisasi;
        }

        $data = [
            'nama_tenaga_medis' => $request->nama_tenaga_medis,
            'email' => $request->email,
            'jenis_tenaga_medis' => $request->jenis_tenaga_medis,
            'spesialisasi' => $spesialisasi,
        ];

        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $tenagaMedi->update($data);

        return redirect()
            ->route('tenaga-medis.index')
            ->with('success', 'Data tenaga medis berhasil diperbarui');
    }


    /**
     * Hapus tenaga medis
     */
    public function destroy(TenagaMedis $tenagaMedi)
    {
        $tenagaMedi->delete();

        return redirect()
            ->route('tenaga-medis.index')
            ->with('success', 'Tenaga medis berhasil dihapus');
    }
}
