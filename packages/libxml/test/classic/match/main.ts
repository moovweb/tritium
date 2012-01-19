xml() {
  match($url, /monk/) {
    match($url) {
      not('honkey') {
        match($path, "roduck") {
          $("/")
        }
        match_not($path, "roduck") {
          match_not($path, /product\/index.ognc/) {
          }
          match($path, /product\/index.ognc/) {
            select(".//*[@id='ac']") {
              remove()
            }
          }
        }
      }
    }
  }
}
