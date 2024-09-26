<?php

namespace Tests\Traits;

use Illuminate\Support\Facades\Artisan;

/**
 * Launch migrate fresh only before tests starting
 *
 * Trait MigrateFreshSeedOnce
 * @package Tests\Traits
 */
trait MigrateFreshSeedOnce
{
    /** @var bool If true, setup has run at least once */
    protected static bool $setUpHasRunOnce = false;

    public function setUp(): void
    {
        parent::setUp();

        if (! static::$setUpHasRunOnce) {
            Artisan::call('optimize');
            Artisan::call('cache:clear');
            Artisan::call('migrate:fresh');

            Artisan::call('db:seed');

            static::$setUpHasRunOnce = true;
        }
    }

}