<?php

namespace Tests\Feature\User\Auth;

use App\Models\EmailConfirmation;
use App\Models\LoginConfirmation;
use Tests\Helpers\AddAuthHelper;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Tests\TestCase;

class UserAuthTest extends TestCase
{
    use WithFaker, AddAuthHelper;

    public function getFakeUserData(): array
    {
        $randInt = random_int(1, 9999);

        $email    = "test_email$randInt@gmail.com";
        $password = 'UserQwerty1!';

        return [
            'email'      => $email,
            'first_name' => $this->faker->firstName,
            'last_name'  => $this->faker->lastName,
            'password'   => $password,
            'phone'      => $this->faker->e164PhoneNumber(),
            'address'    => $this->faker->address,
            'date_birth' => '1999-04-29',
        ];
    }

    public function defaultUser(int $id): array
    {
        return [
            'email'    => "test_user$id@mail.com",
            'password' => 'UserQwerty1!',
            'totp'     => '212321',
            'captcha'  => '000000',
        ];
    }

    public function testRegistration(): void
    {
        $response = $this->postJson('api/user/register', []);

        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);

        $userData = $this->getFakeUserData();
        $response = $this->postJson('api/user/register', $userData);

        $response->assertStatus(Response::HTTP_CREATED);

        $this->assertDatabaseHas('users', ['email' => $userData['email']]);
    }

    public function testRegistrationConfirmation()
    {
        $userData = $this->getFakeUserData();
        $response = $this->postJson('api/user/register', $userData);

        $response->assertStatus(Response::HTTP_CREATED);

        $confirmToken    = $response->decodeResponseJson()['email_confirm_token'];
        $confirmResponse = $this->putJson('/api/user/email_confirmation', ['token' => $confirmToken]);

        $confirmResponse->assertNoContent();
    }

    public function testLoginWithConfirmation()
    {
        $response = $this->postJson('/api/user/login', []);
        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);

        $response = $this->postJson('/api/user/login', $this->defaultUser(2));
        $response->assertStatus(Response::HTTP_FORBIDDEN);


        $code = LoginConfirmation::where('confirmable_type', '=', 'App\Models\User')->get()->first()->code;

        $confirmLoginResponse = $this->putJson('/api/user/login_confirmation', ['code' => $code]);
        $confirmLoginResponse->assertNoContent();

        $responseLogin = $this->postJson('/api/user/login', $this->defaultUser(2));
        $responseLogin->assertOk();

        $responseLogin->assertJsonStructure(
            [
                'token',
                'userData' => [
                    "id",
                    "first_name",
                    "last_name",
                    "email",
                    "phone",
                    "invite_key",
                    "address",
                    "date_birth",
                    "last_login",
                ],
            ]
        );
    }

    public function testChangePassword()
    {
        $response = $this->postJson('/api/user/login', $this->defaultUser(2));
        $response->assertOk();

        $jwt = $response->decodeResponseJson()['token'];

        $newPassword = $this->defaultUser(2)['password'] . '!';

        $changePasswordResponse = $this->putJson(
            '/api/user/settings/change_password', [
            'oldPassword'          => $this->defaultUser(2)['password'],
            'password'             => $newPassword,
            'passwordConfirmation' => $newPassword,
        ], $this->makeHeader($jwt)
        );

        $changePasswordResponse->assertNoContent();
    }

    public function testChangeUserData()
    {
        $userData             = $this->defaultUser(2);
        $userData['password'] = $userData['password'] . '!';

        $response = $this->postJson('/api/user/login', $userData);
        $response->assertOk();

        $jwt = $response->decodeResponseJson()['token'];

        $responseChangeData = $this->putJson(
            '/api/user/settings/change_data', [
            "first_name" => "Jackie",
            "last_name"  => "Chan",
            "date_birth" => "1954-04-07",
            "address"    => "Los santos",
            "phone"      => "+380777777777",
        ], $this->makeHeader($jwt)
        );

        $responseChangeData->assertNoContent();
    }

    public function testGetUser()
    {
        $userData             = $this->defaultUser(2);
        $userData['password'] = $userData['password'] . '!';

        $response = $this->postJson('/api/user/login', $userData);

        $response->assertOk();

        $jwt         = $response->decodeResponseJson()['token'];
        $responseGet = $this->getJson('/api/user', $this->makeHeader($jwt));

        $responseGet->assertOk();

        $responseGet->assertJsonStructure(
            [
                "id",
                "first_name",
                "last_name",
                "email",
                "phone",
                "invite_key",
                "address",
                "date_birth",
                "created_at",
                "updated_at",
                "google2fa_enabled",
            ]
        );
    }

    public function testEmailChange()
    {
        $userData             = $this->defaultUser(2);
        $userData['password'] = $userData['password'] . '!';

        $response = $this->postJson('/api/user/login', $userData);

        $response->assertOk();

        $jwt   = $response->decodeResponseJson()['token'];
        $email = 'newmaail@gmail.com';

        $changeEmailResponse = $this->postJson(
            '/api/user/settings/change_email', ['email' => $email], $this->makeHeader($jwt)
        );
        $changeEmailResponse2 = $this->postJson(
            '/api/user/settings/change_email', ['email' => $email], $this->makeHeader($jwt)
        );

        $changeEmailResponse->assertNoContent();
        $changeEmailResponse2->assertNoContent();

        $token                   = EmailConfirmation::where('email', '=', $email)->first()->token;
        $confirmNewEmailResponse = $this->putJson('/api/user/email_confirmation', ['token' => $token]);

        $confirmNewEmailResponse->assertNoContent();
    }

    public function testLogout()
    {
        $loginResponse = $this->postJson('/api/user/login', $this->defaultUser(3));
        $loginResponse->assertStatus(Response::HTTP_FORBIDDEN);

        $code = LoginConfirmation::where('confirmable_type', '=', 'App\Models\User')->get()->first()->code;

        $confirmLoginResponse = $this->putJson('/api/user/login_confirmation', ['code' => $code]);
        $confirmLoginResponse->assertNoContent();

        $loginResponse = $this->postJson('/api/user/login', $this->defaultUser(3));
        $loginResponse->assertOk();

        $jwt = $loginResponse->decodeResponseJson()['token'];

        $responseAdmin = $this->postJson('/api/user/logout', $this->makeHeader($jwt));
        $responseAdmin->assertNoContent();

        $loginResponse = $this->getJson('/api/user', $this->makeHeader($jwt));
        $loginResponse->assertStatus(Response::HTTP_UNAUTHORIZED);
    }
}
