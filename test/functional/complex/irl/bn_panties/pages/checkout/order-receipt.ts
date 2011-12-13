var("mw_no_search_bar", "true")
$checkout = "true"

$("./body") {
  attribute("class", "mw_order_receipt")
  $("./form/div[@id='mainContainer']") {
    # Remove left navigation links
    $("./div[@id='leftNav']") {
      remove()
    }
    # Remove title and blank divs
    $("./div[@class='contentContainer']") {
      # Remove the main title and spacer divs
      $("./div[@class='mainTitle' or @class='clearHidden']") {
        remove()
      }
      # Breadcrumb/navbar thingie
      $("./div[@class='checkoutNav']") {
        $("./div[@class='clearHidden']") {
          remove()
        }
        # Insert spacers here -- looks better than css pseudo-elements
        $("./div[position() > 1]") {
          insert_before("div", "|", class: "mw_checkout_nav_spacer")
        }
      }
      # Work with itemized order list
      $("./div[@class='receiptContainer']") {
        $("table[2]") {
          name("div")
          add_class("mw_item_list")
          # For each line item of receipt
          $("./tr[@class='receiptTrData']") {
            name("div")
            # The first TD is the item image
            $("./td[1]") {
              name("span")
              add_class("mw_item_image")
            }
            # Wrap all the remaining items for styling purposes
            insert_bottom("div", class: "mw_item_details") {
                # Brand
              move_here("./../td[1]", "bottom") {
                name("div")
                add_class("mw_item_brand")
              }
                # Description
              move_here("./../td[1]", "bottom") {
                name("div")
                add_class("mw_item_desc")
              }
                # Color
              move_here("./../td[1]", "bottom") {
                name("div")
                add_class("mw_item_color")
                inner() {
                  prepend("<b>Color: </b>")
                }
              }
                # Size
              move_here("./../td[1]", "bottom") {
                name("div")
                add_class("mw_item_size")
                attribute("align", "")
                inner() {
                  prepend("<b>Size: </b>")
                }
              }
                # Quantity
              move_here("./../td[1]", "bottom") {
                name("div")
                add_class("mw_item_qty")
                attribute("align", "")
                inner() {
                  prepend("<b>Quantity: </b>")
                }
              }
                # Price
              move_here("./../td[1]", "bottom") {
                name("div")
                add_class("mw_item_price")
                inner() {
                  prepend("<b>Item Price: </b>")
                }
              }
                # Total Price
              move_here("./../td[1]", "bottom") {
                name("div")
                add_class("mw_item_total_price")
                inner() {
                  prepend("<b>Total Price: </b>")
                }
              }
                # Grab the in-stock/backorder message
              move_here("./../following-sibling::tr[1]/td[2]") {
                name("div")
              }
            }
          }
          # Throw away unused rows
          $("./tr") {
            remove()
          }
        }
        # Find stuff to remove
        $("./table/tr/td/a[@id='ctl00_cphMainContent_CheckouControlItem_ReceiptHyperlink1']") {
          # Step out to the td level for removal
          $("./..") {
            remove()
          }
        }
        # Find stuff to remove
        $("./table/tr/td/div[@id='ctl00_cphMainContent_CheckouControlItem_ShopRunnerShippingNotUsed_StandardSimplePanel']") {
          # Step out to the td level for removal
          $("./..") {
            remove()
          }
        }
        # top paragraph
        $("table[1]") {
          move_here("tr/td", "after") {
            name("div")
          }
          $("text()[normalize-space(.)] | div/text()[normalize-space(.)] ") {
            text() {
              replace(/^[^\w]+/m, "")
            }
          }
          remove()
        }
        # format fees table
        move_here("table[1]/tr/td/div[@class='receiptTotalArea']") {
          $("table") {
            attribute("width", "")
            $("tr/td[@width]") {
              attribute("width", "")
            }
          }
        }
        $("table[1]") {
          remove()
        }
      }
    }
    # Remove bottom button (we'll create our own)
    $(".//div[@class='receiptTotalArea2']") {
      remove()
    }
    # Remove bottom footer with all the dots
    $("./div[@class='bn_footer_width']") {
      remove()
    }
  }
  $(".//div[@id='footer_bottom_section_checkout']") {
    $(".//img") {
      attribute("src") {
        value() {
          replace(/dcm\/footer\/60day.jpg.*/, "dcm\/footer\/60day.jpg")                
        }
      }
    }
  }
}
