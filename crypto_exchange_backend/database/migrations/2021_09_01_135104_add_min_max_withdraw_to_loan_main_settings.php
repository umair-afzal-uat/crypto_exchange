<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMinMaxWithdrawToLoanMainSettings extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('loan_main_settings', function (Blueprint $table) {
            $table->float('min_withdraw', 12, 10)->default(0.000133);
        });
    }

}
