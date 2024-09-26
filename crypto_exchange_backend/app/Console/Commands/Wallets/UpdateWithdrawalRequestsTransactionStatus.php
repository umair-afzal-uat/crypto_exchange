<?php

namespace App\Console\Commands\Wallets;

use App\Models\WithdrawalRequest;
use App\Services\Payments\Bitcoin\BitcoinService;
use App\Traits\SaveCronError;
use Illuminate\Console\Command;

class UpdateWithdrawalRequestsTransactionStatus extends Command
{
    use SaveCronError;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'withdrawalRequestStatus:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';
    protected $serviceResolver;

    /**
     * @param BitcoinService $serviceResolver
     */
    public function __construct(BitcoinService $serviceResolver)
    {
        parent::__construct();
        $this->serviceResolver = $serviceResolver;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $withdrawalRequests = WithdrawalRequest::where('status', '=', WithdrawalRequest::STATUS_IN_PROGRESS)->get();


        foreach ($withdrawalRequests as $withdrawal) {
            try {
                $this->serviceResolver->updateWithdrawalStatus($withdrawal);
            } catch (\Throwable $e) {
                $this->saveError(__CLASS__, $e, $withdrawal->asset_id);
            }
        }
    }
}
