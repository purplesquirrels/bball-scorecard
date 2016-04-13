<?php

header('Content-Type: application/json');

if(isset($_POST['pin'])) {

	$pinUser = $_POST['pin'];

	$filename = "../auth/pin.txt";
	$handle = fopen($filename, "r") or die('{"authenticated":false,"error":true,"key":null}');
	$pin = fread($handle, filesize($filename));
	fclose($handle);

	if($pinUser == $pin) {

		$filename = "../auth/auth.txt";
		$handle = fopen($filename, "r") or die('{"authenticated":false,"error":true,"key":null}');
		$serverAuth = fread($handle, filesize($filename));
		fclose($handle);

		echo('{"authenticated":true,"error":false,"key":"'.$serverAuth.'"}');
	} else {
		echo('{"authenticated":false,"error":false,"key":null}');
	}
} else {
	echo('{"authenticated":false,"error":true,"key":null}');
}


?>