<?php

namespace App\Exceptions;

use App\Exceptions\Http\AccessDenyException;
use App\Exceptions\Http\BadRequestException;
use App\Exceptions\Model\NotFoundException;
use App\Traits\FormatsErrorResponse;
use DomainException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Foundation\Http\Exceptions\MaintenanceModeException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    use FormatsErrorResponse;

    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $exception) {
            if (app()->bound('sentry') && $this->shouldReport($exception)) {
                app('sentry')->captureException($exception);
            }
        });
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param Request $request
     * @param Throwable $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws Throwable
     */
    public function render($request, Throwable $exception)
    {
        if ($exception instanceof \Illuminate\Validation\ValidationException) {
            return response($this->errorResponse($exception->errors()), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        if ($exception instanceof \Illuminate\Auth\AuthenticationException) {
            return response($this->errorResponse('unauthenticated'), Response::HTTP_UNAUTHORIZED);
        }

        if ($exception instanceof \Illuminate\Http\Exceptions\ThrottleRequestsException) {
            return response($this->errorResponse($exception->getMessage()), Response::HTTP_TOO_MANY_REQUESTS);
        }

        if ($exception instanceof \Tymon\JWTAuth\Exceptions\JWTException) {
            return response($this->errorResponse('unauthenticated'), Response::HTTP_UNAUTHORIZED);
        }

        if ($exception instanceof \Illuminate\Database\Eloquent\ModelNotFoundException) {
            return response($this->errorResponse('model_not_found'), Response::HTTP_NOT_FOUND);
        }

        if ($exception instanceof \Illuminate\Auth\Access\AuthorizationException) {
            return response($this->errorResponse('unauthorized'), Response::HTTP_FORBIDDEN);
        }

        if ($exception instanceof \Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException) {
            return response($this->errorResponse($exception->getMessage()), Response::HTTP_NOT_FOUND);
        }

        if ($exception instanceof DomainException) {
            return response($this->errorResponse($exception->getMessage()), Response::HTTP_BAD_REQUEST);
        }

        if ($exception instanceof ServerException) {
            return response($this->errorResponse($exception->getMessage()), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        if ($exception instanceof AccessDenyException) {
            return response($this->errorResponse($exception->getMessage()), Response::HTTP_FORBIDDEN);
        }

        if ($exception instanceof BadRequestException) {
            return response($this->errorResponse($exception->getMessage()), Response::HTTP_BAD_REQUEST);
        }

        if ($exception instanceOf \Illuminate\Auth\Access\AuthorizationException) {
            return response($this->errorResponse('You need to verify your account'), Response::HTTP_FORBIDDEN);
        }

        if ($exception instanceof NotFoundHttpException) {
            return response( ['errors' => ["not_found"]], Response::HTTP_NOT_FOUND);
        }

        if ($exception instanceof \Illuminate\Database\Eloquent\ModelNotFoundException) {
            return response($this->errorResponse('the_selected_asset_id_is_invalid'), Response::HTTP_NOT_FOUND);
        }

        if ($exception instanceof NotFoundException) {
            return \response($exception->getMessage(), Response::HTTP_NOT_FOUND);
        }

        return parent::render($request, $exception);
    }
}
