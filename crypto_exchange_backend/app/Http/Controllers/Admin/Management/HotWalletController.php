<?php

namespace App\Http\Controllers\Admin\Management;

use App\Enums\BaseAppEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Management\HotWallet\UpdateWithdrawalLimitsRequest;
use App\Http\Requests\Admin\Management\HotWallet\IndexRequest;
use App\Models\Wallets\HotColdTransaction;
use App\Services\Admin\HotWalletService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class HotWalletController extends Controller
{

    private HotWalletService $service;

    public function __construct()
    {
        $this->service = resolve(HotWalletService::class);
    }

    public function index(IndexRequest $request): Response
    {
        $request = $request->validated();
        $paginate = $request['paginate'] ?? BaseAppEnum::DEFAULT_PAGINATION;
        // dd($this->service->getHotWallet());
        $data = [
            'wallet' => $this->service->getHotWallet(),
            'transactions' => HotColdTransaction::orderBy('id', 'desc')->paginate($paginate)
        ];

        return response(compact('data'), Response::HTTP_OK);
    }

    public function updateWithdrawLimits(UpdateWithdrawalLimitsRequest $request)
    {
        $data = $request->validated();
        $this->service->updateWithdrawalLimits($data['min_withdraw']);
        $wallet = $this->service->getHotWallet();

        return response(compact('wallet'), Response::HTTP_OK);
    }
}
