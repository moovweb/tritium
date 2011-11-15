match($x_moov_api) {

  # HTML page that will be cachified
  with(not(/true/)) {
    #
    # Indicate that this page should be cached for 20 minutes
    #
    export("Cache-Time", "1200")

    # NOTE: I'm parsing the HTML document for a second time here,
    # but this will only happen on pages which are cacheable, so
    # hopefully that is not a huge deal.
    html() {
      $("html") {
        # Add the user_data_injector JS to head so it runs asap
        $("head") {
          insert_bottom("script", type: "text/javascript", src: asset("javascript/user_data_injector.js"))
        }

        # Remove the number of bag items and mark it as
        # needing to be filled in.
        $(".//span[@id='num_bag_items']") {
          attribute("user_data_key", "bag_items")
          inner() {
            set("")
          }
        }
        
        # so for belk, the determining factor for authentication is a class on the div containing the header
        # loggedIn = logged in
        # loggedOut = you guessed it, logged out
        # but the user data injector we use will only replace contents, not attributes
        $(".//div[@id='header']/div[1]") {
          attribute("user_data_key", "auth_status")
          attribute("class", "")
        }

        $(".//div[@class='cartActions']") {
          attribute("user_data_loaded_class", "loaded")
        }
      }
    }

    # fix the parsing as in main.ts
    replace(/\%24/, "$")

  }

  # AJAX response corresponding to an HTML page that has been cachified
  else() {
    #
    # XML RESPONSE
    # `X-Moov-API: true` is set by user_data_injector.js only on page types specified above
    #

    # 1. Fetch user data into variables
    html() {
      $("html") {
        # at this point, no transformations have been done by Tritium, so find the element(s) using an xpath with the original source html
        var("private_bag_items", fetch(".//span[@id='num_bag_items']/text()"))
        var("private_auth_status", fetch(".//div[@id='header']/div[1]/@class"))
        log("***cachify***")
        log($private_bag_items)
        log($private_auth_status)
        log("***cachify***")
      }
    }

    # 2. Stuff data into an XML response
    export("Content-Type", "text/xml")
    set("<user_data/>")
    xml() {
      $("user_data") {
        insert_bottom("item", key: "bag_items") {
          inner() {
            set($private_bag_items)
          }
        }
        insert_bottom("item", key: "auth_status", attr: "class") {
          inner() {
            set($private_auth_status)
            #prepend("<![CDATA[")
            #append("]]>")
            #rewrite("link")
          }
        }
      }
    }
  }
}
