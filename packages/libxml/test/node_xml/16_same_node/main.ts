set("<root><a></root>")
xml() {
  $("root") {
    %root = this()
    $("a") {
      %a = this()
      $("..") {
        log(equal(%root, %root))  // true
        log(equal(%root, this())) // true
        log(equal(%root, %a))     // false
      }
    }
  }
}
set("")