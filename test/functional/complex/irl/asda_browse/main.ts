# If you need to modify the HTML/XML as raw text before its parsed... do it here!

#####
# Fix invalid markup on Asda pages here
#####

# JP/ZC: Fix the book slot - https://moov.lighthouseapp.com/projects/75946/tickets/86-book-slot-broken-html
match($path, /(checkout|delivery)\/(checkoutdeliveryslotgridcontainer|deliveryslotcontainer|deliveryslotgridframe)\.jsp/) {
  replace(/(deliveryslotgridaccessible.jsp.1\"\stype=\"hidden\"\sname=\"_DARGS\">)/, "\\1 </div>")
  log("--> Fixing their form to allow submissions to pass through")
}

# OJ: Home page - extra body tag
match($path, /\/home\-with\-deliverydate/) {
  replace(/\<\/body\>/, "<span>Extra Closing Body Tag Removed </span>")
  replace(/\<\/html\>/, "</body></html>")
}

# TD: Have you forgotten page - https://moov.lighthouseapp.com/projects/75946/tickets/255-add-button-in-have-you-forgotten-something-is-not-working
# The </fieldset> is nested inside a <form></form>; deleting it allows the parser to put it in the right place
match($path, /checkout\/havuforgottenframe\.jsp/) {
  log ("--> Indside the Have Your Forgotten Frame to allow form submissions to work")
  replace(/(<input.*qtyChange.*)\s<\/fieldset>/, "\\1")
}

#####
# Invalid markup fixes done
#####

match($content_type, /html/) {
  
  html() {
    # First request to Asda gets redirected to a cookie checking page
    # match($path, /asdaNS\/cookiesDetecting.html\?uri\=\//) 
    # also will match and rewrite /asda-estore/home/redirectsignpage.jsp
    match($path, /(home\/redirectsignpage.jsp|asdaNS)/) {
      $("//script") {
        log("--> Rewrote redirect_signin link")
        text() { rewrite("link") }
      }
    }
  
    $("html/body") {
      $("./meta[@http-equiv='refresh']") {
        attribute("content") {
          value() {
            rewrite("link")
            log("--> Rewriting the Meta Tag's (inside the BODY) Content URL")
          }
        }
        # Setting up the Var and Logging it is just for developing purposes and it should be removed once we deliver the project
        var("mwTestingMeta1") {
          set(fetch("@content"))
        }
        log($mwTestingMeta1) {
          prepend("Body, meta tag's url::")
        }
      }
    }
  
    #for debugging purposes I am keeping this seperate for now
    $("html/head") {
      $("./meta[@http-equiv='refresh']") {
        attribute("content") {
          value() {
            rewrite("link")
            log("##Rewriting the Meta Tag's (inside the HEAD) Content URL")
          }
        }
        # Setting up the Var and Logging it is just for developing purposes and it should be removed once we deliver the project
        var("mwTestingMeta") {
          set(fetch("@content"))
        }
        log($mwTestingMeta) {
          prepend("Meta Tags Url::")
        }
      }
    }
    # If on the m. domain, the user needs to use the backdoor
    match($host) {
      # DONOTMATCH is placed here to turn off the backdoor and if you want to
      # turn it back on replace "DONOTMATCH" with "m"
      with(/DONOTMATCH\.groceries\.asda\.com/) {
        # log("host = m.groceries.asda.com")
        # TS: backdoor implementation
        # Inserts a cookie and sends user to the home page
        # Must be done every 24 hrs or everytime the cookies are deleted
        match($path) {
          with(/100208261211359315185\/mobile\/directlink/) {
            log("!!!!! Backdoor Entrance")
            @import backdoor/backdoor.ts
          }
          else() {
            log($cookie)
            # Check to see if used the backdoor. Otherwise go to error page.
            match($cookie) {
              with(/mw_backdoor=active/) {
                log("--> Backdoor Cookie Exists")
                @import html.ts
              }

              # Backdoor Cookie Doesn't Exist
              else() {
                log(" Backdoor Cookie Doesn't Exist")
                $("./html") {
                  @import backdoor/backdoor_error.ts
                }
              }
            }
          }
        }
      }# end backdoor
      else() {
        @import html.ts
      }
    }
  }
}

# / For developing purposes 
# log($cookie) {
#   prepend("--> COOKIES:")
# }

# Caching only for container pages
@import caching.ts
