html_fragment() {
  top() {
    insert("link", src: asset("myfile.css", "stylesheet"))
    insert("script", src: asset("jquery.js", "js"))
  }
}
