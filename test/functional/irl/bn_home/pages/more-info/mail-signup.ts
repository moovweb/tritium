$("body") {
  add_class("mw_mail_signup")
  $("form/div[@id='mainContainer']") {
    $("div[@id='leftNav'] | div[@class='bn_footer_width']") {
      remove()
    }
    
    $("div[@class='mainContentContainer']/div[@id='contentContainer']") {
      $("table") {
        $("tr/td/text()[normalize-space(.)]") {
          wrap("span")
        }
        move_here("tr/td/*", "before")
        remove()
      }
      
      # now handling main content
      $("table") {
        $("tr/td/table/tr/td/text()[normalize-space(.)]") {
          wrap("div")
        }
        move_here("tr/td/table/tr/td/*", "before")
        $("tr[td/table]") {
          remove()
        }
        $("tr/td/text()[normalize-space(.)]") {
          # this part sometimes wraps empty spaces
          wrap("span")
        }
        move_here("tr/td/*", "before")
        remove()
      }
      
      # removing last table containing the form
      $("table") {
        $("tr/td/text()[normalize-space(.)]") {
          wrap("span")
        }
        move_here("tr/td/*", "before")
        remove()
      }
      
      # Submit button
      $("input[@type='image']") {
        wrap("div", class: "mw_button_hack") {
            # clicking original button doesn't work if you change its type to button or submit
          insert_top("input", type: "button", value: "Submit", onclick: "javascript:this.nextSibling.click()")
        }
      }
      
      # Clear Form button
      $("img[2]") {
        name("input")
        attribute("type", "button")
        attribute("src", "")
        attribute("style", "")
        attribute("value", fetch("@alt"))
        move_to("preceding-sibling::div[1]")
      }
      
      # format product image
      $("img") {
        attribute("src") {
          value() {
            replace(/\?size=.+&src=.+?\/(.+?)\?.*/, "\\1?size=100,100")
          }
        }
        wrap("div") {
          insert_bottom("div")
          wrap("div", class: "mw_img_container")
        }
        $("../../following-sibling::div[position() < 3] | ../../following-sibling::b[1]") {
          move_to("preceding-sibling::div[@class='mw_img_container']/div/div")
        }
      }
      
      $("textarea") {
        attribute("style", "")
      }
      
      # fix &nbsp problem
      $("span[text() = '&nbsp']") {
        remove()
      }
      
      # now handle when form is submitted
      $("div[@id='Div1']/table") {
        $("tr/td/text()[normalize-space(.)]") {
          wrap("span")
        }
        $("tr/td/table") {
          $("tr/td") {
            name("div")
            $("a") {
              # remove whitespace
              text() {
                replace(/(\w+)[^\w]+$/, "\\1")
              }
              attribute("style", "")
              $("img") {
                remove()
              }
              # Wrap the footer links in a span
              inner_wrap("span") {
                # Add icons using sprites
                insert_bottom("span", class: "icons-orange-link-arrow")
              }
            }
            attribute("align", "")
            #move_to()
            inner_wrap("span")
          }
          move_here("tr/div", "before")
          remove()
        }
        move_here("tr/td/*", "before")
        remove()
      }
    }
  }
}
