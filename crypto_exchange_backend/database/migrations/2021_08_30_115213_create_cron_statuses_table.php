<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCronStatusesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cron_statuses', function (Blueprint $table) {
            $table->increments('id');
            $table->enum('status', ['fail', 'success']);
            $table->integer('asset_id')->nullable();
            $table->string('command')->nullable();
            $table->string('file')->nullable()->default(null);
            $table->string('line')->nullable()->default(null);
            $table->text('message')->nullable()->default(null);
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
        Schema::dropIfExists('cron_statuses');
    }
}
