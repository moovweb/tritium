$("/html/body") {
  add_class("mw_bonus_days_subcat")
  $("./div[@id='page_wrapper']") {
    $("./div[@id='page']") {
      $("./div[@id='article']") {
        $("./div[@id='content']") {
          $("./div[@id='hero']") {
            $("./img") {
              remove()
            }
          }
        }
        $("./div[@id='aside']") {
          $("./ul[@class='collapsibleNav']") {
            $("./li[contains(@class,'on_sale_now')]") {
              move_to("../li/ul","bottom")
            }
            $("./li") {
              $("./h3") {
                remove()
              }
              $("./ul") {
                $(".//li/a") {
                  insert_bottom("div", class: "icons-subnav_arrow_right")
                }
                add_class("mw_bts_nav")
                move_to("../../.", "after")
                }
            }
            remove()
          }

          move_to("../div[@id='content']", "after")
        }
      }
    }
  }
}
