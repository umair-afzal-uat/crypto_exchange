<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLoanMainSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('loan_main_settings', function (Blueprint $table) {
            $table->id();
            $table->float('down_payment');
            $table->float('max_loans_amount_usd');
            $table->float('referral_rate');
            $table->float('min_loan_amount_usd');
            $table->float('origination_fee_usd');
            $table->boolean('loan_queued');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('loan_main_settings');
    }
}
