<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WithdrawalRequest extends Model
{
    protected $table = 'withdrawal_requests';

    public const STATUS_CANCELED    = 'canceled';
    public const STATUS_PENDING     = 'pending';
    public const STATUS_IN_PROGRESS = 'in_progress';
    public const STATUS_PROCESSED   = 'processed';
    public const STATUS_REJECTED    = 'rejected';

    public const SEARCH_FIELDS = [
        'amount',
        'address',
        'status',
        'confirmation_count',
        'tx_hash',
        'staff_name',

    ];

    protected $fillable = [
        'wallet_id',
        'user_id',
        'amount',
        'address',
        'status',
        'confirmation_count',
        'tx_hash',
	'address',
        'comment',
        'staff_name',

    ];

    protected $visible = [
        'id',
        'wallet_id',
        'amount',
        'address',
        'status',
        'confirmation_count',
        'tx_hash',
        'comment',
        'created_at',
        'user',
        'staff_name',
    ];

    public function wallet()
    {
        return $this->belongsTo(Wallet::class, 'wallet_id', 'id');
    }


    public function setCanceled()
    {
        $this->status = self::STATUS_CANCELED;
        $this->save();
        return $this->refresh();
    }

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
