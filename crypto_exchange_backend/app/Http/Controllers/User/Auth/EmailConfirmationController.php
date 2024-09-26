<?php

namespace App\Http\Controllers\User\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\EmailConfirmationRequest;
use App\Models\Asset;
use App\Models\Balance;
use App\Models\EmailConfirmation;
use App\Models\User;
use App\Services\LoanService;
use Carbon\Carbon;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class EmailConfirmationController extends Controller
{
    private $loanService;

    public function __construct(LoanService $loanService)
    {
        $this->loanService = $loanService;
    }

    /**
     * Mark the authenticated user's email address as verified.
     *
     * @param EmailConfirmationRequest $request
     *
     * @return Response
     */
    public function confirm(EmailConfirmationRequest $request): Response
    {
        $emailConfirm = EmailConfirmation::where('token', $request->token)->first();

        $user = User::where('id', $emailConfirm->user_id)->firstOrFail();

        if ($user->email === $emailConfirm->email) {
            $user->wallet()->firstOrCreate();
        }

        $user->email = $emailConfirm->email;
        $user->email_verified_at = Carbon::now()->toDateTimeString();
        $user->email_confirmed = true;
        $user->save();

        $emailConfirm->delete();


        return response()->noContent();
    }
}
