#
# Cachify.ts sample
# 
# This file is divided into 2 sections: The part that runs on cacheable pages and the part
# which serves the AJAX requests for user-specific data
#

#
# First Half: Makes pages cacheable by setting the 'Cache-Time' and removing the user-specific data
#
match($x_moov_api, not(/true/)) {
  #
  # Select the paths that you want to make cacheable
  #
  match($path, /flippers/) {
    #
    # Set the time in seconds that this page should be cacheable - 1200 seconds is 20 minutes
    #
    export("Cache-Time", "1200")

    doc("html") {
      $("html") {
        #
        # Add the user_data_injector JS
        #
        $("head") {
          bottom {
            insert_tag("script", type: "text/javascript", src: asset("user_data_injector.js", "js"))
          }
        }

        #
        # Remove any user-specific information here
        # For each piece of user-specific data:
        #   1. Select the parent, and give it an arbitrary 'user_data_key'
        #   2. Remove it's contents
        #
        $(".//div[@id='account_name'") {
          attribute("user_data_key", "account_name")
          html {
            remove()
          }
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
  doc("html") {
    $("html") {
      var("private_account_name", fetch(".//div[@id='account_name']/text()"))
    }
  }

  # 2. Stuff data into an XML response
  export("Content-Type", "text/xml")
  set("<user_data/>")
  doc("xml") {
    $("user_data") {
      bottom {
        insert_tag("item", key: "account_name") {
          html {
            set($private_account_name)
            # NOTE: If I wanted to format the account name in some way, I could do that here
          }
        }
      }
    }
  }

}
