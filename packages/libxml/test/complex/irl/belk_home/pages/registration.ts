add_class("mw_registration")

$("./div[@id='page_wrapper']") {
  $("./div[@id='page']") {
    $("./div[@id='head']") {
      # remove main navigation and promo for this page
      $("./ul[@id='main_nav']") {
        remove()
      }
      $("./div[@id='promo']") {
        remove()
      }
    }
    
    $("./div[@id='main']") {
      # remove the belk rewards card image
      $("./div[@id='sd']") {
        remove()
      }
      
      $("./div[@id='content']") {
        $("./div[@id='promo_list']") {
          remove()
        }
        $("./div[@id='checkout_shipping']") {
          $("./form") {
            $("./ol") {
              $("./li[contains(.,'Indicates required information')]") {
                add_class("mw_reg_content")
              }
              $("./li/input[@type='text' or @type='password']") {
                $("../.") {
                  add_class(" mw_reg_field")
                }
              }
              
              # there's an li that has a label element that contains a white space character (so it's not empty).
              # it happens to be in an li that i didn't add a class to, so i'm removing it using that condition.
              # open to suggestions
              $("./li[string-length(@class)=0]") {
                $("./label") {
                  remove()
                }
              }
            }
          }
        }
      }
    }
  }
}
