<?php

namespace App\Models;

use App\Enums\BaseAppEnum;
use App\Exceptions\Application\ApplicationException;
use App\Exceptions\ErrorMessages;
use App\Exceptions\Http\BadRequestException;
use DB;
use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    protected $table = 'wallets';

    protected $fillable = [
        'user_id',
        'balance',
        'frozen_balance',
        'withdrawal_disabled',
        'address'
    ];

    public const BTC_ADDRESS_REGEX = "[13][a-km-zA-HJ-NP-Z1-9]{25,34}";

    public function user()
    {
        $this->hasOne(User::class, 'id', 'user_id');
    }

    public function acceptDeposit(float $amount)
    {
        $this->balance += $amount;
        $this->save();
        return $this->refresh();
    }

    public function freeze(float $amount): bool
    {

        $this->refresh();

        if (bccomp((string)$this->balance, $amount) !== -1) {
            $res = DB::update('UPDATE wallets SET balance = balance - ' . $amount . ', frozen_balance = frozen_balance +' . $amount . ' WHERE id=' . $this->id . ' AND balance - ' . $amount . ' >= 0');

            if ($res == 1) {
                return true;
            }
        }

        return false;
    }

    public function unFreeze(float $amount): bool
    {

        $this->refresh();

        if (bccomp((string)$this->balance, $amount) !== -1) {
            $res = DB::update('UPDATE wallets SET balance = balance + ' . $amount . ', frozen_balance = frozen_balance -' . $amount . ' WHERE id=' . $this->id . ' AND frozen_balance - ' . $amount . ' >= 0');

            if ($res == 1) {
                return true;
            }
        }

        return false;
    }

    public function updateFrozenBalanceByWithdrawal(WithdrawalRequest $withdrawal)
    {
        return DB::transaction(function () use ($withdrawal) {
            $wallet = $withdrawal->wallet;
            $frozenBalance = $wallet->frozen_balance - $withdrawal->amount;

            if ($frozenBalance < 0) {
                throw new ApplicationException(ErrorMessages::BALANCE_DEPLETED);
            }

            $wallet->update([
                'frozen_balance' => $frozenBalance
            ]);
        }, 3);
    }
}
