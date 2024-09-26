@extends('emails.layouts.basic')

@section('content')
    <tr>
        <td style="font: 24px Poppins; font-weight: bold; line-height: 36px;">
            @lang('email_texts.welcome')
        </td>
    </tr>
    <tr>
        <td style="font: 20px Poppins; padding-top: 56px; font-weight: 500; line-height: 28px;">@lang('email_texts.hello'), {{ $username }}</td>
    </tr>
    <tr>
        <td style="font: 14px Poppins; padding-top: 24px; padding-bottom: 16px; font-weight: 400; line-height: 22px;">
            @lang('email_texts.reset_password_text_1')
        </td>
    </tr>
    <tr>
        <td style="font: 14px Poppins; padding-top: 24px; padding-bottom: 56px; font-weight: 400; line-height: 22px;">
            <a href="{{ $resetLink }}" style="color: #3EB678; text-decoration: none;">
                Reset password link
            </a>
        </td>
    </tr>
    <tr>
        <td style="font: 14px Poppins; border-top: 1px solid #E0E0E0; padding-top: 24px; font-weight: 400; line-height: 22px;">@lang('email_texts.reset_password_text_2') <br><br>@lang('email_texts.thank_you')</td>
    </tr>
@endsection

