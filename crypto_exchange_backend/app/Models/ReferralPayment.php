<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReferralPayment extends Model
{
    protected $table = 'referral_payments';

    protected $fillable = [
        'loan_id',
        'user_id',
        'referral_user_id',
        'amount_btc',
        'referral_rate',
        'loan_id',
        'payment_status',
        'payout_status'
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function referralUser()
    {
        return $this->hasOne(User::class, 'id', 'referral_user_id');
    }

    public function loan()
    {
        return $this->hasOne(Loan::class, 'id', 'loan_id');
    }
}
