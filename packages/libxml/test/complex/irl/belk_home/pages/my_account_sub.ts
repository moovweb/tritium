$("/html/body") {
  match($path, /\/My\_WishList\.jsp|\/my_account_wish_list\.jsp|\/Shopping_Bag\.jsp/) {
    add_class("mw_MyWishlist mw_ts_my_account_sub")
    $(".//div[@id='account_wishlist']") {
      attribute("mw_what")
      $("./fieldset/div[contains(@class, collapsible)]") {
        attribute("data-ur-set", "toggler")
        $("./h3") {
          attribute("data-ur-toggler-component", "button")
          attribute("data-ur-state", "enabled")
          insert_bottom("div", class: "icons-nav_arrow_dn")
          insert_bottom("div", class: "icons-nav_arrow_up")
          insert_after("div", class: "mw_wishlist_items", data-ur-toggler-component: "content", data-ur-state: "enabled")
        }
        $("./div[@class='panel_1']") {
          move_to("(preceding-sibling::div[@class='mw_wishlist_items'])[last()]")
        }
        attribute("class", "mw_collapsible")
      }
    }
  }
  
  $(".//button[contains(@class, 'action_2')]") {
    $("../../.") {
      add_class("mw_buttons")
    }
  }
  
  $(".//button[@name='add_cart_item']") {
    $("./div") {
      add_class("mw_bag_text")
      inner() {
        set("Add to Shopping Bag")
      }
    }
    inject_top("<div class='mw_bag_icon'></div>")
  }
  
  match($path, /\/my\_account\_edit\_profile\.jsp/) {
    $("//div[@id='account_details']/h3[1 and contains(.,'Change your Email Address')]") {
      $("/html/body") {
        add_class("mw_EditMyAccount mw_ts_my_account_sub")
      }
    }
  }
  
  match($path, /\/my\_account\_edit\_notifications\.jsp/) {
    $("//div[@id='account_details']/h3[1 and contains(.,'Change Your Email Preferences')]") {
      $("/html/body") {
        add_class(" mw_EditMyNotification mw_ts_my_account_sub")
      }
    }
  }
  
  #My Order List Page
  match($path, /\/My_Orders\.jsp|\/Order_Status\.jsp/) {
    add_class(" mw_MyOrderList mw_ts_my_account_sub")
    $("//ul[@id='recent_orders']") {
      wrap("div", class: "mw_RecentOrdersWrapper") {
        move_here("//div[@id='account_details']/h3[1]", "top")
      }
      
      $("./li[1]/ul/li/.") {
        name("label")
      }
      
      $("./li[(position() > 1) and contains(@class, 'row')]/ul/li") {
        var("label_xpath") {
          set(fetch("@class"))
          prepend("../../../li[1]/ul/label[@class = '")
          append("']")
        }
        copy_here($label_xpath, "top")
      }
      
      $("./li[1]") {
        remove()
      }
  
  
      
      
      
    }
  }
  
  match($path, /\/order\_details\.jsp/) {
    add_class("mw_OrderDetails mw_ts_my_account_sub")
  
    $(".//div[@id='content']") {
      $("./div[@id='account_details']") {
        $("./div[@id='search_description']") {
          add_class("mw_OrderTrackWrap")
        }
      }
      $(".//ul[@id='order_info']") {
        add_class("mw_OrderInfo")
        $("./li/ul[@class='header']") {
          remove()
        }
        $("./li/ul/li[@id='ship_info']") {
          $("..") {
            add_class("mw_OrderInfoWrap")
  
            $("./li[@id='ship_info']") {
              wrap("div", class: "mw_ShippingInfoWrapper") {
                
              }
              inject_before("<div class='mw_ShipingInfoLabel mw_mainLabel'>Shipping Information</div>")
            }
  
            $("./li[@id='bill_info']") {
              wrap("div", class: "mw_PaymentInfoWrapper") {
              }
              inject_before("<div class='mw_PaymentInfoLabel mw_mainLabel'>Payment Information</div>")
            }
  
          }
        }
      }
  
      $("./ul[@id='order_items']") {
        $("preceding-sibling::*[1]") {
          add_class("mw_mainLabel mw_OrderInfoLabel")
        }
        
        wrap("div", class: "mw_OrderItemsWrapper") {
          move_here("..//h3[contains(@class,'mw_OrderInfoLabel')]", "top")
        }
  
        # Header ul... we will copy this information out into each row soon.
        # modify it first by making it a label
        $("./li[1]/ul/li//strong") {
          name("label")
        }
        
        # Go through each of the subsequent li's (aka, the first one is the header) and copy the 
        # label from the column headers into each of the order items.
        $("./li[(position() > 1) and contains(@class, 'row')]/ul/li") {
          var("label_xpath") {
            set(fetch("@class"))
            prepend("../../../li[1]/ul[1]/li[@class = '")
            append("']//label")
          }
          copy_here($label_xpath, "top")
        }
        
        $("./li[1]") {
          remove()
        }
      }
  
    }
  }
  
  $("//div[@id='page']") {
    $(".//div[@id='head']") {
      $("./ul[@id='main_nav']") {
        attribute("class", "mwRemoveMe")
      }
      $("./div[@id='promo']") {
        attribute("class", "mwRemoveMe")
      }
      $("./div[@id='search_bar']") {
        attribute("class", "mwRemoveMe")
      }
      $("./*[@class='mwRemoveMe']") {
        remove()
      }
    }
    $("./div[@id='main']") {
      $("./div[@id='content']") {
        $("./div[@id='wishlist_links']") {
          move_to("../div[@id='bread_crumb']", "after")
          $("./ul") {
            $("./li[@class != 'email']") {
              remove()
            }
          }
        }
      }
    }
    $(".//div[@id='subnav']") {
      remove()
    }
    $(".//div[@id='global_util_nav']/ul/li[contains(.,'My Account')]") {
      attribute("class", "mw_hide")
    }
  }
}

