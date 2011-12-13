$("body") {
  attribute("class", "mw_customer_service")
  $("form/div[@id='mainContainer']") {
    # remove left navigation pane and footer
    $("div[@id='leftNav'] | div[@class='bn_footer_width']") {
      remove()
    }
    
    $("div[@class='mainContentContainer']/div[@id='contentContainer']") {
      ## START flattening bottom main content
      
      # remove useless containers that start with ctl00_cphMainContent_
      $("div[contains(@id, 'ctl00_cphMainContent_')]") {
        move_here("*", "before")
        remove()
      }
      
      # remove ugly whitespace
      $("table[@border=1]") {
        $("tr/td[1]") {
          text() {
            replace(/^..([A-Z])/, "\\1")
          }
        }
      }
      
      # combine all divs under each subheader
      $("div[not(a and .//b)] | table[count(tr) > 1]") {
        move_to("preceding-sibling::div[a and .//b][1]")
      }
      
      # remove some weird nested p element
      $(".//p[.//b]") {
        remove()
      }
      
      # suppress return form link
      # suppress shop runner related info
      $(".//div[a[contains(@href, 'BareWebReturnForm.pdf')]] | .//div[contains(@id, 'ShopRunnerReturns')]") {
        remove()
      }
      
      ## END flattening bottom main content
      
      # now handling top content navigation
      $("table[1]/tr/td") {
        # remove outer divs
        $("div[contains(@id, '_cphMainContent_')]") {
          move_here("*", "before")
          remove()
        }
        
        # move content under each navigation link
        $("span[not(@class='pagehead')]/a[contains(@href, '#')]") {
          var("var_xpath", fetch("@href")) {
            # var_xpath looks like //div[a[@name='itemsinstock']][1]
            replace("#", "")
            prepend("//div[a[@name='")
            append("']][1]")
          }
          move_here($var_xpath, "after") {
            $("a[@name]/following-sibling::*[1][self::b]") {
              # remove redundant header
              remove()
            }
          }
        } # end span
        
        inner_wrap("div", class: "mw_acc") {
          move_to("../../..", "before")
        }
      } # end table
      
      $("table[1]") {
        remove()
      }
      
      # remove leftover content
      $("*[preceding-sibling::div[@class='mw_acc']]") {
        remove()
      }
      
      $("div[@class='mw_acc']") {
        # handle outer accordion
        $("span[*[1][self::b]]") {
          add_class("mw_acc_section")
          attribute("data-ur-set", "toggler")
          name("div")
          
          $("b[1]") {
            add_class("mw_acc_header")
            name("div")
            inner_wrap("span")
            # Add icons using sprites
            insert_bottom("div", class: "icons-accordion-closed")
            insert_bottom("div", class: "icons-accordion-open")
            attribute("data-ur-toggler-component", "button")
          }
          insert_bottom("div", class: "mw_acc_items") {
            attribute("data-ur-toggler-component", "content")
            attribute("data-ur-state", "disabled")
            insert_bottom("div", class: "mw_acc")
          }
        }
        
        # handle special case US <-> Canada link
        $("span[a[not(starts-with(@href, '#'))]]") {
          add_class("mw_acc_item")
          $("a") {
            inner_wrap("span")
            wrap("span")
          }
          move_to("preceding-sibling::div[1]/div[@class='mw_acc_items']")
        }
        
        # begin inner accordion transformation
        $("span[a]") {
          add_class("mw_acc_section")
          attribute("data-ur-set", "toggler")
          name("div")
          $("div[1]") {
            # remove inline margin styles
            attribute("style") {
              value() {
                replace(/margin-.*?:.+?px(;?)/, "\\2")
              }
            }
            $(".//div[@style][1]") {
              attribute("style") {
                value() {
                  replace(/margin-top:.+?px(;?)/, "\\2")
                }
              }
            }
            $(".//div[@style][last()]") {
              attribute("style") {
                value() {
                  replace(/margin-bottom:.+?px(;?)/, "\\2")
                }
              }
            }
            inner_wrap("div", class: "mw_acc_item")
            add_class("mw_acc_items")
            attribute("data-ur-toggler-component", "content")
            attribute("data-ur-state", "disabled")
          }
          
          $("a[@href]") {
            inner_wrap("span")
            # Add icons using sprites
            insert_bottom("div", class: "icons-accordion-closed")
            insert_bottom("div", class: "icons-accordion-open")
            attribute("href", "")
            attribute("data-ur-toggler-component", "button")
            add_class("mw_acc_header")
            name("div")
          }
          
          # move to outer accordion mw_acc_section
          move_to("preceding-sibling::div[1]/div[@class='mw_acc_items']/div[@class='mw_acc']")
        }
        
      }
    }
  } # end form
} # end body

