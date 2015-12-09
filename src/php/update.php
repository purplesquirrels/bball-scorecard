<?php

if(isset($_POST['auth'])) {

	$auth = $_POST['auth'];

	if(isset($_POST['data']) && $auth == '1qaz@WSX') {

		$file = '../data/data.json';
		$backupfile = '../data/backups/data'.date('Y-m-d-His').'.json';

		if (!copy($file, $backupfile)) {
		    die("Error: unable to backup data file.");
		}

		$data = $_POST['data'];
		$fh = fopen($file, 'w') or die("Error: Can't open file.");
		fwrite($fh, $data);
		fclose($fh);
	} else {
		die("Error: no data provided.");
	}
} else {
	die("Error: unauthorised.");
}

?>