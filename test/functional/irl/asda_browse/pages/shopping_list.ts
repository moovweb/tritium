match($path) {
  # The container page for Shopping Lists
  with(/shoppinglistcontainer\.jsp/) {
    $("./body") {
      add_class("mw_shoppingListContainer mw_ts_shopping_list")
    }
    # This page can also be a none framed page when hit from the checkout summary
    # Want to make sure that it does not affect the other parts of the page
    $("./body[contains(@class, 'noframes')]") {
      $("./div[@id='mw_mainWrapper']") {
        $("./div[@id='header']|./div[@id='footer']|./link") {
          remove()
        }
        $("./div[@id='shoppingList']") {
          $(".//a[contains(@href, 'helppageslinkscontainer.jsp')]") {
            remove()
          }
          $(".//table") {
            $(".//td") {
              attribute("width","")
            }
          }
        }
      }
    }
  }
  # The inner main frame for Shopping Lists
  with(/Shoppinglistlayout|shoppinglist_linkview\.jsp/){
    $("./body") {
      add_class("mw_shopListMain mw_ts_shopping_list")
      $("./div[@id='mw_header'] | ./div[@id='mw_footer']") {
        remove()
      }

      
      $("./div[@id='mw_mainWrapper']") {
        # adding a class to the body for styling purposes for
        # Shopping List Details page
        $("./div/div[@id='personalDetails']/div[@id='order']/div/h2[@class='sifr' and contains(text(),'Shopping list details')]") {
          $("/html/body") {
            add_class("mw_shopListDetailsMain")
          }
        }
        
        # only on shoppinglist_linkview.jsp
        $("./div/div[@id='shoppingList']") {
          $(".//a[contains(@href, 'helppageslinkscontainer.jsp')]") {
            remove()
          }
          $(".//table") {
            $(".//td") {
              attribute("width","")
            }
          }
        }
        
        
        # Removing the Pre Made List link
        $(".//a[contains(@href, 'premadelistscontainer.jsp')]") {
          attribute("href","")
          name("span")
        }
              
        # weird one time scenario - additional ASDA stylesheet inside a div in the body (Removing it)
        $("./div/link | ./div/script[contains(@src, 'asdaEstore')]") {
          remove()
        }
        
        # Clean up the page by removing the unnecessary items
        $("./ul[contains(@class,'accesskeys')] | ./link | .//div[@id='footer'] | ./div/div/div[@id='quickshop-nav-wrapper'] | ./div[@id='breadcrumb'] | ./div[@class='dropbelow']") {
          remove()
        }

#         $("./div/form/div[@id='shoppingList']") {
#           $("./div/p[@class='padded']/a[contains(@href, 'premadelistscontainer.jsp')]") {
#             $("..")  
#           }
#         }
        $(".//form[@id='contshopform']") {
          attribute("target","_parent")
        }
        $(".//a[contains(@href,'accountmaincontainer.jsp')]") {
          remove()
        }
      }
    } 
  }

  
  # The container page for Search By Shopping List
  with(/searchbylistcontainer\.jsp/) {
    $("./body") {
      add_class("mw_searchListContainer")
    }    
  }
  
  # The inner main frame for Search By Shopping List
  with(/searchbylistlayout\.jsp/){
    $("./body") {
      add_class("mw_searchListMain")
      $("./div[@id='mw_header'] | ./div[@id='mw_footer']") {
        remove()
      }
      $("./div[@id='mw_mainWrapper']") {
        # Clean up the page by removing the unnecessary items
        $("./ul[contains(@class,'accesskeys')] | ./div[@id='footer'] | ./div/div[@id='quickshop-nav-wrapper']") {
          remove()
        }
      }
    }
  }


}

