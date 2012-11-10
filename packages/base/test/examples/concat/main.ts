html_fragment() {
  $$("#my_div") {
    $name = fetch("./@id")
    log(concat("Did I reach ", $name, "?"))
  }
}