<?php

namespace App\Providers;

use App\Services\Google2FAService;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;
use URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(Google2FAService::class, fn() => new Google2FAService());
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        if (config('app.use_https')) {
            URL::forceScheme('https');
        }

        Validator::extend(
            'recaptcha',
            'App\\Services\\ReCaptcha@validate'
        );
    }
}
