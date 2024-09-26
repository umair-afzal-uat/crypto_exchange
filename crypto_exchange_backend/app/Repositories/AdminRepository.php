<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Admin;
use App\Repositories\Base\Repository;
use Illuminate\Database\Eloquent\Model;

class AdminRepository extends Repository
{
    public function model(): string
    {
        return Admin::class;
    }

    /**
     * @param int    $adminId
     * @param string $newPassword
     * @param string $oldPassword
     *
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|\Illuminate\Database\Eloquent\Builder[]
     */
    public function setNewPassword(int $adminId, string $newPassword, string $oldPassword): Model
    // public function setNewPassword(int $adminId, string $newPassword, string $oldPassword): \Illuminate\Database\Eloquent\Builder|array|\Illuminate\Database\Eloquent\Collection|Model
    {
        $admin = $this->model->newQuery()->findOrFail($adminId);

        if (!\Hash::check($oldPassword, $admin->password)) {
            throw new \DomainException("Invalid old password");
        }

        $admin->update(['password' => \Hash::make($newPassword)]);

        return $admin;
    }

    public function findByEmailOrFail(string $email): Model
    {
        return $this->model->newQuery()->where('email', $email)->firstOrFail();
    }
}
