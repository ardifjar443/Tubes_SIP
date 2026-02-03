<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RegulasiKesehatan extends Model
{
    protected $table = 'regulasi_kesehatan';
    protected $primaryKey = 'id_regulasi';
    public $incrementing = false;

    protected $fillable = [
        'max_jam_harian',
        'max_jam_mingguan',
        'max_shift_harian',
        'keterangan',
    ];
}
