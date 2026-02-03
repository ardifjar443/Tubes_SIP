<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class KepalaKlinikMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();

        // sesuaikan field ini dengan tabel tenaga_medis
        if (!$user || $user->jenis_tenaga_medis !== 'kepala klinik') {
            abort(403, 'Akses hanya untuk Kepala Klinik');
        }

        return $next($request);
    }
}
