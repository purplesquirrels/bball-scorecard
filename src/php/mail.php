<?php

//$powerup = $_POST["powerup"];//'Timewarp'; //
$to = $_POST["to"];//'benfoster4130@gmail.com'; //$_POST["email"]
$subject = $_POST["subject"];//'Bankulator: You recieved a powerup.';  //$_POST["subject"]
$message = $_POST["message"];//'Hi Ben,\r\n\r\nYou recieved the following powerup today: Timewarp.\r\n\r\nRegardsr\nThe Founding Fathers.';  //$_POST["message"]
/*
$message = '
<html>
<head>
  <title>You recieved a powerup</title>
</head>
<body>
  <p>Hi Ben, you received the following powerups today:</p>
  <ul><li><strong>Timewarp</strong>: Take and extra shot.</li></ul>
  <p>Regards,<br>The Founding Fathers</p>
</body>
</html>
';
*/

/*
$header = "From:foundingfathers@bankulator.com\r\n";
$header .= "MIME-Version: 1.0\r\n";
$header .= "Content-type: text/html\r\n";
*/
// To send HTML mail, the Content-type header must be set
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

// Additional headers
//$headers .= 'To: Ben <benfoster4130@gmail.com>' . "\r\n";
$headers .= 'From: The Founding Fathers <foundingfathers@bankulator.com>' . "\r\n";

$retval = mail( $to, $subject, $message, $headers);

if( $retval == true ) {
	echo "Message sent successfully...";
}else {
	echo "Message could not be sent...";
}


?>