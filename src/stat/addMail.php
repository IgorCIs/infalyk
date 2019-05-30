<?php
  $email = $_POST['email'];
  $memberId = md5(strtolower($email));
  $apiKey = "60318c2da9e685b179f84c2800727b0d";

  $url = "https://us16.api.mailchimp.com/3.0/lists/ec19d0aa44/members/" . $memberId;

  $json = json_encode([
    'email_address' => $email,
    'status'        => 'subscribed',
  ]);

  $ch = curl_init($url);

  curl_setopt($ch, CURLOPT_USERPWD, 'user:' . $apiKey);
  curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_TIMEOUT, 10);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
  $result = curl_exec($ch);
  $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);
  
  var_dump($result);
?>