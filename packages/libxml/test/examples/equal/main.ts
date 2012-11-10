html_fragment() {
  $("./div") {
    %div = this()
    $("./a") {
      %a = this()
      $("..") {
        log(equal(%div, %a))
      }
    }
  }
}