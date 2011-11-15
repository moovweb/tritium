#
# Cachify.ts sample
# 
# This file is divided into 2 sections: The part that runs on cacheable pages and the part
# which serves the AJAX requests for user-specific data
#

#
# First Half: Makes pages cacheable by setting the 'Cache-Time' and removing the user-specific data
#
match($x_moov_api) {
  with(not(/true/)) {
    # Set the time in seconds that this page should be cacheable - 1200 seconds is 20 minutes
    #
    export("Cache-Time", "1200")
  
    html() {
      $("html") {
        #
        # Add the user_data_injector JS
        #
        $("head") {
          insert_bottom("script", type: "text/javascript", src: asset("javascript/user_data_injector.js"))
        }
    
        #
        # Remove any user-specific information here
        # For each piece of user-specific data:
        #   1. Select the parent, and give it an arbitrary 'user_data_key'
        #   2. Remove it's contents
        #
        $(".//div[@id='mw_outerCartSummary']") {
          attribute("user_data_key", "mw_outerCartSummary")
          inner() {
            remove()
          }
        }
        
        $(".//div[@class='mw_top_nav_container']") {
          attribute("user_data_key", "mw_top_nav_container")
          inner() {
            remove()
          }
        }
      }
    }
  }
  else() {
    #
    # Second Half: This is the part that responds to the AJAX
    # request with the user-specific data
    #

    # 1. Fetch user data into variables
    html() {
      $("html") {
        $(".//div[@id='c_3']") {
          name("span")
          $("a[@title='Checkout']") {
            remove()
          }
          move_here("a[2]", "bottom")
          wrap("div", id: "cartSummary") {
            move_here("span/a[2]", "bottom")
            move_here("span/a", "bottom")
          }
        }
        var("cart_data", fetch(".//div[@id='cartSummary']"))

        # Listify the tabular top navigation menu.
        $(".//div[@id='topNav']") {
          name("ul")
          attribute("id", "topNavMenu")
          $("table//a") {
            # Extract the link title text and remove the image
            text("")
            insert_top("span", class: "mw_menu_item") {
              text(fetch("./../@title"))
              insert_top("div", class: "icons-white-link-arrow")
            }
            # Move the link to the navigation menu
            move_to("/html/body/form/div[@id='mainContainer']/div[@id='header']//ul[@id='topNavMenu']", "bottom")
          }
          $("table") {
            remove()
          }
        }
        var("menu_items", fetch(".//ul[@id='topNavMenu']"))
        
      }
    }

    # 2. Stuff data into an XML response
    export("Content-Type", "text/xml")
    set("<user_data/>")
    xml() {
      $("user_data") {
        insert_bottom("item", key: "mw_outerCartSummary") {
          inner() {
            set($cart_data)
            prepend("<![CDATA[")
            append("]]>")
            rewrite("link")
          }
        }
          
        insert_bottom("item", key: "mw_top_nav_container") {
          inner() {
            set($menu_items)
            prepend("<![CDATA[")
            append("]]>")
            rewrite("link")
          }
        }
      }
    }
  }
}
