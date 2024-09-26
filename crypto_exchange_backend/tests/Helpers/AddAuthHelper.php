<?php

namespace Tests\Helpers;

use App\Models\LoginConfirmation;
use Illuminate\Http\Response;

trait AddAuthHelper
{
    protected function makeHeader(string $bearerToken): array
    {
        return ['accept' => 'application/json', 'Authorization' => "Bearer ${bearerToken}"];
    }

    public function defaultAdmin(): array
    {
        return [
            'email'    => "admin@gmail.com",
            'password' => 'SDasdasbj213/213.',
            'totp'     => '212321',
            'captcha'  => '000000',
            'remember' => true,
        ];
    }

    public function defaultUser(int $id): array
    {
        return [
            'email'    => "test_user$id@mail.com",
            'password' => 'UserQwerty1!',
            'totp'     => '212321',
            'captcha'  => '000000',
            'remember' => true,
        ];
    }

    /**
     * @throws \Throwable
     */
    private function adminLogin(): string
    {
        $loginResponse = $this->postJson('/api/admin/login', $this->defaultAdmin());
        $loginResponse->assertOk();

        return $loginResponse->decodeResponseJson()['token'];
    }

    public function userLogin(int $id): string
    {
        $loginResponse = $this->postJson('/api/user/login', $this->defaultUser($id));

        $loginResponse->assertStatus(Response::HTTP_FORBIDDEN);


        $code = LoginConfirmation::where('confirmable_type', '=', 'App\Models\User')->get()->first()->code;

        $confirmLoginResponse = $this->putJson('/api/user/login_confirmation', ['code' => $code]);
        $confirmLoginResponse->assertNoContent();

        $loginResponse = $this->postJson('/api/user/login', $this->defaultUser($id));

        return $loginResponse->decodeResponseJson()['token'];
    }

    public function userLoginWithoutConfirm(int $id)
    {
        $loginResponse = $this->postJson('/api/user/login', $this->defaultUser($id));
        $loginResponse->assertOk();

        return $loginResponse->decodeResponseJson()['token'];
    }

}
