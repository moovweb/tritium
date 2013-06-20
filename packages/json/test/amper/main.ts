html() {
  $("/html/body") {
    $result = to_json_v1("./hash")
  }
}
set($result)
export("Content-Type", "application/json")
