<?php

namespace App\Services;

use App\Models\Account;
use App\Models\Asset;
use App\Mail\User\GetLoan;
use App\Mail\User\LoanWait;
use Mail;
use App\Models\Loan;
use App\Models\LoanMainSettings;
use App\Models\LoanPeriod;
use App\Models\LoanPeriodSetting;
use App\Models\LoanQueue;
use App\Models\Payment;
use App\Models\PaymentSystem;
use App\Models\ReferralPayment;
use App\Models\User;
use App\Models\Wallet;
use App\Repositories\Loans\LoanRepository;
use App\Services\Payments\PaymentServiceResolver;
use App\Traits\FormatsAmount;
use Carbon\Carbon;
use DB;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Redis;

class LoanService extends LoanRepository
{
    use FormatsAmount;

    public function index(?string $status, int $paginate): LengthAwarePaginator
    {
        if (!is_null($status)) {
            $loans = $this->getByStatus($status, $paginate);
        } else {
            $loans = $this->newQuery()->with('user')->paginate($paginate);
        }

        return $loans;
    }

    public function updateLoanMainSettings(array $data)
    {
        return LoanMainSettings::first()->update($data);
    }

    public function calcLoanPrice(int $loanPeriodId, string $assetCode, ?float $amount = null, ?float $btc = null, ?float $rate = null): array
    {
        $period = LoanPeriodSetting::where('id', $loanPeriodId)->firstOrFail();
        $asset = Asset::where('code', $assetCode)->where('code', '!=', Asset::BTC)->firstOrfail();

        if (is_null($rate)) {
            $rate = $this->getRate(Asset::BTC, $asset->code);
        }
        $mainSettings = LoanMainSettings::first();

        if (!is_null($amount)) {
            $btc = $amount * (1 / $rate);
        } elseif (!is_null($btc)) {
            $amount = $btc * $rate;
        } else {
            throw new \DomainException('calculation_error');
        }

        // добавить коммисию

        // $feeAmount = $amount / 100 * $period->fee;
        // $downPaymentAmount = ($amount + $feeAmount) / 100 * $mainSettings->down_payment;
        // $leftAmount = ($amount + $feeAmount) - $downPaymentAmount;
        // $downPaymentBtc = $downPaymentAmount * (1 / $rate);
        // $totalAmount = round($downPaymentAmount, 2) + round($amountByPeriod, 2) * ($period->period - 1);


        // Calculations
        // $actual_amount = $amount;
        // $downPaymentAmount = $amount / 100 * $mainSettings->down_payment;   // Down payment
        // $amount = $amount - $downPaymentAmount;         // Deducting the down payment from the loan amount
        // $feeAmount = $amount / 100 * $period->fee;      // Finance fees amount
        // $feePeriodAmount = $feeAmount / $period->no_of_payments;    // Fee amount by the number of payments
        // $origination_fee = $mainSettings->origination_fee_usd;      // Origination fees

        // $downPaymentBtc = $downPaymentAmount * (1 / $rate);

        // $totalAmount = $downPaymentAmount + $amount + $feeAmount + $origination_fee;

        // $no_of_payments = $period->no_of_payments;
        // $weekly_payment = ($totalAmount - $origination_fee - $downPaymentAmount) / $no_of_payments;


        $actual_amount = $amount;
        $origination_fee = $mainSettings->origination_fee_usd;
        $feeAmount = $amount / 100 * $period->fee;
        $total_ =  $actual_amount + $feeAmount;
        $feePeriodAmount = $feeAmount / $period->no_of_payments;
        $total_period_amount = $total_/$period->no_of_payments;
        $downPaymentAmount =$total_period_amount+$origination_fee;

        $downPaymentBtc = $downPaymentAmount * (1 / $rate);
        $totalAmount = $actual_amount + $feeAmount + $origination_fee;
        $no_of_payments = $period->no_of_payments - 1;

        $weekly_payment =  ($totalAmount -  $downPaymentAmount)/ $no_of_payments;




        $data = [
            'value_btc' => $this->formatAmount($btc, Asset::PRECISION_CRYPTO, Asset::TYPE_CRYPTO),
            'value_usd' => $this->formatAmount($actual_amount, Asset::PRECISION_FIAT, Asset::TYPE_FIAT),
            'fee_amount' => $this->formatAmount($feeAmount, Asset::PRECISION_FIAT, Asset::TYPE_FIAT),
            'fee_period_amount' => $this->formatAmount($feePeriodAmount, Asset::PRECISION_FIAT, Asset::TYPE_FIAT),
            'total_amount' => $this->formatAmount($totalAmount, Asset::PRECISION_FIAT, Asset::TYPE_FIAT),
            'down_payment_amount' => $this->formatAmount($downPaymentAmount, 2, Asset::TYPE_FIAT),
            //'down_payment_amount' => $downPaymentAmount,
            'down_payment_btc' => $this->formatAmount($downPaymentBtc, Asset::PRECISION_CRYPTO, Asset::TYPE_CRYPTO),
            'periods_count' => $period->no_of_payments,
            'periods_period' => $period->period,
            'down_payment' => $mainSettings->down_payment,
            'weekly_payment' => $weekly_payment,
            'fee_rate' => $period->fee,
            'btc_amount_rate' => $rate,
            'amount_by_period' => $weekly_payment,
            'min_loan_amount_usd' => $mainSettings->min_loan_amount_usd,
            'origination_fee_usd' => $mainSettings->origination_fee_usd,
        ];

        return $data;
    }

