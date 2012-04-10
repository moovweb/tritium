
$device_stylesheet="main"
match($user_agent) {
  with(/WebKit/) {
    $device_stylesheet="devices/webkit"
  }
}
match($user_agent) {
  with(/iPhone/) {
    $device_stylesheet="devices/iphone"
  }
}
match($user_agent) {
  with(/iPad/) {
    $device_stylesheet="devices/ipad"
  }
}
match($user_agent) {
  with(/webOS/) {
    $device_stylesheet="devices/webos"
  }
}
match($user_agent) {
  with(/Android/) {
    $device_stylesheet="devices/android"
  }
}
match($user_agent) {
  with(/Blackberry/) {
    $device_stylesheet="devices/blackberry"
  }
}

