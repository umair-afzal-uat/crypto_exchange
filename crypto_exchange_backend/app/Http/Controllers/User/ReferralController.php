<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\ReferralService;
use Auth;

class ReferralController extends Controller
{
    private $referralService;

    public function __construct(ReferralService $referralService)
    {
        $this->referralService = $referralService;
    }

    public function getReferralPayments()
    {
        return response($this->referralService->getReferralPayments(Auth::id()));
    }
}
