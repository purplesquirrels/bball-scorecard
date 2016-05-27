<!DOCTYPE html>
<html>
<head>
	<title>Badges</title>
</head>
<style type="text/css">

html {
	color: #FFF;
	font-family: arial, sans-serif;
	background-color: #212633;
}

h1 {
	clear: both;
	padding-left: 2em;
}

.badge {
	width: 100px;
	height: 100px;
	margin: 1em;
	float: left;
	padding: 0.5em;
	text-align: center;
}

.badge-list {
	margin-bottom: 4em;
}
.badge-list:after {
	content: "";
	display: block;
	clear: both;
}

</style>
<body>

<h1>Badges</h1>
<div class="badge-list">
<?php

foreach (glob('../images/badge/*.svg') as $badge) {
	echo "<div class='badge'><img src='".$badge."'>".basename($badge, ".svg")."</div>";
}

?>
</div>
<h1>Powerups</h1>
<div class="badge-list">
<?php

foreach (glob('../images/powerup/*.svg') as $powerup) {
	echo "<div class='badge powerup'><img src='".$powerup."'>".basename($powerup, ".svg")."</div>";
}

?>
</div>
</body>
</html>