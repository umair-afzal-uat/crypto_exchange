<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentSystem extends Model
{
    protected $table = 'payment_systems';

    public const PAYMENT_SYSTEM_PLISIO = 'plisio';

    protected $fillable = [
        'name',
        'sale',
        'code'
    ];

    public function asset()
    {
        return $this->belongsToMany(Asset::class, 'payment_systems_assets', 'payment_system_id', 'asset_id');
    }
}
