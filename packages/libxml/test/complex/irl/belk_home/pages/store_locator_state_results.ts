$("/html/body") {
  add_class("mw_store_locator_by_state")
  
  $(".//ul[@id='main_nav']") {
    remove()
  }
  
  $(".//div[@id='promo']") {
    remove()
  }
  
  $(".//div[@id='subnav']") {
    remove()
  }
  
  $(".//div[@id='content']") {
    $("./ul[@id='store_list']") {
      $("./a") {
        inject_before("<div class='mw_state_result'></div>")
      }
      $("./a | ./h3 | ./ul") {
        move_to("(preceding-sibling::div[@class='mw_state_result'])[last()]")
      }
      $("./div[@class='mw_state_result']") {
        attribute("data-ur-set", "toggler")
        $("./h3") {
          attribute("data-ur-toggler-component", "button")
          attribute("data-ur-toggler-state", "disabled")
          inject_bottom("<div class='icons-nav_arrow_dn'></div>")
          inject_bottom("<div class='icons-nav_arrow_up'></div>")
        }
        $("./ul") {
          attribute("data-ur-toggler-component", "content")
          attribute("data-ur-toggler-state", "disabled")
          $("./li") {
            $("./ul") {
              add_class("mw_state_store")
            }
          }
        }
      }
    }
  }
}
