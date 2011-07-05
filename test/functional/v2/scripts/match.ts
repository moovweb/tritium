xml()  {
  match($url, /monk/) {
    match($url, not('honkey')) {
      match($path, "roduck") {
        $("/")
      }
      match($path, not("roduck")) {
        match($path, not("product/index.ognc")) {
        } 
        match($path, "product/index.ognc") {
          select(".//*[@id='ac']") {
            remove()
          }
        }
      }
    }
  }
}
