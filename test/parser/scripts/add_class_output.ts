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
      replace("h") {
        set("H")
      }
    }
  }
}
# LEAVING FILE: add_class.ts