    public function calcPaymentAmount(int $loanId, int $userId, bool $isFull, string $paymentSystemCode)
    {
        $paymentSystem = PaymentSystem::where('code', $paymentSystemCode)->firstOrFail();
        $loanPeriods = Loan::with('loanPeriod')
            ->where('user_id', $userId)
            ->where('id', $loanId)
            ->active()
            ->firstOrFail()
            ->loanPeriod;

        $sortLoanPeriods = $this->sortLoanPeriods($loanPeriods->toArray());

        if ($isFull) {
            $amount = $sortLoanPeriods['amount_waiting_total'];
            $availableSale = $sortLoanPeriods['amount_available_sale'];
        } else {
            if (!empty($sortLoanPeriods['periods']['now'])) {
                $amount = $sortLoanPeriods['periods']['now'][0]['amount_usd'] - $sortLoanPeriods['periods']['now'][0]['amount_usd_paid'];
                $availableSale = $sortLoanPeriods['amount_available_sale'];
            } elseif (!empty($sortLoanPeriods['periods']['future'])) {
                $amount = $sortLoanPeriods['periods']['future'][0]['amount_usd'] - $sortLoanPeriods['periods']['future'][0]['amount_usd_paid'];
                $availableSale = $sortLoanPeriods['amount_available_sale'];
            } else {
                throw new \DomainException('no_current_period');
            }
        }

        $sale = round($availableSale / 100 * $paymentSystem->sale, Asset::PRECISION_FIAT);
        $amountToPay = $this->formatAmount($amount - $sale, Asset::PRECISION_FIAT, Asset::TYPE_FIAT);

        return ['amount' => $amountToPay];
    }

    public function getLoanPeriods(): array
    {
        return LoanPeriodSetting::get()->toArray();
    }

    public function getRate(string $codeMain, string $codeExchange): float
    {
        $redis = Redis::connection();

        $redis->select(config('custom.main_redis_db', 1));
        // print_r($redis->get('assets_pair_MAINDATA_FULL'));
        // exit;
        $data = json_decode($redis->get('assets_pair_MAINDATA_FULL'), 1);
        //    print_r($data);
        //    exit;
        $price = $data['RAW'][strtoupper($codeMain)][strtoupper(strtoupper($codeExchange))]['PRICE'];

        return $this->formatAmount($price, Asset::PRECISION_FIAT, Asset::TYPE_FIAT);
    }

