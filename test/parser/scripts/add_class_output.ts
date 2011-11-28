# ENTERING FILE: add_class.ts
var("hi") {
  set("hello")
}
html() {
  select("/*") {
    attribute("class") {
      value() {
        append(" ")
        append(var("hi"))
      }
      concat("h", concat("e", concat("l", concat("o", concat(" is ", var("hi"))))))
      replace_text("h") {
        set("H")
      }
    }
  }
}
# LEAVING FILE: add_class.ts