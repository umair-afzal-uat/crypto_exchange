<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    protected $table = 'assets';

    public const TYPE_FIAT        = 'fiat';
    public const TYPE_CRYPTO      = 'crypto';

    public const PRECISION_FIAT   = 0;
    public const PRECISION_CRYPTO = 8;

    public const BTC          = 'btc';
    public const USD          = 'usd';
    public const EUR          = 'eur';

    protected $fillable = [
        'active',
        'code',
        'name',
        'link'
    ];

    public function scopeActive($query)
    {
        return $query->where('active', true);
    }
}
