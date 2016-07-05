<?php

$command = $_POST['command'];
$domain = $_POST['text'];
$token = $_POST['token'];
// $team_id = $_POST['team_id'];
// $team_domain = $_POST['team_domain'];
// $channel_id = $_POST['channel_id'];
// $channel_name = $_POST['channel_name'];
// $user_id = $_POST['user_id'];
// $user_name = $_POST['user_name'];
$response_url = $_POST['response_url'];

if($token != 'qFntaxvMtBNtQrY4kqHyNVb6'){
    $msg = "The token for the slash command doesn't match. Check your script.";
    die($msg);
    echo $msg;
} else if (strtolower($domain) == "who is the best?") {
	echo "It's too soon to tell.";
} else {

	$file = '../../data/data.json';

	$fh = fopen($file, 'r') or die("Error: Can't open file.");
	$season = json_decode(fread($fh, filesize($file)));
	fclose($fh);

	$file = '../../data/players.json';

	$fh = fopen($file, 'r') or die("Error: Can't open file.");
	$players = json_decode(fread($fh, filesize($file)));
	fclose($fh);

	$item = null;

	foreach($players->players as $player) {

	    if (strtolower($domain) == strtolower($player->firstname)) {
	        $item = $player;
	        break;
	    }
	}

	if (!$item) {
		die("Unable to find player: ".$domain);
	}

	$playerid = $item->id;

	//echo $playerid.'<br/>';

	$day = $season->scores["0"];

	$sc = $day->values->$playerid->newtotal;

	header('Content-Type: application/json');

	echo '{"response_type": "in_channel","text":"Current score for '.$domain.': *'.$sc.'*"}';



  	//echo "Current score for ".$domain.": *".$sc."*";
}

?>
