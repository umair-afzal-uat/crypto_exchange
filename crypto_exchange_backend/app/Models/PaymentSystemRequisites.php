<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentSystemRequisites extends Model
{
    protected $table = 'payment_systems_requisites';

    protected $fillable = [
        'payment_system_id',
        'active',
        'first_name',
        'last_name',
        'phone_number',
        'email'
    ];

    public function scopeActive($query)
    {
        return $query->where('active', true);
    }
}
