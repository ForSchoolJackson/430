<?php
 // THIS VERSION LOOKS AT THE REQUEST HEADERS SENT OVER BY THE CLIENT
 
 // DEBUG CODE
 //   echo "<p>Request Headers</p>";
 //   echo "<pre>";
 //   print_r(apache_request_headers());
 //   echo "</pre>";

 
  // 0. GET VALUE OF 'Accept' REQUEST HEADER
  $requestHeaders = apache_request_headers();
  $acceptHeader = $requestHeaders['Accept'];
  //echo $acceptHeader;
  
  // I. LOAD DATA FILE
  $str = file_get_contents("quotes-data.json");
  
  // II. CONVERT TO PHP ASSOCIATIVE ARRAY
  $all_quotes = json_decode($str);
  
  // III. GET ONE RANDOM ELEMENT OF THE $all_quotes ARRAY
  $randomQuote = $all_quotes[array_rand($all_quotes)];
  //print_r($randomQuote);
  
  // IV. Send HTTP headers
  // https://www.php.net/manual/en/function.str-contains.php
  if(str_contains($acceptHeader,"application/json")){
    $contentType = "application/json";
  }else{
    $contentType = "text/plain";
  }
  header("content-type: $contentType");
  header('Access-Control-Allow-Origin: *');
	
  // V. Send the content
  if($contentType == "application/json"){
    // JSON
    $string = json_encode($randomQuote);
  }else{
    // plain text: content|author
    $string = "$randomQuote->content|$randomQuote->author";
  }
  echo $string;
 ?>