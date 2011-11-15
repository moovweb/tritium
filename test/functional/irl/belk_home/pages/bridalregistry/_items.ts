$(".//div[@id='content']") {
  $("./div[@id='br_gr']") {
    $("./img") {
      remove()
    }
  }
  $("./form[@id='form_product_detail']") {
    $("./div[@id='results']") {
      $("./div[@id='filter_and_sort']") {
        $("./div[@class='sort']") {
          attribute("data-ur-set", "toggler")
          $("./label") {
            attribute("data-ur-toggler-component", "button")
            insert_bottom("div", class: "icons-white_nav_arrow_dn")
            insert_bottom("div", class: "icons-white_nav_arrow_up")
          }
          $("./ul") {
            attribute("data-ur-toggler-component", "content")
          }
        }
      }
      
      $("./div[@class='buttons']") {
        $("./button") {
          text("Add to Shopping Bag")
        }
      }
      
      # their filter and sort options will slightly change the structure of the page
      # if there is an h3, then we should apply toggles
      # if not, don't
      $("./div[contains(@class, 'outer_container')][h3]") {
        attribute("data-ur-set", "toggler")
        $("./h3") {
          attribute("data-ur-toggler-component", "button")
          attribute("data-ur-state", "enabled")
          insert_bottom("div", class: "icons-nav_arrow_dn")
          insert_bottom("div", class: "icons-nav_arrow_up")
        }
        $("./ul[contains(@class, 'collapsible_region')]") {
          attribute("data-ur-toggler-component", "content")
          attribute("data-ur-state", "enabled")
        }
        $("./h3") {
          $("./span[contains(., 'Gift Card')]") {
            $("../.") {
              attribute("data-ur-state", "disabled")
            }
            $("../../ul[@class='collapsible_region']") {
              attribute("data-ur-state", "disabled")
            }
          }
        }
      }
      
      $("./div[contains(@class, 'outer_container')]") {
        $("./ul[contains(@class, 'collapsible_region')]") {
          $("./li[contains(@class, 'header')]") {
            remove()
          }
          $("./li") {
            $("./div[@class='inner_container']") {
              attribute("data-ur-set", "toggler")
              $("./ul[@class='item']") {
                attribute("data-ur-toggler-component", "content")
                attribute("data-ur-state", "disabled")
              }
              $("./ul") {
                $("./li/a") {
                  inner() {
                    # trim leading white space
                    # why isn't this working? the regex is valid..
                    # i tried text() too, no dice
                    # replace(/^[\s]+/, ".")
                    replace(/&nbsp;/, "")
                  }
                }
                $("./li[contains(@class, 'camera item')]") {
                  attribute("data-ur-toggler-component", "button")
                  attribute("data-ur-state", "disabled")
                }
                $("./li[@class='upc']") {
                  inner() {
                    prepend("<b>UPC:</b>")
                  }
                }
                $("./li[@class='requested']") {
                  inner() {
                    prepend("<b>Requested:</b>")
                  }
                }
                $("./li[@class='needed']") {
                  inner() {
                    prepend("<b>Needed:</b>")
                  }
                }
                $("./li[@class='availability']") {
                  inner() {
                    prepend("<b>Availability:</b>")
                  }
                  inject_after("<li class='mw_price'><b>Price:</b></li>") {
                    inject_bottom("<div class='mw_price_info'></div>") {
                      move_here("../../li[@class='price' or @class='OriginalPrice' or @class='SaleClearance']", "bottom") {
                        name("span")
                      }
                      $("./span[@class='SaleClearance']/span[@class='USave']") {
                        move_to("../.", "after")
                      }
                      $("./span[@class='OriginalPrice']") {
                        move_to("../span[@class='SaleClearance']", "after")
                      }
                    }
                  }
                }
                $("./li[@class='quantity']") {
                  inner() {
                    prepend("<b>Qty:</b>")
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
