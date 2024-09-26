<?php

use App\Http\Controllers\User\Auth\EmailConfirmationController;
use App\Http\Controllers\User\Auth\ForgotPasswordController;
use App\Http\Controllers\User\Auth\Google2FAController;
use App\Http\Controllers\User\Auth\LoginController;
use App\Http\Controllers\User\Auth\RegisterController;
use App\Http\Controllers\User\CallbackController;
use App\Http\Controllers\User\LoanController;
use App\Http\Controllers\User\PaymentsCallbackController;
use App\Http\Controllers\User\ReferralController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\User\WalletController;
use App\Http\Controllers\Admin\Management\FaqsController;

Route::group(['namespace' => 'Auth'], static function (): void {
    Route::post('/register', [RegisterController::class, 'register'])->middleware('guest');
    Route::put('/email_confirmation', [EmailConfirmationController::class, 'confirm']);
    Route::put('/login_confirmation', [LoginController::class, 'confirmLogin']);

    Route::post('/login', [LoginController::class, 'login']);
    Route::post('/user/change/password ', [UserController::class, 'changePassword']);

    Route::post('/password_reset', [ForgotPasswordController::class, 'requestResetPassword']);
    Route::put('/password_reset', [ForgotPasswordController::class, 'resetPassword']);
});

// Route::group(['middleware' => ['auth:api']], function () {
    Route::get('/', [UserController::class, 'getUser']);
    Route::put('/settings/change_password', [UserController::class, 'changePassword']);
    Route::put('/settings/change_data', [UserController::class, 'changeData']);
    Route::post('/settings/change_email', [UserController::class, 'changeEmail']);
    Route::post('/logout', [LoginController::class, 'logout']);
    Route::get('/token/refresh', [LoginController::class, 'tokenRefresh']);

    Route::get('/loan/details/{loanId}', [LoanController::class, 'getLoanDetails']);
    Route::get('/loan/payments', [LoanController::class, 'getLoanPaymentsDetails']);
    Route::get('/loans/{type}', [LoanController::class, 'getUserLoans']);
    Route::get('/dashboard', [LoanController::class, 'getUserDashboard']);
    Route::post('/loan/take_loan', [LoanController::class, 'takeLoan']);
    Route::get('/loan/get_queues', [LoanController::class, 'getQueues']);
    Route::get('/loan/payment_systems', [LoanController::class, 'getPaymentSystems']);
    Route::post('/loan/pay/calc', [LoanController::class, 'calcPaymentAmount']);
    Route::post('/loan/pay', [LoanController::class, 'makeLoanPayment']);
    Route::post('/loan/defer-payment/{loan_id}', [LoanController::class, 'deferLoanPayment']);
    Route::get('/loan/pay/cancel', [LoanController::class, 'cancelPayment']);

    Route::get('/referrals', [ReferralController::class, 'getReferralPayments']);

    Route::get('/wallet', [WalletController::class, 'getUserWallet']);
    Route::get('/withdrawals', [WalletController::class, 'getWithdrawals']);
    Route::post('/withdrawals', [WalletController::class, 'getWithdrawals']);
    Route::post('/payments', [WalletController::class, 'getPayments']);
    Route::post('/withdrawal', [WalletController::class, 'makeWithdrawalRequest']);
    Route::put('/withdrawal_cancel', [WalletController::class, 'cancelWithdrawalRequest']);

    Route::post('/myWallet/{loan_id}', [LoanController::class, 'deleteLoanPayment']);


    Route::group(['prefix' => 'settings'], static function (): void {
        Route::group(['prefix' => '2fa'], static function (): void {
            Route::get('generate_secret_key', [Google2FAController::class, 'generateSecretKey']);
            Route::post('enable', [Google2FAController::class, 'enable2FA']);
            Route::post('disable', [Google2FAController::class, 'disable2FA']);
        });
    });
    Route::group(
        ['prefix' => 'faqs'], static function (): void {
        Route::get('/', [FaqsController::class, 'getAllFaqs']);
    }
    );
// });


Route::post('/callback', [CallbackController::class, 'sendNotification']);
Route::get('/loan/credit_limit', [LoanController::class, 'getCreditLimit']);
Route::get('/loan/periods', [LoanController::class, 'getLoanPeriods']);
Route::post('/loan/calc', [LoanController::class, 'calcLoanPrice']);
Route::get('/loan/assets', [LoanController::class, 'getActiveAssets']);

Route::get('/loan_queued', [LoanController::class, 'getLoanQueued']);

Route::any('/payment/plisio/callback', [PaymentsCallbackController::class, 'plisioCallbackListen']);
