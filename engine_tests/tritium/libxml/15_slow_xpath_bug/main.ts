html() {

  $("/html/body") {

    $(".//a[not(contains(@href, 'blog.prosper.com') or contains(@href, '.pdf') or contains(@href, '/published/sec'))]") {
      attribute("href") {
        value() {
          rewrite("link")
        }
      }
    }

  }

}
