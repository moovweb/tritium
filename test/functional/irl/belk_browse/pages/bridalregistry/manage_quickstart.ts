$("/html/body") {
  add_class("mw_bridalregistry_manage_quickstart")
  
  $(".//div[@id='registry_tools']") {
    $("./br") {
      remove()
    }
    $("./ul[@class='two_item']") {
      $("./li[h3[contains(text(), 'Personal & Home Care')]]") {
        attribute("mw_remove")
        insert_after("li") {
          insert_bottom("h3") {
            text("Home Care")
          }
          insert_bottom("a", href: "/AST/Main/Wedding_Primary/Personal_Home_Care.jsp") {
            text("Home Care")
          }
        }
        insert_after("li") {
          insert_bottom("h3") {
            text("Home Decor")
          }
          insert_bottom("a", href: "/AST/Main/Wedding_Primary/Home_Decor/Candles.jsp") {
            text("Candles & Lighting")
          }
          insert_bottom("a", href: "/AST/Main/Wedding_Primary/Home_Decor/Frames.jsp") {
            text("Frames")
          }
        }
        remove()
      }
      $("./li") {
        attribute("data-ur-set", "toggler")
        $("./br") {
          remove()
        }
        $("./img") {
          remove()
        }
        $("./a") {
          wrap("div", class: "mw_accordion_content_items")
          insert_bottom("div", class: "icons-subnav_arrow_right")
          move_to("../p", "bottom")
        }
        $("./h3") {
          attribute("data-ur-toggler-component", "button")
          attribute("data-ur-state", "disabled")
          add_class("mw_accordion_button")
          insert_bottom("div", class: "icons-nav_arrow_dn")
          insert_bottom("div", class: "icons-nav_arrow_up")
          inject_after("<div class='mw_links_container mw_accordion_content' data-ur-toggler-component='content'></div>") {
            move_here("../div[@class='mw_accordion_content_items']")
          }
        }
  
        $("./p") {
          remove()
        }
      }
    }
  }
}
