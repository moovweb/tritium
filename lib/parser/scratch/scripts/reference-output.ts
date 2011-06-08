# ENTERING FILE: false-negatives.ts
var("path", magic("whatever"))
match(var("path"), /.*whatsaaroneating.com\/.*/i) {
  $("/html/body/div[not(@ignore-me)]") {
    # ENTERING FILE: import-1.ts
    blah("whatever")
    etc("foo")
    # LEAVING FILE: import-1.ts
  }
  $("/html/body/div[@id='content']/div[@class='daily-entry']/p[@class='i'm-getting-tired-of-this-example-xpath-string']") {
    wrap("span", :"long-example" => "true", :"with:colons" => "blah") {
      move_here("//bah//who//knows//where//these//are//coming//from", "after") {
        remove()
      }
    }
    # ENTERING FILE: import 2.ts
    blah() {
      # ENTERING FILE: nested-import.ts
      creamy_center(/hello/i) {
        mmmmmmm()
      }
      # LEAVING FILE: nested-import.ts
      bloo("blee")
    }
    # LEAVING FILE: import 2.ts
  }
  blah("whatever CONCAT and so forth", fetch("bloo")) {
    blee()
  }
  # ENTERING FILE: ../scripts/import-3.ts
  getting_tired_of_this("hux")
  foo(fetch("blah"), :etc => "mumble") {
    goo()
  }
  # LEAVING FILE: ../scripts/import-3.ts
}
# LEAVING FILE: false-negatives.ts
