$("html") {
  match($optomize_prime) {
    with("yes") {
      @import optomize_prime.ts
    }
  }
  # Tevfik
  # Start Coremetrics
  # We are adding our own cmdatagutils
  $(".//script[contains(@src,'cmdatatagutils.js')]") {
    # Tevfik
    # I would have liked to add the coremetrics file to the bottom of the body, 
    # it needs to be in the head because there is inline JS that 
    # calls functions on it and the coremetrics functionality will break unless the 
    # file is included before the inline scripts. 
    #
    # I match the cookie to see if this is an app request or a mew request and add the js file accordingly
    match($cookie) {
      with (/ishop_app/) {
        log("Adding cmdatatagutils_app.js")
        insert_after("script", type: "text/javascript", src: asset("cmdatatagutils_app.js", "js"))
      }
      else () {
        log("Adding cmdatatagutils_mw.js")
        insert_after("script", type: "text/javascript", src: asset("cmdatatagutils_mw.js", "js"))
      }
    }
    remove()
  }
  $(".//script[contains(@src,'cmcustom.js')]") {
    # Tevfik
    # I would have liked to add the coremetrics file to the bottom of the body, 
    # it needs to be in the head because there is inline JS that 
    # calls functions on it and the coremetrics functionality will break unless the 
    # file is included before the inline scripts. 
    #
    # I match the cookie to see if this is an app request or a mew request and add the js file accordingly
    match($cookie) {
      with (/ishop_app/) {
        log("Adding cmcustom_app.js")
        insert_after("script", type: "text/javascript", src: asset("cmcustom_app.js", "js"))
       }
      else () {
        log("Adding cmcustom_mw.js")
        insert_after("script", type: "text/javascript", src: asset("cmcustom_mw.js", "js"))
      }
    }
    remove()
  }
  
  $("head") {
    
    # remove all link tags = no stylesheets or old favicons.
    $("link") {
      remove()
    }
    $("script") {
      # Rewrite the host to us. This way we can proxy it
      # so that we can remove the topnav images
      match($optimize_the_shit_out_of_me){
        with("true"){
          $("./@src[contains(., 'standard.js')]") {
             inner() {
               replace(/(assets\.)/) {
                 replace($1, "")
               }
               rewrite("link")
             }
           }
           # supports versioning now as well
           # first match is to the beginning of the src and the second is to the end.
           # this is the only way without regex support in contains
           $("./@src[contains(., 'global\.tiles\.base_script')]") {
             $("../@src[contains(., 'min.js')]") {
              inner() {
                replace(/(assets\.)/, "")
                rewrite("link")
              }
            }
          }
          $("./@src[contains(., '\/registry.js')]") {
            inner() {
              replace(/https/, "http")
              replace(/(assets\.)/, "")
              rewrite("link")
            }
          }
        }
      }
      text() {
        # every page has a forward page key that needs to be passed through.
        replace(/FORWARDPAGE_KEY.+?(http.+?\.com)/) {
          $temp = $1
          $1{
             rewrite("link")
           }
          replace($temp, $1)
        }
        # every page has a secure page variable that needs to be passed through.
        replace(/secureServer.+?(http.+?\.com)/) {
          $temp = $1
          $1{
             rewrite("link")
           }
          replace($temp, $1)
        }
        # # every page has a baseUrl variable that needs to be passed through.
        # replace(/baseServerURL.+?(http.+?\.com)/) {
        #   replace($1, rewrite("link"))
        # }
      }
    }
    #remove all style elements from head
    $("./style"){
      remove()
    }
    
    # $("script[contains(@src, 'standard.js')] | script[contains(@src, 'registry.js')]") {
    #   # attribute("src", asset("js/from_bcom/standard.js", "js"))
    #   # attribute("src", asset("js/from_bcom/registry.js", "js"))
    #   
    #   #the files are modefied but im waiting until after i know how to bundle to  add them
    # }mobile/mobMainAd.jsp

    # insert_bottom("link", rel: "stylesheet", href: asset("main.css", "stylesheet"))

    insert_bottom("link", rel: "stylesheet", type: "text/css", href: asset($device_stylesheet, "stylesheet"))
    insert_bottom("script", type: "text/javascript", src: asset("main.js", "js"))
    insert_bottom("meta", http-equiv: "Content-Type", content: "text/html")
    insert_bottom("meta", name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0")
    insert_bottom("meta", name: "format-detection", content: "telephone=no")
    insert_bottom("link", rel: "shortcut icon", href: asset("favicon.ico", "image"))
    insert_bottom("link", rel: "apple-touch-icon", href: asset("apple-touch-icon.png", "image"))  
    
  }
  
  # creditcard page link acception
  # this moves links from the nav into the body so that when
  # base removes it these will still be arround on the credit
  # services page.
  
  match($path){
    with(/service\/credit\/index\.ognc/){
      $("//div/a[contains(@href, 'credit/agreement/store.jsp')]/.."){
        move_to("//div[contains(@class, 'cr_css_bottomLinks')]", "before")
      }
      $("//div/a[contains(@href, 'credit/ccpolicies/index.jsp')]/.."){
        move_to("//div[contains(@class, 'cr_css_bottomLinks')]", "before")
      }
      $("//div/a[contains(@href, 'service/credit/club.ognc')]/.."){
        move_to("//div[contains(@class, 'cr_css_bottomLinks')]", "before")
      }
      $("//div/a[contains(@href, 'credit/acctmgmt/manageaccount.ognc')]/.."){
        move_to("//div[contains(@class, 'cr_css_bottomLinks')]", "before")
      }
    }
    with(/shop/){
      $("//div[@id='navigation']"){
        log("shop nav")
        move_to("//div[@id='bl_hp_main']", "top")
      }
    }
  }
  
  # include modefied base.ts file
  @import sections/base.ts
  
  # the ts files that dont need a 2nd html scope.
  @import mappings.ts
  
  # for everything that needs to be applied after the individual mappings
  @import sections/post_map_base.ts
  
  
  $("body") {
    insert_bottom("script", type: "text/javascript", src: asset("main-bottom.js", "js"))

    # Rewrite links and not my desktop site ones. #mw_desktop_link_1 is a unique id for a one of a kind desktop link
    # that is inside the checkout flow. because i already have a desktop site link in the footer i cant use the re-write
    # desktop link due to duplicate ID's
    $(".//a[not(@id='mw_desktop_link_1')][not(@id='mw_desktop_link')][not(contains(@href, '.com/service/contact'))]") {
      attribute("href") {
        value() {
          rewrite("link")
        }
      }
    }
  }
  
  # Hari:
  # Turns out we want to "proxy" all ext js files on www1.bloomingdales.com (e.g. search
  # pg) since akamai would redirect them to us anyway. I haven't found any cases in which
  # js files are at www.bloomingdales.com, and xpath doesn't accept regexes.
  $(".//script[contains(@src,'://www1.bloomingdales.com')]") {
    log('<--www1 script--------------')
    log($src)
    log('<---------------------------')
    attribute("src") {
      value() {
        replace(/\:\/\/www1\.bloomingdales\.com/, '://bloomingdales.com')
        rewrite('link')
      }
    }
    # if it's the priceData script at www1, it's a duplicate of one they bring in
    # using a relative path, so blow this one.
    match($src, /international\/priceData\.js/) {
      log('removing the www priceData script, it\'s a duplicate')
      remove()
    }
  }
}
