<?php

namespace App\Http\Controllers\Admin\Management;

use App\Enums\BaseAppEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Management\Referrals\EditGroupRateRequest;
use App\Http\Requests\Admin\Management\Referrals\EditMainRateRequest;
use App\Http\Requests\Admin\Management\Referrals\GetAllReferralPaymentsRequest;
use App\Http\Requests\Admin\Management\Referrals\ManageUserReferralGroupRequest;
use App\Services\ReferralService;
use Illuminate\Http\Request;
class ReferralController extends Controller
{
    private ReferralService $service;

    public function __construct()
    {
        $this->service = resolve(ReferralService::class);
    }

    public function getAllReferralPayments(GetAllReferralPaymentsRequest $request)
    {
        $data = $request->validated();
        $paginate = $data['paginate'] ?? BaseAppEnum::DEFAULT_PAGINATION;
        return response($this->service->getAllReferralPayments($paginate));
    }

    public function getReferralMain()
    {
        return response($this->service->getReferralMain());
    }

    public function getReferralGroup()
    {
        return response($this->service->getReferralGroup());
    }

    public function manageUserReferralGroup(ManageUserReferralGroupRequest $request)
    {
        return response($this->service->manageUserReferralGroup($request->user_id, $request->group_id));
    }

    public function editGroupRate(EditGroupRateRequest $request)
    {
        $this->service->editGroupRate($request->group_id, $request->rate);

        return response()->noContent();
    }

    public function editMainRate(EditMainRateRequest $request)
    {
        $this->service->editMainRate($request->rate);

        return response()->noContent();
    }
    public function updateStatus(Request $request)
    {
        $this->service->updatePayoutStatus($request);
    }
}
