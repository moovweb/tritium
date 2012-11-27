html_fragment() {
  $$("#MY_DIV") {
    $name = fetch("./@id")
    log(concat("I've reached ", downcase($name), "!"))
  }
}