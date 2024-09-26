<?php

namespace App\Services\Admin;

use App\Exceptions\Application\ApplicationException;
use App\Exceptions\ErrorMessages;
use App\Mail\User\cancelRequest;
use App\Mail\User\approveRequest;
use Mail;
use App\Exceptions\Http\AccessDenyException;
use App\Exceptions\Http\BadRequestException;
use App\Models\Admin;
use App\Models\User;
use App\Models\Loan;
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

class WithdrawalService extends WithdrawalRepository
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
        return $this->newQuery()->with(['wallet', 'user'])->orderBy('id', 'desc')->paginate($pagination);
    }

    public function acceptWithdrawal(int $withdrawalId)
    {
        $withdrawal = $this->findOrFail($withdrawalId);




        if ($withdrawal->status != WithdrawalRequest::STATUS_PENDING) {
            throw new BadRequestException(ErrorMessages::WITHDRAWAL_ALREADY_PROCESSED, Response::HTTP_OK);
        }
        $user = User::find($withdrawal->user_id);
        Mail::to($user->email)->queue(new approveRequest($withdrawal,$user));
        Loan::where('status', Loan::STATUS_WITH_DRAWALS)->where('user_id', $withdrawal->user_id)->update(['status' => Loan::STATUS_FINISHED]);
        $withdrawal->update(['status' => WithdrawalRequest::STATUS_PROCESSED]);

        return $withdrawal->fresh();
    }

    public function editWithdrawal(int $withdrawalId, array $data = []): void
    {
        $withdrawal = $this->findOrFail($withdrawalId);
        $withdrawal->update($data);
    }


    public function acceptWithdrawalFromHotWallet(int $withdrawalId)
    {
        $hotAddress = $this->bitcoinService->getHotWalletAddress();
        $balance = $this->bitcoinService->getWalletBalance($hotAddress);
        $withdrawal = $this->findOrFail($withdrawalId);

        if ($withdrawal->status != WithdrawalRequest::STATUS_PENDING) {
            throw new BadRequestException(ErrorMessages::WITHDRAWAL_ALREADY_PROCESSED, Response::HTTP_OK);
        }

        if ($balance < $withdrawal->amount) {
            throw new ApplicationException(ErrorMessages::WITHDRAWAL_ERROR, Response::HTTP_NOT_ACCEPTABLE);
        }

        $txHash = $this->bitcoinService->createTransaction(null, $withdrawal['address'], $withdrawal['amount']);

        $withdrawal->update(['tx_hash' => $txHash, 'status' => WithdrawalRequest::STATUS_IN_PROGRESS]);
        return $withdrawal->fresh();
    }

    public function rejectWithdrawal(int $withdrawalId, string $comment)
    {
        $withdrawal = $this->findOrFail($withdrawalId);
        if ($withdrawal->status !== WithdrawalRequest::STATUS_PENDING) {
            throw new AccessDenyException(ErrorMessages::UNABLE_TO_REJECT_WITHDRAWAL);
        }
        $wallet = $withdrawal->wallet;
        $user = User::find($wallet->user_id);
        Mail::to($user->email)->queue(new cancelRequest($user));
        return \DB::transaction(function () use ($withdrawal, $wallet, $comment) {
            $withdrawal->update(['status' => WithdrawalRequest::STATUS_REJECTED, 'comment' => $comment]);
            return $wallet->update(
                [
                    'frozen_balance' => $wallet->frozen_balance - $withdrawal->amount,
                    'balance' => $wallet->balance + $withdrawal->amount,
                ]
            );
        }, 3);
    }

    public function staffNameUpdate($data, $id)
    {

        $withdrawal = WithdrawalRequest::where('id', $id)->first();
        $withdrawal->staff_name = $data;
        $withdrawal->save();
    }



}
