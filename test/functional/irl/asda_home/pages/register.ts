# URL: /asda-estore/register/registercontainer.jsp
# Registration Page
match($path) {
  with(/registercontainer\.jsp/) {
    $("./body") {
      add_class("mw_register")
      $("./div[@id='mw_mainWrapper']") {
        # Remove ASDA's style link
        # and the extra ul on top of the page
        # and also removing ASDA's header and footer
        $("./link | ./ul | ./title | ./div/div[@id='footer'] | ./div[@id='header']") {
          remove()
        }
        # main content
        $("./div/div[@id='order']") {
          
          $("./form/fieldset") {
            # need to move some fieldset to the parent contianer
            # for organization and styling purposes
            $("./div[@class='left']") {
              $("./fieldset | ./div[contains(@class, 'specificFunc')]") {
                $("./p[contains(@class,'textexplain')]") {
                  wrap("div", class: "mw_textExplain")
                }
                move_to("../../..", "bottom")
              }
              # Moving all the content couple of steps up to have them 
              # direct childerns of the fieldset (just like the rest)
              $("./div[@class='left']/*") {
                move_to("../../..", "bottom")
              }
              # Removing all the spacer except 1 that are left behind after moving 
              # the fieldsets
              $("./div[@class='dropbelow' and position() > 1]") {
                remove()
              }
            }
            # Wrapping the additional text then aligning the content to the right
            # to match the rest of the styling
            $("./p[contains(@class,'textexplain')]") {
              attribute("style","")
              wrap("div", class: "mw_textExplain")
            }
            $("./legend[contains(text(), 'Personal information')]") {
              $("..") {
                add_class("mw_personalInfo")
                # wrapping customer types (home/business) label/radio button for android
                insert_bottom("div", class: "mw_customer_home") {
                  move_here("../input[@value='Home']", "top")
                  move_here("../label[@for='House']", "top")
                }
                insert_bottom("div", class: "mw_customer_business") {
                  move_here("../label[@for='Flat']", "bottom")
                  move_here("../input[@value='Business']", "bottom")
                }
                $("./div[@class='mw_textExplain']") {
                  move_to("..","bottom")
                }
              }
            }
            $("./legend[contains(text(), 'Delivery details')]") {
              $("..") {
                add_class("mw_address")
                $("./select[@name='shippingAddress']/option[1]") {
                  text("Please select your address")
                }
              
                $("./div[@id='addressTypeDiv']") {
                  insert_bottom("div", class: "mw_addressHome") {
                    move_here("../input[@value='home']", "top")
                    move_here("../label[@for='House']", "top")
                  }
                  insert_bottom("div", class: "mw_addressFlat") {
                    move_here("../label[@for='Flat']", "bottom")
                    move_here("../input[@value='flat']", "bottom")
                  }
                    
                }
              }
            }
    #         $("./legend[contains(text(), 'Contact information')]") {
    #           $("..") {
    #             add_class("mw_contact")
    #           }
    #         }
          }
          
        }
      }
    }
  }
  
  # Confirmation Page after registering an account
  with(/registrationconfirmationcontainer\.jsp/) {
    $("./body") {
      add_class("mw_registerConfirm")
      $("./div[@id='mw_mainWrapper']") {
        $("./link | ./div[@id='footer'] | ./div[@id='header'] |  ./ul[contains(@class,'hideoffscreen')]") {
          remove()
        }
      }
    }
    
  }
}
