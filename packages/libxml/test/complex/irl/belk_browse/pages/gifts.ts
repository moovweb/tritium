$("/html/body") {
  attribute("id", "mw_gifts")
  $("./div[@id='page_wrapper']/div[@id='page']/div[@id='main']") {
    $("./div[@id='content']") {
      $("./div[@id='prod_details_wrap']") {
        $("./div[@id='prod_details']") {
          $("./div[@id='prod_preview']") {
            $("./div[@class='image_wrap']") {
              remove()
            }
          }
          $("./div[@id='prod_options']") {
            $("./div[@id='prod_detail_tabs']") {
              $("./div[@id='overview_tab']") {
                attribute("mw_what")
                $("./p | ./br") {
                  remove()
                }
              }
              $("./div[@id='shipping_and_returns_tab']") {
                $("./br") {
                  remove()
                }
              }
            }
            $("./div[@class='links']") {
              remove()
            }
          }
        }
        $("./form") {
          $(".//div[@class='buttons']") {
            $("./button") {
              text("Add To Shopping Bag")
            }
          }
          $(".//ul[@class='stripeMe']") {
            $("./li[ul[@class='header_row']]") {
              remove()
            }
            $("./li") {
              attribute("data-ur-set", "toggler")
              $("./ul") {
                attribute("data-ur-toggler-component", "content")
                attribute("data-ur-state", "enabled")
                $("./li[@class='item']") {
                  attribute("data-ur-toggler-component", "button")
                  attribute("data-ur-state", "enabled")
                  $("./h3") {
                    add_class("mw_nav_text")
                  }
                  inject_bottom("<div class='icons-nav_arrow_dn'></div>")
                  inject_bottom("<div class='icons-nav_arrow_up'></div>")
                  name("div")
                  move_to("../../.", "top")
                }
                $("./li[@class='details']") {
                  $("./div[@class='image']") {
                    name("li")
                    move_to("../../.", "top")
                  }
                }
                $("./li[@class='price']") {
                  inject_top("<span>Price:</span>")
                }
                $("./li[@class='quantity']") {
                  inject_top("<span>Quantity:</span>")
                }
              }
            }
          }
        }
      }
    }
    $("./div[@id='sd']") {
      remove()
    }
  }
}
