html_fragment() {
  select("./div[@id='frag1']/span") {
    attribute("found", "true")
  }
  select("./div[@id='frag2']/span") {
    attribute("found", "true")
  }
}
