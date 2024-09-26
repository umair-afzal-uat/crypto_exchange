<?php

namespace App\Services;


use App\Exceptions\ErrorMessages;
use App\Exceptions\Http\BadRequestException;
use App\Models\Asset;
use Mail;
use App\Mail\User\drawRequest;
use App\Models\LoanMainSettings;
use App\Models\Payment;
use App\Models\Wallet;
use App\Models\WithdrawalRequest;
use App\Traits\FormatsAmount;
use App\Traits\ModelSearch;

class WalletService
{
    use ModelSearch, FormatsAmount;

    public function getWallet(int $userId): array
    {
        // $d = Wallet::where('user_id', $userId)->firstOrCreate(['user_id'=> $userId])->toArray();
        // dd($d);
        return Wallet::where('user_id', $userId)->firstOrCreate(['user_id'=> $userId])->toArray();
        // return Wallet::where('user_id', $userId)->first()->toArray();
    }

    public function getWithdrawals(int $userId, $perPage, ?array $searchData = []): array
    {
        $query = WithdrawalRequest::with('user.wallet')->where('user_id', $userId);

        if (!empty($searchData)) {
            $query = $this->multiSearch(WithdrawalRequest::class, $searchData, $query);
        }

        return $query->orderBy('id', 'desc')->paginate($perPage)->toArray();
    }

    public function getPayments(int $userId, $perPage, ?array $searchData = []): array
    {
        // die('s');
        $query = Payment::with('loan','user.wallet')->where('user_id', $userId);

        if (!empty($searchData)) {
            $query = $this->multiSearch(Payment::class, $searchData, $query);
        }
        return $query->orderBy('id', 'desc')->paginate($perPage)->toArray();
    }

    public function makeWithdrawalRequest(int $userId, float $amount, string $address): array
    {
        $wallet = Wallet::where('user_id', $userId)->first();
        $settings = LoanMainSettings::first();

        if ($amount < 0) {
            throw new \DomainException('invalid_amount');
        }

        if ($wallet['withdrawal_disabled']) {
            throw new \DomainException('withdrawal_are_disabled');
        }

        $minWithdraw =  $settings->min_withdraw;
        $amountStr = $this->formatAmount($amount, Asset::PRECISION_CRYPTO, Asset::TYPE_CRYPTO);
        $differenceWithdraw =  bcsub($minWithdraw, $amountStr, 6);

        if ($differenceWithdraw > 0) {
            throw new \DomainException("Withdrawal must be greater than_ $minWithdraw");
        }

        if ($wallet['balance'] < $amount) {
            throw new \DomainException('not_enough_money');
        }

        if(!$wallet->freeze($amount)) {
            throw new \DomainException('balance_error');
        }

        $withdrawalRequest = WithdrawalRequest::create([
            'amount' => $amount,
            'address' => $address,
            'wallet_id' => $wallet->id,
            'user_id' => $userId
        ]);
        $user = auth()->user();
        Mail::to($user->email)->queue(new drawRequest($withdrawalRequest, $user));
        return $withdrawalRequest->toArray();
    }

    public function cancelWithdrawalRequest(int $userId, int $withdrawalId): array
    {
        $withdrawal = WithdrawalRequest::where('user_id', $userId)->where('id', $withdrawalId)->firstOrFail();

        if ($withdrawal->status !== WithdrawalRequest::STATUS_PENDING) {
            throw new \DomainException('withdrawal_is_not_pending');
        }

        $withdrawal->setCanceled();
        return $withdrawalRequest->toArray();

        return $withdrawal->toArray();
    }
}
