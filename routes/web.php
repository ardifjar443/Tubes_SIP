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
use App\Models\JadwalTenagaMedis; // <--- GUNAKAN MODEL YANG BENAR
use App\Models\ShiftHarian;       // <--- DIPERLUKAN UNTUK ORDER BY
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Cuti;

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
    // 1. Ambil Data Statistik
    $stats = [
        'totalTenagaMedis' => TenagaMedis::count(),
        'dokter' => TenagaMedis::where('jenis_tenaga_medis', 'dokter')->count(),
        'perawat' => TenagaMedis::where('jenis_tenaga_medis', 'perawat')->count(),
        'aktif' => TenagaMedis::where('status_aktif', true)->count(),
    ];

    // 2. Ambil Data Jadwal
    $jadwal = JadwalTenagaMedis::with([
        'tenagaMedis:id_tenaga_medis,nama_tenaga_medis,spesialisasi',
        'shiftHarian.periode:id_periode,status,tanggal_mulai,tanggal_selesai',
        'shiftHarian.shift:id_shift,nama_shift,jam_mulai,jam_selesai'
    ])
        ->orderBy(
            ShiftHarian::select('tanggal')
                ->whereColumn('shift_harian.id_shift_harian', 'jadwal_tenaga_medis.id_shift_harian')
        )
        ->get();

    // 3. Ambil Data Cuti Pending (Khusus Kepala Klinik untuk Dashboard)
    // Mengambil cuti yang statusnya masih 'request'
    $cutiPending = Cuti::with('tenagaMedis')
        ->where('status', 'request')
        ->orderBy('created_at', 'asc') // Yang lama di atas biar diproses duluan
        ->get();

    return Inertia::render('Dashboard', [
        'stats' => $stats,
        'jadwal' => $jadwal,
        'cutiPending' => $cutiPending // <--- KIRIM DATA INI
    ]);
})->middleware(['auth'])->name('dashboard');


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
| JADWAL
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {
    // Semua jadwal (kepala klinik & admin)
    Route::get('/jadwal', [JadwalController::class, 'index'])->name('jadwal.index');
    // Jadwal pribadi (dokter)
    Route::get('/jadwal/saya', [JadwalController::class, 'jadwalSaya'])->name('jadwal.saya');
    // Generate otomatis (kepala klinik)
    Route::post('/jadwal/generate', [JadwalController::class, 'generate'])
        // ->middleware('kepala_klinik') // Uncomment jika middleware sudah ada
        ->name('jadwal.generate');
});

require __DIR__ . '/auth.php';
