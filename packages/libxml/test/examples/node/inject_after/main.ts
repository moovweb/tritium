html_fragment() {
  $("./div") {
    inject_at(position("after"), "<span id='foo1'></span><span id='foo2'></span>") 
  }
}