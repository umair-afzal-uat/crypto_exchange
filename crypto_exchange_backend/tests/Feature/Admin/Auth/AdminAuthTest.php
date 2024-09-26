<?php

namespace Tests\Feature\Admin\Auth;

use App\Models\LoginConfirmation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Tests\Helpers\AddAuthHelper;
use Tests\TestCase;

class AdminAuthTest extends TestCase
{
    use AddAuthHelper;

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

    public function testLoginWithConfirmation()
    {
        $loginResponse = $this->postJson('/api/admin/login', []);
        $loginResponse->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);

        $loginResponse = $this->postJson('/api/admin/login', $this->defaultAdmin());
        $loginResponse->assertStatus(Response::HTTP_FORBIDDEN);

        $code = LoginConfirmation::where('confirmable_type', '=', 'App\Models\Admin')->get()->first()->code;

        $confirmResponse = $this->putJson('/api/admin/confirm_login', ['code' => $code]);
        $confirmResponse->assertNoContent();

        $loginResponse = $this->postJson('/api/admin/login', $this->defaultAdmin());
        $loginResponse->assertOk();

        $loginResponse->assertJsonStructure(
            [
                'token',
                'userData' => [
                    "id",
                    "email",
                    "firstName",
                    "lastName",
                    "userName",
                    "lastLogin",
                    "phone",
                    "google2fa_enabled",
                    "permissions",
                ],
            ]
        );
    }

    public function testGetAdmin()
    {
        $loginResponse = $this->postJson('/api/admin/login', $this->defaultAdmin());
        $loginResponse->assertOk();

        $jwt = $loginResponse->decodeResponseJson()['token'];

        $responseAdmin = $this->getJson('/api/admin', $this->makeHeader($jwt));
        $responseAdmin->assertOk();

        $responseAdmin->assertJsonStructure(
            [
                'adminData' => [
                    "id",
                    "email",
                    "firstName",
                    "lastName",
                    "userName",
                    "lastLogin",
                    "phone",
                    "google2fa_enabled",
                    "permissions",
                ],
            ]
        );
    }

    public function testLogout()
    {
        $loginResponse = $this->postJson('/api/admin/login', $this->defaultAdmin());
        $loginResponse->assertOk();

        $jwt = $loginResponse->decodeResponseJson()['token'];

        $responseAdmin = $this->postJson('/api/admin/logout', $this->makeHeader($jwt));
        $responseAdmin->assertNoContent();

        $loginResponse = $this->getJson('/api/admin', $this->makeHeader($jwt));
        $loginResponse->assertStatus(Response::HTTP_UNAUTHORIZED);
    }
}
