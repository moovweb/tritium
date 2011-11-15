$("/html/body") {
  add_class("mw_bridal_registry_manage_common")
  
  $(".//div[@id='head' or @id='header']") {
    $("./ul[@id='main_nav']") {
      remove()
    }
    $("./div[@id='promo']") {
      remove()
    }
  }
  
  $(".//div[@id='main' or @id='article']") {
    $("./div[@id='content']") {
      $("./div[contains(@class, 'bridal_categories')][ul[not(node())]]") {
        remove()
      }
      $("./a/img[contains(@alt, 'Register Now')]") {
        remove()
      }
      $("./div[@id='hero']") {
        remove()
      }
      $("./div[@class='featured']") {
        $("./div[@id='slider-container']") {
          remove()
        }
        $("./div[@class='group-title']") {
          remove()
        }
      }
      $("./div[@class='promo_list']") {
        remove()
      }
      
      $("./div[@id='prod_details_wrap']") {
        $("./form") {
          $("./div[@class='add_to_bag']") {
            
            $("./div[@class='cartActions']") {
              add_class("loaded")
                                  # css is shared, so the button is grayed out unless a class "loaded" is on this element
            }
          }
        }
      }
      
      $("./div[@id='subnav'] | ./div[@id='sub_nav_wrap']/div[@id='subnav']") {
        attribute("data-ur-set", "toggler")
          #insert("<div class='mw_accordion_button' data-ur-toggler-component='button'><span>Wedding Registry Tools and Resources</span></div>")
        insert_top("div", class: "mw_accordion_button") {
          attribute("data-ur-toggler-component", "button")
          insert_bottom("span", "Wedding Registry Tools and Resources")
        }
        $("./ul") {
          add_class("mw_accordion_content")
          attribute("data-ur-toggler-component", "content")
          $("./li") {
            $("./ul") {
              $("./li/a[contains(., 'Gift Selection Tool')]") {
                $("../.") {
                  remove()
                }
              }
              $("./li") {
                add_class("mw_accordion_content_items")
              }
            }
          }
        }
      }
      
      # for updating one's registry
      $("./div[@id='bridal_registry_review']") {
          # i'm doing this so that i can reuse _bridalregistry_create_review.ts
          # it's not wrapped in a form on this page, which is preventing the ts script
          # from executing
        inject_top("<form name='form_create_review'></form>") {
          $("following-sibling::*") {
            move_to("../form", "bottom")
          }
        }
      }
      
      $("./ul[@id='registry_info']") {
        attribute("data-ur-toggler-component", "content")
        attribute("data-ur-state", "disabled")
        add_class("mw_accordion_content")
        wrap("div", id: "mw_reg_deets") {
          attribute("data-ur-set", "toggler")
          inject_top("<div data-ur-toggler-component='button' data-ur-state='disabled' class='mw_accordion_button'>Wedding Registry<div class='icons-nav_arrow_dn'></div><div class='icons-nav_arrow_up'></div></div>")
        }
        $(".//ul[@class='horizontal_link_list']") {
          inject_top("<li><a href='/AST/Misc/Belk_Stores/BridalRegistry/RegistryTools/QuickStart.jsp'>Start Adding Gifts</a></li>")
          $("./li/a") {
            inject_bottom("<div class='icons-subnav_arrow_right'></div>")
          }
        }
      }
      
      # remove print links
      $(".//ul[@class='horizontal_link_list']") {
        $("./li[a[contains(., 'Print')]]") {
          remove()
        }
        $("./li[position()=2]") {
          remove()
        }
      }
    }
  }

  # the manage registry part of bridal registry does not have the subnav
  # that we take the gift cards and coupons link from
  # inject them manually
  
  $("./div[@id='mw_footer']") {
    $("./div[@class='mw_footer_sub']/div[@id='mw_footer_more_info']") {
      $("./ul[not(li[1]/a[contains(text(), 'Privacy')])]") {
        insert_top("li", class: "mw_inserted") {
          insert_bottom("a", href: "/AST/Misc/Belk_Stores/Customer_Service/Policies_Guidelines/Privacy.jsp", "Privacy Policy") {
            insert_bottom("div", class: "icons-subnav_arrow_right")
          }
        }
      }
      $("./ul[not(li[4]/a[contains(text(), 'Gift')])]") {
        insert_bottom("li", class: "mw_inserted") {
          insert_bottom("a", href: "/AST/Misc/Belk_Stores/Customer_Service/Gifts_And_Gift_Services/Purchase_Gift_Cards.jsp", "Gift Cards") {
            insert_bottom("div", class: "icons-subnav_arrow_right")
          }
        }
      }
      $("./ul[not(li[5]/a[contains(text(), 'Coupon')])]") {
        insert_bottom("li", class: "mw_inserted") {
          insert_bottom("a", href: "/AST/Featured/coupons/belkcoupons.jsp", "Today's Coupons") {
            insert_bottom("div", class: "icons-subnav_arrow_right")
          }
        }
      }
    }
  }
  
}
