xml()  {
  select('root') {
    bottom() {
      insert("middle", index: 2)

      insert("bottom", "hello", index: 3) {
        html() {
          replace(/llo/, "llo, world!")
        }
      }
    }

    top() {
      insert("top") {
        attribute("index", 1)
      }
      inject("<!-- Comment at the top -->")
    }
  }
}
