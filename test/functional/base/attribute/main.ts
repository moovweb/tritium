xml()  {
  select(".//div[@id='a']") {
    select("./div[@id='aa']") {
      attribute("width") {
        remove()
      }

      attribute("id") {
        name() {
          set("class")
        }
        value("ab")
      }

      attribute("height") {
        value() {
          replace("90", "99")
        }
      }
    }
  }
}
