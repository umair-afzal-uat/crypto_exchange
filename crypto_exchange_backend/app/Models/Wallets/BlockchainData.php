<?php

namespace App\Models\Wallets;

use Illuminate\Database\Eloquent\Model;

class BlockchainData extends Model
{
    protected $table = 'blockchain_datas';

    protected $fillable = ['code', 'last_scan_block'];
}
