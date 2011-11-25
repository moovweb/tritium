match($status) {
  with(/302/) {
    log("Status: 302")
  }
  with(/200/) {
    log("Status: 200")
    # the following matcher is for pages which need headerFooter.ts and base.ts
    $html_fragment = "false"
    #match($path, /(\/catalog\/product\/thumbnail\/.*?cmIO)|(\/catalog\/product\/thumbnail\/)|((popup|size)\.(ognc|jsp))|(uploadphoto\.htm)/) {
    match($path, /(\/profiles\/.*\/profile\.htm)|(\/campaign\/social\?)|(\/catalog\/product\/thumbnail\/.*?cmIO)|(\/catalog\/product\/thumbnail\/)|((popup|size)\.(ognc|jsp))|(uploadphoto\.htm)|(pendingpaymentsdisplay)|(\/credit\/accountsummary\/onlinestatements\?|(\/credit\/accountsummary\/recentactivity\?))/) {
      $html_fragment = "true"
    }
    match($html_fragment, "false") {
      log("Importing base.ts and HeaderFooter.ts")
      @import pages/base.ts
      @import pages/HeaderFooter.ts
    }
    match($path) {
    
      with (/\&mwDesktopPage=/){
        log("Chose 'toDesktopPage'")
        @import pages/toDesktopPage.ts
      }
      with (/\/profiles\/.*\/profile\.htm/){
        log("Chose 'reviewerRedirect'")
        @import pages/reviewerRedirect.ts
      }
      with (/\/campaign\/social\?/){
        log("Chose 'skavaRedirect'")
        @import pages/skavaRedirect.ts
      }
      
      with (/\/campaign\/affiliate\.jsp/) {
        log("Chose 'blockset' affiliate")
        @import pages/affiliate.ts
      }

      with (/\/shop\/gifts-gift-cards\/free-e-gift-cards/) {
        log("Chose 'blockset' giftCards")
        @import pages/giftCards.ts
      }
      with (/(popup|size)\.(ognc|jsp)/) {
        log("Chose 'blockset' popup")
        @import pages/popup.ts
      }
      with (/(\/product\/review\/|writereview)/) {
        log("Chose 'blockset' write_review")
        @import pages/write_review.ts
      }
            with (/reviews\.htm/) {
                    log("Chose 'blockset' reviews")
                    @import pages/reviews.ts
                  }
      with (/\/product\/email/) {
        log("Chose 'blockset' email")
        @import pages/email.ts
      }
      # WARNING: SUPPORT LISTS ON MAPPINGS ARE NOT SUPPORTED: os=blackberry
      # See below (10 lines)
      #  with (/.*macys.*\/((catalog\/product)|(bag\/addto\.ognc))/) {
      #    log("Chose 'blockset' product_bb")
      #    @import pages/product_bb.ts
      #  }
      #
      with (/\/coach\/catalog\//) {
        log("Chose 'blockset' coach")
        @import pages/coach.ts
      }
      # URL: http://mlocal.macys.com/catalog/product/index.ognc?upc_ID=29767807&ID=579083&Quantity=1&EXTRA_PARAMETER=BAG&PseudoCat=ba-xx-xx-xx.index
      # Added the os=blackberry check here
      with (/\/((catalog\/product\/((index\.ognc)|(vgcemailpreview\.ognc)|(warranty\.jsp)))|(bag\/addto\.ognc))/) {
        # only cache the product page, not the add-to-bag popup (ajax to update cart)
        # match($path, /\/catalog\/product\//) {
        #          $cache_me = "true"
        #        }
        match($blackberry) {
          with("true") {
            log("Chose 'blockset' product_bb")
            @import pages/product_bb.ts
          }
          else() {
            log("Chose 'blockset' product")
            @import pages/product.ts
            @import opt/product.ts
            @import opt/_move_js.ts
          }
        }
      }
      # URL: http://mlocal.preprod5macys.fds.com/shop/product/lauren-by-ralph-lauren-bedding-pale-blue-paisley-suite-collection?ID=451718
      # URL: http://mlocal.preprod5macys.fds.com/shop/product?ID=572167&CategoryID=10834#fn=sp%3D1%26spc%3D654
      with (/^\/shop\/(product|registry\/wedding\/product)(\/|\?)/) {
        @import pages/product-new.ts
      }
      with (/\/registry\/wedding\/catalog\/index\.ognc/) {
        log("Chose 'blockset' registryCatalogBrowse")
        @import pages/registryCatalogBrowse.ts
      }
      # URL: http://mlocal.macys.com/registry/wedding/registryhome?cm_sp=global_nav_reg-_-wedding_registry-_-n
      with (/\/registry\/wedding\/(registryhome|registrycaptureemail|registrycreateaccount|registryeditaccount|registrysignin|registryclaim|registrysearch)/) {
        log("Chose 'blockset' registry")
        @import pages/registry.ts
      }
      with (/\/catalog\/gift\/index\.ognc\?GIFTID/) {
        log("Chose 'blockset' productOffers")
        @import pages/productOffers.ts
      }
      with (/\/catalog\/product\/thumbnail\//) {
        log("Chose 'blockset' browse_ajax")
        @import pages/browse_ajax.ts
      }
      # URL: http://mlocal.macys.com/search/index.ognc?SearchTarget=*&Keyword=shirt&KEYWORD_GO_BUTTON.x=0&KEYWORD_GO_BUTTON.y=0&KEYWORD_GO_BUTTON=KEYWORD_GO_BUTTON
      with (/\/search\//) {
        log("Chose 'blockset' search")
        @import pages/search.ts
        @import opt/search.ts
      }
      with (/\/service\//) {
        log("Chose 'blockset' service")
        @import pages/service.ts
      }
      # URL: https://mlocal.preprod5macys.fds.com/credit/accountsummary/account
      with (/\/credit\/accountsummary\/account/) {
        log("Chose 'blockset' accountsummary")
        @import pages/account_summary.ts
      }
      with (/(\/credit\/paybill)|(\/credit\/payment\/((recurring)|(onetime)|(edit)))|(\/paymenthistory\/history)/) {
        log("importing billpay nav")
        @import pages/billpay/nav.ts
        match($path) {
          with (/\/credit\/paybill/) {
            log("Chose 'blockset' billpay home")
            @import pages/billpay/home.ts
          }
          with (/\/credit\/payment\/((recurring)|(onetime))select/) {
            log("Chose 'blockset' billpay select")
            @import pages/billpay/select.ts
          }
          with (/\/credit\/payment\/((((recurring)|(onetime))setup)|(editrecurring|editreview))/) {
            log("Chose 'blockset' billpay setup")
            @import pages/billpay/setup.ts
          }
          with (/\/credit\/payment\/((recurring)|(onetime))review/) {
            log("Chose 'blockset' billpay review")
            @import pages/billpay/review.ts
          }
          with (/\/credit\/payment\/((recurring)|(onetime))confirm/) {
            log("Chose 'blockset' billpay confirm")
            @import pages/billpay/confirm.ts
          }
          with (/\/paymenthistory\/history/) {
            log("Chose 'blockset' billpay history")
            @import pages/billpay/history.ts
          }
        }
      }
      
      # with (/submitreview/) {
      #         log("Chose 'blockset' submit_review_iframe")
      #         @import pages/submit_review_iframe.ts
      #       }
      # with (/\/related-content\//) {
      #        log("Chose 'blockset' relatedContent")
      #        @import pages/relatedContent.ts
      #      }
      with (/\/store\/locator/) {
        log("Chose 'blockset' store_locator")
        @import pages/store_locator.ts
      }
      
      with (/\/store\//) {
        log("Chose 'blockset' store")
        @import pages/store.ts
      }
      # URL: http://mlocal.macys.com/shop/womens?id=118
      with (/\/shop\//) {
        log("Chose 'blockset' browse")
        $cache_me = "true"
        @import pages/browse.ts
        match($path) {
          # Categorize further for optimization
          with (/\/shop\/[a-z0-9\-\/]*\?id=[0-9]+/) {
            log("Chose 'blockset' category 'type' browse")
            @import opt/browse.ts
          }
          else() {
            log("Chose 'blockset' category")
            @import opt/category.ts
          }
        }
        @import opt/_move_js.ts
      }
      with (/\/account\/signin/) {
        log("Chose 'blockset' signin")
        @import pages/signin.ts
      }
       with (/\/account\/profile/) {
          log("Chose 'blockset' profile")
          @import pages/profile.ts
        }
        with (/\/account\/(wallet|addressbook)/) {
            log("Chose 'blockset' walletaddress")
            @import pages/walletaddress.ts
          }
      
      with (/\/(myinfo|account)\//) {
        log("Chose 'blockset' myinfo")
        @import pages/myinfo.ts
      }
     
      
      # URL: http://mlocal.macys.com/index.ognc
      with (/(^\/index\.ognc)|(fromPage=\/signin\/index\.ognc)/) {
        log("Chose 'blockset' home")
        $cache_me = "true"
        @import pages/home.ts
        @import opt/home.ts
        @import opt/_move_js.ts
      }
      with (/\/(mymacysrewards|rewards|.*?fromPage=mymacysrewardsenroll)/) {
        log("Chose 'blockset' reward")
        @import pages/reward.ts
      }
      
      with (/((checkout\-webflow)|(\/checkout\/estimatedtax\.jsp))/) {
        log("Chose 'blockset' checkout")
        @import pages/checkout.ts
      }
      # there are two url for shippingFees. They are the same content but different html.
      with (/\/(shippingfees|shippingFees)/) {
        log("Chose 'blockset' shippingfees")
        @import pages/shippingfees.ts
      }
      with (/\/catalog\/product\/thumbnail\/.*?cmIO/) {
        log("Chose 'blockset' bag_ajax")
        @import pages/bag_ajax.ts
      }
      # URL: http://mlocal.macys.com/bag/index.ognc
      with (/((\/bag\/)|(catalog\/gift\/index\.ognc))/) {
        log("Chose 'blockset' bag")
        @import pages/bag.ts
        @import opt/bag.ts
      }
      # URL: http://mlocal.macys.com/registry/wedding/registrant
      with (/\/registry\/wedding\//) {
        log("Chose 'blockset' registry_tools")
        @import pages/registry_tools.ts
        @import opt/registry.ts
      }
      #
      # now in main.ts
      #with (/\/checkoutswf\/redirect/) {
      #  log("Chose 'blockset' bag_redirect")
      #  @import pages/bag_redirect.ts
      #}
      #
      # now in html.ts
      #with (/\/skava\/add_to_cart/) {
      #  log("Chose 'blockset' skava_add_to_bag")
      #  @import pages/skava_add_to_bag.ts
      #}
      #
      # now in html.ts
      #with (/\/photon\/add_to_cart/) {
      #  log("Chose 'blockset' photon_add_to_bag")
      #  @import pages/photon_add_to_bag.ts
      #}
      with (/checkout/) {
        log("Chose 'blockset' checkout")
        @import pages/checkout.ts
      }
      #######################################
      ### THE FOLLOWING 3 ARE ERROR PAGES ###
      #######################################
      # URL: http://mlocal.macys.com/p505.jsp
      with (/p505\.jsp/) {
        log("Chose 'blockset' error 505")
        @import pages/error505.ts
      }
      # URL: http://mlocal.macys.com/siteunavailable.html
      with (/siteunavailable.html/) {
        log("Chose 'blockset' siteunavailable")
        @import pages/siteunavailable.ts
      }
      # URL: http://mlocal.macys.com/akamaigovernor.html
      with (/akamaigovernor.html/) {
        log("Chose 'blockset' akamaigovernor")
        @import pages/akamaigovernor.ts
      }
      # URL: http://mlocal.macys.com/
      with (/^\/$/) {
        log("Chose 'blockset' home")
        $cache_me = "true"
        @import pages/home.ts
        @import opt/home.ts
      }
      # URL: http://mlocal.macys.com/campaign/bvSweeps.jsp
      with (/^\/campaign\/bvSweeps/) {
        log("Chose 'blockset' bv_sweeps")
        $cache_me = "true"
        @import pages/bv_sweeps.ts
      }
      # REF_URL: qacreative14macys.fds.com/cms/deals/Test-coupon-ruchir
      with(/Test-coupon-ruchir/) {
        log("--> Importing coupons.ts")
        @import pages/deals/coupons.ts
      }
      else() {
        log("Chose 'blockset' notPassthroughPages")
        @import pages/notPassthroughPages.ts
      }
    }
  }
  else() {
    log("Error, Status", $status)
    # anything we can do about this redudancy?
    @import pages/base.ts
    @import pages/HeaderFooter.ts
    @import pages/errorPage.ts
  }
}
