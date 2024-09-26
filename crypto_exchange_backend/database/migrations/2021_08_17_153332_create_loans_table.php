<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLoansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('loans', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->float('rate', 20, 10)->default(0);
            $table->float('loaned_in_btc', 20, 10)->default(0);
            $table->float('loaned_in_usd');
            $table->float('total_amount_usd');
            $table->float('fee', 20, 10)->default(0);
            $table->float('weekly_payment', 20, 10)->default(0);
            $table->integer('periods');
            $table->string('status');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('loans');
    }
}
