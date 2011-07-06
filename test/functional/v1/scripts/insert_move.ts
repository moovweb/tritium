doc("xml") {
  # Test that you can move something immediately after inserting it.
  # Even though this is not something that you should ever do: put it in the right place to begin with!
  $("//div[@id='paradise']") {
    bottom() {
      var("hi", "<div class='criminal'>;(</div>")
      insert($hi) {
        move_to("//div[@id='jail']", "bottom")
      }
    }
  }
}
