$("//div[contains(@class,'header_top_nav_links')]") {
  move_to("//div[contains(@class,'header_container')]", "top")
  name("ul")
  $("./a") {
    wrap("li")
    insert_bottom("div", class: "icons-white-link-arrow")
  }
  $("./text()") {
    remove()
  }
  add_class("topnavLinks")
}

$("div[@class='header_container']") {
  $("div[@id='logoImage']") {
    attribute("id", "banner_img")
    
    # move logo image to here however deep it is nested
    move_here(".//a[img[contains(@id, 'ctl00_ctlHeader_BNImage')]]")
    
    # transform the image
    $(".//img[contains(@id, 'ctl00_ctlHeader_BNImage')]") {
      name("div")
      attribute("src") {
        remove()
      }
      attribute("style") {
        remove()
      }
      add_class("icons-logo")
    }
    
  }
  $("div[contains(@id, 'Header_Header')] | br") {
    remove()
  }
  # Listify the tabular top navigation menu.
  # $("div[@id='topNav']") {
  #   name("ul")
  #   attribute("id", "topNavMenu")
  #   $("table//a") {
  #     # Extract the link title text and remove the image
  #     text("")
  #     insert_top("span", class: "mw_menu_item") {
  #       text(fetch("./../@title"))
  #       insert_top("div", class: "icons-white-link-arrow")
  #     }
  #     # Move the link to the navigation menu
  #     move_to("/html/body/form/div[@id='mainContainer']/div[@id='header']//ul[@id='topNavMenu']", "bottom")
  #   }
  #   $("table") {
  #     remove()
  #   }
  # }
  # Pull out the cart summary link and flatten the structure
  move_here("//div[@id='cart_items']") {
    attribute("id", "c_3")
  }
  # Save shopping cart related scripts (for now...)
  move_here("div[@id='topNav']/div[@id='shoppingCart2']/script")
  $("div[@id='topNav']/div[@id='shoppingCart2' or @id='c_Tier']") {
    remove()
  }
  $("div[@id='c_3']") {
    name("span")
    $("a[@title='Checkout']") {
      remove()
    }
    move_here("a[2]", "bottom")
    wrap("div", id: "cartSummary") {
      move_here("span/a[2]", "bottom")
      move_here("span/a", "bottom")
      wrap("div", id: "mw_outerCartSummary")
    }
  }
  # Create the top menu button
  insert_bottom("div", "Menu", id: "topNavButton") {
    attribute("data-ur-toggler-component", "button")
    attribute("data-ur-state", "disabled")
    attribute("data-ur-id", "topNavAccordion")
    # Add icons using sprites
    insert_bottom("span", class: "icons-menu-open")
    insert_bottom("span", class: "icons-menu-closed")
  }
  move_here("//ul[contains(@class,'topnavLinks')]", "bottom") {
    wrap("div", class: "mw_top_nav_container") {
      attribute("data-ur-toggler-component", "content")
      attribute("data-ur-state", "disabled")
      attribute("data-ur-id", "topNavAccordion")
    }
  }
  # Add the search bar unless disabled with $mw_no_search_bar
  match($mw_no_search_bar) {
    with("true") {
      $("div[@id='searchBar']") {
        remove()
      }
    }
    else() {
      $("//div[@id='searchBar']") {
        wrap("div", id: "mw_search_container") {
          move_to("..", "bottom")
        }

        move_here(".//input[@id='searchButton']") {
            attribute("value") {
                remove()
            }
            attribute("onfocus") {
                remove()
            }
            attribute("onblur") {
                remove()
            }
            attribute("style") {
                remove()
            }
            attribute("placeholder", "search site:")
        }
        move_here(".//input[@type='image']") {
          attribute("onfocus") {
            remove()
          }
          attribute("onfocusout") {
            remove()
          }
          attribute("onblur") {
            remove()
          }
          attribute("onmouseover") {
            remove()
          }
          attribute("onmouseout") {
            remove()
          }
          attribute("src") {
            remove()
          }
          attribute("onclick") {
            value("window.location.href='http://www.barenecessities.com/search.aspx' + '?search=' + encodeURIComponent(searchButton.value) + '&action=true&ft=1';") {
            rewrite("link")
          }
          }
          attribute("type", "button")
          attribute("value", "GO")
        }

        $("div") {
          remove()
        }

        insert_top("div", class: "icons-search-icon")
      }
    }
  }
  # Remove a bunch of stuff from the header if in the checkout flow
  match($checkout, "true") {
    $("div[@id != 'banner_img']") {
      remove()
    }
  }
}

# Header Fixes 10/28/11
$("//div[contains(@class,'header_right_container')]") {
  move_here(".//div[@id='mw_search_container']","before")
  remove()
}
$("//div[@id='mw_search_container']") {
  move_to("//div[contains(@class,'mw_top_nav_container')]","after")
}
# $("//div[@id='banner_img']") {
#   $("./img"){
#     remove()
#   }
#   insert_top("div", class: "icons-logo")
# }