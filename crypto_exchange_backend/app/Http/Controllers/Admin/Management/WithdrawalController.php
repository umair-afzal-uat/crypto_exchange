<?php

namespace App\Http\Controllers\Admin\Management;

use App\Enums\BaseAppEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Management\Withdrawals\AcceptRequest;
use App\Http\Requests\Admin\Management\Withdrawals\EditRequest;
use App\Http\Requests\Admin\Management\Withdrawals\IndexRequest;
use App\Http\Requests\Admin\Management\Withdrawals\RejectRequest;
use App\Http\Requests\Admin\Management\Withdrawals\StaffNameRequest;
use App\Services\Admin\WithdrawalService;
use Illuminate\Http\Response;

class WithdrawalController extends Controller
{

    private WithdrawalService $service;

    public function __construct()
    {
        $this->service = resolve(WithdrawalService::class);
    }


    public function index(IndexRequest $request): Response
    {
        $data = $request->validated();
        $paginate = $data['paginate'] ?? BaseAppEnum::DEFAULT_PAGINATION;
        $requests = $this->service->index($paginate);

        return response(compact('requests'), Response::HTTP_OK);
    }

    public function edit(EditRequest $request, $id)
    {
        $this->service->editWithdrawal($id, $request->validated());

        return response()->noContent();
    }

    public function accept(int $id): Response
    {
        $withdrawal = $this->service->acceptWithdrawal($id);

        return response(compact('withdrawal'), Response::HTTP_OK);
    }

    public function reject(RejectRequest $request, $id): Response
    {
        $message = $request->validated()['message'];
        $this->service->rejectWithdrawal($id, $message);

        return response()->noContent();
    }

    public function staffNameEdit(StaffNameRequest $request): Response
    {

        $data = $request->validated()['staff_name'];

        $this->service->staffNameUpdate($data, $request->id);

        return response()->noContent();
    }


}
