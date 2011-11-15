##### Cart ######
add_class(" mw_cart")

$(".//*[(@id='promo') or (@id='main_nav')]") {
  remove()
}

$(".//div[@id='sd']") {
  remove()
}

$(".//div[@id='modal_quickview']") {
  add_class("modal_added")
}

$(".//div[@id='content']") {
  $("./form") {
    $("./h1") {
      move_to("../.", "before")
    }
    
    $("./div[@class='checkout_btn']") {
      $("./button[@class='action_1']") {
        text() {
          set("")
        }
        inject_bottom("<span>CHECKOUT NOW</span><span>&rsaquo;</span>")
      }
    }
    
    $("ul[@id='sb_hdr']") {
      remove()
    }

    # i'm removing classnames on certain elements because they're keying on
    # them to update the cart via ajax.  When the response comes back,
    # all my transformations are gone because it rewrites the page html with
    # the ajax html
    $("./ul[@id='sb_line_items']") {
      $("./li[@class='line_item']") {
        $("./ul") {
          attribute("mw_what")
          $("./li[@class='item']") {
            $("./div[@class='description']") {
              $("./p[@class='prod_name']") {
                move_to("../../.", "top")
              }
              $("./p[a[@class='quickedit']]") {
                attribute("mw_what")
                move_to("../../../../div[@class='item_actions']", "top")
              }
              move_here("../../li[@class='price'] | ../../li[@class='quantity'] | ../../li[@class='total']") {
                name("div")
              }
              $("./div[@class='total'][p]") {
                $("./p[1]") {
                  inject_top("<b>Total: </b>")
                  move_to("../../.", "bottom")
                }
                move_to("../.", "top")
              }
              $("./div[@class='total' and not(p)]") {
                inject_top("<b>Total: </b>")
              }
              $("./div[@class='price']") {
                inject_top("<b>Original Price: </b>")
                move_to("../p[@class='style_num']", "after")
              }
              $("./div[@class='quantity']") {
                attribute("style", "")
                inject_top("<b>Qty: </b>")
                $("./select") {
                  attribute("class", "mw_quantity mw_nerfed")
                }
                move_to("../div[@class='price']", "after")
              }
              $("./p[contains(text(), '/')]") {
                add_class("mw_color_size")
                inject_top("<b>Size/Color: </b>")
              }              
              $("./div[@id='edvOverlay']") {
                move_to("../.", "bottom")
                attribute("style", "")
              }
            }
          }

          #$("./li[@class='item']") {
          #  after() {
          #    insert("<li class='mw_price'><b>Price:</b></li>")
          #  }
          #  $("./div[@class='description']/p[a[@class='quickedit']]") {
          #    name("li")
          #    move_to("../../../../div[@class='item_actions']/ul", "top")
          #  }
          #}
          #$("./li[@class='price']") {
          #  name("p")
          #  move_to("../li[@class='mw_price']", "bottom")
          #}
          #$("./li[@class='quantity']") {
          #  html() {
          #    prepend("<b>Qty:</b>")
          #  }
          #  $("./select[@class='quantity']") {
          #    # remove class
          #    attribute("class", "mw_quantity mw_nerfed")
          #  }
          #  move_to("../li[@class='total']", "after")
          #}
          #$("./li[@class='total']") {
          #  top() {
          #    insert("<b>Total:</b>")
          #  }
          #}
          #$("./li[@class='mw_price' or @class='total' or @class='quantity']") {
          #  name("p")
          #  move_to("../li[@class='item']/div[@class='description']", "bottom")
          #}
        }
        
        $("./div[contains(@class, 'gift_options')]") {
          attribute("data-ur-set", "toggler")
          $(".//img") {
            remove()
          }
          $("./label") {
            attribute("data-ur-toggler-component", "button")
            $("./input[@type='checkbox']") {
              # remove class
              attribute("class", "mw_nerfed")
            }
          }
          $("./ul") {
            attribute("data-ur-toggler-component", "content")
            $(".//input[@type='radio' and contains(@class, 'gift_wrap')]") {
              # remove class
              attribute("class", "mw_nerfed")
            }
          }
        }
      }
    }
    
    $("div[@id='sb_ft']") {
      attribute("mw_what")
      #move_to("../div[@class='checkout_btn']", "before")
      $("./ul[@class='coupon']") {
        attribute("mw_what")
        #attribute("data-ur-toggler-component", "content")
        #attribute("data-ur-state", "enabled")
        #add_class("mw_accordion_content")
        $("./li[not (@class='code') and not(@class='apply')]") {
          remove()
        }
        $("./li[@class='code']") {
          $("./label") {
            remove()
          }
          $("./input[@type='text']") {
            attribute("placeholder", "Enter Coupon Code")
          }
        }
        $("./li[@class='apply']") {
          $("./button") {
            $("./div") {
              text("Apply")
            }
          }
        }
        wrap("div") {
        #  #attribute("data-ur-set", "toggler")
          attribute("id", "mw_coupon")
          inject_top("<div>Savings</div>")
        #  # {
        #  #    attribute("class", "mw_accordion_button")
        #  #    attribute("data-ur-toggler-component", "button")
        #  #    attribute("data-ur-state", "enabled")
        #  #    bottom() {
        #  #      insert("<div class='icons-nav_arrow_dn'></div>")
        #  #      insert("<div class='icons-nav_arrow_up'></div>")
        #  #    }
        #  #  }
        }
        #$("./li[contains(@class, 'hover_modal_container')]") {
        #  attribute("data-ur-set", "toggler")
        #  $("./h4") {
        #    remove()
        #  }
        #  $("./a[contains(@class, 'hover_modal_a')]") {
        #    attribute("data-ur-toggler-component", "button")
        #    attribute("class", "")
        #    attribute("href", "javascript:void(0)")
        #  }
        #  $("./div[contains(@class, 'hover_modal_div')]") {
        #    attribute("data-ur-toggler-component", "content")
        #  }
        #}
      }
      $("./ul[@class='summary']") {
        attribute("mw_what")
        #move_to("../.", "top")
        #$("./li[@class='hdr']") {
        #  remove()
        #}
        #$("./li[@class='sales_taxes']") {
        #  remove()
        #}
        #$("./li//label[@class='textForShipping']") {
        #  remove()
        #}
        ##attribute("data-ur-toggler-component", "content")
        ##attribute("data-ur-state", "enabled")
        ##add_class("mw_accordion_content")
        wrap("div") {
        #  #attribute("data-ur-set", "toggler")
          attribute("id", "mw_summary")
          inject_top("<div>Order Summary</div>")
        #  # {
        #  #    attribute("class", "mw_accordion_button")
        #  #    attribute("data-ur-toggler-component", "button")
        #  #    attribute("data-ur-state", "enabled")
        #  #    bottom() {
        #  #      insert("<div class='icons-nav_arrow_dn'></div>")
        #  #      insert("<div class='icons-nav_arrow_up'></div>")
        #  #    }
        #  #  }
        }
      }
    }
    
    $("div[@id='sb_actions']") {
      $("./button[@class='action_1']") {
        $("./div") {
          name("span")
        }
        inject_bottom("<span>&rsaquo;</span>")
      }
      #$("./button[@class='action_2l']") {
      #  add_class("mw_back_to_foo")
      #}
      $("./button[@class='action_2r']") {
        #add_class("mw_back_to_foo")
        move_to("../button[@class='action_1']", "before")
      }
      #$("./button[@id='btn_update_bag']") {
      #  add_class("mw_back_to_foo")
      #}
    }
  }
}
