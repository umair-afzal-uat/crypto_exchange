<?php

namespace App\Console\Commands;

use App\Models\EmailConfirmation;
use Carbon\Carbon;
use Illuminate\Console\Command;

class ExpireChangeEmailConfirmationsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'expire:change_mail';

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
        $emailConfirmations = EmailConfirmation::where('is_change', true)->get();
        $now = Carbon::now();
        foreach ($emailConfirmations as $emailConfirmation) {
            if ($now->timestamp - Carbon::parse($emailConfirmation->created_at)->timestamp > 3600) {
                $emailConfirmation->delete();
            }
        }
    }
}
