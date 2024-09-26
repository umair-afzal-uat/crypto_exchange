<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\CalcLoanPriceRequest;
use App\Http\Requests\MakeLoanPaymentRequest;
use App\Http\Requests\TakeLoanRequest;
use App\Services\AssetService;
use App\Services\LoanService;
use App\Services\Payments\Plisio\PlisioService;
use Auth;
use Illuminate\Http\Request;
use Log;

class PaymentsCallbackController extends Controller
{
    private $plisioService;
    private $assetService;

    public function __construct(PlisioService $plisioService)
    {
        $this->plisioService = $plisioService;
    }

    public function plisioCallbackListen(Request $request)
    {
        $data = $request->all();
        $this->plisioService->callbackListen($data);

        return response()->noContent();
    }
}
