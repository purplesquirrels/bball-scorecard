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
						"<body>";

		$message .= $_POST["message"];

		$message .= 	"<p>Regards,<br>The Founding Fathers</p>";
		$message .= 	"<p style='font-size:0.9em'>Note: please do not respond to this message as it was sent form an unattended mail box.</p>";
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