xml()  {
  select(".//*[@id='bagel']") {
    select(".//*[@id='tomato']") {
      name("lettuce") {
        replace(/lettuce/, "cucumber")
      }
    }
    select("salt") {
      name("pepper")
    }
  }
}
