# This variable determines if jquery is being used (Defaults to false)
var("mw_optimize_using_jquery", "true")

$("body") {
  attribute("class", "mw_shopping_cart")
  $("form/div[@id='mainContainer']") {
    $("div[@id='leftNav']") {
      remove()
    }
    # Remove bottom footer with the all the dots
    $("./div[@class='bn_footer_width']") {
      remove()
    }
  }
  $("form/div[@id='mainContainer']/div[@class='mainContentContainer']/div[@id='contentContainer']") {
    # Detect an empty cart and add a class to the body for it
    $("./h2/..") {
      add_class("mw_empty_cart")
      # Create container for navigation links
      insert_bottom("div", class: "mw_empty_cart_nav") {
        move_here("./../a", "bottom")
          # Wrap the last anchor in a div so that it centers on a line by itself
        $("./a[position()=last()]") {
          wrap("div")
        }
      }
    }
    # Remove unnecessary stuff
    $("table[1]") {
      remove()
    }
    $("div[@class='checkoutNavBtm']") {
      remove()
    }
    $("div[contains(@class, 'checkoutNav')]") {
      $("div[@class='clearHidden']") {
        remove()
      }
      # Insert spacers here -- looks better than css pseudo-elements
      $("div[position() > 1]") {
        insert_before("div", "|", class: "mw_checkout_nav_spacer")
      }
      # If there is an error message, put it below the navbar
      move_here("preceding-sibling::font", "after")
    }

    $("div[@class='cartContainer']") {
      $("div[2]") {
        $("span[@class='cm_PromoOfferTop']") {
          remove()
        }
        $("div[contains(@id, 'CartMessaging1_StandardSimplePanel')]") {
          remove()
        }
        # special offers
        $("div[@class='cartOffers'][not(div[@class='cm_PromoOffer'])]") {
          remove()
        }
        $("div[@class='cartOffers']") {
          add_class("mw_acc")
          $("div[@class='cm_PromoOffer']") {
            add_class("mw_acc_section")
            attribute("data-ur-set", "toggler")
            $("following-sibling::*") {
              remove()
            }
            $("img[@alt]") {
              var("alt", fetch("@alt"))
              insert_after("span", $alt) {
                wrap("div", class: "mw_acc_header") {
                  attribute("data-ur-toggler-component", "button")
                  attribute("data-ur-state", "disabled")
                  insert_bottom("div", class: "icons-accordion-closed")
                  insert_bottom("div", class: "icons-accordion-open")
                }
              }
            }
            # remove ugly nesting
            move_here("span//div[@class='module272']/div[@class='moduleContent']")
            $("img | span[@class='cm_PromoOfferSO']") {
              remove()
            }
            $("div[@class='moduleContent']") {
              move_here("table/tr/td") {
                name("div")
              }
              $("table") {
                remove()
              }
              $("div[@class='module272Text']/a") {
                $("img | span/img") {
                  remove()
                }
                attribute("href") {
                  value() {
                    replace(/promoDetailPopup\('/, "window.open('http://www.barenecessities.com/promoDetail.aspx?promo=")
                  }
                }
              }
            }
            insert_bottom("div", class: "mw_acc_items") {
              attribute("data-ur-toggler-component", "content")
              attribute("data-ur-state", "disabled")
              move_here("../div[@class='moduleContent']")
            }
          }
        }
        $("div[@class='cartTotalArea' or @class='cartTotalArea2']") {
          # Move paypal out first
          move_here(".//div[@class='cm_PayWithPayPalBelow']")
          
          # Move zip and promo code fields above cart totals
          move_here("../div[contains(@id, 'ZipCodePanel') or @id='pnlZipCodeMessage' or @id='pnlShipMeth' or contains(@id, 'PromoFormPanel')]", "before")
          
          # Remove everything not paypal
          $("img | .//div[@class!='cm_PayWithPayPalBelow']") {
            remove()
          }
        }

        # Pull purchase items out of table
        $("table//tr[@class='cartTrData']") {
          name("div")
          $("td") {
            name("span")
          }
          move_here("following-sibling::tr[1]/td[1]") {
            name("span")
          }
        }
        $("table") {
          wrap("div", id: "mw_purchase_items") {
            move_here("table//div[@class='cartTrData']")
          }
        }
        $("div[@id='mw_purchase_items']") {
          $("table") {
            remove()
          }
          # Work with each item in the cart
          $("div[@class='cartTrData']") {
            $("span[@class='cm_LineItemImage']") {
              move_here("span[not (@id or @class)]", "after")
              move_here("a", "before") {
                $("img") {
                  attribute("width") {
                    remove()
                  }
                  attribute("src") {
                    value() {
                      replace(/\?.*/, "?size=100,100")
                    }
                  }
                }
              }
              # remove everything but style no.
              $("*") {
                remove()
              }
              text() {
                replace(/^[^\w]+(\w)/m, " #\\1")
              }
              move_to("../span[@class='cm_LineItemDesc']/a")
            }
            $("span[contains(@class, 'AddAnother')]/a") {
              remove()
            }
            $("span/div[contains(@class, 'MatchingStyles')]") {
              remove()
            }
            $("span[@class='cm_LineItemDelete']/a") {
              # Complex modification follows:
              #  - Ticket REF #120
              # The shopping cart uses ASP.NET WebForm. When the user uses
              # the "enter" key from promo code text field, the default submit button
              # gets fired. In webkit browser, the default submit button is 
              # always the first VISIBLE button of type image or submit.
              # So the trick here is to make the remove button not visible with display:none;
              # and have another image to click this button. Later, have the promo code
              # submit button as visible with display: block;, but move it out of the viewport
              # with fixed positioning.
              $("./input") {
                attribute("style") {
                  remove()
                }
                attribute("src") {
                  remove()
                }
                
                $line_item_id = fetch("@id")
              }
              
              add_class("mw_hidden_submit")
              
              insert_after("img", "", src: asset("images/minus-sign.png")) {
                var("line_item_id") {
                  prepend("document.getElementById('")
                  append("').click();")
                }
                
                attribute("onclick", $line_item_id)
              }
            }
            $("span[contains(@class, 'cartTdPrice')][1]") {
              add_class("mw_unit_price")
            }
            $("span[contains(@class, 'cartTdPrice')][2]") {
              $("*") {
                remove()
              }
              add_class("mw_total_price")
            }
            $("div/td") {
              name("span")
            }
            $("div/span[select]") {
              name("div")
            }
            $("span[1]") {
              wrap("div", class: "mw_line_item_data") {
                move_here("../span | ../div[contains(@id, 'DetailPanel')]")
              }
            }
            # Easier not to put this in the preceding block
            $("div[@class='mw_line_item_data']") {
              move_here("span[@class='cm_LineItemDelete' or contains(@class, 'cartTdStatus')]", "after")
            }
          }
        }
        $("div[contains(@id, 'ZipCodePanel')]/div[@id='pnlZipCode']") {
          $("input[@type='text']") {
            attribute("placeholder", "Zip Code:")
          }
          $("input[@type='image']") {
            attribute("type", "button")
            attribute("style") {
              remove()
            }
            attribute("value", "Submit")
          }
        }
        $("div[contains(@id, 'PromoFormPanel')]") {
          move_here("table//td[1]/input")
          move_here("table//td[2]/a")
          $("table") {
            remove()
          }
          insert_bottom("input") {
            attribute("type", "button")
            attribute("value", "Submit")
            attribute("id", "mw_promo_button")
            attribute("onclick", "document.getElementsByClassName('pc_SubmitBtn')[0].click();")
          }
          $("input[@type='text']") {
            attribute("style") {
              remove()
            }
            attribute("placeholder", "Promo Code:")
          }
        }
        $("div[@id='pnlShipMeth']/input") {
          attribute("type", "button")
          attribute("style") {
            remove()
          }
          attribute("value", "Apply")
        }
        $("div[@class='cartTotalArea' or @class='cartTotalArea2']") {
          move_here("table//tr") {
            wrap("div") {
              move_here("tr//td") {
                name("span")
                attribute("style", "")
              }
            }
          }
          $("table | .//div/span[span/table]") {
            remove()
          }
          $(".//div/span/a[u]") {
            text(fetch("text()"))
          }
          $(".//div[span/img]") {
            remove()
          }
          $("div/span") {
            wrap_text_children("span")
          }
          $("div/span//a") {
            attribute("href") {
              value() {
                replace(/promoDetailPopup\(/, "window.open('http://www.barenecessities.com/promoDetail.aspx?promo='+")
              }
            }
          }
        }
      }
      # Move Proceed Button to bottom
      move_here("div[@class='cartBtns']/div[@class='cm_CheckoutAbove']") {
        attribute("style") {
          remove()
        }
        $("a") {
          text(fetch("img/@alt"))
        }
        move_here("../div[@class='cartBtns']/div[@class='cm_Continue']", "after") {
          attribute("style") {
            remove()
          }
          $("a") {
            text(fetch("img/@alt"))
          }
        }
        move_here("//div[@class='cm_PayWithPayPalBelow']", "after") {
          $(".//img[@alt='Checkout with PayPal']") {
            attribute("src", asset("images/paypal-checkout.png"))
            attribute("style") {
              remove()
            }
          }
        }
      }
    }
    
    $("div[@class='dcmFullWidthDiv']") {
      remove()
    }

    $("following-sibling::div[@class='bn_footer_width']") {
      remove()
    }
  }
}
