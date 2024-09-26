<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\CalcLoanPriceRequest;
use App\Http\Requests\CalcPaymentAmountRequest;
use App\Http\Requests\CancelPaymentsRequest;
use App\Http\Requests\MakeLoanPaymentRequest;
use App\Http\Requests\TakeLoanRequest;
use App\Services\AssetService;
use App\Services\LoanService;
use App\Services\ReferralService;
use Auth;
use Illuminate\Http\Request;

class LoanController extends Controller
{
    private $loanService;
    private $assetService;
    private $referralService;

    public function __construct(LoanService $loanService, AssetService $assetService, ReferralService $referralService)
    {
        $this->loanService = $loanService;
        $this->assetService = $assetService;
        $this->referralService = $referralService;
    }

    public function calcLoanPrice(CalcLoanPriceRequest $request)
    {
        return response($this->loanService->calcLoanPrice($request->loan_period_id, $request->asset_code, $request->amount,  $request->btc));
    }

    public function calcPaymentAmount(CalcPaymentAmountRequest $request)
    {
        return response($this->loanService->calcPaymentAmount($request->loan_id, Auth::id(), $request->is_full, $request->payment_system));
    }

    public function getLoanPeriods()
    {
        return response($this->loanService->getLoanPeriods());
    }

    public function getActiveAssets()
    {
        return response($this->assetService->getActiveAssets());
    }

    public function getCreditLimit()
    {
        return response($this->loanService->getCreditLimit(Auth::id()));
    }

    public function takeLoan(TakeLoanRequest $request)
    {
        return response($this->loanService->takeLoanIfNotQueued(Auth::id(), $request->btc, $request->loan_period_id, $request->usd));
    }

    public function getQueues()
    {
        return response($this->loanService->getQueues(Auth::id()));
    }

    public function getUserLoans(string $type)
    {
        return response($this->loanService->getUserLoans(Auth::id(), $type));
    }

    public function getUserDashboard()
    {
        return response($this->loanService->getUserDashboard(Auth::id()));
    }

    public function getPaymentSystems()
    {
        return response($this->loanService->getPaymentSystems());
    }

    public function makeLoanPayment(MakeLoanPaymentRequest $request)
    {
        return response($this->loanService->makeLoanPayment(Auth::id(), $request->loan_id, $request->payment_system, $request->currency, $request->is_full, $request->is_down, $request->payerData, $request->message));
    }

    public function getReferralPayments()
    {
        return response($this->referralService->getReferralPayments(Auth::id()));
    }

    public function getLoanDetails(int $loanId)
    {
        return response($this->loanService->getLoanDetails(Auth::id(), $loanId));
    }

    public function cancelPayment(CancelPaymentsRequest $request)
    {
        return response($this->loanService->cancelPayment(Auth::id(), $request->payment_id));
    }

    public function getLoanPaymentsDetails(Request $request)
    {
        $this->resolvePagination($request);
        return response($this->loanService->getLoanPaymentsDetails(Auth::id(), $this->perPage));
    }

    public function getLoanQueued()
    {
        return response($this->loanService->getLoanQueued());
    }
    public function deferLoanPayment($loan_id)
    {
        return response($this->loanService->deferLoanPayment($loan_id));
    }
    public function deleteLoanPayment($loan_id)
    {
        return response($this->loanService->deleteLoanPayment($loan_id));
    }
}
