<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShiftSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('shift')->insert([
            [
                'nama_shift' => 'Pagi',
                'jam_mulai' => '07:00:00',
                'jam_selesai' => '13:00:00',
                'durasi_jam' => 6,
                'service_tipe' => 'umum',
            ],
            [
                'nama_shift' => 'Siang',
                'jam_mulai' => '13:00:00',
                'jam_selesai' => '19:00:00',
                'durasi_jam' => 6,
                'service_tipe' => 'umum',
            ],
            [
                'nama_shift' => 'Malam',
                'jam_mulai' => '19:00:00',
                'jam_selesai' => '23:00:00',
                'durasi_jam' => 4,
                'service_tipe' => 'gigi',
            ],
        ]);
    }
}
