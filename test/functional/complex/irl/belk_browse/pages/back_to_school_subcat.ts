$("/html/body") {
  add_class("mw_back_to_school_subcat")
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
            $("./li") {
              $("./h3") {
                remove()
              }
              $("./ul") {
                $("./li[not(a[@class='active'])]") {
                  remove()
                }
                $("./li/a") {
                  remove()
                }
                $(".//li/a") {
                  insert_bottom("div", class: "icons-subnav_arrow_right")
                }
                add_class("mw_bts_nav")
                move_to("../../.", "after")
              }
            }
            $("./li[@class='on_sale_now']") {
              remove()
            }
          }
          move_to("../div[@id='content']", "after")
        }
      }
    }
  }
}