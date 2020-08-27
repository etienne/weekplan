<?php

header('Access-Control-Allow-Origin: *');

$data_dir = '../data/';
$store = "{$data_dir}store.json";
$current_minutes = date('i');
$round_down_to = 5;
$rounded_minutes = floor($current_minutes / $round_down_to) * $round_down_to;
$padded_minutes = str_pad($rounded_minutes, 2, '0', STR_PAD_LEFT);
$backup_date = date('Y_m_d_H') . $padded_minutes;
$backup_store = "{$data_dir}store-{$backup_date}.json";

function error($message) {
  echo json_encode(['status' => 'error', 'message' => $message]);
  die;
}

if (!array_key_exists('REQUEST_URI', $_SERVER)) {
  error('Invalid endpoint');
}

$request = explode('/', $_SERVER['REQUEST_URI']);

if ($request[1] !== 'api') {
  error('Invalid endpoint');
}

$method = $_SERVER['REQUEST_METHOD'];
$endpoint = $request[2];

switch ($endpoint) {
  case 'store':
    switch ($method) {
      case 'GET': store_index($store); break;
      case 'POST': store_update($store, $backup_store); break;
      case 'OPTIONS': options(); break;
    }
    break;
  case 'versions':
    switch ($method) {
      case 'GET':
        if (count($request) > 3 && is_valid_version($request[3])) {
          versions_show($data_dir, $request[3]);
        } else {
          versions_index($data_dir);
        }
        break;
    }
    break;
  default:
    error('Invalid endpoint');
}

function store_index($store) {
  readfile($store);
}

function store_update($store, $backup_store) {
  if (!$handle = fopen($store, 'w')) {
    error('Data store is not accessible');
  }

  if (!$backup_handle = fopen($backup_store, 'w')) {
    error('Backup store is not accessible');
  }
  
  if (!$data = file_get_contents('php://input')) {
    error('Submitted input is invalid');
  }

  if (!fwrite($handle, $data)) {
    error('Data could not be saved');
  };

  if (!fwrite($backup_handle, $data)) {
    error('Backup could not be saved');
  };

  if (!fclose($handle)) {
    error('Could not clean up after data write');
  }

  if (!fclose($backup_handle)) {
    error('Could not clean up after backup write');
  }

  echo json_encode(['status' => 'success']);
}

function versions_index($data_dir) {
  $dir_info = scandir($data_dir);
  $versions = [];

  foreach ($dir_info as $file) {
    preg_match('/^store-([\d_]+).json$/', $file, $preg_results);

    if (count($preg_results)) {
      $file_path = $data_dir . $file;
      $size = filesize($file_path);
      $date = filemtime($file_path);
      $versions[] = [
        'id' => $preg_results[1],
        'size' => $size,
        'date' => $date,
      ];
    }
  }

  echo json_encode($versions);
}

function versions_show($data_dir, $version) {
  $filepath = $data_dir . 'store-' . $version . '.json';
  readfile($filepath);
}

function options() {
  header('Access-Control-Allow-Headers: Content-Type');
}

function is_valid_version($version) {
  preg_match('/\d{4}_\d{2}_\d{2}_\d{4}/', $version, $result);
  return count($result);
}
