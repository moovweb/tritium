$("/html/body") {
  add_class("mw_bridalregistry_manage")
  add_class("mw_bridalregistry_manage_main")
  $(".//div[@id='main']") {
    $("./div[@id='content']") {
      $("./div[@id='mw_reg_deets']") {
        $("./div") {
          attribute("data-ur-state", "enabled")
        }
        $("./ul") {
          attribute("data-ur-state", "enabled")
        }
      }
      $("./div[@id='registry_confirm']") {
        $("./div[@id='hero']") {
          remove()
        }
        move_to("../div[@id='bread_crumb']", "after")
      }
      $(".//div[@id='registry_tools']") {
        remove()
      #  attribute("data-ur-set", "toggler")
      #  $("./h3") {
      #    add_class("mw_accordion_button")
      #    attribute("data-ur-toggler-component", "button")
      #  }
      #  $("./ul") {
      #    add_class("mw_accordion_content")
      #    attribute("data-ur-toggler-component", "content")
      #    $("./li") {
      #      add_class("mw_accordion_content_items")
      #      $("./a") {
      #        $("./img") {
      #          remove()
      #        }
      #      }
      #      $("./ul") {
      #        $("./li[p]") {
      #          remove()
      #        }
      #      }
      #    }
      #  }
      }
    }
  }
}
