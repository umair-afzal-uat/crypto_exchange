<?php

declare(strict_types=1);

namespace App\Models;

interface BaseUsersModelInterface
{
    public const DEFAULT_LANGUAGE = 'en';

    public const CONFIRM_TOKEN = 32;

    public const COUNTRY_LENGTH = 2;

    public const EMAIL_REGEX = '/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/';


    /**
     * At least 1 Upper case letter, lower case letter, digit, 8 characters
     */
    public const PASSWORD_REGEX = '/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[,.#?!@$%^&*-]).{8,}$/';

    /**
     * "+" is required, first digit is not "0"
     */
    // public const PHONE_REGEX = '/^[\+][1-9]{1}[\d]{9,13}$/';
    public const PHONE_REGEX = '/^[1-9]{1}[\d]{9,13}$/';

    public const UUID_REGEX = '^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$';

    public const SECRET_KEY_LENGTH = 32;
}
