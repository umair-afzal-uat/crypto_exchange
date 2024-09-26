<?php

namespace App\Http\Middleware;

use App\Models\RateLimiter;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * Class ThrottleRequestsInSeconds
 *
 * @package App\Http\Middleware
 */
class ThrottleRequestsInSeconds
{
    /**
     * @var RateLimiter
     */
    private $rateLimiter;

    /**
     * ThrottleRequestsInSeconds constructor.
     *
     * @param \App\Models\RateLimiter $rateLimiter
     */
    public function __construct(RateLimiter $rateLimiter)
    {
        $this->rateLimiter = $rateLimiter;
    }

    public function handle(
        Request $request,
        Closure $next,
        $decaySeconds = 1,
        $prefix = ''
    ) {
        $ip = explode(', ', $request->server->get('HTTP_X_FORWARDED_FOR'))[0] ?? $request->ip();
        $key = sha1($prefix . $request->route()->getDomain() . '|' . $ip);

        $this->rateLimiter->setLimitSeconds($decaySeconds)
            ->throttle(
                $key,
                static function () use (&$response, $next, $request) : void {
                    $response = $next($request);
                }
            );

        return $response;
    }
}
