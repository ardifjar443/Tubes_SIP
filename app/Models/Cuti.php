<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cuti extends Model
{
    protected $table = 'cuti_tenaga_medis';
    protected $primaryKey = 'id_cuti';

    protected $fillable = [
        'id_tenaga_medis',
        'tanggal_mulai',
        'tanggal_selesai',
        'jenis_cuti',
        'status',
        'approved_by',
        'approved_at',
    ];

    public function tenagaMedis()
    {
        return $this->belongsTo(TenagaMedis::class, 'id_tenaga_medis');
    }

    public function approver()
    {
        return $this->belongsTo(TenagaMedis::class, 'approved_by');
    }
}
