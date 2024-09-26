<?php

namespace App\Http\Controllers\Admin\Management;

use App\Enums\BaseAppEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Management\Loans\GetAllQueues;
use App\Http\Requests\Admin\Management\Loans\IndexRequest;
use App\Http\Requests\Admin\Management\Loans\RejectQueueRequest;
use App\Http\Requests\Admin\Management\Loans\UpdateLoansMainSettingsRequest;
use App\Services\LoanService;
use App\Services\ReferralService;
use Illuminate\Http\Response;
use App\Jobs\SendEmail;
use Mail;
use App\Mail\User\AdminWaitList;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Request as FacadesRequest;

class LoansController extends Controller
{
    private LoanService $service;
    private ReferralService $referralService;

    public function __construct()
    {
        $this->service = resolve(LoanService::class);
        $this->referralService = resolve(ReferralService::class);
    }

    public function index(IndexRequest $request): Response
    {
        $data     = $request->validated();
        $paginate = $data['paginate'] ?? BaseAppEnum::DEFAULT_PAGINATION;
        $status   = $data['status'] ?? null;
        $loans    = $this->service->index($status, $paginate);

        return response(compact('loans'), Response::HTTP_OK);
    }

    public function updateLoansMainSettings(UpdateLoansMainSettingsRequest $request): Response
    {
        $data = $request->validated();
        $this->service->updateLoanMainSettings($data);

        return \response()->noContent();
    }

    public function getAllQueues(GetAllQueues $request)
    {
        $data     = $request->validated();
        $paginate = $data['paginate'] ?? BaseAppEnum::DEFAULT_PAGINATION;
        $status   = $data['status'] ?? null;

        return response($this->service->getAllQueues($paginate, $status));
    }

    public function approveQueue(int $queueId)
    {
        $this->service->approveQueue($queueId);

        return response()->noContent();
    }

    public function rejectQueue(RejectQueueRequest $request, int $queueId)
    {
        $this->service->rejectQueue($queueId, $request->message);

        return response()->noContent();
    }

    public function getLoanQueued()
    {
        return response($this->service->getLoanQueued());
    }

    public function getUserLoans($id, $type = null, Request $request ): Response
    {
        $data = $request->all();
        $paginate = $data['paginate'] ?? BaseAppEnum::DEFAULT_PAGINATION;
        $user_loans  = $this->service->getUserLoans($id, $type, $paginate);

        return response(compact('user_loans'), Response::HTTP_OK);
    }
    public function massEmail(Request $request) {
        // dd($user_id);
        $mail_data = [
            'subject' => 'WaitList Email',
            'user_ids' => $request->all()
        ];
        SendEmail::dispatch($mail_data);
        $paginate = $request['paginate'] ?? BaseAppEnum::DEFAULT_PAGINATION;
        $status   = $request['status'] ?? null;
        if(empty($this->mail_data['user_ids'])) {

            \DB::table('loan_queue')->update(['email_sent' => 1]);
        } else {
             \DB::table('loan_queue')->whereIn('user_id', $this->mail_data['user_ids'])->update(['email_sent' => 1]);
        }
        // $user_ids=$request->all();
        // $user = User::find($user_ids['user_ids'][0]);
        // Mail::to($user->email)->queue(new AdminWaitlist());
        return response($this->service->getAllQueues($paginate, $status));
    }
    public function deleteQueueEmail(Request $request) {
        // dd($request['loan_queue_id']);
        $paginate = $request['paginate'] ?? BaseAppEnum::DEFAULT_PAGINATION;

        if(isset($request['loan_queue_id'])) {

            \DB::table('loan_queue')->whereIn('id',$request['loan_queue_id'])->update(['delete_queue' => 1]);
        } else {

            \DB::table('loan_queue')->where('id', '=', $request['loan_id'])->update(['delete_queue' => 1]);
        }

        return response($this->service->getNonDeletedAllQueues($paginate));
    }
    public function marksAsCompleted(Request $request) {

        $data = $request->all();

        $this->service->marksAsCompleted($data['loan_id']);

    }
}

