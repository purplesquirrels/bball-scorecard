<?php


if(isset($_POST['auth'])) {

	$filename = "../auth/auth.txt";
	$handle = fopen($filename, "r") or die("Error: unauthorised.");
	$authServer = fread($handle, filesize($filename));
	fclose($handle);

	$auth = $_POST['auth'];

	if(isset($_POST["command"])) {

		$data = $_POST['data'];
		$command = $_POST["command"];

		$parts = explode("/", $command); // update/game/day

		switch ($parts[0]) {
			case "update" :  // update/game/day
				if (isset($_POST['data']) && $auth == $authServer) {
					updateData(array_slice($parts, 1), json_decode($data));
				} else {
					die("1Error: no data provided.");
				}
				break;
			case "create" : // create/season
				if (isset($_POST['data']) && $auth == $authServer) {
					addData(array_slice($parts, 1), $data);
				} else {
					die("2 Error: no data provided.");
				}
				break;
			case "get" : // get/all

				$result = getData(array_slice($parts, 1), $data);

				header('Content-Type: application/json');
				echo json_encode($result);

				break;
			default: 
				die("Error: no command provided.");
			
		}
		
	} else {
		die("3 Error: no data provided.");
	}
} else {
	die("4 Error: unauthorised.");
}


function addData($parts, $data) {

	switch ($parts[0]) {
		case "season" :

			//header('Content-Type: application/json');
			
			$cmd = [0 => "all"];

			$current = getData($cmd);
			$new = json_decode($data);

			$seasons = [
				0 => "none",
				1 => "autumn",
				2 => "winter",
				3 => "spring",
				4 => "summer"
			];

			$oldseasonname = $current->season_name;
			$seasonid = $current->season;

			$name = explode(" ", $oldseasonname);

			$file = '../data/archive/'.$name[1].'_'.$seasons[$seasonid].'_archive.json';

			$fh = fopen($file, 'w') or die("Error: Can't open file.");
			fwrite($fh, json_encode($current));
			fclose($fh);

			updateData([0 => "all"],  $new);

			break;
	}

}


function updateData($parts, $data) {

	//$data = json_decode($_POST['data']);

	

	switch ($parts[0]) {
		case "all" : // [update/]all
	
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
			unset($data->powerups);

			$file = '../data/players.json';

			$fh = fopen($file, 'w') or die("Error: Can't open file.");
			fwrite($fh, json_encode($players));
			fclose($fh);

			$file = '../data/data.json';
			
			$fh = fopen($file, 'w') or die("Error: Can't open file.");
			fwrite($fh, json_encode($data));
			fclose($fh);
			
			break;
		case 'day': // [update/]day/n

			$file = '../data/data.json';

			$fh = fopen($file, 'r') or die("Error: Can't open file.");
			$season = json_decode(fread($fh, filesize($file)));
			fclose($fh);

			$season->scores[(int)$parts[1]] = $data;
			
			$fh = fopen($file, 'w') or die("Error: Can't open file.");
			fwrite($fh, json_encode($season));
			fclose($fh);
			break;
		default:
			//die("Error: Unable to save.")
			break;
	}
}

function getData($parts, $data) {

	//header('Content-Type: application/json');

	if ($parts[0] == "all") {

		// SEASON
		$file = '../data/data.json';

		$fh = fopen($file, 'r') or die("Error: Can't open file.");
		$season = json_decode(fread($fh, filesize($file)));
		fclose($fh);

		// PLAYERS
		$file = '../data/players.json';

		$fh = fopen($file, 'r') or die("Error: Can't open file.");
		$players = json_decode(fread($fh, filesize($file)));
		fclose($fh);


		// POINTS
		$file = '../data/points.json';

		$fh = fopen($file, 'r') or die("Error: Can't open file.");
		$points = json_decode(fread($fh, filesize($file)));
		fclose($fh);

		// CONDITIONS
		$file = '../data/conditions.json';

		$fh = fopen($file, 'r') or die("Error: Can't open file.");
		$cond = json_decode(fread($fh, filesize($file)));
		fclose($fh);

		// BADGES
		$file = '../data/badges.json';

		$fh = fopen($file, 'r') or die("Error: Can't open file.");
		$badge = json_decode(fread($fh, filesize($file)));
		fclose($fh);

		// POWERUPS
		$file = '../data/powerups.json';

		$fh = fopen($file, 'r') or die("Error: Can't open file.");
		$powerup = json_decode(fread($fh, filesize($file)));
		fclose($fh);

		// ARCHIVES
		//$archdir    = '../data/archive';

		$archives = [];

		foreach (glob('../data/archive/*.json') as $arch) {
			$archives[] = $arch;
		}


	 	// COMBINE ALL
		$season->players = $players->players;
		$season->points = $points->points;
		$season->bonuses = $points->bonuses;
		$season->conditions = $cond->conditions;
		$season->badges = $badge->badges;
		$season->powerups = $powerup->powerups;
		$season->archives = $archives;

		//echo json_encode($season);

		return $season;
	} else if ($parts[0] == "archive") {

		// ARCHIVE

		if (strpos($data['file'], 'data/archive/') !== 0) {
		    die("Error: invalid archive");
		}

		$file = '../'.$data['file'];

		$fh = fopen($file, 'r') or die("Error: Can't open file: ".$data['file']);
		$season = json_decode(fread($fh, filesize($file)));
		fclose($fh);

		$archives = [];

		foreach (glob('../data/archive/*.json') as $arch) {
			$archives[] = $arch;
		}

		$season->archives = $archives;
		
		return $season;
	}

}

?>