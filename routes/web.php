<?php

use App\Http\Controllers\{
    CutiController,
    JadwalController,
    ProfileController,
    TenagaMedisController,
    RegulasiKesehatanController,
    ShiftController
};
use App\Models\TenagaMedis;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

/*
|--------------------------------------------------------------------------
| DASHBOARD
|--------------------------------------------------------------------------
*/

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'stats' => [
            'totalTenagaMedis' => TenagaMedis::count(),
            'dokter' => TenagaMedis::where('jenis_tenaga_medis', 'dokter')->count(),
            'perawat' => TenagaMedis::where('jenis_tenaga_medis', 'perawat')->count(),
            'aktif' => TenagaMedis::where('status_aktif', true)->count(),
        ],
    ]);
})->middleware(['auth'])->name('dashboard');

// Route::get('/dashboard', function () {
//     // 1. Cek apakah Laravel mengenali user yang login?
//     $user = Illuminate\Support\Facades\Auth::user();

//     // Jika NULL, berarti masalah ada di Login Controller / Model (Session gagal dibuat)
//     if (!$user) {
//         dd("User tidak terdeteksi login (Auth::user is null)");
//     }

//     // Jika user ada, kita cek isinya
//     dd($user->toArray());

//     // Kembalikan ke normal jika sudah oke
//     return Inertia::render('Dashboard');
// })->middleware(['auth'])->name('dashboard');

/*
|--------------------------------------------------------------------------
| PROFILE
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/*
|--------------------------------------------------------------------------
| TENAGA MEDIS
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {
    Route::resource('tenaga-medis', TenagaMedisController::class);
});

/*
|--------------------------------------------------------------------------
| REGULASI
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {
    Route::get('/regulasi', [RegulasiKesehatanController::class, 'show'])->name('regulasi.show');
    Route::get('/regulasi/edit', [RegulasiKesehatanController::class, 'edit'])->name('regulasi.edit');
    Route::put('/regulasi', [RegulasiKesehatanController::class, 'update'])->name('regulasi.update');
});

/*
|--------------------------------------------------------------------------
| SHIFT
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {
    Route::resource('shift', ShiftController::class)->except(['show']);
});

/*
|--------------------------------------------------------------------------
| CUTI
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {
    Route::get('/cuti', [CutiController::class, 'index'])->name('cuti.index');
    Route::get('/cuti/create', [CutiController::class, 'create'])->name('cuti.create');
    Route::post('/cuti', [CutiController::class, 'store'])->name('cuti.store');
    Route::put('/cuti/{cuti}/status', [CutiController::class, 'updateStatus'])->name('cuti.updateStatus');
});

/*
|--------------------------------------------------------------------------
| JADWAL (INI YANG TADI HILANG)
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {

    // Semua jadwal (kepala klinik & admin)
    Route::get('/jadwal', [JadwalController::class, 'index'])
        ->name('jadwal.index');

    // Jadwal pribadi (dokter)
    Route::get('/jadwal/saya', [JadwalController::class, 'JadwalSaya'])
        ->name('jadwal.saya');

    // Generate otomatis (kepala klinik)
    Route::post('/jadwal/generate', [JadwalController::class, 'generate'])
        ->middleware('kepala_klinik')
        ->name('jadwal.generate');
});

require __DIR__ . '/auth.php';
