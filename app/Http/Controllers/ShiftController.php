<?php

namespace App\Http\Controllers;

use App\Models\Shift;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShiftController extends Controller
{
    /**
     * LIST SHIFT
     */
    public function index()
    {
        return Inertia::render('Shift/Index', [
            'shifts' => Shift::orderBy('jam_mulai')->get(),
        ]);
    }

    /**
     * FORM CREATE
     */
    public function create()
    {
        return Inertia::render('Shift/Create');
    }

    /**
     * STORE
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama_shift' => 'required|string|max:50',
            'jam_mulai' => 'required',
            'jam_selesai' => 'required|after:jam_mulai',
            'durasi_jam' => 'required|integer|min:1',
            'service_tipe' => 'required|in:umum,gigi',
        ]);

        Shift::create($request->all());

        return redirect()
            ->route('shift.index')
            ->with('success', 'Shift berhasil ditambahkan');
    }

    /**
     * FORM EDIT
     */
    public function edit(Shift $shift)
    {
        return Inertia::render('Shift/Edit', [
            'shift' => $shift,
        ]);
    }

    /**
     * UPDATE
     */
    public function update(Request $request, Shift $shift)
    {
        $request->validate([
            'nama_shift' => 'required|string|max:50',
            'jam_mulai' => 'required',
            'jam_selesai' => 'required|after:jam_mulai',
            'durasi_jam' => 'required|integer|min:1',
            'service_tipe' => 'required|in:umum,gigi',
        ]);

        $shift->update($request->all());

        return redirect()
            ->route('shift.index')
            ->with('success', 'Shift berhasil diperbarui');
    }

    /**
     * DELETE
     */
    public function destroy(Shift $shift)
    {
        $shift->delete();

        return redirect()
            ->route('shift.index')
            ->with('success', 'Shift berhasil dihapus');
    }
}
