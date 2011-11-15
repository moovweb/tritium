$("/html/body") {
  add_class("mw_featured_shop mw_ralph_lauren")
  $("./div[@id='page_wrapper']/div[@id='page']") {
    $("./div[@id='head' or @id='header']") {
      $(".//div[@class='nav']") {
        remove()
      }
      $(".//div[@id='promo']") {
        remove()
      }
    }
    $("./div[@id='main']") {
      $("./div[@id='aside']") {
        remove()
      }
      $("./div[@id='content']") {
        $("./div[@id='split']") {
          $("./a[1]") {
                        # i know this is brittle, but this page was a bit of a curveball
            match(fetch("@href")) {
              with(/Ralph_Lauren/) {
                log("RALPH EFFING LAUREN")
                $("../.") {
                  insert_before("h1", "Ralph Lauren")
                }
              }
              else() {
                log("no match on href")
              }
            }
          }
          $("./a") {
            var("linkName", fetch("@id"))
            $("./span") {
              name("div")
              text($linkName) {
                replace(/split_/, "")
              }
              insert_bottom("div", class: "icons-subnav_arrow_right")
            }
          }
        }
      }
    }
  }
  
}
