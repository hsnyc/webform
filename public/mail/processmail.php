<?php


    // email processing script
    $to = 'contact@hsnyc.co'; //my e-mail
    $subject = 'Website Contact';

    //Create additional headers
    $headers = "From: HSNYC Form<contact@hsnyc.co\r\n";
    $headers .= 'Content-Type: text/plain; charset=utf-8';

    //Crate user comfirmation fields
    $user = "$email";
    $usersubject = "Thank you, your message was received";
    $usermessage = "Thank you for your interest in our app. We will be in touch very soon.";
    $userheaders = "From: HSNYC<contact@hsnyc.co>\r\n";
    $userheaders .= 'Content-Type: text/plain; charset=utf-8';

    //send emails!
    $mailSent = mail($to, $subject, $message, $headers);
    $userMail = mail($user, $usersubject, $usermessage, $userheaders);

    if (!$mailSent || !$userMail) {
      $errors['mailfail'] = true;
    }

?>
