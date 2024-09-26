<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoanMainSettings extends Model
{
    use HasFactory;

    protected $fillable = [
        'down_payment',
        'max_loans_amount_usd',
        'bitcoin_wallet',
        'referral_rate',
        'min_withdraw',
        'origination_fee_usd',
        'loan_queued'
    ];

    protected $casts = [
        'down_payment'         => 'float',
        'max_loans_amount_usd' => 'float',
        'bitcoin_wallet'       => 'string',
        'referral_rate'        => 'float',
        'min_withdraw' => 'float',
        'max_withdraw' => 'float',
        'origination_fee_usd' => 'float',
    ];
}