    public function getCreditLimit(?int $userId = null): array
    {
        $mainSettings = LoanMainSettings::first();
        $max_loans_amount_usd = $mainSettings->max_loans_amount_usd;
        $min_loans_amount_usd = $mainSettings->min_loan_amount_usd;
        // if (!is_null($userId)) {
        //     $usedLimit = Loan::with('loanPeriod')->active()->where('user_id', $userId)->sum('loaned_in_usd');
        //     $max_loans_amount_usd = $mainSettings->max_loans_amount_usd - $usedLimit;
        // }


        $rate = $this->getRate(Asset::BTC, Asset::USD);

        return [
            'loan_max_usd' => $max_loans_amount_usd,
            'loan_max_btc' => round($max_loans_amount_usd * (1 / $rate), Asset::PRECISION_CRYPTO),
            // 'loan_max_btc' => round($max_loans_amount_usd * 0.000015, Asset::PRECISION_CRYPTO),
            'loan_min_usd' => $min_loans_amount_usd,
            'loan_min_btc' => round($min_loans_amount_usd * (1 / $rate), Asset::PRECISION_CRYPTO)
            // 'loan_min_btc' => round($min_loans_amount_usd * 0.000015, Asset::PRECISION_CRYPTO)
        ];
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

    public function getUserDashboard(int $userId)
    {
        $data = [
            'loans' => [],
            'total_value' => 0,
            'balance' => isset((new WalletService())->getWallet($userId)['balance']) ? (new WalletService())->getWallet($userId)['balance'] : 0 ,
            'paid_total' => 0,
            'credit_limit' => $this->getCreditLimit(),
            'loaned_total' => [
                'btc' => 0,
                'usd' => 0,
            ],
            'next_payment_id' => null,
            'next_payment_date' => null,
            'next_payment_amount' => 0
        ];
        $loans = $this->getUserLoans($userId, Loan::STATUS_ACTIVE);
        $mainSettings = LoanMainSettings::first();
        $totalLoanedUsd = 0;
        $totalLoanedBtc = 0;
        $totalLoanedUsdtoShow = 0;
        $totalLoanedBtctoShow = 0;
        $totalPaidUsd = 0;
        $loansCnt = count($loans);

        for ($i = 0; $i < $loansCnt; $i++) {
            $loans[$i]['loaned_in_btc'] = $this->formatAmount($loans[$i]['loaned_in_btc'], Asset::PRECISION_CRYPTO, Asset::TYPE_CRYPTO);
            $loans[$i]['loan_period'] = $this->sortLoanPeriods($loans[$i]['loan_period']);
            $loans[$i]['is_deffered'] = LoanPeriod::where('loan_id',$loans[$i]['id'])->where('status',LoanPeriod::STATUS_DEFFERED)->count();
           // $payment = Payment::where(['user_id'=>$userId,'loan_id'=>$loans[$i]['id']]);

            if($loans[$i]['status'] != 'initialized')
            {
                $totalLoanedUsd += $loans[$i]['loaned_in_usd'];
                $totalLoanedBtc += $loans[$i]['loaned_in_btc'];
                $totalLoanedUsdtoShow += $loans[$i]['loaned_in_usd'];
                $totalLoanedBtctoShow += $loans[$i]['loaned_in_btc'];
            }else{
                $totalLoanedUsd += $loans[$i]['loaned_in_usd'];
                $totalLoanedBtc += $loans[$i]['loaned_in_btc'];
            }
            // dd($loans[$i]['status']);

            $totalPaidUsd += $loans[$i]['loan_period']['amount_paid'];

            if (!empty($loans[$i]['loan_period']['next_period'])) {
                $loans[$i]['next_payment_date'] = $loans[$i]['loan_period']['next_period']['payment_date'];
                $loans[$i]['next_payment_amount'] = $loans[$i]['loan_period']['next_period']['amount_usd'];

                if (Carbon::parse($loans[$i]['next_payment_date'])->timestamp < Carbon::parse($data['next_payment_date'])->timestamp) {
                    $data['next_payment_date'] = $loans[$i]['next_payment_date'];
                    $data['next_payment_amount'] = $loans[$i]['next_payment_amount'];
                    $data['next_payment_id'] = $loans[$i]['id'];
                }
            }
        }
        $data['paid_total'] = $totalPaidUsd;
        $data['loaned_total']['usd'] = $this->formatAmount($totalLoanedUsd, Asset::PRECISION_FIAT, Asset::TYPE_FIAT);
        $data['loaned_total']['btc'] = $this->formatAmount($totalLoanedBtc, Asset::PRECISION_CRYPTO, Asset::TYPE_CRYPTO);
        $data['loaned_total']['usd_show'] = $this->formatAmount($totalLoanedUsdtoShow, Asset::PRECISION_FIAT, Asset::TYPE_FIAT);
        $data['loaned_total']['btc_show'] = $this->formatAmount($totalLoanedBtctoShow, Asset::PRECISION_CRYPTO, Asset::TYPE_CRYPTO);
        $data['total_value'] = $this->formatAmount($data['balance'] + $totalLoanedBtc, Asset::PRECISION_CRYPTO, Asset::TYPE_CRYPTO);
        $data['loans'] = $loans;
        $data['min_withdraw'] = $mainSettings->min_withdraw;

        return $data;
    }

    public function getAllQueues(int $paginate, ?string $status = null): array
    {
        $query = LoanQueue::with('user');

        if (!is_null($status)) {
            $query = $query->where('status', $status);
        }
        $query = $query->where('delete_queue', 0);

        return $query->paginate($paginate)->toArray();
    }

    public function approveQueue(int $queueId): void
    {
        $queue = LoanQueue::where('id', $queueId)->where('status', LoanQueue::STATUS_PENDING)->firstOrFail();
        $this->takeLoan($queue->user_id, $queue->loan_in_btc, $queue->loan_period_id, $queue->rate);
        $queue->update(['status' => LoanQueue::STATUS_APPROVED]);
    }

    public function rejectQueue(int $queueId, string $message): void
    {
        $queue = LoanQueue::where('id', $queueId)->where('status', LoanQueue::STATUS_PENDING)->firstOrFail();
        $queue->update(['status' => LoanQueue::STATUS_REJECTED, 'message' => $message]);
    }

    public function takeLoanIfNotQueued(int $userId, float $btc, int $loanPeriodId, ?float $usd = 0): array
    {

        $loanMainSettings = LoanMainSettings::first();
        $response  = ($loanMainSettings->loan_queued) ? $this->enterQueue($userId, $btc, $loanPeriodId) : $this->takeLoan($userId, $btc, $loanPeriodId,null,$usd);
        return $response;
    }

    public function enterQueue(int $userId, float $btc, int $loanPeriodId): array
    {
        $creditLimit = $this->getCreditLimit($userId);
        $price_data = $this->calcLoanPrice($loanPeriodId, Asset::USD, null, $btc);

        if ($price_data['value_usd'] < $price_data['min_loan_amount_usd']) {
            throw new \DomainException('min_loan_amount_is_' . $price_data['min_loan_amount_usd']);
        }

        if ($price_data['value_usd'] >= $creditLimit['loan_max_usd']) {
            throw new \DomainException('you_are_over_your_limit');
        }


        $queue = LoanQueue::create([
            'user_id' => $userId,
            'loan_period_id' => $loanPeriodId,
            'rate' => $price_data['btc_amount_rate'],
            'loaned_in_usd' => $price_data['value_usd'],
            'no_of_weeks' => $price_data['periods_period'],
            'loan_in_btc' => $price_data['value_btc'],
            'weekly_payment' => $price_data['amount_by_period'],
            'down_payment' => $price_data['down_payment_amount'],
            'status' => LoanQueue::STATUS_PENDING
        ]);
        $user = auth()->user();
        Mail::to($user->email)->queue(new LoanWait($user));
        return $queue->fresh()->toArray();
    }

    public function getQueues(int $userId): array
    {
        return LoanQueue::where('user_id', $userId)->orderBy('id', 'desc')->get()->toArray();
    }

    public function getLoanQueued(): array
    {
        $mainSettings = LoanMainSettings::first();
        $queued = ['loan_queued' => $mainSettings->loan_queued];
        return $queued;
    }

    public function takeLoan(int $userId, float $btc, int $loanPeriodId, ?float $rate = null, ?float $usd = 0): array
    {
        $creditLimit = $this->getCreditLimit($userId);
        if( $usd == 0){
            //echo "in 1";
            $price_data = $this->calcLoanPrice($loanPeriodId, Asset::USD, null, $btc, $rate);
        }else{
            //echo "in 2";
            $price_data = $this->calcLoanPrice($loanPeriodId, Asset::USD, $usd, null, $rate);
        }

        $userData = $this->getUserDashboard($userId);
        if(($userData['loaned_total']['usd']+$price_data['value_usd']) > $userData['credit_limit']['loan_max_usd']){
            // echo "in 1";
            throw new \DomainException('Maximum limit reached');
        }
        if (ceil($price_data['value_usd']) < $price_data['min_loan_amount_usd']) {
            // echo "in 2";
            throw new \DomainException('min_loan_amount_is_' . $price_data['min_loan_amount_usd']);
        }
        if ($price_data['value_usd'] > $creditLimit['loan_max_usd']) {
            //echo "in 3".$price_data['value_usd'] .">=". $creditLimit['loan_max_usd'];
            throw new \DomainException('you_are_over_your_limit');
        }

        DB::beginTransaction();
        try {
            $loan = Loan::create([
                'user_id' => $userId,
                'rate' => $price_data['btc_amount_rate'],
                'loaned_in_btc' => $price_data['value_btc'],
                'loaned_in_usd' => $price_data['value_usd'],
                'total_amount_usd' => $price_data['total_amount'],
                'fee' => $price_data['fee_rate'],
                'periods' => $price_data['periods_count'],
                'no_of_weeks' => $price_data['periods_period'],
                'weekly_payment' => $price_data['amount_by_period'],
                'down_payment' => $price_data['down_payment_amount'],
                'status' => Loan::STATUS_INITIALIZED
            ]);

            $paymentDate = Carbon::now();
            for ($i = 0; $i < $price_data['periods_count']; $i++) {

                $data = [
                    'loan_id' => $loan->id,
                    'amount_usd' => $price_data['amount_by_period'],
                    'payment_date' => $paymentDate->toDateTimeString(),
                    'status' => LoanPeriod::STATUS_OPENED,
                    'down_period' => $i === 0,
                    'fee_period_amount' => $price_data['fee_period_amount']
                ];
                if ($i === 0) {
                    $data['amount_usd'] = $price_data['down_payment_amount'];
                }
                $loan->loanPeriod()->create($data);
                if ($i === 0){
                    $paymentDate->addDays(30);
                }
                else
                {
                    $paymentDate->addDays(7);

                }

            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw new \DomainException($e->getMessage());
        }
        $user = auth()->user();
        Mail::to($user->email)->queue(new GetLoan($loan, $user));
        return $loan->fresh()->toArray();
    }

    public function getPeriodsPayInfo(int $userId, int $loanId): array
    {
        $loanPeriods = Loan::with('loanPeriod')->where('user_id', $userId)->where('id', $loanId)->firstOrFail()->loanPeriod->toArray();

        return $this->sortLoanPeriods($loanPeriods);
    }

    public function getPaymentSystems(): array
    {
        return PaymentSystem::with('asset')->get()->toArray();
    }

    public function makeLoanPayment(int $userId, int $loanId, string $paymentSystemCode, ?string $currency = null, $isFull = false, $isDown = false, ?array $payerData = null, ?string $message = null): array
    {
        // ini_set('display_errors', 1);
        // ini_set('display_startup_errors', 1);
        // error_reporting(E_ALL);

        if (is_null($currency)) {
            $currency = Asset::USD;
        }
        $paymentSystem = PaymentSystem::where('code', $paymentSystemCode)->firstOrFail();
        // $supportedAssets = $paymentSystem->asset()->pluck('code')->toArray();
        // if (!in_array($currency, $supportedAssets)) {
        if (!$paymentSystem) {
            throw new \DomainException('unsupported_asset_for_this_payment_system');
        }

        $rate = $this->getRate(Asset::BTC, Asset::USD);
        $asset = Asset::where('code', $currency)->firstOrFail();

        $loan = Loan::where('user_id', $userId)
            ->where('id', $loanId)
            ->active()
            ->firstOrFail();


        $loanPeriods = Loan::with('loanPeriod')
            ->where('user_id', $userId)
            ->where('id', $loanId)
            ->active()
            ->firstOrFail()
            ->loanPeriod;

        $sortLoanPeriods = $this->sortLoanPeriods($loanPeriods->toArray());
        // dd($sortLoanPeriods);

        if($isDown) {
            $availableSale = 0;
            $loan->rate = $rate;
            $loan->save();
            $pendingPaymentsAmount = Payment::where('loan_id', $loanId)->count();

            if ($pendingPaymentsAmount > 0) {
                throw new \DomainException('input_amount_is_higher_than_loan_left_amount');
            }
            $o_amount = 0;
            $o_payment = 0;
            foreach($loanPeriods->toArray() as $y=>$lp){
                $amount = $lp["amount_usd"];
                $sale = round($availableSale / 100 * $paymentSystem->sale, Asset::PRECISION_FIAT);
                $amountToPay = $amount - $sale;
                if($y == 0){
                    $o_amount = $amountToPay;
                }
                DB::beginTransaction();
                try {

                    $payment = Payment::create([
                        'user_message' => $message,
                        'loan_id' => $loanId,
                        'asset_id' => $asset->id,
                        'user_id' => $userId,
                        'amount_usd' => $amountToPay,
                        'fee_sale_usd' => $sale,
                        'payment_system_id' => $paymentSystem->id,
                        'created_at' =>  $lp["payment_date"],
                        'status' => Payment::STATUS_WAITING_ADMIN
                    ]);
                    if($y == 0){
                        $o_payment = $payment;
                    }

                    Db::commit();
                } catch (\Exception $e) {
                    DB::rollBack();
                    throw new \DomainException($e->getMessage());
                }
            }
            if($o_amount > 0){
                $paymentService = (new PaymentServiceResolver())->createService($paymentSystem->code);
                $response = $paymentService->makePayment($o_payment, $o_amount, $asset->code, $payerData);
                if ($response['payment']->status === Payment::STATUS_COMPLETED) {
                    $this->fillPeriods($payment->id);
                }
            }
            return $response;
        }else{

            $availableSale = 0;
            $paymentService = (new PaymentServiceResolver())->createService($paymentSystem->code);

            $payment = Payment::where('user_id', $userId)
            ->where('loan_id', $loanId)
            ->whereIn("status",['waiting_user','waiting_admin'])
            ->firstOrFail();

            if ($isFull){
                $amount = $sortLoanPeriods['amount_waiting_total'];
            }else{
                $amount = $payment->amount_usd;
            }

            $sale = round($availableSale / 100 * $paymentSystem->sale, Asset::PRECISION_FIAT);
            $amountToPay = $amount - $sale;

            $response = $paymentService->makePayment($payment, $amountToPay, $asset->code, $payerData);
            if ($response['payment']->status === Payment::STATUS_COMPLETED) {
                $this->fillPeriods($payment->id);
            }

            return $response;
        }
        //Bykaar
        // else if ($isFull) {
        //     $amount = $sortLoanPeriods['amount_waiting_total'];
        //     $availableSale = $sortLoanPeriods['amount_available_sale'];
        // } else {
        //     if (!empty($sortLoanPeriods['periods']['now'])) {
        //         $amount = $sortLoanPeriods['periods']['now'][0]['amount_usd'] - $sortLoanPeriods['periods']['now'][0]['amount_usd_paid'];
        //         $availableSale = $sortLoanPeriods['amount_available_sale'];
        //     } elseif (!empty($sortLoanPeriods['periods']['future'])) {
        //         $amount = $sortLoanPeriods['periods']['future'][0]['amount_usd'] - $sortLoanPeriods['periods']['future'][0]['amount_usd_paid'];
        //         $availableSale = $sortLoanPeriods['amount_available_sale'];
        //     } else {
        //         throw new \DomainException('no_current_period');
        //     }
        // }


        // dd($sale);

       // # Проверка что бы сумма не привышала суммы которую должны заплатить

    }

    public function cancelPayment(int $userId, int $paymentId): array
    {
        $payment = Payment::where('user_id', $userId)
            ->where('id', $paymentId)
            ->whereIn('status', [Payment::STATUS_WAITING_ADMIN, Payment::STATUS_WAITING_USER])
            ->firstOrFail();
        $payment->setCanceled();

        return $payment->toArray();
    }

    public function fillPeriods(int $paymentId): void
    {
        $payment = Payment::with('paymentSystem')->where('id', $paymentId)->firstOrFail();
        $loan = $payment->loan()->first();

        if ($payment->status !== Payment::STATUS_COMPLETED) {
            throw new \DomainException('payment_is_not_approved');
        }
        $paymentAmount = $payment->amount_usd + $payment->fee_sale_usd;
        foreach ($loan->loanPeriod as $loanPeriod) {

            if ($loanPeriod->status === LoanPeriod::STATUS_OPENED) {
                $paidUsd = $loanPeriod->amount_usd_paid;
                $amountToPay = $loanPeriod->amount_usd - $paidUsd;

                if (round($paymentAmount, 2) >= round($amountToPay, 2)) {
                    $paymentAmount = round($paymentAmount - $amountToPay, Asset::PRECISION_FIAT);
                    $loanPeriod->fills()->create(['payment_id' => $payment->id, 'amount_usd' => $amountToPay]);
                    $loanPeriod->acceptPayment($amountToPay)->setPaid();

                    if ($loanPeriod->down_period) {
                        $loan->setActive();
                    }
                } elseif ($paymentAmount > 0 && $paymentAmount < $amountToPay) {
                    $loanPeriod->fills()->create(['payment_id' => $payment->id, 'amount_usd' => $paymentAmount]);
                    $loanPeriod->acceptPayment($paymentAmount);
                    break;
                }
            }
        }

        // $this->finishLoanIfPaid($loan->id);
        $this->toBeWithDrawals($loan->id);
    }

    public function getLoanDetails(int $userId, int $loanId)
    {
        $data['loan'] = Loan::with('loanPeriod')->where('user_id', $userId)
            ->where('id', $loanId)
            ->firstOrFail()
            ->toArray();

        $loansPeriods = $this->sortLoanPeriods($data['loan']['loan_period']);

        $data['remaining_pay'] = $loansPeriods['amount_waiting_total'];
        $data['payed_period'] = count($loansPeriods['periods']['old']);
        $data['weekly_payment'] = $data['loan']['weekly_payment'];

        if ($loansPeriods['next_period']) {
            $data['next_payment'] = $loansPeriods['next_period']['amount_usd'] - $loansPeriods['next_period']['amount_usd_paid'];
        } else {
            $data['next_payment'] = 0;
        }
        $total_paid = 0;
        foreach ($data['loan']['loan_period'] as $key=>$period) {
            $data['loan']['loan_period'][$key]['o_status'] = $period['status'];
            $total_paid += $period['status'] == 'paid' ? $period['amount_usd'] : 0;
        }
        $data['paid_amount'] = $total_paid;
        $data['is_deffered'] = LoanPeriod::where('loan_id',$loanId)->where('status',LoanPeriod::STATUS_DEFFERED)->count();
        return $data;
    }

    public function getLoanPaymentsDetails(int $userId, int $perPage)
    {
        return Payment::where('user_id', $userId)->paginate($perPage);
    }

    // private function finishLoanIfPaid(int $loan_id): bool
    // {
    //     $loan = Loan::with('loanPeriod')->where('id', $loan_id)->firstOrFail();

    //     if ($loan->status === Loan::STATUS_EXPIRED) {
    //         throw new \DomainException('loan_is_expired');
    //     }

    //     if ($loan->status === Loan::STATUS_FINISHED) {
    //         throw new \DomainException('loan_is_finished');
    //     }

    //     $response = false;

    //     if ($loan->loanPeriod()->where('status', LoanPeriod::STATUS_PAID)->count() === $loan->periods) {
    //         $loan->setFinished();
    //         $wallet = Wallet::where('user_id', $loan->user_id)->first();
    //         $wallet->acceptDeposit($loan->loaned_in_btc);
    //         $response = true;

    //         $account = Account::where('id', $loan->user_id)->first();

    //         if (!empty($account) && !is_null($account->parent_id)) {
    //             $referralGroup = $account->parentUser()->first()->referralGroup()->first();
    //             if (!empty($referralGroup)) {
    //                 $referralRate = $referralGroup->rate;
    //             } else {
    //                 $referralRate = LoanMainSettings::first()->referral_rate;
    //             }

    //             $referralAmount = $loan->loaned_in_btc / 100 * $referralRate;


    //             $firstLoan = Loan::where('user_id', $loan->user_id)->orderBy('id', 'asc')->first();

    //             if ($firstLoan->id === $loan->id) {
    //                 ReferralPayment::create([
    //                     'user_id' => $account->parent_id,
    //                     'referral_user_id' => $account->id,
    //                     'loan_id' => $loan->id,
    //                     'amount_btc' => $referralAmount,
    //                     'referral_rate' => $referralRate,
    //                 ]);

    //                 $referralWallet = Wallet::where('user_id', $account->parent_id)->first();
    //                 $referralWallet->acceptDeposit($referralAmount);
    //             }
    //         }
    //     }

    //     return $response;
    // }

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
    public function getNonDeletedAllQueues(int $paginate): array
    {
        $query = LoanQueue::with('user');
        $query = $query->where('delete_queue', 0);
        return $query->paginate($paginate)->toArray();
    }

    public function deferLoanPayment(int $loanId)
    {
        $deffered_loan_check = Loan::whereHas('loanPeriod',function($query) {
            $query->where('status', LoanPeriod::STATUS_DEFFERED);
        })->where('id', $loanId)->count();

        $loan = Loan::with('loanPeriod')->where('id', $loanId)
            ->first();

        $number_of_loans = count($loan->loanPeriod);
        if($deffered_loan_check > $number_of_loans-1){
            return [];
        }

        $last_loan_period = LoanPeriod::where('loan_id', $loanId)->where('status',LoanPeriod::STATUS_OPENED)->orderBy('payment_date','desc')->first();
        //Payment Update
        // $payments_ = Payment::where('loan_id', $loanId)->whereIn('status', [Payment::STATUS_WAITING_ADMIN, Payment::STATUS_WAITING_USER])->orderBy('created_at','ASC')->first();
        // $payments_->created_at = $last_loan_period->payment_date;
        // $payments_->save();
        //payment update end
        $lastest_loan_period = LoanPeriod::where('loan_id', $loanId)->where('status',LoanPeriod::STATUS_OPENED)->orderBy('payment_date','asc')->first();
        $lastest_loan_period->status = LoanPeriod::STATUS_DEFFERED;
        $lastest_loan_period->save();
        //Commented by umair
        LoanPeriod::create([
                'loan_id'=> $lastest_loan_period->loan_id,
                'amount_usd'=> $lastest_loan_period->amount_usd,
                'amount_usd_paid'=> $lastest_loan_period->amount_usd_paid,
                'fee_period_amount'=> $lastest_loan_period->fee_period_amount,
                'down_period'=> $lastest_loan_period->down_period,
                // 'payment_date'=> $payment_date,
                'payment_date'=> $last_loan_period->payment_date,
                'status'=> LoanPeriod::STATUS_OPENED
        ]);

        // $i = 0;
        // foreach($loan->loanPeriod as $ind => $loanPeriod)
        // {
        //     if($loanPeriod->status == LoanPeriod::STATUS_OPENED)
        //     {
        //         if($i == 0)
        //         {
        //             $payment_date = $loanPeriod->payment_date;
        //             LoanPeriod::create([
        //                     'loan_id'=> $loanPeriod->loan_id,
        //                     'amount_usd'=> $loanPeriod->amount_usd,
        //                     'amount_usd_paid'=> $loanPeriod->amount_usd_paid,
        //                     'fee_period_amount'=> $loanPeriod->fee_period_amount,
        //                     'down_period'=> $loanPeriod->down_period,
        //                     // 'payment_date'=> $payment_date,
        //                     'payment_date'=> $last_loan_period->payment_date,
        //                     'status'=> LoanPeriod::STATUS_OPENED
        //                 ]);
        //         }
        //         // $i = 1;
        //         // $old_date = $loanPeriod->payment_date;
        //         // $new_date = Carbon::parse($old_date)->addDays(7);
        //         // $loanPeriod->payment_date = $new_date;
        //         // $loanPeriod->save();
        //     }
        // }
        return $this->getUserDashboard($loan->user_id);
        // $data = [
        //     'loans' => [],
        //     'total_value' => 0,
        //     'balance' => (new WalletService())->getWallet($loan->user_id)['balance'],
        //     'paid_total' => 0,
        //     'credit_limit' => $this->getCreditLimit(),
        //     'loaned_total' => [
        //         'btc' => 0,
        //         'usd' => 0,
        //     ],
        //     'next_payment_id' => null,
        //     'next_payment_date' => null,
        //     'next_payment_amount' => 0
        // ];
        // $loans = $this->getUserLoans($loan->user_id, Loan::STATUS_ACTIVE);
        // $mainSettings = LoanMainSettings::first();
        // $totalLoanedUsd = 0;
        // $totalLoanedBtc = 0;
        // $totalPaidUsd = 0;
        // $loansCnt = count($loans);

        // for ($i = 0; $i < $loansCnt; $i++) {
        //     if($loans[$i]['status'] != LoanPeriod::STATUS_DEFFERED)
        //     {
        //         $loans[$i]['loaned_in_btc'] = $this->formatAmount($loans[$i]['loaned_in_btc'], Asset::PRECISION_CRYPTO, Asset::TYPE_CRYPTO);
        //         $loans[$i]['loan_period'] = $this->sortLoanPeriods($loans[$i]['loan_period']);
        //         $totalLoanedUsd += $loans[$i]['loaned_in_usd'];
        //         $totalLoanedBtc += $loans[$i]['loaned_in_btc'];
        //         $totalPaidUsd += $loans[$i]['loan_period']['amount_paid'];

        //         if (!empty($loans[$i]['loan_period']['next_period'])) {
        //             $loans[$i]['next_payment_date'] = $loans[$i]['loan_period']['next_period']['payment_date'];
        //             $loans[$i]['next_payment_amount'] = $loans[$i]['loan_period']['next_period']['amount_usd'];

        //             if (Carbon::parse($loans[$i]['next_payment_date'])->timestamp < Carbon::parse($data['next_payment_date'])->timestamp) {
        //                 $data['next_payment_date'] = $loans[$i]['next_payment_date'];
        //                 $data['next_payment_amount'] = $loans[$i]['next_payment_amount'];
        //                 $data['next_payment_id'] = $loans[$i]['id'];
        //             }
        //         }
        //     }
        // }
        // $data['paid_total'] = $totalPaidUsd;
        // $data['loaned_total']['usd'] = $this->formatAmount($totalLoanedUsd, Asset::PRECISION_FIAT, Asset::TYPE_FIAT);
        // $data['loaned_total']['btc'] = $this->formatAmount($totalLoanedBtc, Asset::PRECISION_CRYPTO, Asset::TYPE_CRYPTO);
        // $data['total_value'] = $this->formatAmount($data['balance'] + $totalLoanedBtc, Asset::PRECISION_CRYPTO, Asset::TYPE_CRYPTO);
        // $data['loans'] = $loans;
        // $data['min_withdraw'] = $mainSettings->min_withdraw;

        // return $data;
    }
    public function updateLoadPeriod($loan_id, $amount_usd)
    {
        return LoanPeriod::where('loan_id', $loan_id)
        ->where('status', LoanPeriod::STATUS_OPENED)
        ->where('amount_usd_paid', $amount_usd)
        ->update(['status' => LoanPeriod::STATUS_PAID]);
    }
    public function marksAsCompleted($loan_id) {

        return Loan::where('id', $loan_id)->update(['status' => Loan::STATUS_FINISHED]);
    }
    private function toBeWithDrawals(int $loan_id): bool
    {
        $loan = Loan::with('loanPeriod')->where('id', $loan_id)->firstOrFail();

        if ($loan->status === Loan::STATUS_EXPIRED) {
            throw new \DomainException('loan_is_expired');
        }

        if ($loan->status === Loan::STATUS_FINISHED) {
            throw new \DomainException('loan_is_finished');
        }

        $response = false;

        if ($loan->loanPeriod()->where('status', LoanPeriod::STATUS_PAID)->count() === $loan->periods) {
            $loan->setWithDrawals();
            $wallet = Wallet::where('user_id', $loan->user_id)->first();
            $wallet->acceptDeposit($loan->loaned_in_btc);
            $response = true;

            $account = Account::where('id', $loan->user_id)->first();

            if (!empty($account) && !is_null($account->parent_id)) {
                $referralGroup = $account->parentUser()->first()->referralGroup()->first();
                if (!empty($referralGroup)) {
                    $referralRate = $referralGroup->rate;
                } else {
                    $referralRate = LoanMainSettings::first()->referral_rate;
                }

                $referralAmount = $loan->loaned_in_btc / 100 * $referralRate;


                $firstLoan = Loan::where('user_id', $loan->user_id)->orderBy('id', 'asc')->first();

                if ($firstLoan->id === $loan->id) {
                    ReferralPayment::create([
                        'user_id' => $account->parent_id,
                        'referral_user_id' => $account->id,
                        'loan_id' => $loan->id,
                        'amount_btc' => $referralAmount,
                        'referral_rate' => $referralRate,
                    ]);

                    $referralWallet = Wallet::where('user_id', $account->parent_id)->first();
                    $referralWallet->acceptDeposit($referralAmount);
                }
            }
        }

        return $response;
    }
    public function deleteLoanPayment(int $loanId){
        $loan = Loan::where('id', $loanId)->first();
        $deleteLoan = Loan::where('id','=',$loanId)->delete();
        return $this->getUserDashboard($loan->user_id);
    }
}
