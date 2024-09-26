<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdminTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create(
            'admins',
            function (Blueprint $table) {
                $table->id();
                $table->string('email', 255)->unique()->index();
                $table->string('password', 255);
                $table->string('first_name')->nullable();
                $table->string('last_name')->nullable();
                $table->boolean('active')->default(false)->index();
                $table->boolean('email_confirmed')->default(true);
                $table->string('remember_token', 255)->nullable()->default(null);
                $table->softDeletes();
                $table->timestamp('last_login')->nullable()->default(null);
                $table->timestamp('last_login_confirmation')->nullable()->default(NULL);
                $table->timestamp('last_activity')->nullable()->default(null);
                $table->timestamps();
            }
        );

        DB::table('admins')->insert(
            [
                [
                    'email'       => 'admin@gmail.com',
                    'password'    => Hash::make('SDasdasbj213/213.'),
                    'first_name'  => 'Admin',
                    'last_name'   => 'Adminnij',
                    'active'      => true,
                ],
            ]
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
}
