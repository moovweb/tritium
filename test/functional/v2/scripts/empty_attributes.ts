xml()  {
  $(".//div") {
    attribute("id") {
      value() {
        replace(/there is no id/, "and this replacement wont create one")
      }
    }
  }
  $(".//script") {
    attribute("src") {
      value() {
        # After this replace runs the attribute becomes the empty string so tritium will totally remove the attribute
        replace(/remove\_me/, "")
      }
    }
  }
  $(".//a") {
    attribute("href") {
      value() {
        replace(/there was a blank href/, "but this non-matching regex will remove it")
      }
    }
  }
}
