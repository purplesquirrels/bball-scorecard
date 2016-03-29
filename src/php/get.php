<?php

	header('Content-Type: application/json');

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
	$powerups = json_decode(fread($fh, filesize($file)));
	fclose($fh);


 	// COMBINE ALL
	$season->players = $players->players;
	$season->points = $points->points;
	$season->bonuses = $points->bonuses;
	$season->conditions = $cond->conditions;
	$season->badges = $badge->badges;
	$season->powerups = $powerups->powerups;

	echo json_encode($season);


?>