<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\CancelWithdrawalRequest;
use App\Http\Requests\GetPaymentsRequest;
use App\Http\Requests\GetWithdrawalsRequest;
use App\Http\Requests\MakeWithdrawalRequest;
use App\Services\WalletService;
use Auth;

class WalletController extends Controller
{
    private $walletService;

    public function __construct(WalletService $walletService)
    {
        $this->walletService = $walletService;
    }

    public function getUserWallet()
    {
        return response($this->walletService->getWallet(Auth::id()));
    }

    public function getWithdrawals(GetWithdrawalsRequest $request)
    {
        $this->resolvePagination($request);

        return response($this->walletService->getWithdrawals(Auth::id(), $this->perPage, $request->search_data));
    }

    public function getPayments(GetPaymentsRequest $request)
    {
        $this->resolvePagination($request);

        return response($this->walletService->getPayments(Auth::id(), $this->perPage, $request->search_data));
    }

    public function makeWithdrawalRequest(MakeWithdrawalRequest $request)
    {
        return response($this->walletService->makeWithdrawalRequest(Auth::id(), $request->amount, $request->address));
    }

    public function cancelWithdrawalRequest(cancelWithdrawalRequest $request)
    {
        return response($this->walletService->cancelWithdrawalRequest(Auth::id(), $request->withdrawal_id));
    }
}
