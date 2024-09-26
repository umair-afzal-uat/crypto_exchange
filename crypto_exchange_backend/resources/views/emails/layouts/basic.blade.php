
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width"/>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
</head>
<body>
<table border="0" cellpadding="0" cellspacing="0" style="max-width: 1503px; width: 100%; margin: 0; padding: 0; background: #ffffff;">
    <tbody>
    <tr>
        <td><img src="{{ asset('assets/mail/mail-header.png') }}" alt="" style="display: block; max-width: 100%;"/></td>
    </tr>
    <tr>
        <td>
            <table border="0" cellpadding="0" cellspacing="0" style="max-width: 884px; margin: 0 auto; background: #ffffff; padding: 68px 15px 96px 15px;">
                <tbody>
                @yield('content')
               {{-- <tr>
                    <td style="font: 24px Poppins; font-weight: bold; line-height: 36px;">Welcome to Crypto.Exchange</td>
                </tr>
                <tr>
                    <td style="font: 20px Poppins; padding-top: 56px; font-weight: 500; line-height: 28px;">Hello, Matthew Johansson!</td>
                </tr>
                <tr>
                    <td style="font: 14px Poppins; padding-top: 24px; padding-bottom: 56px; font-weight: 400; line-height: 22px;">Thank you for registering at Crypto.Exchange. Your account is created and must be activated before you can use it. To activate the account click on the following link. Please, skip this email if you didn't sign up on Crypto.Exchange.</td>
                </tr>
                <tr>
                    <td style="font: 14px Poppins; border-top: 1px solid #E0E0E0; padding-top: 24px; font-weight: 400; line-height: 22px;">If this log in is not done by you, please change your password immediately. <br><br>Thank you, </td>
                </tr>
                <tr>
                    <td style="font: 14px Poppins; font-weight: 500; line-height: 22px;">Crypto.Exchange Team.</td>
                </tr>--}}
                </tbody>
            </table>
        </td>
    </tr>
    @include('emails.layouts.footer')
    </tbody>
</table>
</body>
</html>