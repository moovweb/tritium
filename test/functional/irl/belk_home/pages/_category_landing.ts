$("/html/body") {
  add_class("mw_cat_landing")
  $("./div[@id='page_wrapper']/div[@id='page']") {
    $("./div[@id='article']") {
      $("./div[@id='aside']") {
        move_to("../div[@id='content']", "after")
        $("./ul") {
          $("./li") {
            attribute("data-ur-set", "toggler")
            $("./h3") {
              attribute("data-ur-toggler-component", "button")
              attribute("data-ur-state", "disabled")
              insert_bottom("div", class: "icons-nav_arrow_up")
              insert_bottom("div", class: "icons-nav_arrow_dn")
              $("./span") {
                remove()
              }
            }
            $("./ul") {
              attribute("data-ur-toggler-component", "content")
              attribute("data-ur-state", "disabled")
              $(".//li") {
                $("./a") {
                  insert_bottom("div", class: "icons-subnav_arrow_right") 
                }
              }
            }
            $("./h3[contains(text(), 'Category')]") {
              attribute("data-ur-state", "enabled")
              $("../ul") {
                attribute("data-ur-state", "enabled")
              }
            }
          }
        }
      }
      $("./div[@id='content']") {
        $("./div[@id='hero']") {
          remove()
        }
      }
    }
  }

}