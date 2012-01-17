xml() {
  select(".//div[@id='b']") {
    select(".//div[@id='ac']") {
      move_to("//div[@id='a']", "after") {
        attribute("iam", "a")
      }
    }
  }
  select(".//div[@id='a']") {
    move_here('../div[@id="b"]') {
      attribute("iam", "b")
    }
  }
}
