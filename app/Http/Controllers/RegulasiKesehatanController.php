<?php

namespace App\Http\Controllers;

use App\Models\RegulasiKesehatan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegulasiKesehatanController extends Controller
{
    /**
     * Tampilkan regulasi (selalu id = 1)
     */
    public function edit()
    {
        return Inertia::render('RegulasiKesehatan/Edit', [
            'regulasi' => RegulasiKesehatan::findOrFail(1)
        ]);
    }

    public function show()
    {
        return Inertia::render('RegulasiKesehatan/Show', [
            'regulasi' => RegulasiKesehatan::findOrFail(1)
        ]);
    }

    /**
     * Update regulasi
     */
    public function update(Request $request)
    {
        $request->validate([
            'max_jam_harian' => 'required|integer|min:1',
            'max_jam_mingguan' => 'required|integer|min:1',
            'max_shift_harian' => 'required|integer|min:1',
            'keterangan' => 'nullable|string|max:255',
        ]);

        $regulasi = RegulasiKesehatan::findOrFail(1);

        $regulasi->update($request->only([
            'max_jam_harian',
            'max_jam_mingguan',
            'max_shift_harian',
            'keterangan',
        ]));

        return redirect()
            ->route('regulasi.index')
            ->with('success', 'Regulasi berhasil diperbarui');
    }
}
