@extends('emails.layouts.basic')

@section('content')
    <tr>
        <td style="font: 19px Arial,sans-serif; font-weight: 700; -webkit-text-size-adjust: none; padding-bottom: 20px;">
            <b>Fullname</b>: {{$fullName}}
        </td>
    </tr>
    <tr>
        <td style="font: 19px Arial,sans-serif; font-weight: 700; -webkit-text-size-adjust: none; padding-bottom: 20px;">
            <b>Email</b>: {{$email}}
        </td>
    </tr>
    <tr>
        <td style="font: 19px Arial,sans-serif; font-weight: 700; -webkit-text-size-adjust: none; padding-bottom: 20px;">
            <b>Phone</b>: {{$phone}}
        </td>
    </tr>
    <tr>
        <td style="font: 19px Arial,sans-serif; -webkit-text-size-adjust: none; padding-bottom: 40px;">
            {{$msg}}
        </td>
    </tr>
@endsection
