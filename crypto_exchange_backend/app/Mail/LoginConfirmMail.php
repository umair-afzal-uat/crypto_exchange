<?php

namespace App\Mail;

use App\Jobs\QueuesNames;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

/**
 * Class Registration
 *
 * @package App\Mail\Auth
 */
class LoginConfirmMail extends Mailable
{
    use Queueable;
    use SerializesModels;

    /**
     * @var array|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Translation\Translator|string|null
     */
    public $subject;

    /**
     * @var string
     */
    public string $code;

    /**
     * Registration constructor.
     *
     * @param $code
     */
    public function __construct($code)
    {
        $this->subject = __('email_subjects.welcome');
        $this->code = $code;
        $this->onQueue(QueuesNames::DEFAULT);
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.login_confirm')->subject($this->subject);
    }
}
