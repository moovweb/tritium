doc("xml") {
  select('root') {
    bottom {
      insert_tag("middle", index: 2)

      insert_tag("bottom", "hello", index: 3) {
        html {
          replace(/llo/, "llo, world!")
        }
      }
    }

    top {
      insert_tag("top") {
        attribute("index", 1)
      }
      insert("<!-- Comment at the top -->")
    }
  }
}
