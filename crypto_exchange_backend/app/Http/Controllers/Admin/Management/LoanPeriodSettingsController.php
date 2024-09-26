<?php

namespace App\Http\Controllers\Admin\Management;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Management\FeeSettings\UpdateRequest;
use App\Services\Base\BaseAppGuards;
use App\Services\LoanPeriodSettingsService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class LoanPeriodSettingsController extends Controller
{
    private LoanPeriodSettingsService $service;

    public function __construct()
    {
        $this->service = resolve(LoanPeriodSettingsService::class);
        $this->middleware('auth:' . BaseAppGuards::ADMIN);
    }

    public function index(): Response
    {
        $settings = ['down_payment' => $this->service->getDownPayment(), 'periods' => $this->service->all(), ];

        return response(compact('settings'), Response::HTTP_OK);
    }

    public function update(UpdateRequest $request, $id): Response
    {
        $settings = $this->service->updatePeriod($request->validated(), $id);

        return response(compact('settings'), Response::HTTP_OK);
    }
}
