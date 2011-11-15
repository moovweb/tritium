$("/html/body") {

  attribute("id", "mw_privacy")
  
  $(".//*[@id='main_nav' or @id='promo' or @id='subnav' or @id='bread_crumb']") {
    remove()
  }
  
  $(".//div[@id='content'][h1[contains(.,'Privacy & Security')]]") {
    $("//ul[contains(@class,'simple_list')][1]") {
      remove()
    }
    $("br | b") {
      remove()
    }
    ## Fix idiosyncratic or broken bits to regularize the structure (BRITTLE)
    $("p[3]") {
      inner_wrap("b")
    }
    $("p/b[text()='Customer Service' or text()='1-866-235-5443']") {
      name("strong")
    }
  
    ## Break up the flat list of paragraphs into different sections for accordions
    $("p/b") {
      $("../.") {
        name("div")
        attribute("handle", "mw_bucket")
      }
    }
    ## Pull contiguous blocks of p and ul tags inside their headers
    $("p | ul") {
      move_to("(preceding-sibling::div[@handle='mw_bucket'])[last()]", "bottom")
    }
  
    ## Add the right attributes to enable the accordion functionality
    $("div[@handle='mw_bucket']") {
      $("./b") {
        attribute("data-ur-toggler-component", "button")
        insert_bottom("div", class: "icons-nav_arrow_dn")
        insert_bottom("div", class: "icons-nav_arrow_up")
      }
      $("(p | ul)[1]") {
        wrap("div") {
          attribute("data-ur-toggler-component", "content")
          add_class("closed")
          move_here("../p | ../ul")
        }
      }
      attribute("toggle-button", "b")
      attribute("toggle-selector", "div")
      attribute("data-ur-set", "toggler")
    }
  }
  
  $(".//div[@id='content'][h1[contains(.,'Easy Returns')]]") {
    add_class("mw_easy_returns")
    $("br | b") {
      remove()
    }
    $("./h2[position()>1]") {
      inject_before("<div class='mw_returns_main'></div>")
    }
    $("./h3[position()=2]") {
      inject_before("<div class='mw_item_specific_return_container'></div>")
    }
    $("./h3[position()>1]") {
      add_class("mw_item_specific_return")
    }
    $("h3 | p") {
      move_to("(preceding-sibling::div[@class='mw_item_specific_return_container'])[last()]", "bottom")
    }
    $("h2 | h3 | p") {
      move_to("(preceding-sibling::div[@class='mw_returns_main'])[last()]", "bottom")
    }
    $("./div[@class='mw_returns_main']") {
      attribute("toggle-button", "h2")
      attribute("toggle-selector", ".mw_accordion_content")
      attribute("data-ur-set", "toggler")
      $("./h2") {
        attribute("data-ur-toggler-component", "button")
        inject_after("<div class='mw_accordion_content closed' data-ur-toggler-component='content'></div>")
      }
      $("*[position()>2]") {
        move_to("(preceding-sibling::div[contains(@class,'mw_accordion_content')])[last()]", "bottom")
      }
    }
    $("./div[@class='mw_item_specific_return_container']") {
      $("./h3") {
        attribute("data-ur-toggler-component", "button")
        inject_before("<div class='mw_accordion_container' data-ur-set='toggler'></div>")
      }
      $("./p") {
        add_class("closed")
        attribute("data-ur-toggler-component", "content")
      }
      $("p | h3") {
        move_to("(preceding-sibling::div[contains(@class,'mw_accordion_container')])[last()]", "bottom")
      }
    }
  }
}
