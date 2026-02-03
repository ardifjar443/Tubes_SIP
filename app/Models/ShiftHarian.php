<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShiftHarian extends Model
{
    use HasFactory;

    protected $table = 'shift_harian';
    protected $primaryKey = 'id_shift_harian';
    protected $guarded = ['id_shift_harian'];
    public $timestamps = false; // Sesuaikan dengan database Anda (di SQL dump tidak ada created_at/updated_at di tabel ini)

    // Relasi ke Master Shift (Sudah ada sebelumnya)
    public function shift()
    {
        return $this->belongsTo(Shift::class, 'id_shift', 'id_shift');
    }

    // --- TAMBAHKAN INI (YANG HILANG) ---
    public function periode()
    {
        // Relasi ke tabel periode_pelayanan
        // Parameter: Model Tujuan, Foreign Key di tabel ini, Primary Key di tabel tujuan
        return $this->belongsTo(PeriodePelayanan::class, 'id_periode', 'id_periode');
    }
}
