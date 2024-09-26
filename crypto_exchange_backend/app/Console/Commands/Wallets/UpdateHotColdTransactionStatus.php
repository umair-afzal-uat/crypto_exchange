<?php

namespace App\Console\Commands\Wallets;

use App\Models\Wallets\HotColdTransaction;
use App\Services\Payments\Bitcoin\BitcoinService;
use App\Traits\SaveCronError;
use Illuminate\Console\Command;

class UpdateHotColdTransactionStatus extends Command
{
    use SaveCronError;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'hotColdTransactionStatus:update';

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
        $transactions = HotColdTransaction::pending()->get();

        foreach ($transactions as $transaction) {
            try {
               // $blockchainService = $this->serviceResolver->createService($transaction->asset_id);
                $this->serviceResolver->updateHotColdTransactionStatus($transaction);
            } catch (\Throwable $e) {
                $this->saveError(__CLASS__, $e, $transaction->asset_id);
            }
        }
    }
}
