xml()  {
  # This test has a 'row' with an anchor tag in it
  # The desired outcome is that the href of the anchor tag
  # becomes the onclick of the row tag
  select(".//*[@id='rows']") {
    select("./*[@class='row']") {
      # Move the anchor href up to an onclick
      attribute("onclick", fetch(".//a/@href"))
      attribute("onclick") {
        value() {
          prepend("window.location = '")
          append("'")
        }
      }
      select(".//a") {
        inner(fetch("@href"))
        attribute("href") {
          remove()
        }
      }
    }
  }
}
