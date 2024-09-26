<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\SendNotificationRequest;
use App\Mail\Admin\Management\EmailNotification;
use Mail;

class CallbackController extends Controller
{

    public function sendNotification(SendNotificationRequest $request)
   {
       $phone=($request->phone)?$request->phone:'';
       Mail::to(config('custom.notification.email'))->queue(new EmailNotification($request->fullName, $request->email, $phone, $request->message));

       return response()->noContent();
   }
}
