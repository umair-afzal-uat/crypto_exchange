<?php

namespace App\Http\Controllers\Admin\Management;

use App\Enums\BaseAppEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Management\Loans\ApprovePaymentRequest;
use App\Http\Requests\Admin\Management\Loans\ChangePaymentRequest;
use App\Http\Requests\Admin\Management\Loans\RejectPaymentRequest;
use App\Http\Requests\Admin\Management\Transactions\IndexRequest;
use App\Services\Admin\PaymentsManageService;
use App\Mail\User\approvePayment;
use App\Mail\User\rejectPayment;
use Mail;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
class TransactionsController extends Controller
{

    private PaymentsManageService $service;

    public function __construct()
    {
        $this->service = resolve(PaymentsManageService::class);
    }

    public function index(IndexRequest $request)
    {
        $data         = $request->validated();
        $paginate     = $data['paginate'] ?? BaseAppEnum::DEFAULT_PAGINATION;
        $transactions = $this->service->index($paginate, $request->search_field, $request->search_value);
        return response(compact('transactions'), Response::HTTP_OK);
    }

    public function approvePayment(ApprovePaymentRequest $request)
    {
        $this->service->approvePayment($request->payment_id);
    }

    public function rejectPayment(RejectPaymentRequest $request)
    {
        $this->service->rejectPayment($request->payment_id, $request->comment);
    }
    public function missedPayment(IndexRequest $request)
    {

        $data         = $request->validated();
        $paginate     = $data['paginate'] ?? BaseAppEnum::DEFAULT_PAGINATION;
        $missed_payments = $this->service->missedPayments($paginate);
        return response(compact('missed_payments'), Response::HTTP_OK);
    }
    public function missedLoansPayment($id)
    {
        $loan_payment_missed = $this->service->missedLoanPayments($id);
        return response(compact('loan_payment_missed'), Response::HTTP_OK);
    }

   public function paymentDetails($user_id, IndexRequest $request)
   {
        $paginate     = $request['paginate'] ?? BaseAppEnum::DEFAULT_PAGINATION;
        $payment_details = $this->service->paymentDetails($user_id, $paginate);
        return response(compact('payment_details'), Response::HTTP_OK);
       // return response($this->service->paymentDetails($user_id, ""));
   }
   public function changePaymentStatus(Request $request) {
        $this->service->changePaymentStatus($request->payment_id, $request->status);
   }
}
