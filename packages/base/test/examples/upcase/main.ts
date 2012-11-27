html_fragment() {
  $$("#my_div") {
    $name = fetch("./@id")
    log(concat("I've reached ", upcase($name), "!"))
  }
}