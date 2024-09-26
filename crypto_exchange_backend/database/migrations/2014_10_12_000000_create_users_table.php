<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique()->index();
            $table->string('password');
            $table->string('phone')->nullable();
            $table->string('invite_key')->nullable()->default(NULL);
            $table->string('address')->nullable();
            $table->boolean('blocked')->default(false);
            $table->date('date_birth')->nullable();
            $table->boolean('email_confirmed')->default(false);
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamp('last_login')->nullable()->default(NULL);
            $table->timestamp('last_login_confirmation')->nullable()->default(NULL);
            $table->unsignedBigInteger('referral_group_id')->nullable();
            $table->softDeletes();
            $table->rememberToken();
            $table->timestamps();

            $table->foreign('referral_group_id')->references('id')->on('referral_groups')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
}
