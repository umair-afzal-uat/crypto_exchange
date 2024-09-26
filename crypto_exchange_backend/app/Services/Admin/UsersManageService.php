<?php

namespace App\Services\Admin;

use App\Enums\BaseAppEnum;
use App\Mail\Admin\Management\Users\Blocked;
use App\Mail\Admin\Management\Users\Unblocked;
use App\Models\Admin;
use App\Models\User;
use App\Models\Wallet;
use App\Repositories\UserRepository;
use App\Services\Base\BaseAppGuards;
use Carbon\Carbon;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Spatie\Searchable\Search;

class UsersManageService extends UserRepository
{
    private ?Admin $admin;

    public function __construct(Application $app, Collection $collection = null)
    {
        $this->admin = auth()->guard(BaseAppGuards::ADMIN)->user();
        parent::__construct($app, $collection);
    }

    /**
     * @param $pagination
     *
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator|\Illuminate\Support\Collection
     */
    public function index($pagination, $data)
    {


        $user = User::query();
        if(!empty($data['name'])){
            $user->whereRaw("CONCAT(first_name,' ', last_name) LIKE '%".$data['name']."%'");
        }

        if(!empty($data['email'])){

            $user->where('email','LIKE','%'.$data['email'].'%');
        }
        if(!empty($data['checkbox']) && $data['checkbox'] != 'false'){
            $user->whereRaw(' id IN (SELECT user_id FROM loans WHERE id IN (SELECT loan_id FROM loan_periods WHERE payment_date >= "'.date("Y-m-d").' 00:00:00" AND payment_date <= "'.date("Y-m-d").' 23:59:59"))');
        }
        $result = $user->orderBy('id', 'desc')->paginate($pagination);

        return $result;
    }

    /**
     * User blocking
     *
     * @param $id - user id
     *
     * @return mixed
     * @throws \Throwable
     */
    public function blockSwitch($id)
    {
        $user = $this->findOrFail($id);

        DB::transaction(
            function () use ($user) {
                if (! $user->blocked) {
                    Mail::to($user->email)->queue(
                        new Blocked(
                            $user->first_name
                        )
                    );
                } else {
                    Mail::to($user->email)->queue(
                        new Unblocked(
                            $user->first_name
                        )
                    );
                }

                $user->blocked = $user->blocked == false ? true : false;
                $user->save();
            },
            BaseAppEnum::TRANSACTION_ATTEMPTS
        );

        return $user;
    }

  /*  public function activity(int $id): JsonResource
    {
        $user = User::findOrFail($id);

        return new UsersActivityDataResource($user);
    }*/

    public function deleteUser(int $id)
    {
        DB::transaction(
            function () use ($id) {
                $now = Carbon::now()->toDateString();
                $user =  $this->model->newQuery()->findOrFail($id);
                $user->email = "deleted_$now" . '_' . $user->email;
                $user->deleted_at = $now;

                return $user->save();
            },
            BaseAppEnum::TRANSACTION_ATTEMPTS
        );
    }

    public function search(string $query)
    {
        return (new Search())
            ->registerModel(User::class, (new User())->getSearchFields())
            ->search($query);
    }

    public function changeUserAddress(int $user_id, string $address): void
    {
        $wallet = Wallet::where('user_id', $user_id)->firstOrFail();
        $wallet->update(['address' => $address]);
    }

    public function userProfile($id)
    {
        $user = $this->findOrFail($id);
        return $user;
    }



}
