<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChangePasswordRequest;
use App\Models\Admin;
use App\Services\AdminService;
use App\Services\Base\BaseAppGuards;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * Class ForgotPasswordController
 *
 * @package App\Http\Controllers\Carrier\Auth
 */
class ForgotPasswordController extends Controller
{
    /**
     * @var \App\Services\AdminService
     */
    private AdminService $service;

    private ?Admin $admin;

    /**
     * ForgotPasswordController constructor.
     *
     * @param \App\Services\AdminService $service
     */
    public function __construct(AdminService $service)
    {
        $this->service = $service;
        $this->middleware(['auth:admin'])->except(
            'sendNewPassword', 'sendLinkEmail', 'resetPassword', 'checkToken'
        );
        $this->admin = auth()->guard(BaseAppGuards::ADMIN)->user();
    }

    /**
     * @param ForgotPasswordRequest $request
     *
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    /* public function sendNewPassword(ForgotPasswordRequest $request): Response
     {
         $response = $this->service->sendNewPassword($request->input('email', ''));

         return $response ? response($response, Response::HTTP_CREATED) : response()->noContent(Response::HTTP_CREATED);
     }*/

    /**
     * Change password
     *
     * @param \App\Http\Requests\ChangePasswordRequest $request
     *
     * @return Response
     */
    public function changePassword(ChangePasswordRequest $request): Response
    {
        $data = $request->validated();

        $this->service->setNewPassword($this->admin->id, $data['password'], $data['oldPassword']);

        return response()->noContent(Response::HTTP_ACCEPTED);
    }

    /**
     * @param ForgotPasswordRequest $request
     *
     * @return Response
     */
    /*  public function sendLinkEmail(ForgotPasswordRequest $request): Response
      {
          $response = $this->service->sendLinkEmail($request->input('email', ''));

          return $response ? response($response, Response::HTTP_ACCEPTED) :
              response()->noContent(Response::HTTP_ACCEPTED);
      }*/

    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\Response
     * @throws \App\Exceptions\Http\BadRequestException
     */
    public function checkToken(Request $request): Response
    {
        $this->service->checkEmailToken($request->input('token', ''));

        return response()->noContent(Response::HTTP_ACCEPTED);
    }

    /**
     * @param \App\Http\Requests\Admin\Auth\ResetPasswordRequest $request
     *
     * @return \Illuminate\Http\Response
     * @throws \App\Exceptions\Model\NotFoundException
     */
    /* public function resetPassword(ResetPasswordRequest $request): Response
     {
         $this->service->resetPassword($request->input('token'), $request->input('password'));

         return response()->noContent(Response::HTTP_ACCEPTED);
     }*/
}
