<?php

use App\Http\Controllers\Admin\Auth\AuthController;
use App\Http\Controllers\Admin\Auth\ForgotPasswordController;
use App\Http\Controllers\Admin\Auth\Google2FAController;
use App\Http\Controllers\Admin\Management\HotWalletController;
use App\Http\Controllers\Admin\Management\LoanPeriodSettingsController;
use App\Http\Controllers\Admin\Management\LoansController;
use App\Http\Controllers\Admin\Management\ReferralController;
use App\Http\Controllers\Admin\Management\TransactionsController;
use App\Http\Controllers\Admin\Management\UsersController;
use App\Http\Controllers\Admin\Management\WithdrawalController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\Management\FaqsController;
use App\Services\Base\BaseAppGuards;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(
    ['namespace' => 'Auth'],
    static function (): void {
        Route::post('/login', [AuthController::class, 'login'])->middleware('guest');
        Route::get('/', [AuthController::class, 'getAuth'])->middleware(['auth:admin']);
        Route::get('/test1', [AuthController::class, 'getAuth'])->middleware(['auth:admin']);
        Route::get('/token/refresh', [AuthController::class, 'refreshToken']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/confirm_email', [AuthController::class, 'confirmEmail']);
        Route::put('/confirm_login', [AuthController::class, 'confirmLogin']);

        Route::group(
            ['prefix' => 'forgot_password', 'middleware' => 'guest'], static function (): void {
            Route::post('/token', [ForgotPasswordController::class, 'checkToken']);
            Route::post('/email', [ForgotPasswordController::class, 'sendLinkEmail']);
            Route::put('/reset', [ForgotPasswordController::class, 'resetPassword']);
        }
        );
    }
);

Route::group(
    [
        'middleware' => [
            'active.user',
            'jwt.token.refresh',
            'auth:' . BaseAppGuards::ADMIN,
        ],
    ], static function (): void {
    Route::group(
        ['prefix' => 'settings'], static function (): void {
        Route::post('/change_phone', [SettingsController::class, 'changePhone']);
        Route::post('/change_name', [SettingsController::class, 'changeName']);
        Route::put('/change_password', [ForgotPasswordController::class, 'changePassword']);

        Route::group(
            ['prefix' => '2fa'], static function (): void {
            Route::get('generate_secret_key', [Google2FAController::class, 'generateSecretKey']);
            Route::post('enable', [Google2FAController::class, 'enable2FA']);
            Route::post('disable', [Google2FAController::class, 'disable2FA']);
        }
        );
    }
    );

    Route::group(
        ['prefix' => 'management'], static function (): void {
        Route::group(
            ['prefix' => 'users'], static function (): void {
                Route::get('/', [UsersController::class, 'index']);
                Route::put('/{id}/block_switch', [UsersController::class, 'blockSwitch'])->where(['id' => '[0-9]+']);
                Route::delete('/{id}/delete', [UsersController::class, 'delete'])->where(['id' => '[0-9]+']);
                Route::post('/search', [UsersController::class, 'search']);
                Route::put('/{id}/address/change', [UsersController::class, 'changeUserAddress']);
                Route::get('/{id}', [UsersController::class, 'userProfile']);
                // Route::post('/search-user', [UsersController::class, 'searchUser']);
            }
        );

        Route::get('/referrals', [ReferralController::class, 'getAllReferralPayments']);

        Route::get('/referral/main', [ReferralController::class, 'getReferralMain']);
        Route::get('/referral/group', [ReferralController::class, 'getReferralGroup']);
        Route::put('/referral/group', [ReferralController::class, 'manageUserReferralGroup']);
        Route::put('/referral/group/edit_rate', [ReferralController::class, 'editGroupRate']);
        Route::put('/referral/main/edit_rate', [ReferralController::class, 'editMainRate']);
        Route::post('/referral/status', [ReferralController::class, 'updateStatus']);

        Route::group(
            ['prefix' => 'fee_settings'], static function (): void {
            Route::get('/', [LoanPeriodSettingsController::class, 'index']);
            Route::put('/{id}', [LoanPeriodSettingsController::class, 'update'])->where(['id' => '[0-9]+']);

        }
        );

        Route::group(
            ['prefix' => 'loans'], static function (): void {
            Route::get('/', [LoansController::class, 'index']);
            Route::get('/user/{id}/{type?}', [LoansController::class, 'getUserLoans']);
            Route::post('/marks-as-completed', [LoansController::class, 'marksAsCompleted']);
        }
        );
        Route::group(
            ['prefix' => 'faqs'], static function (): void {
            Route::get('/', [FaqsController::class, 'index']);
            Route::post('/addfaq', [FaqsController::class, 'addFaq']);
            Route::post('/updatefaq', [FaqsController::class, 'updateFaq']);
            Route::get('/deletefaq/{delete_faq}', [FaqsController::class, 'deleteFaq']);
        }
        );

        Route::get('/queues', [LoansController::class, 'getAllQueues']);
        Route::put('/queues/{queueId}/queue_approve', [LoansController::class, 'approveQueue']);
        Route::put('/queues/{queueId}/queue_reject', [LoansController::class, 'rejectQueue']);
        Route::post('/mass-email', [LoansController::class, 'massEmail']);
        Route::post('/delete-queue-email', [LoansController::class, 'deleteQueueEmail']);

        Route::group(['prefix' => 'transactions'], static function(): void {

            Route::get('/{user_id}', [TransactionsController::class, 'paymentDetails']);
            Route::get('/', [TransactionsController::class, 'index']);
            Route::put('/approve', [TransactionsController::class, 'approvePayment']);
            Route::put('/reject', [TransactionsController::class, 'rejectPayment']);
            Route::get('missed/payments', [TransactionsController::class, 'missedPayment']);
            Route::get('/missed-loans/{loan_id}', [TransactionsController::class, 'missedLoansPayment']);
            Route::post('/payment-status', [TransactionsController::class, 'changePaymentStatus']);
        });

        Route::group(['prefix' => 'withdrawals'], static function(): void {
           Route::get('/', [WithdrawalController::class, 'index']);
           Route::put('/{id}/edit', [WithdrawalController::class, 'edit']);
           Route::post('/staff-name/', [WithdrawalController::class, 'staffNameEdit']);
           Route::post('/{id}/accept', [WithdrawalController::class, 'accept'])->where(['id' => '[0-9]+']);
           Route::post('/{id}/reject', [WithdrawalController::class, 'reject'])->where(['id' => '[0-9]+']);
        });

        Route::group(['prefix' => 'hot_wallet'], static function()
        {
            Route::get('/', [HotWalletController::class, 'index']);
            Route::put('/withdraw_limits', [HotWalletController::class, 'updateWithdrawLimits']);
        });

        Route::group(['prefix' => 'loans_main_settings'], static function()
        {
            Route::put('/', [LoansController::class, 'updateLoansMainSettings']);
            Route::get('/loan_queued', [LoansController::class, 'getLoanQueued']);
        });
    }
    );
}
);


