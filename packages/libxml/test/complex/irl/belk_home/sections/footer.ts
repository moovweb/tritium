# webqaa.belkinc.com stuff
$("/html/body[contains(@class, 'mw_redesign')]") {
  $("/html/body") {
    insert_bottom("div", id: "mw_footer") {
      $("/html/body[not (contains(@class, 'registry')) and not (contains(@class, 'bridal'))]") {
        $("/html/body") {
          attribute("mw_what")
        }
        $("/html/body/div[@id='mw_footer']") {
          insert_bottom("div", id: "mw_footer_wedding_reg") {
            insert_bottom("ul") {
              insert_bottom("li", "<a href='#'><div class='mw_nav_text'>Find a Registry</div></a>")
              insert_bottom("li", "<a href='#'><div class='mw_nav_text'>Create a Registry</div></a>")
              insert_bottom("li", "<a href='#'><div class='mw_nav_text'>Manage Your Registry</div></a>")
            }
          }
        }
      }
      insert_bottom("div", id: "mw_footer_email_signup")
      insert_bottom("div", id: "mw_footer_more_info", class: "mw_subnav_toggle_set")
      insert_bottom("div", id: "mw_footer_buttons")
      insert_bottom("div", id: "mw_footer_copyright")
      insert_bottom("div", id: "mw_footer_social_share") {
        insert_bottom("a", href: "http://www.facebook.com/Belk", class: "icons-fb")
        insert_bottom("a", href: "http://www.twitter.com/belkfashionbuzz", class: "icons-twitter")
      }
    }
    
    $("./div[@id='wrapper' or @id='page_wrapper']/div[@id='page'] | ./div[@id='page_wrapper']") {
      # footers are structured differently on different pages of belk
      $("./div[@id='footer'] | ./div[@id='article']/div[@id='footer'] | ./div[@id='main']/div[@id='footer']") {
        $("./div[@class='homeLowerAdBar']") {
          remove()
        }
        $("./div[@class='signupAndSocial']") {
          $("./div[@class='signup']") {
            move_to("/html/body/div[@id='mw_footer']/div[@id='mw_footer_email_signup']")
          }
          $("./div[@class='goMobile']") {
            remove()
          }
          $("./div[@class='social']") {
            remove()
          }
          $("./div[@class='managePreferences']") {
            # move privacy policy link
            $("./ul/li[@class='privacy']") {
              move_to("/html/body/div[@id='mw_footer']/div[@id='mw_footer_more_info']")
            }
          }
        }
        #$("./div[@id='footer']") {
          $(".//div[@class='footerNav']") {
            $("./div[contains(@class, 'four')]") {
              # move shipping information link
              $("./ul") {
                $("./li[a[contains(text(), 'Shipping')]]") {
                  move_to("/html/body/div[@id='mw_footer']/div[@id='mw_footer_more_info']")
                }
              }
            }
          }
          $(".//div[@class='legal']") {
            move_to("/html/body/div[@id='mw_footer']/div[@id='mw_footer_copyright']")
          }
          $("/html/body//button[@name='add_to_cart'] | /html/body//button[@title='Checkout Now']") {
            $("/html/body//div[@class='footerMessage']") {
              inner() {
                replace(/(1-866-235-5443)/, "<a href='tel:\\1'>1-866-235-5443</a>")
              }
              move_to("/html/body//button[@name='add_to_cart']", "after")
              move_to("/html/body//div[@id='sb_actions']/button[@title='Checkout Now']", "after")
            }
          }
        #}
        remove()
      }
    }
    $(".//div[@id='mastheadLinks']") {
      $("./ul[li/a[contains(text(), 'Find A Store')]]") {
        $("./li[2]") {
          # move Find A Store link
          $("./a") {
            attribute("id", "mw_find_a_store")
            move_to("/html/body/div[@id='mw_footer']/div[@id='mw_footer_buttons']")
          }
        }
        $("./li/a[contains(., 'Wedding Registry')]") {
          # move Wedding Registry Link
          var("wedding_href", fetch("@href"))
          $("../.") {
            move_to("/html/body/div[@id='mw_footer']/div[@id='mw_footer_wedding_reg']", "top")
          }
        }
      }
      $("./ul[2]") {
        $("./li[2]") {
          $("./a") {
            text("Contact Information")
          }
          move_to("/html/body/div[@id='mw_footer']/div[@id='mw_footer_more_info']")
        }
      }
      remove()
    }
    $(".//div[@class='nav sub']") {
      $("./ul") {
        $("./li[a[contains(., 'Gift Cards')]]") {
          move_to("/html/body/div[@id='mw_footer']/div[@id='mw_footer_more_info']")
        }

        # TODO insert belk credit site label here
        insert_after("li", "<a href='https://belk.mycreditcard.mobi'>Manage My Belk Rewards Credit Card</a>") {
          move_to("/html/body/div[@id='mw_footer']/div[@id='mw_footer_more_info']")
        }

        $("./li[a[contains(., 'Coupons')]]") {
          $("./a") {
            text("Today's Coupons")
          }
          move_to("/html/body/div[@id='mw_footer']/div[@id='mw_footer_more_info']")
        }
      }
      remove()
    }

    $("./div[@id='mw_footer']") {
      $("./div[@id='mw_footer_wedding_reg']") {
        attribute("data-ur-set", "toggler")
        add_class("mw_subnav_toggle_set")
        $("./li") {
          name("div")
          $("./a") {
            attribute("href", "javascript:void(0)")
            attribute("data-ur-toggler-component", "button")
            attribute("data-ur-state", "disabled")
            insert_bottom("div", class: "icons-white_nav_arrow_dn")
            insert_bottom("div", class: "icons-white_nav_arrow_up")
          }
        }
        $("./ul") {
          attribute("data-ur-toggler-component", "content")
          attribute("data-ur-state", "disabled")
          $("./li/a") {
            attribute("href", $wedding_href)
            insert_bottom("div", class: "icons-subnav_arrow_right")
          }
        }
      }
      $("./div[@id='mw_footer_more_info']") {
        attribute("data-ur-set", "toggler")
        $("./li/a") {
          insert_bottom("div", class: "icons-subnav_arrow_right")
        }
        inner_wrap("ul") {
          attribute("data-ur-toggler-component", "content")
          attribute("data-ur-state", "enabled")
        }
        insert_top("div", "More Information", id: "mw_more_info_head") {
          attribute("data-ur-toggler-component", "button")
          attribute("data-ur-state", "enabled")
          insert_bottom("div", class: "icons-subnav_arrow_up")
          insert_bottom("div", class: "icons-subnav_arrow_dn")
        }
      }
      $("./div[@id='mw_footer_buttons']") {
        insert_bottom("a", "Full Site", id: "mw_desktop_link") {
          insert_bottom("div", class: "icons-desktop_site")
        }
        $("./a[@id='mw_find_a_store']") {
          insert_bottom("div", class: "icons-store_locator")
        }
        inject_before("<div></div>") {
          copy_here("/html/body//div[@class='mw_search_contain']") {
            $("./input[@id='global_search_box']") {
              attribute("id", "mw_footer_search_input")
            }
            $("./button") {
              attribute("id", "mw_footer_search_btn")
            }
          }
        }
      }
      $("./*[not(@id='mw_footer_wedding_reg') and not(@id='mw_footer_email_signup')]") {
        wrap("div", class: "mw_footer_sub")
      }
    }
  }
}

