$("body") {  
  # Add page specific class
  add_class("mw_home")

  $("form/div[@id='mainContainer']") {
    $("div[@id='header']") {
      insert_after("div", id: "heroBox") {
        insert_top("div", id: "mw_hero")
      }
    }

    $("div[@id='leftNav']") {
      $("div[@id='leftNavSpecial'][2] | div/br") {
        remove()
      }
      # Add class for accordian
      add_class("mw_acc")
      insert_after("div", id: "contactBox") {
          # Add the free shipping banner here
        @import _free-shipping.ts
          # Add the help phone number here
        # insert_bottom("a", href: "tel:1-877-728-9272", class: "mw_help") {
        #   inner("<span class='mw_help_pre'>need help?</span><div class='mw_help_box'><div class='mw_help_text'>1 877 728 9272</div><div class='mw_help_div'></div><div class='icons-phone'></div></div>")
        # }
        inject_bottom("<a href='tel:1-877-728-9272' class='mw_help'><span class='mw_help_pre'>need help?</span><div class='mw_help_box'><div class='mw_help_text'>1 877 728 9272</div><div class='mw_help_div'></div><div class='icons-phone'></div></div></a>")
        move_here("../div[@id='leftNav']/div[@id='leftNavEmailModule']/div/div") {
          attribute("id", "emailModule")
          $("input") {
            attribute("style", "")
          }
          $("input[contains(@id, 'ctlEmailSignup_txtEmail')]") {
            attribute("type", "email")
            attribute("autocapitalize", "off")
            attribute("onkeypress", "window.event.keyCode === 13 ? document.getElementById('ctl00_ctlLeftNavigation_ctlEmailSignup_btnEmailSignup').click() : console.log('');")
          }
          # Grab the email signup GO button (this one will be hidden) and
          # create a new button to click on the old one (couldn't style the 
          # input type image)
          $("input[@type='image']") {
              # Don't load the image since this will be hidden
            attribute("src") {
              remove()
            }
              # Put the new button after the old one which will be hidden
            insert_after("input", type: "button", value: "GO") {
                  # This is the part that will click the real button
              attribute("onclick", "document.getElementById('ctl00_ctlLeftNavigation_ctlEmailSignup_btnEmailSignup').click()")
            }
          }
          $("input[1]") {
            wrap("div", id: "emailField") {
              move_here("../input")
                # Add icons using sprites
              insert_top("div", class: "icons-email-icon")
            }
          }
            # Remove privacy policy link since there is one in the footer
          $("div[@id='privacyPolicy']/a") {
            remove()
          }
          insert_top("span", "sign up for email")

          $("div[@id=privacyPolicy]") {
            remove()
          }
        }
        $("../div[@id='leftNav']/div[@id='leftNavEmailModule']") {
          remove()
        }

        move_here("../div[@id='leftNav']/div[@class='leftNavSocialLinks']") {
            # Both social network links
          $("div/a") {
              # Remove exisiting images
            $("img") {
              remove()
            }
          }
            # Facebook link
          $("div/a[1]") {
              # Add icons using sprites
            insert_before("div", class: "icons-facebook")
          }
            # Twitter link
          $("div/a[2]") {
              # Add icons using sprites
            insert_before("div", class: "icons-twitter")
          }
        }
      }

      $("//div[@id='ctl00_ctlLeftNavigation_LeftNavigationDCM1_LeftNavigationDCMPanel'] | //div[@id='leftNavSpecial2'] | //div[@id='leftNavEmailModule'] | //div[contains(@class,'leftNavSocialLinks')]") {
        move_here("*", "before")
        remove()
      }

      #$("div") {
      #  move_here("*", "before")
      #  remove()
      #}
      
      $("//br") {
        remove()
      }
      
      $("//div[@class='leftNavHrDots' or @class='leftNavPadder']") {
        remove()
      }
      
      $("//img[@usemap='#womenna']") {
        attribute("mw_title", "women")
      }
      
      $("//img[@title='brands']") {
        attribute("mw_title", "brands")
        move_to("..","before")
      }

      $("//img[@usemap='#mensna']") {
        attribute("mw_title", "men")
      }
      
      $("//img[@title='features']") {
        attribute("mw_title", "features")
      }

      $("//img[@mw_title]") {
        name("div")
        text(fetch("@mw_title"))
        inner_wrap("span")
        # Add icons using sprites
        insert_bottom("div", class: "icons-accordion-closed")
        insert_bottom("div", class: "icons-accordion-open")
        wrap("div", class: "mw_acc_section")
      }

      $("//map[@name]") {
        add_class("mw_orange")
        name("a")
        attribute("href", fetch("area/@href"))
        text(fetch("area/@alt"))
      }

      $("//a[contains(@class,'leftNavLink')] | //a[contains(@class,'mw_orange')] | //a[contains(@title,'Bare Necessities Customer Quotes')]") {
        move_to("(preceding-sibling::div[@class='mw_acc_section'])[last()]")
        add_class("mw_acc_item")
        inner_wrap("span")
      }

      $("//div[contains(@class,'mw_acc_section')]") {
        $("div") {
          # This attribute is actually here!
          var("toggler_id", fetch("./@mw_title"))
          attribute("data-ur-toggler-component", "button")
          attribute("data-ur-state", "disabled")
          attribute("data-ur-id", var("toggler_id"))
          add_class("mw_acc_header")
          # Create a new div tag to hold the category's anchor tags
          insert_after("div", class: "mw_acc_items") {
            # This is the content section of the toggler
            attribute("data-ur-toggler-component", "content")
            # All categories start out collapsed
            attribute("data-ur-state", "disabled")
            # Use existing toggler id
            attribute("data-ur-id", var("toggler_id"))
            # Move all anchor tags inside the div group
            move_here("../a", "bottom") {
              $("span[img]") {
                text(fetch("img/@alt"))
              }
            }
          }
        }
      }
    }

    $("//div[@class='mainContentContainer']") {
      remove()
    }
    $("div[not (@id)]") {
      remove()
    }
  }
  
  #Ajax call for global banner thingie
  insert_bottom("script", type: "text/javascript") {
    text("document.addEventListener('DOMContentLoaded', function() { x$ ('#heroBox > #mw_hero').xhr('top', '/util/GetDCMContent.aspx?PageType=mobile&PageName=default&PageSection=body', {async: true}); });") {
    }
  }
} #end body


