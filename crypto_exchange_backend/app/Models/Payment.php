<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $table = 'payments';

    public const STATUS_PROCESSING    = 'processing';
    public const STATUS_ADMIN_CHECK   = 'admin_check';
    public const STATUS_COMPLETED     = 'completed';
    public const STATUS_CANCELED      = 'canceled';
    public const STATUS_WAITING_USER  = 'waiting_user';
    public const STATUS_WAITING_ADMIN = 'waiting_admin';

    public const PAYMENT_SYSTEMS = [
        'stripe',
    ];

    public const ALL_RELATIONS = ['asset', 'fills', 'loan'];

    public const SEARCH_FIELDS = [
        'amount',
        'amount_usd',
        'payment_system_id',
        'status',
        'comment',
        'fee_sale_usd',
    ];

    protected $fillable = [
        'loan_id',
        'loan_period_id',
        'user_id',
        'asset_id',
        'refund_id',
        'amount',
        'amount_usd',
        'fee_sale_usd',
        'payment_system_id',
        'status',
        'comment',
        'user_message',
        'created_at'
    ];

    protected $hidden = ['loan_id', 'user_id', 'asset_id', 'refund_id'];

    public function asset()
    {
        return $this->hasOne(Asset::class, 'id', 'asset_id');
    }

    public function fills()
    {
        return $this->hasMany(Fill::class);
    }

    public function loan()
    {
        return $this->hasOne(Loan::class, 'id', 'loan_id');
    }

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function paymentSystem()
    {
        return $this->hasOne(PaymentSystem::class, 'id', 'payment_system_id');
    }

    public function setCanceled(string $comment = '')
    {
        $this->status = self::STATUS_CANCELED;
        $this->comment = $comment;
        $this->save();
        return $this->refresh();
    }

    public function setComplited()
    {
        $this->status = self::STATUS_COMPLETED;
        $this->save();
        return $this->refresh();
    }

    public function setAdminCheck()
    {
        $this->status = self::STATUS_ADMIN_CHECK;
        $this->save();
        return $this->refresh();
    }

    public function setApproved()
    {
        $this->status = self::STATUS_COMPLETED;
        $this->save();
        return $this->refresh();
    }

    public function setWaitingAdmin()
    {
        $this->status = self::STATUS_WAITING_ADMIN;
        $this->save();
        return $this->refresh();
    }

    public function setWaitingUser()
    {
        $this->status = self::STATUS_WAITING_USER;
        $this->save();
        return $this->refresh();
    }
}
