xml()  {
  # This test should move all of the 'fruits' divs above all of the 'puns' divs.
  # It should do so within the context of a row
  select("//*[@id='a']") {
    select(".//div[@class='row']") {
      select(".//div[@class='fruits']") {
        move_to("..", "top")
      }
    }
  }
}
