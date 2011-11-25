xml()  {
  $('root') {
    insert("middle", index: 2)

    insert("bottom", "hello") {
      attribute("index", 3)
      inner() {
        replace(/llo/, "llo, world!")
      }
    }

    insert_top("top") {
      attribute("index", 1)
    }
    inject_top("<!-- Comment at the top -->")
  }
}
