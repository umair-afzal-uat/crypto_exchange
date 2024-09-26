<?php

namespace App\Services\Admin;

use App\Exceptions\Application\ApplicationException;
use App\Exceptions\ErrorMessages;
use App\Exceptions\Http\AccessDenyException;
use App\Exceptions\Http\BadRequestException;
use App\Models\Admin;
use App\Models\LoanMainSettings;
use App\Models\WithdrawalRequest;
use App\Repositories\Loans\WithdrawalRepository;
use App\Repositories\Payments\PaymentRepository;
use App\Services\Base\BaseAppGuards;
use App\Services\Payments\Bitcoin\BitcoinService;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Response;
use Illuminate\Support\Collection;

class HotWalletService extends WithdrawalRepository
{
    private ?Admin $admin;

    private BitcoinService $bitcoinService;

    public function __construct(Application $app, Collection $collection = null)
    {
        $this->bitcoinService = resolve(BitcoinService::class);
        $this->loginAdmin = auth()->guard(BaseAppGuards::ADMIN)->user();
        parent::__construct($app, $collection);
    }

    public function index(int $pagination)
    {
        return $this->newQuery()->with('wallet')->orderBy('id', 'desc')->paginate($pagination);
    }

    public function getHotWallet(): array
    {
        $address = $this->bitcoinService->getHotWalletAddress();
        // dd($address);
        $settings = LoanMainSettings::first();

        return [
            'address' => $address,
            'balance' => $this->bitcoinService->getWalletBalance($address),
            'min_withdraw' => $settings->min_withdraw,
        ];
    }


    public function updateWithdrawalLimits(float $min)
    {
        if ($min <= 0) {
            throw new BadRequestException(ErrorMessages::MIN_CANT_BE_LESS_THEN_ZERO);
        }

         $settings = LoanMainSettings::first();

        return $settings->update(['min_withdraw' => round($min, 6)]);
    }

}
