<?php
 // I. LOAD DATA FILE
 // https://www.php.net/manual/en/function.file-get-contents.php
 $str = file_get_contents("quotes-data.json");
 
 // II. CONVERT TO PHP ASSOCIATIVE ARRAY
 // https://www.php.net/manual/en/function.json-decode.php
 $all_quotes = json_decode($str);
 $length = count($all_quotes);
 
 // DEBUG CODE
 /*
 echo "<p>Num Results: $length</p>";
 echo "<pre>";
 print_r($all_quotes);
 echo "</pre>";
 */
 
 // III. GET ONE RANDOM ELEMENT OF THE $all_quotes ARRAY
 $randomQuote = $all_quotes[array_rand($all_quotes)];

  // DEBUG CODE
  /*
  echo "<pre>";
  print_r($randomQuote);
  echo "</pre>";
  */
 
  // IV. Send HTTP headers
  // https://www.php.net/manual/en/function.header.php
  // DO THIS **BEFORE** you `echo()` the content!
  header('content-type: application/json');           // tell the requestor that this is JSON
  header('Access-Control-Allow-Origin: *');           // turn on CORS
  header('X-this-430-service-is-kinda-lame: true');   // a custom header
  
	
  // V. Send the content
  // json_encode() turns a PHP associative array into a string of well-formed JSON
  // https://www.php.net/manual/en/function.json-encode.php
  $string = json_encode($randomQuote);
  echo $string;
?>