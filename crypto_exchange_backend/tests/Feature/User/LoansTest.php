<?php

namespace Tests\Feature\User;

use Tests\Helpers\AddAuthHelper;
use Tests\TestCase;

class LoansTest extends TestCase
{
    use AddAuthHelper;

    private $baseUri = 'api/user/loan';

    private $loansUri = 'api/user/loans';

    private $userUri = 'api/user';

    private string $adminManagementUri = 'api/admin/management';

    private string $wallet = 'mquLsugSJzxmj9pnXWwVEW3GeGNtASUuiY';

    private int $userId = 4;

    private $withdrawalAmount = 0.000133;

    public function testGetCreditLimit()
    {
        $jwt = $this->userLogin($this->userId);

        $indexResponse = $this->getJson("$this->baseUri/credit_limit", $this->makeHeader($jwt));
        $indexResponse->assertOk();

        $indexResponse->assertJsonStructure(['loan_max_usd', 'loan_max_btc']);
    }

    public function testGetPeriods()
    {
        $indexResponse = $this->getJson("$this->baseUri/periods");

        $indexResponse->assertOk();
    }

    public function testGetAssets()
    {
        $indexResponse = $this->getJson("$this->baseUri/assets");

        $indexResponse->assertOk();
    }

    public function testGetLoanPaymentsIndex()
    {
        $jwt = $this->userLoginWithoutConfirm($this->userId);
        $indexResponse = $this->getJson("$this->baseUri/assets", $this->makeHeader($jwt));

        $indexResponse->assertOk();
    }

    public function testGetLoansActive()
    {
        $jwt = $this->userLoginWithoutConfirm($this->userId);
        $indexResponse = $this->getJson("$this->loansUri/active", $this->makeHeader($jwt));

        $indexResponse->assertOk();
    }

    public function testGetOldLoans()
    {
        $jwt = $this->userLoginWithoutConfirm($this->userId);
        $indexResponse = $this->getJson("$this->loansUri/old", $this->makeHeader($jwt));

        $indexResponse->assertOk();
    }

    public function testGetDashboard()
    {
        $jwt = $this->userLoginWithoutConfirm($this->userId);

        $indexResponse = $this->getJson("api/user/dashboard", $this->makeHeader($jwt));
        $indexResponse->assertOk();

        $indexResponse->assertJsonStructure([
            "loans",
            "total_value",
            "balance",
            "paid_total",
            "credit_limit" => [
                "loan_max_usd",
                "loan_max_btc",
            ],
            "loaned_total" => [
                "btc",
                "usd",
            ],
            "next_payment",
            "next_payment_amount"
        ]);
    }

    public function testTakeLoan()
    {
        $jwt = $this->userLoginWithoutConfirm($this->userId);

        $loanData = [
            "btc" => 0.000133,
            "loan_period_id" => 6
        ];

        $takeLoanResponse = $this->postJson("$this->baseUri/take_loan", $loanData, $this->makeHeader($jwt));
        $takeLoanResponse->assertOk();

        $takeLoanResponse->assertJsonStructure(
            [
                "id",
                "user_id",
                "rate",
                "loaned_in_btc",
                "loaned_in_usd",
                "total_amount_usd",
                "fee",
                "weekly_payment",
                "periods",
                "status",
                "created_at",
                "updated_at",
            ]
        );
    }

    public function testPayLoanViaStripe()
    {
        $jwt = $this->userLoginWithoutConfirm($this->userId);

        $stripePayData = [
            "loan_id" => 1,
            "payment_system" => "stripe",
            "is_full" => 1,
            "payerData" => [
                "number" => "4111111111111111",
                "exp_month" => "10",
                "exp_year" => "2024",
                "cvc" => "322",
            ]
        ];

        $payResponse = $this->postJson("$this->baseUri/pay", $stripePayData, $this->makeHeader($jwt));

        $payResponse->assertOk();

        $payResponse->assertJsonStructure([
            "payment" => [
                "id",
                "amount",
                "amount_usd",
                "payment_system",
                "status",
                "comment",
                "created_at",
                "updated_at",
            ]
        ]);
    }

    public function testMakeWithdrawalRequest()
    {
        $jwt = $this->userLoginWithoutConfirm($this->userId);


        $withdrawalResponse = $this->postJson("$this->userUri/withdrawal", ['address' => $this->wallet, 'amount' => $this->withdrawalAmount], $this->makeHeader($jwt));

        $withdrawalResponse->assertOk();
    }

    public function testGetWallet()
    {
        $jwt = $this->userLoginWithoutConfirm($this->userId);

        $walletResponse = $this->getJson("$this->userUri/wallet", $this->makeHeader($jwt));

        $walletResponse->assertOk();

        $walletResponse->assertJsonStructure(
            [
                "id",
                "user_id",
                "balance",
                "frozen_balance",
                "withdrawal_disabled",
                "created_at",
                "updated_at"
            ]
        );

        $walletResponse->assertJson(['balance' => 0, 'frozen_balance' => $this->withdrawalAmount]);
    }

    public function testAdminGetWithdrawalRequests()
    {
        $jwt = $this->adminLogin();

        $withdrawalIndexResponse = $this->getJson("$this->adminManagementUri/withdrawals", $this->makeHeader($jwt));

        $withdrawalIndexResponse->assertOk();
    }

    public function testAdminAcceptWithdrawal()
    {
        $jwt = $this->adminLogin();

        $withdrawalIndexResponse = $this->getJson("$this->adminManagementUri/withdrawals", $this->makeHeader($jwt));

        $data = $withdrawalIndexResponse->decodeResponseJson();

        $withdrawalId = $data['requests']['data'][0]['id'];

        $acceptWithdrawalResponse = $this->postJson("$this->adminManagementUri/withdrawals/$withdrawalId/accept", $this->makeHeader($jwt));

        $acceptWithdrawalResponse->assertOk();
    }


}