#not webqaa.belkinc.com stuff
$("/html/body[not (contains(@class, 'mw_redesign'))]") {

  # TODO: need to fix this so that it works on all pages - currently, the footer doesnt show up for the review submission page because the privacy link does not exist
  
  # footer stuff
  $(".//a[@class='privacy']") {
  
    wrap("div", id: "mw_footer_links") {
      attribute("data-ur-toggler-component", "content")
      attribute("data-ur-state", "enabled")
      attribute("data-ur-id", "MoreInfoToggler")
  
      wrap("div", id: "mw_footer") {
        move_to("//div[contains(@class,'mini_sitemap')]", "before")
        
        # add accordian link to top of footer links
        inject_top("<a href='javascript:void(0)' id='mw_more_info_heading' data-ur-id='MoreInfoToggler' data-ur-toggler-component='button' data-ur-state='enabled'><div class='mw_nav_text'>More Information</div><div class='icons-subnav_arrow_dn'></div><div class='icons-subnav_arrow_up'></div></a>")
  
        wrap("div", id: "mw_footer_container")
      }
    }
  }
  
  $(".//div[@id='footer']") {
    $("./div[@class='footerNav']") {
      remove()
    }
    $("./div[@class='footerMessage']") {
      remove()
    }
    $("./div[@class='tos']") {
      remove()
    }
  
    # move shipping info into mw_footer
    $("./div[contains(@class,'two')]") {
    
      # move shipping information link
      $("./div[contains(@class,'fourth')]/ul/li[position()=2]/a") {
        move_to("//div[@id='mw_footer']/div[@id='mw_footer_links']", "bottom")
      }
      
      # move belk rewards card link
      $("./div[contains(@class, 'third')]/ul/li[position()=3]/a") {
        attribute("id", "mw_belk_rewards_card")
        move_to("//div[@id='mw_wedding_registry']", "after")
        inner() {
          replace(/([^\s].*)/, "Access my Belk Rewards Card")
        }
        wrap("div", id: "mw_rewards_card_contain") {
          inject_bottom("<div class='icons-subnav_arrow_right'></div>")
        }
      }
      $("./div[contains(@class,'second')]") {
        $("./ul/li[position()=2]/a") {
          add_class("mw_hide")
          move_to("//div[@id='mw_footer']/div[@id='mw_footer_links']", "bottom")
        }
      }
    }
  
    $("./ul[@class='primary']") {
      # move gifts and gift cards link into mw_footer
      $("./li[position()=2]/a") {
        move_to("//div[@id='mw_footer']/div[@id='mw_footer_links']/*[last()]", "before")
      }
      $("./li[position()=3]/a") {
        move_to("//div[@id='mw_footer']/div[@id='mw_footer_links']/*[position()=2]", "after")
        inner() {
          replace(/Customer\s*Service/, "Contact Information")
        }
      }
      move_to("//div[@id='mw_footer_container']", "bottom")
    }

    $("./div[@class='section five']") {
      move_to("//div[@id='mw_footer_container']", "bottom")
    }
    
    #wrap all text children of mw_footer_links anchors
    $("./div[@id='mw_footer_container']/div[@id='mw_footer']/div[@id='mw_footer_links']/a") {
      inner() {
        prepend("<div class='mw_nav_text'>")
        append("</div>")
      }
      inject_bottom("<div class='icons-subnav_arrow_right'></div>")
    }
    
    insert_bottom("div", class: "mw_social_share") {
      insert_top("a", href: "http://www.twitter.com/belkfashionbuzz", class: "icons-twitter")
      insert_top("a", href: "http://www.facebook.com/Belk", class: "icons-fb")
      move_to("//div[@id='mw_footer_container']", "bottom")
    }
    
    #$(".//div[@id='mw_footer_links']"){
    #  top(){
    #    insert("<a href='/AST/Misc/Belk_Stores/My_Account.jsp'><div>Account</div></a>")
    #  }
    #}
  }


}


