<?php

return [
    'dear_customer'      => 'Dear Customer,',
    'thank_you'          => 'Thank you,',
    'regards'            => 'Ragards,',
    'welcome'            => 'Welcome to Crypto.Exchange',
    'team'               => config('app.name', 'Laravel') . ' Team.',
    'hello'              => 'Hello',
    'registration_title' => 'Please verify your email.',

    'admin_reset_password_text_1' => 'We received a request to reset your password for your Future trading platform
     account. We are here to help!',
    'admin_reset_password_text_2' => 'Use a new password:',
    'reset_password_title'        => 'Password reset',

    'change_email_title' => 'Email change',
    'change_email'       => 'A mail change has been requested. In two weeks, your email will be changed.
    If you did not make this request, please ignore this email.',

    'new_email_title'              => 'New email',
    'new_email_1'                  => 'A mail change has been requested. To confirm your new email, please
     use the following link on the website.',
    'new_email_2'                  => 'If you did not make this request, please ignore this email.',

    //GENERAL
    'current_year'                 => date('Y'),
    'have_a_good_day'              => 'Have a good day.',
    'questions_to_support'         => 'If you have any questions, please contact our support team.',
    'reset_password_text_2'        => 'If you did not make this request, please ignore this email.',

    //REGISTRATION
    'register_text'                => "Thank you for registering at Crypto.Exchange. Your account is created and must be activated before you can use it. To activate the account click on the following link. Please, skip this email if you didn't sign up on Crypto.Exchange.",
    'register_text_2'              => "If this log in is not done by you, please change your password immediately.",
    'verify_email'                 => '[Verify My Email]',
    'link_prompt'                  => 'If the link did not open, copy it to the clipboard, paste it into the address bar of the browser, press Enter',
    'invite_text'                  => 'You were invited in ' . config('app.name', 'Laravel'),
    'invite_link'                  => 'To confirm the registration, follow the link below:',
    'super_admin_invite_text'      => 'You have successfully invited a new administrator',
    'your_password_is'             => 'Your password is',
    'email_is'                     => 'Email',
    'password_is'                  => 'Password',

    //RESET PASSWORD
    'reset_password_text_1'        => 'A request has been received to change the password for your Btc Advance account.',
    'reset_password_text_security' => 'If you did not initiate this request, please contact us immediately at ',
    'reset_password_success'       => ' Your password has been successfully reset. You can login using the new password. If you did not send a
            password reset request. Please, block your account as soon as possible.',

    //MANAGEMENT
    'blocked_account'              => 'Your account has been blocked by the Administrator.',
    'unblocked_account'            => 'Your account has been successfully restored',
    'restore_account'              => 'To restore your account, contact our support team',
    'deleted_account'              => 'Your account has been deleted by the Administrator.',
    'delete_account_questions'     => 'If you have any questions, please contact our support team.',

    //2FA
    'enabled_2fa_1'                => 'You have activated two-factor authentication for your account.',
    'enabled_2fa_2'                => 'To disable two-factor authentication, go to your account settings on the site.',
    'disabled_2fa_1'               => 'You have disabled two-factor authentication for your account',
    'disabled_2fa_2'               => 'To activate two-factor authentication, go to your account settings on the site.',

    //KYC
    'kyc_accepted'                 => 'Your verification has been successfully confirmed by the administrator',

    //Login confirm
    'login_confirm'                => [
        'title' => 'Login verification',
        'code'  => 'Your code: ',
    ],
];
