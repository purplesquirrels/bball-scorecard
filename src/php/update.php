<?php

if(isset($_POST['auth'])) {

	$auth = $_POST['auth'];

	if(isset($_POST['data']) && $auth == '1qaz@WSX') {

		$timestamp = date('Y-m-d-His');

		$data = json_decode($_POST['data']);

		// seperate out
		$players = new stdClass();
		$players->players = $data->players;

		$points = new stdClass();
		$points->points = $data->points;
		$points->bonuses = $data->bonuses;

		$conditions = new stdClass();
		$conditions->conditions = $data->conditions;

		// delete from data
		unset($data->players);
		unset($data->points);
		unset($data->bonuses);
		unset($data->conditions);
		unset($data->badges);

		// points and conditions can't be changed by Admin yet
		/*$file = '../data/points.json';
		$fh = fopen($file, 'w') or die("Error: Can't open file.");
		fwrite($fh, json_encode($points));
		fclose($fh);*/

		/*$file = '../data/conditions.json';
		$fh = fopen($file, 'w') or die("Error: Can't open file.");
		fwrite($fh, json_encode($conditions));
		fclose($fh);*/

		$file = '../data/players.json';
		/*$backupfile = '../data/backups/players'.$timestamp.'.json';
		if (!copy($file, $backupfile)) {
		    die("Error: unable to backup player data file.");
		}*/
		$fh = fopen($file, 'w') or die("Error: Can't open file.");
		fwrite($fh, json_encode($players));
		fclose($fh);


		$file = '../data/data.json';
		/*$backupfile = '../data/backups/data'.$timestamp.'.json';
		if (!copy($file, $backupfile)) {
		    die("Error: unable to backup score data file.");
		}*/
		$fh = fopen($file, 'w') or die("Error: Can't open file.");
		fwrite($fh, json_encode($data));
		fclose($fh);
		
	} else {
		die("Error: no data provided.");
	}
} else {
	die("Error: unauthorised.");
}

?>