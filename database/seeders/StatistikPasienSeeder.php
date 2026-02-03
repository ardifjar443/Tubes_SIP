<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Carbon\Carbon;

class StatistikPasienSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // 1. Lokasi file CSV
        $csvFile = database_path('seeders/csv/sippp - patient_history_4weeks.csv');

        if (!File::exists($csvFile)) {
            $this->command->error("File CSV tidak ditemukan di: $csvFile");
            return;
        }

        // 2. Mapping Shift Code CSV -> ID Shift (Master) di Database
        // Pastikan ID ini ada di tabel 'shift' Anda (lihat di sip-2.sql)
        // 1: Gigi (03-06), 2: Umum (Pagi), 3: Umum (Siang), 4: Gigi (Malam)
        $shiftMapping = [
            '08-15' => 2, // Map ke Shift Pagi Umum
            '16-23' => 3, // Map ke Shift Siang Umum
            '00-07' => 3, // Map ke Shift Siang Umum (Fallback/Anggap shift malam)
            '08-12' => 1, // Map ke Shift Siang Gigi (yang ada di DB)
            '16-20' => 4, // Map ke Shift Malam Gigi
        ];

        // 3. Buat Periode Pelayanan Dummy (Historis)
        // Karena data CSV tahun 2025, kita butuh periode yang menaungi tanggal tersebut
        $periodeId = DB::table('periode_pelayanan')->insertGetId([
            'tanggal_mulai'   => '2025-12-01',
            'tanggal_selesai' => '2025-12-31',
            'jam_buka'        => '07:00:00',
            'jam_tutup'       => '23:00:00',
            'status'          => 'close', // Status close karena sudah lampau
        ]);

        $this->command->info("Periode pelayanan dummy (ID: $periodeId) berhasil dibuat.");

        $fileStream = fopen($csvFile, 'r');
        $isHeader = true;
        $statsData = [];

        while (($row = fgetcsv($fileStream, 1000, ',')) !== false) {
            if ($isHeader) {
                $isHeader = false;
                continue;
            }

            // Parsing CSV
            // 0: date, 1: service, 2: shift_code, 5: patient_count
            $csvDate = $row[0];
            $shiftCode = $row[2];
            $patientCount = $row[5];

            // Filter Tanggal (Sebelum 17 Januari 2026)
            if ($csvDate >= '2026-01-17') {
                continue;
            }

            // A. Tentukan ID Master Shift
            $idMasterShift = $shiftMapping[$shiftCode] ?? null;

            if ($idMasterShift) {
                // B. Cek atau Buat Shift Harian (Parent)
                // Kita gunakan updateOrInsert atau firstOrCreate logic manual
                $shiftHarian = DB::table('shift_harian')
                    ->where('tanggal', $csvDate)
                    ->where('id_shift', $idMasterShift)
                    ->first();

                if (!$shiftHarian) {
                    $idShiftHarian = DB::table('shift_harian')->insertGetId([
                        'tanggal'           => $csvDate,
                        'id_shift'          => $idMasterShift,
                        'id_periode'        => $periodeId,
                        'kapasitas_dokter'  => 1, // Default dummy
                        'kapasitas_perawat' => 0,
                    ]);
                } else {
                    $idShiftHarian = $shiftHarian->id_shift_harian;
                }

                // C. Siapkan Data Statistik
                $statsData[] = [
                    'tanggal'                => $csvDate,
                    'id_shift_harian'        => $idShiftHarian, // Foreign Key yang valid
                    'estimasi_pasien'        => $patientCount,
                    'pasien_konsul_lanjutan' => 0,
                ];
            }
        }

        fclose($fileStream);

        // 4. Insert Data Statistik (Bulk)
        if (count($statsData) > 0) {
            // Chunk insert untuk performa
            foreach (array_chunk($statsData, 100) as $chunk) {
                DB::table('statistik_pasien')->insert($chunk);
            }
            $this->command->info(count($statsData) . ' data statistik & shift harian berhasil diimport!');
        } else {
            $this->command->warn('Tidak ada data yang diimport.');
        }
    }
}
