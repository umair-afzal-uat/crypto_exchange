<?php

namespace App\Console\Commands;

use App\Models\Loan;
use App\Models\LoanPeriod;
use Carbon\Carbon;
use Illuminate\Console\Command;

class ExpireLoansCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'expire:loans';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'delete old change mail confirmations';


    /**
     * Create a new command instance.
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        #удаляем с неоплаченым даунпейментом
        $loanIds = LoanPeriod::where('payment_date', '<', Carbon::now()->subHours(2))
//        $loanIds = LoanPeriod::where('payment_date', '<', Carbon::now()->subMinutes(1))
            ->where('status', LoanPeriod::STATUS_OPENED)
            ->where('down_period', true)
            ->pluck('loan_id')
            ->toArray();

        if (!empty($loanIds)) {
            LoanPeriod::whereIn('loan_id', $loanIds)->where('status', LoanPeriod::STATUS_OPENED)->update(['status' => LoanPeriod::STATUS_EXPIRED]);
            Loan::whereIn('id', $loanIds)->update(['status' => Loan::STATUS_EXPIRED]);
        }

        $loanIds = LoanPeriod::where('payment_date', '<', Carbon::now()->subWeeks(2))
//        $loanIds = LoanPeriod::where('payment_date', '<', Carbon::now()->subMinutes(2))
            ->where('status', LoanPeriod::STATUS_OPENED)
            ->pluck('loan_id')
            ->toArray();

        if (!empty($loanIds)) {
            LoanPeriod::whereIn('loan_id', $loanIds)->where('status', LoanPeriod::STATUS_OPENED)->update(['status' => LoanPeriod::STATUS_EXPIRED]);
            Loan::whereIn('id', $loanIds)->update(['status' => Loan::STATUS_EXPIRED]);
        }
    }
}
