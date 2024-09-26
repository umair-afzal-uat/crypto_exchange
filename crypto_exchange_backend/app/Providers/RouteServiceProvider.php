<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /** @var string Base path for api routes  */
    private string $basePath;

    public function __construct($app)
    {
        parent::__construct($app);

        $this->basePath = base_path('routes/api/');
    }

    /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'App\Http\Controllers';

    /**
     * Base middleware for api
     *
     * @var string
     */
    public const API_MIDDLEWARE = 'api';

    /**
     * Base api prefix
     *
     * @var string
     */
    public const API_PREFIX = 'api';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        $this->configureRateLimiting();

        Route::prefix('api')
            ->middleware('api')
            ->namespace($this->namespace)
            ->group(function () {
                Route::prefix('/')
                    ->group($this->basePath . 'api.php');

                Route::prefix('user')
                    ->middleware('api')
                    ->namespace($this->namespace . '\\User')
                    ->group($this->basePath . 'user.php');

                Route::prefix('admin')
                    ->middleware('api')
                    ->namespace($this->namespace . '\\Admin')
                    ->group($this->basePath . 'admin.php');


            });
    }

    /**
     * Configure the rate limiters for the application.
     *
     * @return void
     */
    protected function configureRateLimiting()
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by(optional($request->user())->id ? : $request->ip());
        });
    }

}
