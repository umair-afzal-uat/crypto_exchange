<?php

namespace App\Mail\User;

use App\Jobs\QueuesNames;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

/**
 * Class Registration
 *
 * @package App\Mail\Auth
 */
class AdminWaitList extends Mailable
{
    use Queueable;
    use SerializesModels;

    /**
     * @var array|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Translation\Translator|string|null
     */
    public $subject;
    // public $username;
    /**
     * Registration constructor.
     *
     * @param  $loan
     * @param  $user
     *
     */
    public function __construct()
    {
        $this->subject     = 'WaitList';
        // $this->username    = $user->first_name.' '.$user->last_name;
        $this->onQueue(QueuesNames::DEFAULT);
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.admin.mass-mail')->subject($this->subject);
    }
}
