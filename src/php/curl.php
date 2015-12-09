<?php
// http://www.bom.gov.au/fwo/IDV60901/IDV60901.95936.json

// PHP Proxy
// Loads a file from any location.
// Author:Paulo Fierro
// January 29, 2006
// usage: curl.php?url=http://www.bom.gov.au/fwo/IDV60901/IDV60901.95936.json

$session = curl_init($_GET['url']); 	               
curl_setopt($session, CURLOPT_HEADER, false); 	       
curl_setopt($session, CURLOPT_RETURNTRANSFER, true);   
$json = curl_exec($session); 	                       
echo $json; 	      
curl_close($session);


?>