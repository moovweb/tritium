log($rewrite_link_host)
log($rewrite_link_matcher)
log($rewrite_link_replacement)


$("/html/body//div[@class='loggedOut' or @class='loggedIn']") {
  $("/html/body[not (contains(@class, 'home_page'))]") {
    # for all pages that are not the home page
    # remove navigation and unnecessary junk
    $("./div[@id='page_wrapper']/div[@id='page']") {
      $("./div[@id='header']//div[@class='nav']") {
        remove()
      }
    }
  }
  # tagname[contains(concat(' ', @class, ' '), ' classname ')]
  $("/html/body[not(contains(@class, 'search')) and not(contains(concat(' ', @class, ' '), ' landing ')) and not(@class='my_account')]") {
    $(".//div[@id='aside']") {
      remove()
    }
  }
  $("/html/body") {
    add_class("mw_redesign")
    $("./div[@id='wrapper' or @id='page_wrapper']") {
      $("./div[@id='page']") {
        $("./div[@id='header']") {
          $("./div[@class='loggedOut' or @class='loggedIn']") {
            # inject the header
            insert_top("div", id: "mw_header") {
              insert_bottom("div", id: "mw_masthead")
              insert_bottom("a", id: "mw_account", href: "#") {
                attribute("data-ur-id", "mw_account_menu")
                attribute("data-ur-toggler-component", "button")
                insert_bottom("div", class: "icons-account")
                insert_bottom("span", "Account")
              }
              insert_bottom("div", id: "mw_account_links") {
                attribute("data-ur-id", "mw_account_menu")
                attribute("data-ur-toggler-component", "content")
                insert_bottom("ul")
              }
            }
            $(".//div[@id='universal']") {
              remove()
            }
            $("./div[@id='shoppingBagPlaceHolder']") {
              $("./a[@id='shoppingBag']") {
                attribute("id", "mw_shoppingBag")
                                                   # not an issue on the device, but annoying in dev on the browser
                insert_bottom("div", class: "icons-shopping_bag")
                $("./p") {
                  $("./span[@id='num_bag_items']") {
                    wrap("span") {
                      inner() {
                        prepend("Your Bag (")
                        append(")")
                      }
                      move_to("../../.")
                    }
                  }
                  remove()
                }
              }
              # move the shopping bag info into the new header
              move_to("../div[@id='mw_header']/div[@id='mw_masthead']", "bottom")
            }
            $("./div[@class='masthead']") {
              $("./a") {
                move_to("../../div[@id='mw_header']/div[@id='mw_masthead']", "top")
                $("./div[@id='logo' or @id='logo_weddingRegistry']") {
                  add_class("icons-logo")
                  text("")
                }
              }
              $("./div[@id='mastheadLinks']") {
                $("./ul[@class='loginGreeting']") {
                  remove()
                }
                $(".//li[contains(@class, 'loginRequired') or contains(@class, 'logoutRequired')]") {
                  $("./a") {
                    inner_wrap("div", class: "mw_nav_text")
                    insert_bottom("div", class: "icons-white_nav_arrow_right")
                  }
                  move_to("../../../../div[@id='mw_header']/div[@id='mw_account_links']/ul")
                }
              }
            }
            $("./form[@id='global_frm_search']") {
              $("./fieldset[@id='search']") {
                $("./input[@id='global_search_box']") {
                  wrap("div", class: "mw_search_contain") {
                    insert_top("div", class: "icons-search_magnify")
                  }
                }
                $("./button[@class='btnSearch']") {
                  attribute("id", "mw_header_search_btn")
                  text("Search")
                  insert_bottom("div", class: "icons-white_nav_arrow_right")
                  move_to("../div[@class='mw_search_contain']")
                }
              }
            }
          }
        }
      }
    }
    $("/html/body[contains(@class, 'registry') or contains(@class, 'bridal')]") {
      $(".//div[@id='mw_header']") {
        inject_after("<div class='icons-wedding_reg_logo'></div>")   
      }
    }
  }
}


$(".//div[@id='snifferModal']") {
  remove()
}
$(".//div[@class='coda-slider-wrapper']") {
  remove()
}


# no function to wrap multiple node into one node, so have to wrap one, then move the other into it
# wrap logo in a div ID-ed as mw_header
$("./div[@id='page_wrapper']/div[@id='page']") {
  $("./div[@id='head']/div[@id='logo']") {
    wrap("div", id: "mw_header")
    $("./a") {
      add_class("icons-logo")
      $("./img") {
        remove()
      }
    }
  #    insert("<div id='mw_account' mw_accordion='MW_MENU' class='mw_accordion_button closed'><a href='javascript:void(0)'>Account</a></div>")
  
    inject_after("<div id='mw_account' data-ur-id='MW_MENU' data-ur-toggler-component='button' data-ur-state='disabled'><a href='javascript:void(0)'><div class='icons-account'></div>Account</a></div>")
  
  }
  $("./div[@id='global_error']") {
    # move global error into content area
    move_to("../div[@id='main']/div[@id='content']", "top")
  }
}

