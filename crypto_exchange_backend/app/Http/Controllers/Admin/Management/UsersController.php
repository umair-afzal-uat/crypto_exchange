<?php

namespace App\Http\Controllers\Admin\Management;

use App\Enums\BaseAppEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Management\Users\ActivityRequest;
use App\Http\Requests\Admin\Management\Users\ChangeUserAddressRequest;
use App\Http\Requests\Admin\Management\Users\DeleteRequests;
use App\Http\Requests\Admin\Management\Users\IndexRequest;
use App\Http\Requests\Admin\Management\Users\SearchRequest;
use App\Http\Requests\Admin\Management\Users\Verification\VerificationListRequest;
use App\Http\Requests\Admin\Management\Users\Verification\VerifyLinkRequest;
use App\Services\Admin\UsersManageService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;



class UsersController extends Controller
{
    private UsersManageService $service;

    /**
     * UsersController constructor.
     *
     * @param \App\Services\Admin\UsersManageService $service
     */
    public function __construct(UsersManageService $service)
    {
        $this->service = $service;
        $this->middleware(['auth:admin']);
    }

    /**
     * Users list
     *
     * @param \App\Http\Requests\Admin\Management\Users\IndexRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function index(IndexRequest $request): Response
    {


        $pagination = $request->validated()['paginate'] ?? BaseAppEnum::DEFAULT_PAGINATION;
        $users      = $this->service->index($pagination, $request->all());

        return response(compact('users'), Response::HTTP_OK);
    }

    /**
     * Block/unblock user
     *
     * @param $id - user id
     *
     * @return \Illuminate\Http\Response
     * @throws \Throwable
     */
    public function blockSwitch($id): Response
    {
        $user = $this->service->blockSwitch($id);

        return \response(compact('user'), Response::HTTP_OK);
    }

    /**
     * Users activities
     *
     * @param \App\Http\Requests\Admin\Management\Users\ActivityRequest $request
     * @param int                                                       $id
     *
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
   /* public function activity(ActivityRequest $request, int $id)
    {
        $activities = $this->service->activity($id);

        return \response(compact('activities', Response::HTTP_OK));
    }*/

    /**
     * @param $id
     *
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function delete($id): Response
    {

        $this->service->deleteUser($id);

        return \response()->noContent();
    }

    public function search(SearchRequest $request): Response
    // public function search(SearchRequest $request): \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|Response
    {
        $results = $this->service->search($request->validated()['search']);

        return response(compact('results'), Response::HTTP_OK);
    }

    public function changeUserAddress(ChangeUserAddressRequest $request, int $userId)
    {
        $this->service->changeUserAddress($userId, $request->address);

        return response()->noContent();
    }
    public function userProfile($id): Response
    {

        $user = $this->service->userProfile($id);

        return \response(compact('user'), Response::HTTP_OK);
    }


}
