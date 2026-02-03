<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class TenagaMedisSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            // Kepala Klinik
            ['Kepala Klinik', 'kepala@sip.test', 'kepala klinik', 'none'],

            // Dokter Umum (4)
            ['Dokter Umum 1', 'du1@sip.test', 'dokter', 'umum'],
            ['Dokter Umum 2', 'du2@sip.test', 'dokter', 'umum'],
            ['Dokter Umum 3', 'du3@sip.test', 'dokter', 'umum'],
            ['Dokter Umum 4', 'du4@sip.test', 'dokter', 'umum'],

            // Dokter Gigi (2)
            ['Dokter Gigi 1', 'dg1@sip.test', 'dokter', 'gigi'],
            ['Dokter Gigi 2', 'dg2@sip.test', 'dokter', 'gigi'],
        ];

        foreach ($data as $d) {
            DB::table('tenaga_medis')->insert([
                'nama_tenaga_medis' => $d[0],
                'email' => $d[1],
                'password' => Hash::make('password'),
                'jenis_tenaga_medis' => $d[2],
                'spesialisasi' => $d[3],
                'status_aktif' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}
