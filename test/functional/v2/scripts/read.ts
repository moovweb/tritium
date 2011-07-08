set(read("../fragments/read.xml"))

html() {
  insert_bottom("script") {
    inject(read("../fragments/read.js")) 
  }
}