$("/html/body") {
  add_class("mw_collegiate")
  $("./div[@id='page_wrapper']") {
    $("./div[@id='page']") {
      $("./div[@id='header']//div[@class='nav']") {
        remove()
      }
      $("./div[@id='main']") {
        $("./div[@id='content']") {
          $("./div[@id='bread_crumb']") {
            remove()
          }
          $("./div[@id='collegiate']") {
            inject_before("<h1>Collegiate</h1>")
            $("./img") {
              remove()
            }
            $("./table") {
              $(".//tr[@class='row two' or @class='row three']") {
                $("./td/a") {
                  inject_bottom("<div class='icons-subnav_arrow_right'></div>")
                  move_to("../../../../.")
                }
              }
              remove()
            }
          }
        }
      }
    }
  }
}
