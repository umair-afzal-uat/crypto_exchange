<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoanPeriodSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'period',
        'fee',
    ];

    protected $casts = [
        'period' => 'integer',
        'fee'    => 'float',
    ];
}
