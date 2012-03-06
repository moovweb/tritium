set("<doc remove='true' />")

xml() {
  $("/doc") {
    attribute("remove") {
      remove()
    }
  }
}