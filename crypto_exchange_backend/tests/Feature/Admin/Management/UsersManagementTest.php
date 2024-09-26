<?php

namespace Tests\Feature\Admin\Management;

use App\Exceptions\ErrorMessages;
use App\Models\LoginConfirmation;
use Illuminate\Http\Response;
use Tests\Helpers\AddAuthHelper;
use Tests\TestCase;

class UsersManagementTest extends TestCase
{
    use AddAuthHelper;

    private string $baseUri = '/api/admin/management/users';

    public function testIndex()
    {
        $jwt = $this->adminLogin();

        $usersResponse = $this->getJson($this->baseUri, $this->makeHeader($jwt));
        $usersResponse->assertOk();
    }

    public function testBlockUnblockUser()
    {
        $adminJWT      = $this->adminLogin();
        $usersResponse = $this->getJson($this->baseUri, $this->makeHeader($adminJWT));
        $users         = $usersResponse->decodeResponseJson()['users']['data'];
        $userToBlock   = $users[1];
        $id            = $userToBlock['id'];

        //blocking
        $blockUserResponse = $this->putJson(
            "$this->baseUri/$id/block_switch", $this->makeHeader($adminJWT)
        );

        $blockUserResponse->assertOk();


        $blockedUserLoginResponse = $this->postJson('/api/user/login', $this->defaultUser($id));
        $blockedUserLoginResponse->assertStatus(Response::HTTP_FORBIDDEN);
        $blockedUserLoginResponse->assertJson(['errors' => [ErrorMessages::USER_BLOCKED]]);

        //unblocking
        $blockUserResponse = $this->putJson(
            "$this->baseUri/$id/block_switch", $this->makeHeader($adminJWT)
        );

        $blockUserResponse->assertOk();


        $unblockedUserLoginResponse = $this->postJson('/api/user/login', $this->defaultUser($id));
        $unblockedUserLoginResponse->assertStatus(Response::HTTP_FORBIDDEN);

        $code = LoginConfirmation::where('confirmable_type', '=', 'App\Models\User')->get()->first()->code;

        $confirmLoginResponse = $this->putJson('/api/user/login_confirmation', ['code' => $code]);
        $confirmLoginResponse->assertNoContent();

        $unblockedUserLoginResponse = $this->postJson('/api/user/login', $this->defaultUser($id));
        $unblockedUserLoginResponse->assertOk();
    }

    public function testDeleteUser()
    {
        $adminJWT      = $this->adminLogin();
        $usersResponse = $this->getJson($this->baseUri, $this->makeHeader($adminJWT));
        $users         = $usersResponse->decodeResponseJson()['users']['data'];
        $user          = $users[1];
        $id            = $user['id'];

        $deleteResponse = $this->deleteJson("$this->baseUri/$id/delete", $this->makeHeader($adminJWT));
        $deleteResponse->assertNoContent();

        $deletedUserLoginResponse = $this->postJson('/api/user/login', $this->defaultUser($id));
        $deletedUserLoginResponse->assertStatus(Response::HTTP_NOT_FOUND);
    }
}
