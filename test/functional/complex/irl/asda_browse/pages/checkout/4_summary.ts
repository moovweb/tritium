#URL: /checkout/ordersummarycontainer.jsp
# Order Summary

$("body") {
  add_class("mw_checkout_summary")
  # TODO: Make this more selective
  $(".//div[@id='summary']//a") {
    attribute("href") {
      value() {
        replace(/(changedeliveryaddresscontainer.*)/, "\\1&accessible=true")
      }
    }
  }
  $("./div[@id='mw_mainWrapper']") {
    $("./div[@id='header']|./div[@class='dropbelow']") {
      remove()
    }
  }
  $(".//div[@id='order']") {
    $("./div[@id='options']") {
      remove()
    }
    $(".//fieldset[@class='greenfade']/legend") {
      add_class("mw_testing")
      remove()
    }
    $(".//div[@id='summary']") {
      $("./div[@id='popupDiv']") {
        attribute("style") {
          remove()
        }
      }
      $(".//div[@class='secureMsg']/div/p | .//div[@class='secureMsg']/div/img | .//div[@class='secureMsg']/div/script") {
        add_class("mw_testing")
        remove()
      }
      $(".//div[@id='secureCode']/img") {
        add_class("mw_testing")
        remove()
      }
      $("./fieldset/h3[@class='summaryheader']/span") {
        move_to("..", "after")
      }
      $(".//div[@class='field']/table") {
        name("div")
        add_class("mw_FieldTable")
        $(".//tbody | .//tr") {
          add_class("mw_FieldTableRow")
          name("div")
        }
      }
      $(".//td") {
        name("span")
        add_class("mw_FieldTableCell")
      }
      $("./fieldset/div[@class='promocodes']") {
        $("..") {
          attribute("style") {
            remove()
          }
        }
      }
      # Remove the Change or Add new phone numbers link
      $("./fieldset//span[contains(@class, 'mw_FieldTableCell')]/a[@class='greenlink']") {
        remove()
      }
      
      # Remove the extran message in regards to adding a new phone
      $("./fieldset//div[@id='cmsmessageContainer']") {
        $("..") {
          remove()
        }
      }
      $("./fieldset") {
        # Dump the table in contact details
        # Separated elements to allow me to add more classes, which provide more selectors
        $(".//table") {
          name("div")
          add_class("mw_FieldTable2")
        }
        $(".//tbody") {
          name("div")
          add_class("mw_FieldTableBody2")
        }
        $(".//tr") {
          name("div")
          add_class("mw_FieldTableRow2")
        }
        $(".//thead") {
          name("span")
          add_class("mw_FieldTableHead2")
        }
        $(".//td") {
          name("span")
          add_class("mw_FieldTableCell2")
        }
        $(".//div[contains(@class, 'margintopminus5')]//div[contains(@class, 'mw_FieldTableRow2')]/span[contains(@class, 'mw_FieldTableCell')]/div") {
          # Remove Inline Styles on Table Elements
          add_class("mw_PhoneNumber")
          attribute("style") {
            remove()
          }
        }
        # Rename phone numbers to better accomodate space
        $(".//div[contains(@class, 'margintopminus5')]//div[contains(@class, 'mw_FieldTableRow2')]") {
          inner() {
            replace("phone number", "number")
          }
        }
        # Remove items table header
        $(".//div[@id='listitems']") {
          $("./div/span/div") {
            $("..") {
              remove()
            }
          }
          # HARI: Taking over
          $(".//div[contains(@class,'selall')]") {
            $("..") {
              attribute("style") {
                remove()
              }
              # add_class("mw_sel_all")
            }
          }
          $(".//div[@class='selall']") {
            move_to("../../../..","top")
          }
        }
      }
      
      $("./fieldset//div[contains(@class,'left toppadding07')] | .//p[@id='fieldPayment']") {
        #remove the extra credit card info text
        remove()
      }
      $("./fieldset//select[@id='defaultCard']") {
        wrap("div", class: "mw_chooseCard")
        move_here("../../label[@id='cardlabel']", "before")
      }
      
      # Andriod is using the "for" attribute to have a placeholder for the input it was targeting
      $("./fieldset//label[@for='cardSecCode']") {
        attribute("for","")
      }
      
      # The input button was submitting the form on ENTER and we had to disable that functionality to remove confusion
      # when the user taps the enter button on the mobile device's keyboard
      $("./fieldset//input[@id='cardSecCode']") {
        attribute("onkeypress","return noenter()")
        inject_before("<script>function noenter() { return !(window.event && window.event.keyCode == 13); } </script>")
      }

      
      $("./fieldset//table[@id='trolley']") {
        $("./thead") {
          # pull out the existing table head for the cart items
          remove()
        }
      }
      $("./fieldset//div[@id='trolley']") {
        $("./div/span[contains(text(), 'No Items')]") {
          log("********* MADE IT *********")
          wrap("div", class: "mw_no_items_wrap")
        }
        $(".//span[contains(@class, 'li-delete')]") {
          # Move trash icon to top of group for styling
          add_class("mw_removeIcon")
          move_to("../.", "top")
          $("./form/input[@name='li-delete']") {
            # Change the src to add in the trash icon
            attribute("src", asset("trashIcon.png", "image"))
          }
        }
        $("./div/div/span[contains(@class, 'li-quantity-mod')]/form") {
          # Add classes to part of the quantity items
          # Structure changes when only a quantity of one of an item is in the cart
          # Extra conditionals added in to deal with that
          $("../form[position()=1 and contains(@id, 'removeQuantity')] | ../input[position()=1 and contains(@src, 'minus-grey')]") {
            add_class("mw_q_minus")
          }
          $("../form[position()=2 and contains(@id, 'addQuantity')]") {
            add_class("mw_q_plus")
          }
          $("../input[@name='li-plus']") {
            wrap("div", class: "mw_q_plus")
          }
          $("../form[position()=3] | ../input[position()=3]") {
            add_class("mw_quantity")
          }
          # Move the - btn to the bottom of the group
          # $("../form[contains(@class, 'mw_q_minus')] | ../input[contains(@class, 'mw_q_minus')]") {
          #   move_to("../../span[contains(@class, 'li-quantity-mod')]" , "bottom")
          # }
          # Wrap the grey button to make it look pretty, ooooo pretty
          $("../input[position()=1 and contains(@src, 'minus-grey')]") {
            wrap("div", class: "mw_minus_grey_wrap")
          }
        }
        $("./div/div/span/span[@class='li-name']") {
          # Give the product name container a class
          $("..") {
            add_class("mw_li_name_wrapper")
          }
        }
        # Insert a holder tag for the middle elements
        $("./div/div/span[position()=2]") {
          insert_after("span", class: "mw_item_holder")
        }
        # Move the elements into the holder tag
        $("./div/div/span[position() > 3]") {
          move_to("../span[@class='mw_item_holder']", "bottom")
        }
      }
      $("./div[@id='popupWindow_slot']") {
        # remove the Mobile Phone Input Popup
        remove()
      }
    }
    $(".//p[@class='width-em57']") {
      remove()
    }
  }
}