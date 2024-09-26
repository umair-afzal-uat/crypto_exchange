<?php

namespace App\Services\Admin;

use App\Models\Admin;
use App\Models\Asset;
use App\Models\Loan;
use Mail;
use App\Mail\User\approvePayment;
use App\Mail\User\rejectPayment;
use App\Models\LoanPeriod;
use App\Models\Payment;
use App\Models\User;
use App\Repositories\Payments\PaymentRepository;
use App\Services\Base\BaseAppGuards;
use App\Services\LoanService;
use Carbon\Carbon;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class PaymentsManageService extends PaymentRepository
{
    private ?Admin $loginAdmin;
    private LoanService $loanService;

    public function __construct(Application $app, LoanService $loanService, Collection $collection = null)
    {
        $this->loginAdmin = auth()->guard(BaseAppGuards::ADMIN)->user();
        $this->loanService = $loanService;
        parent::__construct($app, $collection);
    }

    public function index(int $pagination, ?string $searchField = null, ?string $searchValue = null): LengthAwarePaginator
    {
        $payments = Payment::with(['user'])->whereHas('user', function($query) use ($searchField, $searchValue) {
            if ($searchField === 'email') {
                $query->where('email', $searchValue);
            }

            if ($searchField === 'name') {
                $query->whereRaw("CONCAT(first_name,' ',last_name) LIKE '%$searchValue%'");
            }
        })->orderBy('id', 'desc')->paginate($pagination);

        return $payments;
    }

    public function approvePayment(int $paymentId): void
    {
        
        $payment = Payment::where('id', $paymentId)->whereIn('status', [Payment::STATUS_WAITING_ADMIN, Payment::STATUS_ADMIN_CHECK])->firstOrFail();
        $payment->setApproved();
        $this->loanService->fillPeriods($payment->id);
    }

    public function rejectPayment(int $paymentId, string $comment): void
    {
        $payment = Payment::where('id', $paymentId)->whereIn('status', [Payment::STATUS_WAITING_ADMIN, Payment::STATUS_ADMIN_CHECK])->firstOrFail();
        $payment->setCanceled($comment);
    }

    public function changePayment(int $paymentId, float $amount, string $currency): void
    {
        $asset = Asset::where('code', $currency)->firstOrFail();
        $amountUsd = $amount;

        if ($asset->code !== Asset::USD) {
            $service = resolve(LoanService::class);
            $rate = $service->getRate($asset->code, Asset::USD);
            $amountUsd = round($amount * $rate, Asset::TYPE_FIAT);
        }

        $payment = Payment::where('id', $paymentId)->whereIn('status', [Payment::STATUS_WAITING_ADMIN, Payment::STATUS_ADMIN_CHECK])->firstOrFail();
        $payment->update(['amount_usd' => $amountUsd]);
    }
    public function missedPayments(int $pagination): LengthAwarePaginator
    {

        $payments = LoanPeriod::whereDate("payment_date" , "<", Carbon::now() )->where('status','opened')
        ->orderBy('id', 'desc')->paginate($pagination);

        return $payments;
    }
    public function missedLoanPayments($loan_id)
    {
        $loan = Loan::where("id" , "=", $loan_id)->first();
        return $loan;
    }
    public function formatAmount($amount, $precision, $assetType = 'crypto'): string
    {
        $value = $assetType === 'fiat'
            ? floor($amount*100)/100 // for round like 1.378 to 1.37
            : round($amount, $precision);

        return number_format($value, $precision, '.', '');
    }
    private function sortLoanPeriods(array $loanPeriods): array
    {
        $loanPeriodsSorted = [
            'periods' => [
                'future' => [],
                'now' => [],
                'old' => [],
            ],
            'next_period' => [],
            'amount_future' => 0,
            'amount_waiting' => 0,
            'amount_waiting_total' => 0,
            'amount_paid' => 0,
            'amount_available_sale' => 0,
        ];

        $now = Carbon::now();
        // dd($loanPeriods);
        foreach ($loanPeriods as $loanPeriod) {
            $paymentDate = Carbon::parse($loanPeriod['payment_date']);
            if (
                (
                    empty($loanPeriodsSorted['next_period']) ||
                    Carbon::parse($loanPeriod['payment_date'])->timestamp < Carbon::parse($loanPeriodsSorted['next_period']['payment_date'])->timestamp
                )
                && $loanPeriod['status'] === LoanPeriod::STATUS_OPENED) {
                $loanPeriodsSorted['next_period'] = $loanPeriod;
            }

            if ($paymentDate->timestamp > $now->timestamp && $loanPeriod['status'] === LoanPeriod::STATUS_OPENED) {
                $loanPeriodsSorted['periods']['future'][] = $loanPeriod;
                $loanPeriodsSorted['amount_future'] += $loanPeriod['amount_usd'] - $loanPeriod['amount_usd_paid'];
                $loanPeriodsSorted['amount_waiting_total'] += $loanPeriod['amount_usd'] - $loanPeriod['amount_usd_paid'];
                $loanPeriodsSorted['amount_paid'] += $loanPeriod['amount_usd_paid'];
                $loanPeriodsSorted['amount_available_sale'] += $loanPeriod['fee_period_amount'];
            }

            if ($paymentDate->timestamp <= $now->timestamp && $loanPeriod['status'] === LoanPeriod::STATUS_OPENED) {
                $loanPeriodsSorted['periods']['now'][] = $loanPeriod;
                $loanPeriodsSorted['amount_waiting'] += $loanPeriod['amount_usd'] - $loanPeriod['amount_usd_paid'];
                $loanPeriodsSorted['amount_waiting_total'] += $loanPeriod['amount_usd'] - $loanPeriod['amount_usd_paid'];
                $loanPeriodsSorted['amount_paid'] += $loanPeriod['amount_usd_paid'];
                $loanPeriodsSorted['amount_available_sale'] += $loanPeriod['fee_period_amount'];
            }

            if ($loanPeriod['status'] === LoanPeriod::STATUS_PAID) {
                $loanPeriodsSorted['periods']['old'][] = $loanPeriod;
                $loanPeriodsSorted['amount_paid'] += $loanPeriod['amount_usd'];
            }
        }

        return $loanPeriodsSorted;
    }
    public function paymentDetails($user_id, $pagination) : LengthAwarePaginator
    {
        $payment_details = Payment::where("user_id" , "=", $user_id)->orderBy('id', 'desc')->paginate($pagination);
        $loans = $this->getUserLoans($user_id, Loan::STATUS_ACTIVE);
        //$loans = $this->getUserLoans($user_id);
        $loansCnt = count($loans);
        for ($i = 0; $i < $loansCnt; $i++) {
            $loans[$i]['loaned_in_btc'] = $this->formatAmount($loans[$i]['loaned_in_btc'], Asset::PRECISION_CRYPTO, Asset::TYPE_CRYPTO);
            $loans[$i]['loan_period'] = $this->sortLoanPeriods($loans[$i]['loan_period']);
            $loans[$i]['payments'] = Payment::where("user_id" , "=", $user_id)->where("loan_id" , "=", $loans[$i]['id'])->orderBy('id', 'asc')->get()->toArray();
            $loans[$i]['is_deffered'] = LoanPeriod::where('loan_id',$loans[$i]['id'])->where('status',LoanPeriod::STATUS_DEFFERED)->count();
            if (!empty($loans[$i]['loan_period']['next_period'])) {
                $loans[$i]['next_payment_date'] = $loans[$i]['loan_period']['next_period']['payment_date'];
                $loans[$i]['next_payment_amount'] = $loans[$i]['loan_period']['next_period']['amount_usd'];
            }
        }
        // if($user_id == 1){
            $payment_details['loans'] = $loans;
        //}
        
        return $payment_details;
    }
    public function getUserLoans(int $userId, ?string $type = "", $paginate = false): array
    {
        $query = Loan::with('loanPeriod');

        switch ($type) {
            case 'active':
                $query = $query->active();
                break;
            case 'old':
                $query = $query->old();
        }
        if($paginate == false){
            return $query->where('user_id', $userId)->orderBy('id', 'desc')->get()->toArray();
        }
        return $query->where('user_id', $userId)->orderBy('id', 'desc')->paginate($paginate)->toArray();
    }
    public function changePaymentStatus($id, $status)
    {

        $payment = Payment::where('id', $id)->firstOrFail();
        $payment->update(['status' => $status]);

        if($status  === Payment::STATUS_COMPLETED) {
            $user = User::find($payment->user_id);
            Mail::to($user->email)->queue(new approvePayment($payment, $user));
            $this->loanService->fillPeriods($payment->id);
        }
        elseif($status  === Payment::STATUS_CANCELED) {
            $user = User::find($payment->user_id);
            Mail::to($user->email)->queue(new rejectPayment($payment, $user));
            $this->loanService->fillPeriods($payment->id);
        }
    }
}
