<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CutiTenagaMedisSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('cuti_tenaga_medis')->insert([
            'id_tenaga_medis' => 2, // Dokter Umum 1
            'tanggal_mulai' => now()->addDays(5),
            'tanggal_selesai' => now()->addDays(7),
            'jenis_cuti' => 'cuti',
            'status' => 'approved',
        ]);
    }
}
