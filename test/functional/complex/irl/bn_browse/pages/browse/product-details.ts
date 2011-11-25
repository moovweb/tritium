var("normal_img", "?size=150,300")
var("thumbnail_img", "?size=48,60")
var("zoomed_img", "?size=304,464")

$("head") {
  # change JS-injected desktop links into mobile links
  insert_bottom("div", id: "mw_link_rewriter_config") {
    attribute("matcher", $rewrite_link_matcher_str)
    attribute("replacement", $rewrite_link_replacement)
  }
}

$("body") {  
  attribute("class", "mw_product_details")
  
  # move social buttons here to prevent it from being removed
  #move_here("//plusone", "top") # allow it to get removed for now
  move_here("//like", "top")
  move_here("//script[contains(@src, 'facebook')]") {
    attribute("social", "fb")
  }
  move_here("//script[contains(text(), 'FB.init')]") {
    attribute("social", "fb")
  }
  
  # Make JS absolute (Per shakedown)
  $("./form/script[contains(@src, 'ScriptResource.axd')]") {
    attribute("src") {
      value() {
        prepend("http://www.barenecessities.com")
      }
    }
  }
  # Open main content area scope
  $("form/div[@id='mainContainer']") {
    @import _free-shipping.ts
    $("div[@id='leftNav']") {
      remove()
    }
    $("div[@class='mainContentContainer']/div[@id='contentArea']/div[@id='contentContainer2']") {
      # not breaking anything
      $("div[@class='prodDCM']") {
        remove()
      }

      $("div[@id='leftColumn']") {
        move_here("div[@id='searchBar']", "before")
        
        # Put the zoom overlay here
        insert_before("div", id: "mw_zoom_overlay") {
          insert_bottom("div") {
            insert_bottom("span", "loading")
            insert_bottom("img")
            insert_bottom("div", id: "mw_unzoom_icon") {
              insert_top("div", class: "icons-unzoom-icon")
            }
          }
        }

        $("div[@id='DCM11_1']") {
          remove()
        }
        $("div[@id='ProductImage']") {
          $("div[@id='prodImg']") {
            attribute("style") {
              remove()
            }

            $("a") {
              # Remove the href to keep the viewport from jumping when clicked
              attribute("href") {
                remove()
              }
              # Our toggler will use its own onclick
              $("img") {
                attribute("onclick") {
                  remove()
                }
              }
              attribute("onclick") {
                remove()
              }
            }

            # Resize the images via a Scene7 parameter
            $("a/img | img") {
              attribute("src") {
                value() {
                  replace(/\?.*/, var("normal_img"))
                }
              }
            }
            
            insert_bottom("div", id: "mw_zoom_icon") {
              insert_top("div", class: "icons-zoom-icon")
            }
          }
          $("div[@class='divZoom']") {
            remove()
          }
          $("div[@id='moreViewsContainer']") {
            # Save onmouseout for the new thumbnail injected below
            var("on_mouse_out", fetch("@onmouseout"))
            attribute("onmouseout") {
              remove()
            }
            move_here(".//div[@class='prodview']") {
              $("div") {
                attribute("style") {
                  remove()
                }
                $("a/img") {
                  attribute("src") {
                    value() {
                      replace(/\?.*/, var("thumbnail_img"))
                    }
                  }
                  attribute("width") {
                    remove()
                  }
                  attribute("style") {
                    remove()
                  }
                  # Make onclick do what onmouseover did
                  attribute("onclick", fetch("@onmouseover"))
                  attribute("onmouseover") {
                    remove()
                  }
                }
              }
            }
            $("div[1]") {
              remove()
            }
            # Inject a thumbnail for restoring the first image
            copy_here("../div[@id='prodImg']/a[1]", "top") {
              $("img") {
                attribute("onclick", var("on_mouse_out"))
                attribute("src") {
                  value() {
                    replace(/\?.*/, var("thumbnail_img"))
                  }
                }
              }
              wrap("div") {
                wrap("div", class: "prodview")
              }
            }
            # Remove the hrefs to keep the view from jumping when clicked
            $("div/div/a") {
              attribute("href") {
                remove()
              }
            }
          }
          # Remove moreViewsContainer if there is only one thumbnail
          $("div[@id='moreViewsContainer' and count(div[@class='prodview'])=1]") {
            remove()
          }
        }
      }

      $("div[@id='rightColumn']") {
        $("br") {
          remove()
        }
        
        $("div[@class='moduleLogo']") {
          attribute("style") {
            remove()
          }
          move_to("../../div[@id='leftColumn']")
        }

        $("div[@class='mainTitle']") {
          attribute("style") {
            remove()
          }
          move_to("../../div[@id='leftColumn']")
        }
        
        # DCM 2.x
        $("div[@id='ctl00_cphMainContent_StandardSimple2_StandardSimplePanel']") {
          move_to("../../div[@id='leftColumn']")
        }

        # Need to accordionize this
        $("div[ul]") {
          insert_top("div", "show details") {
             # Add icons using sprites
            insert_bottom("div", class: "icons-accordion-closed")
            insert_bottom("div", class: "icons-accordion-open")
          }
          attribute("data-ur-set", "toggler")
          $("div") {
            wrap("div") {
              attribute("data-ur-toggler-component", "button")
              attribute("data-ur-state", "disabled")
            }
          }
          $("ul") {
            $("li/a/img") {
              remove()
            }
            $("li/a") {
              # rewrite to mobile link
              attribute("onclick") {
                value() {
                  rewrite("link")
                  # Use javascripts builtin version of this
                  replace(/openCtrdWindow\(this,/, "window.open(")
                }
              }
              text("Fabric content and country of origin")
            }
            $("li[1]") {
              name("div")
              add_class("mw_style_number")
              attribute("style", "clear:both")
              move_to("../../../../div[@id='leftColumn']/div[@class='mainTitle']")
            }
            wrap("div") {
              attribute("data-ur-toggler-component", "content")
              attribute("data-ur-state", "disabled")
              # other callout
              move_here("../../div[@id='ctl00_cphMainContent_StandardSimple3_StandardSimplePanel']", "top")
            }
          }
        }

        $("div//div[@class='prodPrice']") {
          $("div[@class='hrDots']") {
            remove()
          }
          move_here(".//td") {
            name("div")
          }
          $("table | div[contains(@id, 'ColorPricingPanel')]") {
            remove()
          }
          move_to("../../../../div[@id='leftColumn']")

          $("div[contains(text(), 'Our price')]") {
            wrap("div", id: "mw_our_price") {
              move_here("../div[@class='prodOurPrice'][1]")
            }
          }
          $("div[contains(text(), 'List price')]") {
            wrap("div", id: "mw_list_price") {
              move_here("../div[@class='prodListPrice']")
            }
          }
          $("div[contains(text(), 'Select Colors')]") {
            wrap("div", id: "mw_select_price") {
              move_here("../div[@class='prodOurPrice']")
            }
          }
          $("div[@class='fontSale']") {
            wrap("div", id: "mw_savings") {
              move_here("../div[@class='prodSavings'][1]")
            }
          }
          
        }

        $("div[contains(@id, 'rightColumnActivePanel')]") {
          $("div[contains(@id, '_ProductCalloutPanel')]/div[@class='prodPriceCallout']") {
            $("img") {
              wrap("span") {
                text(fetch("img/@alt"))
              }
            }
            # clearance image too big
            $("span[@class='xsmprodCallOut'][img]") {
              inner("Clearance Item<br />Hurry! Limited Sizes & Colors Available")
            }
            $("a") {
              attribute("href") {
                value() {
                  replace("promoDetailPopup\\(", "window.open('http://www.barenecessities.com/promoDetail.aspx?promo='+")
                }
              }
            }
            # move callout to top of page
            move_to("../../../../div[div[@class='mainTitle']]")
          }

          $("div/div[@class='prodAddToCart']") {
            move_here("table//select", "top")
            $("table") {
              remove()
            }

            $("select[1]") {
              wrap("div", id: "mw_select_box") {
                move_here("../select")
              }
            }

            $("div[@id='mw_select_box']") {
              $("select") {
                wrap("span", class: "mw_select")
              }
              # move annoying whitespace
              move_to("following-sibling::img[1]", "before")
              # move dynamic message to this box
              move_here("following-sibling::img[contains(@id, '_StockImage')][1]")
              move_here("following-sibling::div[contains(@id, '_EmailWhenAvailablePanel')][1]")
            }

            # Make this button more easily stylable
            $("div[@id='BuyMoreAtThisTime']") {
              attribute("style") {
                remove()
              }
              $("a") {
                $("img") {
                  remove()
                }
                attribute("style") {
                  remove()
                }
                inner_wrap("span")
              }
            }

            # Color Swatches
            $("div[contains(@id, 'ColorPanel')]") {
              attribute("style") {
                remove()
              }
              attribute("data-ur-set", "toggler")
              move_to("../div[@id='mw_select_box']", "before")
              $("span[@class='info']") {
                attribute("onclick", fetch("img/@onclick"))
              }
              $("div | span[not(@class)] | span[@class='info']/img") {
                remove()
              }
              insert_top("div", class: "mw_color_swatches") {
                move_here("../span[@class='info'][position() < 4]") {
                  $("span") {
                    attribute("style", "")
                  }
                }
              }
              $("span[@class='info'][1]") {
                wrap("div") {
                  move_here("../span[@class='info']")
                  attribute("data-ur-toggler-component", "content")
                  attribute("data-ur-state", "disabled")
                  $("span/span[@style]") {
                    attribute("style") {
                      remove()
                    }
                  }
                  move_to("../div[@class='mw_color_swatches']")
                }
                $("../../..") {
                  insert_top("div") {
                    attribute("data-ur-toggler-component", "button")
                    attribute("data-ur-state", "disabled")
                    insert_top("div", class: "icons-accordion-closed")
                    insert_top("div", class: "icons-accordion-open")
                    insert_top("span", "show more colors")
                  }
                }
              }
            }
          }

          # complete the look section
          $("div[contains(@id, 'CompleteTheLookPanel')]") {
            add_class("mw_acc")
            $("div[@class='CompleteTheLookContainer'][1]") {
              move_here("following-sibling::div[@class='CompleteTheLookContainer']/div[@id='CompleteTheLookContentMain']") {
                # jquery used when there are multiple 'complete the look' items
                var("mw_optimize_using_jquery", "true")
              }
              $("following-sibling::div[@class='CompleteTheLookContainer']") {
                remove()
              }
              add_class("mw_acc_section")
              attribute("data-ur-set", "toggler")
              # create acc header
              $("div[div[@class='moduleHdr']]") {
                $("div") {
                  add_class("mw_acc_header")
                  attribute("data-ur-toggler-component", "button")
                  attribute("data-ur-state", "disabled")
                  attribute("style", "")
                  inner_wrap("span") {
                    text() {
                      set(fetch("img/@alt"))
                    }
                  }
                  # Add icons using sprites
                  insert_bottom("div", class: "icons-accordion-closed")
                  insert_bottom("div", class: "icons-accordion-open")
                }
                move_here("div", "before")
                remove()
              }
              $("div[@class='CompleteTheLookTitle']") {
                remove()
              }
              $("div[@class='CompleteTheLookContentMain']") {
                move_here("table/tr/td/table")
                $("table[1]") {
                  remove()
                }
                # format main content
                $("table") {
                  # move product name below image
                  $("tr[1]") {
                    move_to("following-sibling::tr[1]/td[2]/table", "top")
                  }
                  # format image
                  $("tr[1]/td[1]/a[img]") {
                    $("img") {
                      attribute("src") {
                        value() {
                          replace(/\?.*/, "?size=100,100")
                        }
                      }
                    }
                    move_here("img", "before")
                    remove()
                  }
                  move_here("tr/td/*", "before")
                  remove()
                }
                # remove product details and size chart links
                $(".//table/tr/td[div[contains(@id, 'SizeChartPanel') or contains(@id, 'MoreInformation')]]") {
                  remove()
                }
                # divs inside table are bad
                $("table[1]/div") {
                  move_here("tr", "before")
                  remove()
                }
                # combine labels with prices
                $("table[1]/tr[td[@class='prodPrice']]") {
                  move_here("following-sibling::tr[1]/td/*")
                  $("td") {
                    move_here("following-sibling::*")
                  }
                }
                # take out the select elements
                move_here("table[2]//td/*")
                # move [not] 'in stock' message to bottom
                move_here("table[tr/td/div/img]")
                # remove empty cells
                $("table/tr[td[not (*)]]") {
                  remove()
                }
                # remove little orange arrow
                $("div/div[@class='prodPriceCallout']") {
                  wrap_text_children("span") {
                    text() {
                      replace("&nbsp", " ")
                    }
                  }
                  $("a") {
                    attribute("href") {
                      value() {
                        replace("promoDetailPopup\\(", "window.open('http://www.barenecessities.com/promoDetail.aspx?promo='+")
                      }
                    }
                  }
                }
              }
              insert_bottom("div", class: "mw_acc_items") {
                attribute("data-ur-toggler-component", "content")
                attribute("data-ur-state", "disabled")
                move_here("preceding-sibling::div[@class='CompleteTheLookContentMain']")
              }
            }
          }
          
          $("div[contains(@id, 'AddCartPanel')]") {
            # Remove the shoprunner banner
            $("div") {
              remove()
            }
            # Make a new button that clicks the old button to avoid breakage
            $("a") {
              # Stop it from jumping to the top of the page when clicked
              attribute("href", "")
              $("input") {
                attribute("class", "mw_old_submit")
              }
            }
            insert_bottom("div", "add item(s) to cart") {
              attribute("class", "mw_submit")
              attribute("onclick", "document.getElementsByClassName('mw_old_submit')[0].click();")
            }
          }

          $("div[not (contains(@id, 'AddCartPanel') or div[@class='prodAddToCart'] or contains(@id, 'CompleteTheLookPanel')  or contains(@id, 'productUnavailablePanel'))]") {
            remove()
          }
        }
        $("div[not (contains(@id, 'Bullets') or contains(@id, 'ShortDescription') or contains(@id, 'rightColumnActivePanel') or contains(@class, 'mw_style_number'))]") {
          remove()
        }
        $("following-sibling::div[1]") {
          remove()
        }
      }

      $("div[@id='leftColumn']") {
        $("div[@class='moduleLogo']") {
          wrap("div", class: "mw_product_info") {
            move_here("../div[@class='mainTitle']")
            move_here("../div[@id='ctl00_cphMainContent_StandardSimple2_StandardSimplePanel']")
            move_here("../div[@class='prodPrice']")
            move_here("../div[@class='prodPriceCallout']")
          }
        }
        
        # move social stuff here
        move_here("//like") {
          move_here("//script[@social='fb']", "before") 
          attribute("send", "false")
          attribute("width") {
            remove(); # remove the width attribute, we'll control the width with CSS
          }
          wrap("div", social: "fb")
          name("fb:like")
        }
        move_here("//plusone") {
          # copy over href because it doesn't have it
          attribute("href", fetch("../like/@href"))
          wrap("div", social: "gp")
          move_here("//script[contains(@src, 'plusone')]") {
            attribute("social", "gp")
          }
          name("g:plusone")
        }
        move_here(".//div[@class='mw_product_info']", "after")
        $(".//div[@id='ProductImage']") {
          insert_after("div", "", class: "mw_social") {
            move_here("..//div[@id='fb-root']")
            move_here("../*[@social]")
          }
        }
        # this contains the 360 degree view stuff
        $("./div[@class='divFormattedLeft']") {
          remove()
        }
      }

      $("div/div[contains(@id, 'RecommendedProducts')]") {
        # JUST REMOVE IT FOR NOW ... PROBABLY NOT GONNA COME BACK
        remove()
      }

      $("div[@id='linkPanel']") {
        $("preceding-sibling::div[1]") {
          remove()
        }
        remove()
      }
      $("br") {
        remove()
      }
    }
    $("div[@class='bn_footer_width']") {
      remove()
    }
    
    $("div[@class='mainContentContainer']") {
      move_here("../div[@id='leftNavSpecial']", "bottom")
    }
  }
  # Need to delete some elements via JS because they're inserted via JS.
  insert_bottom("script", type: "text/javascript") {
    text("document.getElementById('BuyMoreAtThisTimePlaceHolder').innerHTML = '';")
  }
    # JS for setting the body attribute which is removed when cachify reparses the page
  insert_bottom("script", type: "text/javascript") {
    text("document.body.className = 'mw_product_details';")
  }
}
