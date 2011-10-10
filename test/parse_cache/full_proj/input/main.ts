match($content_type) {
  with(/html/) {
    html() {
      @import html.ts
    }
  }
}
