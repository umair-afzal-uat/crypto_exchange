<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentSystemsAssetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payment_systems_assets', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('payment_system_id');
            $table->unsignedBigInteger('asset_id');
            $table->timestamps();

            $table->foreign('payment_system_id')->references('id')->on('payment_systems');
            $table->foreign('asset_id')->references('id')->on('assets');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payment_systems_assets');
    }
}
