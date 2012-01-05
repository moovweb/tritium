# This file applies to the subcat page and the search_results page

attribute("class") {
  value() {
    append(" mw_subcat_prod_list")
  }
}

# move category sort out of surrounding anchor (if present)
# this bug only seem to be present in breast cancer awareness subcat page
$(".//div[@id='hero']") {
  move_here(".//div[@class='sort']", "top")

  $("./a") {
    remove()
  }
}

# Breadcrumb at the top
# $("./div[@id='breadcrumb']")

  # Filter and sort wrapper at the top
# Sometimes this is wrapped, sometimes not.... so we have to do a deep search.
#----
# AK: because it sometimes is and sometimes isn't wrapped inside filter_and_sort,
# i had to move some of the xpath searches out of filter_and_sort.
# this fixed the restructuring on shop by brand pages
#----
$(".//div[@id='filter_and_sort']") {
  # Originally says "Narrow Your Accessories Search" or "Narrow Your Search"
  $("./label") {
    inner() {
      set("<div class='mw_nav_text'>Narrow Your Search</div>")
    }
    name("div")
    attribute("class", "toggle_button")
    attribute("data-ur-toggler-component", "button")
    inject_bottom("<div class='icons-white_nav_arrow_dn'></div>")
    inject_bottom("<div class='icons-white_nav_arrow_up'></div>")
    wrap("div", class: "filter_wrap", data-ur-set: "toggler") {
      move_here("../div[@class='filters']") {
        attribute("class", "filters")
        attribute("data-ur-toggler-component", "content")
        $("./select") {
          wrap("div", class: "filter")
          $("./option[@value='#']") {
            # Move it outside of the select 
            move_to("./..", "before")
            name("label")
            inner() {
              replace("Select ", "")
              replace(/s$/, "")
              replace(/$/, ": ")
            }
          }
          insert_top("option", "All", value: "#")
          # Rewrite the links for the rest of the options in the list
          $("./option") {
            attribute("value") {
              value() {
                replace("http://www.belk.com", "")
              }
            }
          }
        }
      }
    }
  }
}

$(".//div[@class='paging']") {
  $("./label") {
    wrap("div", class: "sort_by_pill") {
      move_here("./../div[@class=\"narrow\"]/select", "bottom") {
        $("./option") {
          attribute("value") {
            value() {
              replace("http://www.belk.com", "")
            }
          }
        }
      }
      $("./select[2]") {
        remove()
      }
    }
  }
  $(".//div[@class='narrow']") {
    $("./ul") {
      $("./li[@class='last']") {
        $("./a") {
          inner("<div><div class='icons-white_nav_arrow_left'></div></div>")
        }
        name("div")
        attribute("id", "mw_prev")
        move_to("../.", "before")
      }
      $("./li[@class='next']") {
        $("./a") {
          inner("<div><div class='icons-white_nav_arrow_right'></div></div>")
        }
        name("div")
        attribute("id", "mw_next")
        move_to("../.", "after")
      }
    }
  }
  $(".//div[@class='narrow'][not(div[@class='last'])]") {
    insert_top("div", class: "mw_placeholder")
  }
}

  # Odd thing here... is that the product results list is actually inside the "filter_and_sort" div. Weird.
  # Sometimes there is a div wrapping this, sometimes not. So, I have to do a deep-search for it.
$(".//ul[@class='product_results']") {
  $(".//div[@id='slider-container']") {
    remove()
  }
  $("./li") {
    $("./div[contains(@class, 'image')]") {
      attribute("style") {
        remove()
      }
      $("./a[@class='qv_link']") {
        remove()
      }
      $("./div[@id='edvOverlay']") {
        remove()
      }
    }
    
      # Set the touch-link for the whole <li>
    attribute("touch-link", fetch(".//a[1]/@href"))
    
    $("./div[@class='info']") {
      $("./h3") {
        $("./a") {
          attribute("mw_what")
          inner() {
            replace(/&amp;reg/, "&reg;")
          }
        }
      }
        # Move the "ribbons", which contain the "More Colors Available" slogan down to the bottom of this div.
      $("./p[@class='ribbons']") {
        move_to("./..", "bottom")
      }
        #commenting out for now.  these changes are overwritten by js when user selects a size
        #$("./p[@class='price']"){
        #  $("./span[@class='price' or @class='orig_price' or @class='sale_price']"){
        #    html{
        #      replace(/\.(\d\d)/,"<sup class='mw_cents'>\\1</sup>")
        #    }
        #  }
        #}
    }
    
      # Change the A tags to be just regular old divs. We are handling links above with touch-links.
    $(".//a") {
      name("div")
      $("./img") {
        attribute("src") {
          value() {
              # using a smaller image for optimization
            replace(/P_THUMB/, "P_WISH")
            replace(/P_SEARCHPROD/, "P_WISH")
          }
        }
      }
    }
    
    $("./../li[last()]") {
      attribute("class", "last_product")
    }
  }
}
