<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChangeEmailRequest;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\ChangeUserDataRequest;
use App\Models\User;
use App\Services\UserService;
use Auth;
use Hash;
use Illuminate\Http\Response;

class UserController extends Controller
{
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * @return Response
     */
    public function getUser(): Response
    {
        $response = auth()->user();
        // dd($response);
        $response->wallet_address = auth()->user()->wallet ? auth()->user()->wallet->address : '';
        // return response(auth()->user()->wallet);
        return response(auth()->user());
    }

    public function changePassword(ChangePasswordRequest $request): Response
    {
        $user = User::query()->findOrFail(auth()->id());
        if (!\Hash::check($request->oldPassword, $user->password)) {
            throw new \DomainException("Invalid old password");
        }
        $user->update(['password' => Hash::make($request->password)]);

        return response()->noContent();
    }

    public function changeData(ChangeUserDataRequest $request)
    {
        // dd($request->validated());
        $this->userService->changeData($request->validated(), Auth::id());

        return response()->noContent();
    }

    public function changeEmail(ChangeEmailRequest $request)
    {
        $this->userService->changeEmail($request->email, Auth::id());

        return response()->noContent();
    }
}
