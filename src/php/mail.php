<?php


/**
* This example shows making an SMTP connection with authentication.
*/

//SMTP needs accurate times, and the PHP timezone MUST be set
//This should be done in your php.ini, but this is how to do it if you don't have access to that
date_default_timezone_set('Australia/Melbourne');

require 'PHPmailer/PHPMailerAutoload.php';

if(isset($_POST['auth'])) {

	$filename = "../auth/auth.txt";
	$handle = fopen($filename, "r") or die("Error: unauthorised.");
	$authServer = fread($handle, filesize($filename));
	fclose($handle);


	$filename = "../auth/mail.txt";
	$handle = fopen($filename, "r") or die("Error: unauthorised.");
	$maildeets = json_decode(fread($handle, filesize($filename)));
	fclose($handle);

	$auth = $_POST['auth'];

	if($auth == $authServer) {

		//Create a new PHPMailer instance
		$mail = new PHPMailer;

		//Tell PHPMailer to use SMTP
		$mail->isSMTP();
		//Enable SMTP debugging
		// 0 = off (for production use)
		// 1 = client messages
		// 2 = client and server messages
		$mail->SMTPDebug = 0;
		//Ask for HTML-friendly debug output
		$mail->Debugoutput = 'html';

		//Set the hostname of the mail server
		$mail->Host = $maildeets->host;
		//Set the SMTP port number - likely to be 25, 465 or 587
		$mail->Port = $maildeets->port;
		//Whether to use SMTP authentication
		$mail->SMTPAuth = true;
		//Username to use for SMTP authentication
		$mail->Username = $maildeets->un;
		//Password to use for SMTP authentication
		$mail->Password = $maildeets->pw;
		//Set who the message is to be sent from
		$mail->setFrom('noreply@bankulator.com', 'BBall Founding Fathers');
		//Set an alternative reply-to address
		$mail->addReplyTo('noreply@bankulator.com', 'BBall Founding Fathers');
		//Set who the message is to be sent to
		$mail->addAddress($_POST["to"]);

		$mail->isHTML(true);                                  

		//Set the subject line
		$mail->Subject = $_POST["subject"];
		//if you want to include text in the body. 

		$message = "<html>".
						"<head>".
							"<title>".$subject."</title>".
						"</head>".
						"<body style='font-family:Arial,Helvetica,sans-serif;font-size:16px;color:#4C4C4C;'>";

		$message .= $_POST["message"];

		$message .= 	"<p>Regards,<br>The Founding Fathers<br><br>";
		$message .= 	"<img src='http://www.bankulator.com/images/logo/foundingfathers.png' width='180' height='92' title='Founding Fathers logo'></p>";
		$message .= 	"<p style='font-size:0.75em'>If you have any suggestions or ideas for improving the game, send them to <a href='https://www.suggestionox.com/r/giS4wY' target='_blank'>the suggestion ox</a>.</p>";
		$message .= 	"<p style='font-size:0.75em'>Note: please do not respond to this message as it was sent from an unattended mail box.</p>";
		$message .= 	"</body>".
					"</html>";

		$mail->Body    = $message;

		//send the message, check for errors
		if (!$mail->send()) {
		   echo "Mailer Error: " . $mail->ErrorInfo;
		} else {
		   echo "Message sent!";
		}

	} else {
		die("Error: unauthorised.");
	}
} else {
	die("Error: unauthorised.");
}

/*
if(isset($_POST['auth'])) {

	$filename = "../auth/auth.txt";
	$handle = fopen($filename, "r") or die("Error: unauthorised.");
	$authServer = fread($handle, filesize($filename));
	fclose($handle);

	$auth = $_POST['auth'];

	if($auth == $authServer) {

		$to = $_POST["to"];
		$subject = $_POST["subject"];
		$message = "<html>".
						"<head>".
							"<title>".$subject."</title>".
						"</head>".
						"<body style='font-family:Arial,Helvetica,sans-serif;font-size:16px;color:#4C4C4C;'>";

		$message .= $_POST["message"];

		$message .= 	"<p>Regards,<br>The Founding Fathers<br><br>";
		$message .= 	"<img src='http://www.bankulator.com/images/logo/foundingfathers.png' width='180' height='92' title='Founding Fathers logo'></p>";
		// $message .= 	"<p style='font-size:0.75em'>If you have any suggestions or ideas for improving the game, <a href='https://www.surveymonkey.com/r/FF9GLCJ' target='_blank'>fill out the feedback form</a>.</p>";
		$message .= 	"<p style='font-size:0.75em'>Note: please do not respond to this message as it was sent from an unattended mail box.</p>";
		$message .= 	"</body>".
					"</html>";

		$headers = "From: \"BBall Founding Fathers\" <noreply@bankulator.com>\r\n";
		$headers .= "Reply-To: \"BBall Founding Fathers\" <noreply@bankulator.com>\r\n";
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

		$retval = mail( $to, $subject, $message, $headers);

		if( $retval == true ) {
			echo "Message sent successfully.";
		}else {
			echo "Error: message could not be sent.";
		}
	} else {
		die("Error: unauthorised.");
	}
} else {
	die("Error: unauthorised.");
}
*/

?>