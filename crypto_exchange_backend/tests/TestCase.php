<?php

namespace Tests;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Tests\Traits\CreatesApplication;
use Tests\Traits\MigrateFreshSeedOnce;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication, MigrateFreshSeedOnce;

}
