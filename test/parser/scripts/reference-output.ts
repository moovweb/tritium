# ENTERING FILE: false-negatives.ts
var("x") {
  set(whatever())
}
html() {
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
      select("some/long/path/to/something/split/across/multiple/lines/and/concatenated") {
        move("top", node("1"), node("2"))
        insert_at("before", "div") {
          attribute("data-ur-bleeble:blabble") {
            value() {
              set("bork")
            }
          }
          move("top", node("2"), node("1"))
        }
        # ENTERING FILE: import 2.ts
        select(".//div[@class='something']") {
          move("bottom", node("1"), node("2"))
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
          insert_at("before", "span") {
            attribute("id") {
              value() {
                set("algol-span")
              }
            }
            move("top", node("2"), node("1"))
          }
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
      select(".//img[not(@alt)]") {
        dup() {
          move("bottom", node("1"), node("3"))
        }
      }
      # ENTERING FILE: import-3.ts
      bottom() {
        insert_tag("p", "Getting tired of writing these.")
      }
      # LEAVING FILE: import-3.ts
    }
  }
  select("//p[1]") {
    inner() {
      set("<p>\n  <strong>Last Night I Had a Banquet</strong>\n  That's right, I went to Safeway and got a large supreme frozen pizza. Cooked it in the oven for about 13 minutes, and then I ate it. A VERITABLE BANQUET.\n</p>")
    }
  }
}
# LEAVING FILE: false-negatives.ts