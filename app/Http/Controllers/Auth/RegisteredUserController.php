<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\TenagaMedis;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:tenaga_medis,email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $tenagaMedis = TenagaMedis::create([
            'nama_tenaga_medis' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'jenis_tenaga_medis' => 'dokter',   // default (bisa diubah)
            'spesialisasi' => 'none',
            'status_aktif' => true,
        ]);

        event(new Registered($tenagaMedis));

        Auth::login($tenagaMedis);

        return redirect(route('dashboard', absolute: false));
    }
}
