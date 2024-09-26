<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    public $incrementing = false;

    protected $fillable = [
        'id',
        'parent_id',
        'ieo_referral_type',
    ];

    /*
     * Relations
     */
    public function parentUser()
    {
        return $this->belongsTo(User::class, 'parent_id' ,'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id', 'id');
    }

    public function referralPayment()
    {
        return $this->hasOne(ReferralPayment::class, 'account_id', 'id');
    }
}
