# REF_URL: asda-estore/catalog/sectionpagecontainer.jsp?skuId=23660&departmentid=1214921923769&aisleid=1214921923909&startValue=0
# PDP

$("body") {
  add_class("mw_product_details")
  # Scrolling back to top on load since the viewport will stay the same from the 
  # shop page.
  insert_bottom("script", "window.parent.scrollTo(0,1);", type:"text/javascript")
  
  $("./div[@id='mw_header'] |./div[@id='mw_footer'] ") {
    remove()
  }
  
  $("./div[@id='mw_mainWrapper']") {
    # Remove the random brs in the document (directly below this level)
    $("./br") {
      remove()
    }
    
    $("./link") {
      # move_to("/html/head", "bottom")
      remove()
    }

    # need to pull accesskeys out of the wrapper before we remove so content is loaded in properly
    insert_top("div", class:"mw_accesskeys mw_hide") {
      move_here("../ul[contains(@class,'accesskeys')]")
      move_to("../..","top")
    }

    # Useless Brs and Clearing Divs and # Breadcrumbs and # Extra footer
    $(".//*[@class='dropbelow'] | ./div[@id='breadcrumb'] | ./div/div[@id='footer']") {
      remove()
    }

    # Step into the products detail wrapper
    $("./div[@id='productdetail']") {
      # Removing additional banners
      $("./div/a[contains(@href, 'banneroffercontainer.jsp')]") {
        $("..") {
          remove()
        }
      }
    
      # Back button
      $("./h3[@class='left']/div[@id='backButton']") {
        $("..") {
          add_class("mw_testing")
          remove()
        }
      }
      # Remove any extra horizontal rules
      $(".//div[contains(@class,'hr')]") {
        add_class("mw_testing")
        remove()
      }
      # Email to a Friend and Print this page
      $("./div[@id='options']|./div[@class='pdpTop']") {
        add_class("mw_testing")
        remove()
      }

      # Move the "We think you might also like" section to the end of the page
      $(".//div[@class='productsdisplay']") {
        move_to("../../../div[@class='rightColumn']", "after")
      }
      # Try to wrap the text of the Product Info Area
      # TODO: Figure out if its possible to wrap the inner text of this area.
      $(".//div[@class='productinfo']") {
        inner_wrap("div", class: "mw_wrap")
      }
      # Dump the table
      $(".//table") {
        name("div")
        add_class("mw_table")
      }
      $(".//thead") {
        name("span")
        add_class("mw_thead")
      }
      $(".//tr") {
        name("div")
        add_class("mw_tr")
      }
      $(".//th") {
        name("div")
        add_class("mw_th")
      }
      $(".//td") {
        name("span")
        add_class("mw_span")
      }
      # Remove all 'dropbelow'
      $(".//div[@style='dropbelow']") {
        remove()
      }
      # Set the height and width of the main image and move it for styling reasons
      $("./div[contains(@class, 'leftColumn')]") {
        $("./div[@id='multisavediv']") {
          remove()
        }
        $("./div[@id='mainimagedefault' or @id='mainimage']/img") {
          attribute("width", "93")
          attribute("height", "93")
          # Step up one level to move the container div, not just the image
          $("..") {
            # make sure we have a consistent name
            attribute("id") {
              value("mainimagedefault")
            }
            move_to("../../div[@class='rightColumn']", "top")
          }
        }
      }
      $("./div[@class='rightColumn']") {
        $("./div[contains(@class,'topmargin10')]") {
          $("./p/strong[contains(text(), 'Product Information')]") {
            $("../..") {
            attribute("what","ok")
#               add_class("mw_testing")\
              move_to("../div[@class='productinfo']/div", "bottom")
#               wrap("div", class:"mw_product_info_wrapper")
            }
          }
        }
        # wrap the brief info and move data into it
        $("./div/p[not (contains(text(), 'locationinfo'))]") {
          $("..") {
            add_class("mw_brief_info")
            # remove the empty preiod
            $("./p[text()='.']") {
              remove()
            }
          }
        }

        $("./div[contains(@class,'mw_brief_info') and not (normalize-space(.) !='')]") {
          remove()
        }
        $("./div/div/div[@class='alternateSizes']") {
          $("../h4[contains(text(), 'Also available in sizes:')]") {
            move_to("../../../div[contains(@class, 'mw_brief_info')]", "bottom")
          }
          move_to("../../../div[contains(@class, 'mw_brief_info')]", "bottom")
        }
        # Get the product name and set it at the top of the page
        $("./div/div[@class='pricing']") {
          # In anticipation of moving, rename li to span
          $("./ul/li[@class='notes']") {
            #name("span")
            remove()
          }
          $("./ul/li[@class='info']") {
            attribute("class","notes")
            $("./span") {
              attribute("class","alert")
            }
          }
          # In anticipation of moving, rename li to span
          $("./ul/li[@class='productname']") {
            name("span")
          }
          # Wrap the info and product name li's (now spans) together
          insert_top("div", class: "mw_name_blurb_wrapper") {
            move_here("../ul/span[@class='info']", "bottom")
            move_here("../ul/span[@class='productname']", "bottom")
          }
          # Move the wrapped elements to the top of the page to be page headers
          $("../../..") {
            move_here(".//div[@class='mw_name_blurb_wrapper']", "before")
          }
          $("./ul/li[@class='volume']") {
            move_to("../../..//li[@class='price']", "after")
          }
        }
        # Wrap the main img, the price and add, and the alt images
        insert_top("div", class: "mw_pic_purchas_wrapper") {
          move_here("../div[@id='mainimagedefault']", "bottom")
          move_here("../div[@id='mainimage']", "bottom")
          move_here("../div[contains(@class, 'inbasket')]", "bottom")
          move_here("../div[contains(@class, 'purchase')]", "bottom")
          move_here("../div[@class='alternateImages']", "bottom")
          # add a class to the images that are not available
#           add_class("mw_testing")
          $(".//img[contains(@src,'no-image-available')]") {
            $("..") {
              add_class("mw_noImageAvailable")
            }
          }
        }
        
        # Structure the item
        $(".//div[contains(@class,'purchase')]/div[@class='item']") {
          $("./form") {
            $("./div[@class='fieldsetlist']") {
              $("./ul[@class='flist']") {
                $("./li[@class='notes']") {
                  inner() {
                    replace(/per/, "/")
                  }
                }
              }
              # Move the number in trolley to right before the add button
              $("./fieldset") {
                # Remove the units which aren't really needed
                # Might be able to use this once we are using a more recent version of manhattan
                # wrap_text_children("span", class: "mw_wrap")
                inner() {
                  replace(/kg/, "<span class='mw_kg'>kg</span>")
                }
                # Attributes for special keyboard on the amt 
                $(".//input[@class='quantity']") {
                  attribute("pattern", "[0-9]*")
                  attribute("onlbur","if (this.value == '') {this.value = '1';}")
                  attribute("onfocus","if (this.value == '1') {this.value = '';}")

                }
                move_here("../div[contains(@class, 'inbasket')]", "before")
              }
              $("./fieldset/span[@class='mw_kg']") {
                $("../../../..") {
                  add_class("mw_by_kg")
                  $(".//input[@class='quantity']") {
                    attribute("type","number")
                    attribute("pattern","")
                    attribute("onlbur","if (this.value == '') {this.value = '1.0';}")
                    attribute("onfocus","if (this.value == '1.0') {this.value = '';}")

                  }
                }
              }
            }
          }
        }
        
        $(".//div[contains(@class,'purchase')]/div[contains(@class,'item') and not(contains(@class,'mw_by_kg'))]") {
          add_class("mw_by_qty")
          $(".//input[@class = 'quantity']") {
            inject_before("<span class='mw_qty'>Qty</span>")
          }
        }
        # Toggler for see more images
        # Extra thing on the end of the path to make sure you don't bounce into an empty container
        $("./div[@class='mw_pic_purchas_wrapper']/div[@class='alternateImages']/div/..") {
          inner_wrap("div", class: "mw_alt_images_wrapper") {
            attribute("data-ur-toggler-component", "content")
            attribute("data-ur-state", "disabled")
          }
          attribute("data-ur-set", "toggler")
          insert_top("div", class: "mw_ppw_toggle_btn") {
            inner() {
              set("See more images")
            }
            attribute("data-ur-toggler-component", "button")
          }
        }
        
        $("./div[contains(@class, 'mw_brief_info')]") {
          move_to("../div[@class='mw_pic_purchas_wrapper']/div[contains(@class, 'purchase')]", "after")
        }
      }
      
      # Only applies if there is a "We think you'd like" section
      $("./div[@class='productsdisplay']") {
        $("./div[contains(@class,'item')]") {
          $("./div[@class='itemcontent']") {
            # Replacing the kg text present
            # because it is extraneous 
            $("./ul") {
              insert_top("ul", class:"flist mw_productPriceDetails") {
                move_here("../li[@class='notes'] | ../li[@class='price'] | ../li[@class='priceper']", "bottom")
                move_to("../../div/form", "before") 
              }
#               $("./li[@class='notes'] | ./li[@class='price'] | ./li[@class='priceper']") {
#                 name("div")
#                 move_to("../../div/form", "before") {
#                 }
#               }
            }
            $("./div/div[@class='shelfholder']") {
              move_to("../../ul", "bottom")
            }
            
            $(".//fieldset") {
              inner() {
                replace(/kg/, "<span class='mw_kg'>kg</span>")
              }
              $("./input[@type='button']") {
                # add_class("mw_testing")
                remove()
              }
            }
            $(".//fieldset") {
              $(".//span[@class='mw_kg']") {
                $("../../../../..") {
                  add_class("mw_by_kg")
                  $(".//input[@class='quantity']") {
                    attribute("type","number")
                    attribute("pattern","")
                    attribute("onlbur","if (this.value == '') {this.value = '1.0';}")
                    attribute("onfocus","if (this.value == '1.0') {this.value = '';}")
                  }
                }
              }
            }
            $("./ul") {
              $("./li[@class='productname']") {
                # Remove the Visit detail page...
                $("./a/span") {
                  remove()
                }
              }
              $("./li[@class='brand']") {
                remove()
              }
              $("./li[@class='productname']") {
                move_to("../li[@class='notes']", "before")
              }
            }
          }
        }
        $("./div[contains(@class,'item') and not(contains(@class,'mw_by_kg'))]") {
          add_class("mw_by_qty")
          $(".//input[@class = 'quantity']") {
            inject_before("<span class='mw_qty'>Qty</span>")
            attribute("pattern", "[0-9]*")
            attribute("onlbur","if (this.value == '') {this.value = '1';}")
            attribute("onfocus","if (this.value == '1') {this.value = '';}")
          }
        }
        
      }
      
      # Reorganize the structure to move things into more logical groups and that way
      # into togglers
      $(".//div[@class='mw_wrap']") {
        # due to the structure of text, we need to rename the class and move title out of this tag
        attribute("class") {
          value("mw_text")
        }
        # create a new div to store those titles
        insert_before("div", class: "mw_wrap")
        # move data out
        $("./h4 | ./div | ./p ") {
          move_to("../../div[@class='mw_wrap']", "bottom")
        }
        # organize 'Other information' tag 
        $("../..//h4[contains(text(), 'Other information')]") {
          wrap("div", class: "mw_other_info")
        }
        # now we have pure text info
        move_to("../div[@class='mw_wrap']/div[@class='mw_other_info']", "bottom")
        # make this tag a toggler content
        add_class("mw_accordianContent")
        attribute("data-ur-toggler-component", "content")
        attribute("data-ur-state", "disabled")
        attribute("data-ur-id", "other_info_toggler")
      }
      $(".//div[@class='mw_wrap']") {
        # change 'country of orgin' in 'location info' from h4 to h5
        # this is because that the markup wants 'country of orgin' under 'other information' tag
        # we will move 'location info' at the end (search for 'locationinfo' if you want to see it)
        $("./div[@class='locationinfo']/h4") {
          name("h5")
        }
        # hide the br's
        $("./br") {
          add_class("hideoffscreen")
        }
        # notice that all h4 tag is the title of a category, set it up as button of toggler
        $(".//h4") {
          attribute("data-ur-toggler-component", "button")
          attribute("data-ur-state", "disabled")
          add_class("mw_accordianBtn")
        }
        # setup ids for each toggler
        $(".//h4[contains(text(), 'Ingredients')]") {
          attribute("data-ur-id", "ingredients_toggler")
        }
        $(".//h4[contains(text(), 'Other information')]") {
          attribute("data-ur-id", "other_info_toggler")
        }
        $(".//h4[contains(text(), 'Nutritional Values')]") {
          attribute("data-ur-id", "nutritional_values_toggler")
          # setup Nutritional Values' content since it's right next to it
          $("../div") {
            add_class("mw_accordianContent")
            attribute("data-ur-toggler-component", "content")
            attribute("data-ur-state", "disabled")
            attribute("data-ur-id", "nutritional_values_toggler")
            # remove empty div for title
            $("./span/div") {
              $("./div[not (normalize-space(.) !='')]") {
                remove()
              }
              # setup the width of the table cell
              # the way this work is to see if there's more than one children
              # if so, modify the class to the correct one
              $("./div[position()='1']") {
                add_class("mw_size_one")
              }
              $("./div[position()='2']") {
                add_class("mw_size_two")
                $("../div[position()='1']") {
                  attribute("class") {
                    remove()
                  }
                  add_class("mw_size_two")
                  add_class("mw_th")
                }
              }
              $("./div[position()='3']") {
                add_class("mw_size_three")
                $("../div[position()='1']") {
                  attribute("class") {
                    remove()
                  }
                  add_class("mw_size_three")
                  add_class("mw_th")
                }
                $("../div[position()='2']") {
                  attribute("class") {
                    remove()
                  }
                  add_class("mw_size_three")
                  add_class("mw_th")
                }
              }
             # remove the third cell of every row
             # Notice, the 'tbody' comes from nowhere, only shown in source page, need to be careful with it
             # we can still get to the same element without tbody if we are at higher level, but with ../, we need tbody
              $("./div[position()='1' and contains(@class, 'mw_size_two')]") {
                $("../../../tbody/div/span[position()='3' and not (normalize-space(.) !='')]") {
                  remove()
                }
              }
             # remove both third and second cell of every row
              $("./div[position()='1' and contains(@class, 'mw_size_one')]") {
                $("../../../tbody/div/span[position()='3' and not (normalize-space(.) !='')]") {
                  remove()
                }
                $("../../../tbody/div/span[position()='2' and not (normalize-space(.) !='')]") {
                  remove()
                }
              }
            }
            # check the mw_size_* and add it to the rest of the rows
            $("./span/div/div[position()='1' and contains(@class, 'mw_size_three')]") {
              $("../../../tbody/div/span") {
                add_class("mw_size_three")
              }
            }
            $("./span/div/div[position()='1' and contains(@class, 'mw_size_two')]") {
              $("../../../tbody/div/span") {
                add_class("mw_size_two")
              }
            }
            $("./span/div/div[position()='1' and contains(@class, 'mw_size_one')]") {
              $("../../../tbody/div/span") {
                add_class("mw_size_one")
              }
            }
          }
        }
        # find where Product Info is, and make it a toggler button
        $("./div/p/strong") {
          $("..") {
            attribute("data-ur-toggler-component", "button")
            attribute("data-ur-state", "disabled")
            attribute("data-ur-id", "product_info_toggler")
            wrap("div", class: "mw_product_info_wrapper")
            attribute("class") {
              remove()
            }
            add_class("mw_accordianBtn")
            name("h1")
            $("..") {
              move_to("../../../div[@class='mw_wrap']", "bottom")
            }
          }
        }
        # check if 'nutritional info' tag exist, if so, move 'product info' tag after it
        $("./div[@class='nutritionalinfo']") {
          move_here("../div/div[@class='mw_product_info_wrapper']", "after")
        }
        # if 'nutritional info' tag does not exist, move 'product info' tag after 'other info' tag
        $("./div[@class='mw_other_info']") {
          move_here("../div/div[@class='mw_product_info_wrapper']", "after")
        }
        
        $("./div[contains(@class,'topmargin10')]") {
          add_class("mw_accordianContent")
          attribute("data-ur-toggler-component", "content")
          attribute("data-ur-state", "disabled")
          attribute("data-ur-id", "product_info_toggler")
          move_to("../div[@class='mw_product_info_wrapper']", "bottom")
        }
        # move produce_info_toggler up a level for better organization
        # find all the contents for this product and make them connect to the corresponded toggler button
        $("./p[@class='gap']") {
          add_class("mw_accordianContent")
          attribute("data-ur-toggler-component", "content")
          attribute("data-ur-state", "disabled")
          attribute("data-ur-id", "ingredients_toggler")
        }
        # try to move product code to 'other info' tag
        $("./div/div[contains(@class, 'mw_text')]") {
          move_here("../../p[@class='topmargin10']", "bottom")
        }
        # if 'other info' tag does not exist, wrap 'product code' with 'other info'
        $("./p[@class='topmargin10']") {
          wrap("div", class: "mw_text mw_accordianContent")
          $("..") {
            attribute("data-ur-toggler-component", "content")
            attribute("data-ur-state", "disabled")
            attribute("data-ur-id", "other_info_toggler")
            wrap("div", class: "mw_other_info")
            $("..") {
              inject_top("<h4 data-ur-toggler-component='button' data-ur-state='disable' class=' mw_accordianBtn' data-ur-id='other_info_toggler'>Other information</h4>")
            }
          }
        }
        # move location info into 'other info' tag
        $("./div[@class='locationinfo']") {
          move_to("../div[@class='mw_other_info']/div/p", "after")
        }
      }
    }
  }
}
