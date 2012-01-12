$("/html") {
  # Optimize the head
  $("./head") {
    log("nope")
  }
  # Optimize the body
  $("./body") {
    $("./corpse") {
      remove()
    }
  }
}
