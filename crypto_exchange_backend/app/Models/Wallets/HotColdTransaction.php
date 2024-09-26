<?php

namespace App\Models\Wallets;

use App\Models\Asset;
use Illuminate\Database\Eloquent\Model;

class HotColdTransaction extends Model
{
    protected $table = 'hot_cold_transactions';

    public const TYPE_TO_COLD = 'to_cold';
    public const TYPE_TO_HOT = 'to_hot';

    public const STATUS_PENDING = 'pending';
    public const STATUS_SUCCESS = 'success';
    public const STATUS_FAIL = 'fail';

    protected $fillable = [
        'address_from',
        'address_to',
        'amount',
        'asset_id',
        'type',
        'status',
        'tx_hash',
        'message',
        'code',
        'network',
    ];

    protected $appends = [
        'code',
        'hash_link',
    ];

    /**
     * Relations
     */
    public function asset()
    {
        return $this->belongsTo(Asset::class);
    }

    public function getCodeAttribute()
    {
        return $this->asset->code;
    }

    public function scopePending($query)
    {
        return $query->where('status', self::STATUS_PENDING);
    }

    /**
     * @return array|string[]
     */
    public static function getStatuses(): array
    {
        return [
            self::STATUS_PENDING,
            self::STATUS_SUCCESS,
            self::STATUS_FAIL,
        ];
    }

    public static function getLastSuccessHotToColdTransaction(int $asset_id)
    {
        return  self::where(function ($query) use ($asset_id) {
            $query->where('status', 'success');
            $query->where('asset_id', $asset_id);
            $query->where('type', 'to_cold');
        })->get()->last();
    }

    public function getHashLinkAttribute()
    {
        return $this->getUlrForTransaction($this->code) ?? $this->tx_hash;
    }

    private function getUlrForTransaction($code)
    {
        $scannerAddress = config('blockchain.' . $code . '.scanner_url');

        return $scannerAddress ? $scannerAddress . $this->tx_hash : false;
    }
}
