<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddBitcoinWalletToLoanMainSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('loan_main_settings', function (Blueprint $table) {
            $table->string('bitcoin_wallet')->nullable();
        });
    }
}
