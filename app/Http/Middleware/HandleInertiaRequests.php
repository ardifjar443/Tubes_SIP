<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? [
                    // Kita mapping manual agar React menerimanya
                    'id' => $request->user()->id_tenaga_medis,
                    'name' => $request->user()->nama_tenaga_medis, // Mapping ke 'name' standar
                    'email' => $request->user()->email,

                    // INI YANG PALING PENTING:
                    'nama_tenaga_medis' => $request->user()->nama_tenaga_medis,
                    'jenis_tenaga_medis' => $request->user()->jenis_tenaga_medis,
                ] : null,
            ],
        ];
    }
}
