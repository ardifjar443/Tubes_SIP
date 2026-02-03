<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PeriodePelayanan extends Model
{
    use HasFactory;

    protected $table = 'periode_pelayanan';
    protected $primaryKey = 'id_periode';
    protected $guarded = ['id_periode'];

    // Matikan timestamps jika di database tidak ada created_at/updated_at
    // (Di SQL dump Anda tabel ini TIDAK punya timestamp, jadi set false)
    public $timestamps = false;
}
