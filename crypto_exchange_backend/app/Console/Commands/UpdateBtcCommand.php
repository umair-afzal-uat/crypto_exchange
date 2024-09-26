<?php

namespace App\Console\Commands;
use DB;
use App\Models\Loan;
//use App\Models\LoanPeriod;
//use Carbon\Carbon;
use App\Traits\FormatsAmount;
use Illuminate\Console\Command;
use App\Services\LoanService;
use App\Models\Asset;

class ExpireLoansCommand extends Command
{
    use FormatsAmount;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:btc';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'update btc value';

    protected $loanService;
    /**
     * Create a new command instance.
     */
    public function __construct(LoanService $loanService)
    {
        parent::__construct();
        $this->loanService = $loanService;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {

        $loan = DB::select('SELECT * FROM `loans` where status = "initialized"');
        $rate =  $this->loanService->getRate(Asset::BTC, 'usd');
        foreach($loan as $l){
            $amount = $l->loaned_in_usd;
            $btc = $amount * (1 / $rate);
            $btc = $this->formatAmount($btc, Asset::PRECISION_CRYPTO, Asset::TYPE_CRYPTO);
            Loan::where('id', $l->id)->update(['loaned_in_btc' =>$btc]);
        }
    }


}
