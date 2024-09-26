<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param \Illuminate\Console\Scheduling\Schedule $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule): void
    {
        // $schedule->command('queue:listen')->everyMinute()->withoutOverlapping()->runInBackground();
        // $schedule->command('expire:change_mail')->hourly()->withoutOverlapping()->runInBackground();
        // $schedule->command('expire:loans')->everyMinute()->withoutOverlapping()->runInBackground();

        // $schedule->command('scanBtcNode:start')->everyMinute()->withoutOverlapping()->runInBackground();
        // $schedule->command('get:prices')->everyMinute()->withoutOverlapping()->runInBackground();
        // $schedule->command('hotColdTransactionStatus:update')->everyMinute()->withoutOverlapping()->runInBackground();
        // $schedule->command('withdrawalRequestStatus:update')->everyMinute()->withoutOverlapping()->runInBackground();

        // if (config('env') !== 'production') {
        //     $schedule->command('telescope:prune --hours=48')->daily();
        // }
        // change by umair old ^^^above^^^
        $schedule->command('queue:listen')->everyThreeMinutes()->withoutOverlapping()->runInBackground();
        $schedule->command('expire:change_mail')->hourly()->withoutOverlapping()->runInBackground();
        $schedule->command('expire:loans')->everyTenMinutes()->withoutOverlapping()->runInBackground();

        $schedule->command('scanBtcNode:start')->everyTwoMinutes()->withoutOverlapping()->runInBackground();
        $schedule->command('get:prices')->everyMinute()->withoutOverlapping()->runInBackground();
        $schedule->command('update:btc')->everyMinute()->withoutOverlapping()->runInBackground();
        $schedule->command('hotColdTransactionStatus:update')->everyFiveMinutes()->withoutOverlapping()->runInBackground();
        $schedule->command('withdrawalRequestStatus:update')->everyFourMinutes()->withoutOverlapping()->runInBackground();
        $schedule->command('php artisan optimize:clear')->daily();
        if (config('env') !== 'production') {
            $schedule->command('telescope:prune --hours=48')->daily();
        }
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
