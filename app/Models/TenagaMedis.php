<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class TenagaMedis extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'tenaga_medis';
    protected $primaryKey = 'id_tenaga_medis';

    protected $fillable = [
        'nama_tenaga_medis',
        'email',
        'password',
        'jenis_tenaga_medis',
        'spesialisasi',
        'status_aktif',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'status_aktif' => 'boolean',
    ];
}
