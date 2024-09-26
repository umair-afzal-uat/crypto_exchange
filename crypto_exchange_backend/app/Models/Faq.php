<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Faq extends Model
{
    use SoftDeletes, HasFactory;
    protected $table = 'faqs';

    protected $dates = ['deleted_at'];
    protected $softDelete = true;

    public const STATUS_ACTIVE      = 1;
    public const STATUS_IN_ACTIVE    = 0;

    public static array $statuses = [self::STATUS_ACTIVE, self::STATUS_IN_ACTIVE];

    protected $fillable = [
        'question',
        'answer',
        'display_order',
        'status'
    ];

    public function scopeActive($query)
    {
        return $query->whereIn('status', [self::STATUS_ACTIVE]);
    }

    public function scopeinActive($query)
    {
        return $query->whereIn('status', [self::STATUS_IN_ACTIVE]);
    }

    public function setActive()
    {
        $this->status = self::STATUS_ACTIVE;
        $this->save();
        return $this->refresh();
    }

    public function setInActive()
    {
        $this->status = self::STATUS_IN_ACTIVE;
        $this->save();
        return $this->refresh();
    }
}
