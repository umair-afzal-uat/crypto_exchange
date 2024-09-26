<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Str;

class DefaultUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $emails = [];

        for ($i = 1; $i <= 10; $i++) {
            $emails[] = "test_user$i@mail.com";
        }

        foreach ($emails as $i => $email) {
            $parentUserId = ($i < 2) ? null : 2;
            $user = [
                'email'      => $email,
                'first_name'  => "Test",
                'last_name'  => "User $i",
                'password'   => $i === 0 ? \Hash::make('UserQwerty1!!!') : \Hash::make('UserQwerty1!'),
                'email_confirmed' => true,
                'last_login_confirmation' => env('APP_ENV') == 'testing' ? null :Carbon::now()->toDateTimeString(),
                "phone"      => "+00000000000",
                'invite_key' => Str::random(32),
                'referral_group_id' => ($i < 3) ? 1 : null
            ];



            \DB::table('accounts')->insert(['id' => $i + 1, 'parent_id' => $parentUserId]);
            \DB::table('users')->insert($user);
            \DB::table('wallets')->insert(['user_id' => $i + 1]);
        }
    }
}
