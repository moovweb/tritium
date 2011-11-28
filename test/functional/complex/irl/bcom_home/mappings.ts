log($status)
match($status) {
  with(/302/) {
    log("Status: 302")
    
    # 302 happens on the server and dosnt return anything
    # when something is returned its the new page with a 200
  
  }
  with(/505/) {
    log("Status: 505")
    log("Chose 'blockset' errors")
    @import pages/error.ts

  }
  with(/404/) {
    log("Status: 404")
    log("Chose 'blockset' errors")
    @import pages/error.ts

  }
  with(/200/) {
    log("Status: 200")

    
    match($path) {

      with (/((\/errors\/)|(prod\/throttle\/akamaigovernor\.))/) {
        log("Chose 'blockset' error")
        @import pages/error.ts
      }
      
      with (/(\/timedevents\/)/) {
        log("Chose 'blockset' error")
        @import pages/timed_events.ts
      }
      
      with (/((\?mvOffers=true)|(\&mvOffers=true))/) {
        log("Chose 'blockset' offers")
        @import pages/offers.ts
      }
      
      with (/(syndicated)/) {
        log("Chose 'blockset' syndicated_products")
        @import pages/syndicated_products.ts
      }

      with (/((wishlist\/help)|(product\/vgcemailpreview\.)|(credit\/ccpolicies\/index\.jsp)|(catalog\/product\/egcterms)|(credit\/agreement\/store\.jsp)|(catalog\/product\/warranty)|(applynow\/ccprivacy\.jsp)|(sizingchart)|(popup)|(search\/searchhelp)|(catalog\/product\/email))/i) {
        log("Chose 'blockset' pop_ups")
        @import pages/pop_ups.ts
      }

      with (/((myinfo)|(order\/index)|(\/service\/)|(\/app\/)|(\/customerservice\/))/) {
        log("Chose 'blockset' myAccount")
        @import pages/myAccount.ts
      }
  

      with (/((\/about\/)|(campaign\/campaign\.ognc))/) {
        log("Chose 'blockset' about")
        @import pages/about.ts
      }
  
      with (/(review\/index)|(writereview\.htm)|(submitreview)/) {
        log("Chose 'blockset' writeReview")
        @import pages/writeReview.ts
      }

      with (/((search\/index)|(search\/results))/) {
        log("Chose 'blockset' search")
        @import pages/search.ts
      }

      with (/^\/shop\/catalog\/product\/thumbnail/) {
        log("Chose 'blockset' catalog_ajax")
        @import pages/catalog_ajax.ts
      }

      with (/((product)|(bag\/addto))/) {
        log("Chose 'blockset' product")
        @import pages/product/productMatch11f.ts
      }

      with (/((bag\/index\.)|(bag\/checkout\/estimatedtax\.)|(catalog\/gift\/index\.ognc$)|(bag\/checkout\/verify)|(bag\/checkout\/merge\.)|(bag\/merge)|(bag\/checkout\/shippingfees\.)|(bag\/shippingfees)|(bag\/checkout\/shippolicy\.))/) {# |(catalog\/gift\/index) removed regex to allow gift with purchas to pass to correct block
        # this may cause adding guifts with color to the bag to break.... not sure
        log("Chose 'blockset' bag11f.ts")
        // @import pages/bag/cart_bag.ts
        @import pages/bag/bag11f.ts
      }
  
      with (/((catalog\/gift)|(catalog)|(wedding\/catalog)|(^\/shop\/))/) {
        log("Chose 'blockset' catalog")
        @import pages/catalog.ts
      }
  
      with (/(checkoutswf)/) {
        log("Chose 'blockset' checkout")
        @import pages/checkout.ts
      }

      with (/(policies)/) {
        log("Chose 'blockset' privacyPolicy")
        @import pages/privacyPolicy.ts
      }

      with (/(\/store\/)/) {
        log("Chose 'blockset' store_locator")
        @import pages/store_locator.ts
      }

      with (/(^\/signin)/) {
        log("Chose 'blockset' signin")
        @import pages/signin.ts
      }

      with (/(registry)/) {
        log("Chose 'blockset' registry")
        @import pages/registry.ts
      }
      
      with (/^\/credit\/((accountsummary\/)|(paybill\/)|(payment\/))/) {
        log("Chose 'blockset' payBill")
        @import pages/payBill.ts
      }

      with (/^\/?((\?)|($)|(\.com\/index.ognc\/?$)|(\.com\/\?fromPage=)|)/) {
        log("Chose 'blockset' landingPage")
        @import pages/landingPage.ts
      }

      with (/(myinfo\/register\/index)/) {
        log("Chose 'blockset' emailSignUp")
        @import pages/emailSignUp.ts
      }

      else() {
        log("no mappings, passthough?")
        @import pages/perfectProxy.ts
      }
    }
    @import pages/cleanup.ts
  }
  else(){
    #notify me if i rcv a 404 error message
    log(" ")
    log("error status", $status)
    log(" ")
    @import pages/error.ts
  }
}
