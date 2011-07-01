# ENTERING FILE: false-negatives.ts
var("x") {
  set(whatever())
}
doc() {
  select("html") {
    select("body") {
      # ENTERING FILE: import-1.ts
      attribute("data-foo") {
        value() {
          set("in-the-body")
        }
      }
      log("blah")
      # LEAVING FILE: import-1.ts
      move_here("some/long/path/to/something/split/across/multiple/lines/and/concatenated", "top") {
        wrap("div", :"data-ur-bleeble:blabble" => "bork")
        # ENTERING FILE: import 2.ts
        move_here(".//div[@class='something']") {
          attribute("id") {
            value() {
              set("algol")
            }
          }
          # ENTERING FILE: nested-import.ts
          attribute("style") {
            remove()
          }
          # LEAVING FILE: nested-import.ts
          wrap("span", :id => "algol-span")
        }
        # LEAVING FILE: import 2.ts
      }
      attribute("class") {
        value() {
          set(fetch(fetch("where/is/this/coming/from?")))
        }
      }
      attribute("class") {
        value() {
          append(" ")
          append("something-else")
        }
      }
      copy_here(".//img[not(@alt)]")
      # ENTERING FILE: ../scripts/import-3.ts
      bottom() {
        insert_tag("p", "Getting tired of writing these.")
      }
      # LEAVING FILE: ../scripts/import-3.ts
    }
  }
}
# LEAVING FILE: false-negatives.ts