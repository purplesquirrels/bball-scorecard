<?php


if(isset($_POST['auth'])) {

	$auth = $_POST['auth'];

	if(isset($_POST['data']) && isset($_POST["command"]) && $auth == '1qaz@WSX') {

		
		$command = $_POST["command"];

		$parts = explode("/", $command); // update/game/day

		switch ($parts[0]) {
			case "update" :  // update/game/day
				updateData(array_slice($parts, 1));
				break;
			case "create" : // create/season
				addData(array_slice($parts, 1));
				break;
			case "get" : // get/all
				getData(array_slice($parts, 1));
				break;
			default: 
				die("Error: no command provided.");
			
		}
		
	} else {
		die("Error: no data provided.");
	}
} else {
	die("Error: unauthorised.");
}


function addData($parts) {

	switch ($parts[0]) {
		case "season" :

			break;
	}

}


function updateData($parts) {

	$data = json_decode($_POST['data']);

	

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

function getData($parts) {

	header('Content-Type: application/json');

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


	 	// COMBINE ALL
		$season->players = $players->players;
		$season->points = $points->points;
		$season->bonuses = $points->bonuses;
		$season->conditions = $cond->conditions;
		$season->badges = $badge->badges;

		echo json_encode($season);
	}

}

?>