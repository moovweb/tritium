match($status) {
  with(/302/) {
    log("STATUS: 302")
  }
  with(/200/) {
    log("STATUS: 200")
    match($path) {
      with(/login/) {
        @import pages/login.ts
      }
      with(/home/) {
        @import pages/home.ts
      }
      with(/browse/) {
        @import pages/browse.ts
      }
    }
  }
}
