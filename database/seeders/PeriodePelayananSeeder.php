<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PeriodePelayananSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('periode_pelayanan')->insert([
            'tanggal_mulai' => now()->startOfMonth(),
            'tanggal_selesai' => now()->endOfMonth(),
            'jam_buka' => '07:00:00',
            'jam_tutup' => '23:00:00',
        ]);
    }
}
