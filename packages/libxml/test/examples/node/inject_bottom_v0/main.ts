html_fragment() {
  $("./div") {
    inject_at(position("bottom"), "<span id='foo1'></span><span id='foo2'></span>") 
  }
}