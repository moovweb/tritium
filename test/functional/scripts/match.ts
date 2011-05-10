doc("xml") {
  match($url, /monk/) {
    match($url, not('honkey')) {
      match($path, "roduck") {
        $("/")
      }
      else() {
        match($path, not("product/index.ognc")) {
        } 
        else() {
          select(".//*[@id='ac']") {
            remove()
          }
        }
      }
    }
  }
}
