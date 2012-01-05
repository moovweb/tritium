# Global changes to Order Main and Details page
$("./body") {
  add_class("mw_order mw_ts_orders")
  $("./div[@id='mw_mainWrapper']") {
    $("./div[@id='header'] | ./div[@id='footer'] | ./link | ./ul[contains(@class, 'hideoffscreen')] | .//div[@id='breadcrumb']") {
      remove()
    }
  }
}

match($path) {

  # Matches Order's Main Page
  with(/yourorderscontainer\.jsp/) {
    $("./body") {
      add_class("mw_orderMain")

      # Order's Table
      $(".//div[@class='tableorders']") {
        $("./table") {
          name("div")
          add_class("mw_table")
        
          $("./tr[1]") {
            remove()
            $("./th") {
              name("span")
              add_class("mw_th")
              
            }
          }
          $("./tr") {
            name("div")
            add_class("mw_tr")
            $("./td") {
              name("div")
              add_class("mw_td")
              $("./a[contains(@title, 'Refund request')]") {
                $("..") {
                  remove()
                }
              }
              inner_wrap("span") {
                add_class("mw_content")
              }
            }
 
            $("./div[1]") {
              insert_top("label", "Slot Booked:", class: "mw_label")
            }
            $("./div[2]") {
              insert_top("label", "Order Number:", class: "mw_label")
            }
            $("./div[3]") {
              insert_top("label", "Total:", class: "mw_label")
            }
            $("./div[4]") {
              insert_top("label", "Status:", class: "mw_label")
            }


          }
          
        }
      }
      
      # Removing the "back to your account" link
      $(".//a[@href='accountmaincontainer.jsp']/..") {
        remove()
      }
      
    }
  }
  
  # Matches Order's Detail Page
  with(/orderdetailscontainer\.jsp/) {
    $("./body") {
      add_class("mw_orderDetail")
      $("./div[@id='mw_mainWrapper']") {
        $("./div[@class='noframes-content']/div[@id='options']") {
          remove()
        }
      }
      $(".//form[@name='refundForm1']") {
        remove()
      }
    }
  }
  
#   Ammending your orders
  with(/amendordercontainer\.jsp/) {
    $("./body") {
      add_class("mw_ammendingOrderConfirmation")
    }
  }
#   Canceling your order
  with(/cancelorderconfirmationcontainer.jsp/) {
    $("./body") {
      add_class("mw_cancellingOrderConfirm")
      $("./div/div/div/div/div[@id='footer']") {
        remove()
      }
    }
  }
}
