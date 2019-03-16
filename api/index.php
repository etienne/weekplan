<?php

header('Access-Control-Allow-Origin: *');

$store = 'store.json';

function error($message) {
  return json_encode(['status' => 'error', 'message' => $message]);
}

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    readfile($store);
    break;
  case 'POST':
    if (!$handle = fopen($store, 'w')) {
      echo error('Data store is not accessible');
      break;
    }
    
    if (!$data = file_get_contents('php://input')) {
      echo error('Submitted input is invalid');
      break;
    }

    if (!fwrite($handle, $data)) {
      echo error('Data could not be saved');
      break;
    };

    if (!fclose($handle)) {
      echo error('Could not clean up after data write');
      break;
    }

    echo json_encode(['status' => 'success']);
    break;
  case 'OPTIONS':
    header('Access-Control-Allow-Headers: Content-Type');
    break;
}
