<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLoanPeriodsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('loan_periods', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('loan_id');
            $table->float('amount_usd');
            $table->float('amount_usd_paid')->default(0);
            $table->float('fee_period_amount');
            $table->boolean('down_period')->default(false);
            $table->timestamp('payment_date');
            $table->string('status');
            $table->timestamps();

            $table->foreign('loan_id')->references('id')->on('loans')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('loan_perionds');
    }
}
