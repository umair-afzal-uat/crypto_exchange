<?php

use App\Models\Wallets\HotColdTransaction;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHotColdTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hot_cold_transactions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('address_from');
            $table->string('address_to');
            $table->integer('asset_id');
            $table->float('amount', 20, 10);
            $table->enum('type', ['to_hot', 'to_cold']);
            $table->enum('status', HotColdTransaction::getStatuses());
            $table->string('tx_hash')->nullable();
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
        Schema::dropIfExists('hot_cold_transactions');
    }
}
