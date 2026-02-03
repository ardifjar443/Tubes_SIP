<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JadwalTenagaMedis extends Model
{
    protected $table = 'jadwal_tenaga_medis';
    protected $primaryKey = 'id_jadwal';
    public $timestamps = false;

    protected $fillable = [
        'id_tenaga_medis',
        'id_shift_harian'
    ];

    // ======================
    // RELATIONSHIP
    // ======================
    public function tenagaMedis()
    {
        return $this->belongsTo(
            TenagaMedis::class,
            'id_tenaga_medis',
            'id_tenaga_medis'
        );
    }

    public function shiftHarian()
    {
        return $this->belongsTo(
            ShiftHarian::class,
            'id_shift_harian',
            'id_shift_harian'
        );
    }
}