# then move the nav into mw_header
$(".//div[@id='global_util_nav']") {
  move_to("../div[@id='mw_header']/div[@id='logo']", "bottom")
  $("./ul[@class='secondary']") {
    $("./li[position()=2]") {
      attribute("id", "mw_auth_status")
    }
    $("./li[last()]") {
      remove()
    }
  }
  $("./ul[@class='secondary'][li/a[contains(.,'Sign Out')]]") {
    # if the sign out link is there, were logged in, add the wishlist link
    inject_bottom("<li id='mw_wishlist'><a href='/AST/Misc/Belk_Stores/My_Account/My_WishList.jsp'>Wish List</a></li>")
  }

  # add the account menu div
    # NOTE: The commented-out insert() line causes issues with the reference engine.
    # I created a test-case for it, but the insert_tag() statement is a good workaround.
    #insert("<div id='mw_account_menu'></div>"){
  insert_bottom("div", id: "mw_account_menu") {
      # move secondary nav items into the account menu
    move_here("../ul[@class='secondary']/li[position()>1]", "bottom") {
      name("div")
    }
    move_to("/html/body", "bottom")
    wrap("div", id: "mw_account_menu_container") {
      attribute("data-ur-toggler-component", "content")
      attribute("data-ur-id", "MW_MENU")
      attribute("data-ur-state", "disabled")
    }
  }
  
  #move primary header nav to footer
  $("./ul[@class='primary']") {
    move_to("//div[@id='footer']/div[contains(@class, 'five')]", "before")
    $("./li[@class='first']") {
      attribute("id", "mw_wedding_registry")
      attribute("data-ur-set", "toggler")
      move_to("//div[contains(@class, 'two')]", "before")
      name("div")
      $("./a") {
        name("div")
        text() {
          set("Wedding Registry")
        }
        inner_wrap("div") {
          insert_bottom("div", class: "icons-subnav_arrow_dn")
          insert_bottom("div", class: "icons-subnav_arrow_up")
        }
        attribute("data-ur-toggler-component", "button")
        attribute("data-ur-state", "disabled")
        inject_after("<ul data-ur-toggler-component='content' data-ur-state='disabled'><li><a href='/AST/Misc/Belk_Stores/My_Account/Bridal_Registry.jsp?mw_form=find'><div class='mw_nav_text'>Find a Registry</div><div class='icons-subnav_arrow_right'></div></a></li><li><a href='/AST/Misc/Belk_Stores/My_Account/Bridal_Registry.jsp?mw_form=create'><div class='mw_nav_text'>Create a Registry</div><div class='icons-subnav_arrow_right'></div></a></li><li><a href='/AST/Misc/Belk_Stores/My_Account/Bridal_Registry.jsp?mw_form=manage'><div class='mw_nav_text'>Manage Your Registry</div><div class='icons-subnav_arrow_right'></div></a></li></ul>")
      }
    }
    
    $("./li[position()<=2]") {
      attribute("class", "mw_hide")
    }
    $("./li[position()=last()]") {
      attribute("id", "mw_store_locator")
      $("./a") {
        text() {
          set("Find a Store")
        }
        inner() {
          prepend("<div class='icons-store_locator'></div><div class='mw_footer_btn_text'>")
          append("</div></div>")
        }
      }
      inject_after("<li id='mw_desktop_site'><a id='mw_desktop_link' href='http://belk.com'><div class='icons-desktop_site'></div><div class='mw_footer_btn_text'>Full Version</div></a></li>")
    }
  }
}

# move the search form to the end of mw_header
$(".//form[@id='frm_search']") {
  # add an attribute of id to the search button
  $(".//button[@name='btn_go_search']") {
    attribute("id", "mw_search_btn")
    inject_bottom("<div>Search</div>")
    inject_bottom("<div class='icons-white_nav_arrow_right'></div>")
      # insert("<div class='icons-search_icon'></div>")
  }
  move_to("../../div[@id='mw_header']", "bottom")
}

# shopping bag
$(".//div[@id='global_util_nav']/ul[@class='secondary']/li[position()=1]") {
  attribute("class", "")
                        #Tarun was annoyed by this, so I got rid of it for him.  All hail Tarun.
  attribute("id", "mw_shopping_bag")
  $("./a") {
    inject_top("<div class='icons-shopping_bag'></div>")
    inner() {
      replace(/Items/, "")
    }
    $("./span[contains(.,'Shopping Bag')]") {
      inner() {
        replace(/([^\s].*)/, "Your Bag")
      }
    }

    $("span[@id='num_bag_items']") {
      wrap("span") {
        inner() {
          append(")")
          prepend("(")
        }
      }
    }

  }
}

# Bread crumbs
match($path) {
  with(/\/wk25_Back_to_School\/|wk25_Back_to_School\.jsp/) {
    log("-->Breadcrumbs")
    log("---->Back to School")
    $("/html/body") {
      $(".//div[@id='bread_crumb']") {
        $("./ul") {
          $("./li[a[contains(text(), 'Shop By Brand')]]") {
            remove()
          }
          $("./li[a[contains(text(), 'Boutique')]]") {
            $("./a") {
              text("Home")
              attribute("href", "/home.jsp")
            }
          }
        }
      }
    }
  }
  with(/\/Featured_Shop\//) {
    log("-->Breadcrumbs")
    log("---->Featured Shop")
    $("/html/body") {
      $(".//div[@id='bread_crumb']") {
        $("./ul") {
          $("./li[2]") {
            $("./a") {
              name("span")
              attribute("href", "")
              move_to("../../li[3]/a", "top")
              text() {
                append(": ")
              }
            }
          }
          $("./li[4]") {
            $("./a") {
              name("span")
              attribute("href", "")
              move_to("../../li[3]/a", "bottom")
              text() {
                prepend(": ")
              }
            }
          }
        }
      }
    }
  }
  with(/\/Shop\/|\/Featured_Shop\.jsp|\/clearance_results\.jsp|search_results\.jsp.*?(Clearance|clearance)/) {
    log("-->Breadcrumbs")
    log("---->Shop")
    $("/html/body") {
      $("(.//div[@id='bread_crumb']/ul/li)[2]") {
        $("./a") {
          name("span")
          move_to("(//div[@id='bread_crumb']/ul/li)[3]", "top") {
            $("./span") {
              move_to("../a", "top")
            }
          }
        }
        remove()
      }
    }
  }
  else() {
    
  }
}

