set("<root>
  <a><move_me /></a>
  <b><bottom /></b>
</root>")

xml() {
  $("//a/move_me") {
    move_to("//b", position("top"))
  }
}
