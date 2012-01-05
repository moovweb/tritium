$("/html/body") {
  add_class("mw_my_account_common")
  $(".//div[@id='main']/div[@id='aside']") {
    $("./ul") {
      attribute("class", "")
      $("./li") {
        attribute("data-ur-set", "toggler")
        $("./h3") {
          attribute("data-ur-toggler-component", "button")
          insert_bottom("div", class: "icons-nav_arrow_dn")
          insert_bottom("div", class: "icons-nav_arrow_up")
        }
        $("./ul") {
          attribute("data-ur-toggler-component", "content")
          $("./li[not(contains(., 'Billing & Payment'))]") {
            remove()
          }
          
          $("./li[not(contains(@class, 'mw_hide'))]") {
            $("./a") {
              insert_bottom("div", class: "icons-subnav_arrow_right") 
            }
          }
        }
      }
    }
    move_to("../div[@id='content']/div[@id='bread_crumb']", "after")
  }
}
