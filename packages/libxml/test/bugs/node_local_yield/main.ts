set("<body><div class='hi' /></body>")

xml() {
  $("//body") {
    %body = node()
    %body {
      add_class("worked")
    }
  }
}