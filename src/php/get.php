<?php

header('Content-Type: application/json');

$file = '../data/data.json';

$fh = fopen($file, 'r') or die("Error: Can't open file.");
$contents = fread($fh, filesize($file));
fclose($fh);

echo $contents;
?>