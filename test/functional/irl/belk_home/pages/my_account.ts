$("/html/body") {
  add_class("mw_MyAccount")
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
    $(".//div[@id='subnav']") {
      remove()
    }
    $(".//div[@id='global_util_nav']/ul/li[contains(.,'My Account')]") {
      attribute("class", "mw_hide")
    }
    #Styling Past Orders Section
    $(".//h3/ul/li/a[contains(.,'View All Past Orders')]") {
      $("../../../.") {
        attribute("class", "mw_OrderHistoryHeader")
  
        #Wrap the element then add the wrapper class to it then add another class to the following element that later on will be moved inside the wrapper
        wrap("div", class: "mw_OrderHistoryWrap") {
          $("following-sibling::*[1]") {
            add_class("mw_OrderHisotryContent")
            
            $("./li[1]/ul/li/.") {
              name("label")
            }
            
            # Go through each of the subsequent li's (aka, the first one is the header) and copy the 
            # label from the column headers into each of the order items.
            $("./li[(position() > 1) and contains(@class, 'row')]/ul/li") {
              var("label_xpath") {
                set(fetch("@class"))
                prepend("../../../li[1]/ul/label[@class ='")
                append("']")
              }
              copy_here($label_xpath, "top")
            }
            
          }
          move_here("//ul[contains(@class,'mw_OrderHisotryContent')]") {
            $(".//ul[@class='header']") {
              remove()
            }
          }
        }
      }
    }
  
    #Styling the Wish list Section
    $(".//h3/ul/li[@class='label' and contains(.,'Wish List')]") {
      $("../../.") {
        attribute("class", "mw_WishListHeader")
        #Wrap the element then add the wrapper class to it then add another class to the following element that later on will be moved inside the wrapper
        
        wrap("div", class: "mw_WishLishWrap") {
          $("following-sibling::*[1]") {
            add_class("mw_WishListContent")
            $("./li[1]/ul/li/.") {
              name("label")
            }
            #Same concept as in the earlier part of the page
            $("./li[(position() > 1) and contains(@class, 'row')]/ul/li") {
              var("label_xpath") {
                set(fetch("@class"))
                prepend("../../../li[1]/ul/label[@class ='")
                append("']")
              }
              copy_here($label_xpath, "top")
            }
          }
  
          #Removing the original header lables
          move_here("//ul[contains(@class,'mw_WishListContent')]") {
            $(".//ul[@class='header']") {
              remove()
            }
          }
        }
      }
    }
    
    $(".//ul[@id='profile']") {
      $("./li[@class='row']") {
        $("./ul") {
          $("./li[@class='li3']") {
            $("./a") {
              move_to("../../li[@class='li1']/ul/li[2]", "bottom")
            }
          }
        }
      }
    }
  }
}

