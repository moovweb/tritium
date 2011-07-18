# ENTERING FILE: false-negatives.ts
var("x") {
  set(whatever())
}
xhtml() {
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
        insert_at("before", "div") {
          attribute("data-ur-bleeble:blabble") {
            value() {
              set("bork")
            }
          }
        }
        move_to("preceding-sibling::div[1]", "top") {
        }
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
          insert_at("before", "span") {
            attribute("id") {
              value() {
                set("algol-span")
              }
            }
          }
          move_to("preceding-sibling::span[1]", "top") {
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
      copy_here(".//img[not(@alt)]")
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