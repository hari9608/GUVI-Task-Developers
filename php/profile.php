<?php

session_start();
require 'vendor/autoload.php';
// Replace the following values with your MongoDB connection string and database name
$mongoConnString = "mongodb://localhost:27017";
// Create a new MongoClient instance
$mongoManager = new MongoDB\Driver\Manager($mongoConnString);

//$redis = new Redis();
//$redis->connect(REDIS_HOST, 6379);
// $client = new MongoClient();
$collection = 'guvi.login';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $username =$_POST['username'];
  $dob_str=$_POST['dob'];
  $age_str=$_POST['age'];
  $contactAddress=$_POST['contactAddress'];
  $date_timestamp = strtotime($dob_str);
  $date_obj = date('Y-m-d H:i:s', $date_timestamp);

  $filter = ['username' => $username];
  $update = ['$set' => ['dob' => $dob_str,'age'=>$age_str,'contactAddress' => $contactAddress]];

  $options = [
    'multi' => false,   // update only the first matching document
    'upsert' => true   // do not insert a new document if no matching document is found
  ];
  // specify the collection to update


  // build the update query object
  $query = new MongoDB\Driver\BulkWrite();
  $query->update($filter, $update, $options);

  // execute the update query
  $result = $mongoManager->executeBulkWrite($collection, $query);
  echo json_encode(array('success' => true,'message' => 'Successfully Updated1...'));



  
}
?>
