<?php

header('Content-Type: application/json');

if(isset($_POST['pin'])) {

	$pinUser = $_POST['pin'];

	$filename = "../auth/pin.txt";
	$handle = fopen($filename, "r") or die('{"authenticated":false,"error":true}');
	$pin = fread($handle, filesize($filename));
	fclose($handle);

	if($pinUser == $pin) {
		echo('{"authenticated":true,"error":false}');
	} else {
		echo('{"authenticated":false,"error":false}');
	}
} else {
	echo('{"authenticated":false,"error":true}');
}


?>