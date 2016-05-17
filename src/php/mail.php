<?php

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
		$message .= 	"<p style='font-size:0.75em'>If you have any suggestions or ideas for improving the game, send them to <a href='https://www.suggestionox.com/r/giS4wY' target='_blank'>the suggestion ox</a>.</p>";
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


?>