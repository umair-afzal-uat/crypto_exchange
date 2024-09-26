<?php

namespace App\Mail\User\Auth;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordResetMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * @var string
     */
    public $resetLink;

    public $username;

    /**
     * Create a new message instance.
     *
     * @param string $token
     */
    public function __construct(string $token, string $username)
    {
        $this->resetLink = config('app.domain', 'http://localhost') . 'logIn?password_reset=' . $token;
        $this->username = $username;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build(): self
    {
        return $this->subject('Password reset')
            ->view('emails.users.auth.password_reset');
    }
}
