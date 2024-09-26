<?php

namespace App\Mail\Admin\Management;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class EmailNotification extends Mailable
{
    use Queueable, SerializesModels;

    protected string $fullName;
    protected string $email;
    protected string $phone;
    protected string $msg;

    /**
     * Create a new message instance.
     *
     * @param $firstname
     */
    public function __construct(string $fullName, string $email, string $phone, string $message)
    {
        $this->fullName = $fullName;
        $this->email = $email;
        $this->phone = $phone;
        $this->msg = $message;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.admin.notification')->with([
                'fullName' => $this->fullName,
                'email' => $this->email,
                'phone' => $this->phone,
                'msg' => $this->msg,
            ]);
    }
}
