# Enable or disable site wide optimizations (Turning this off should be
# your first step in troubleshooting a javascript problem)
$mw_optimize_global = "true"

match($status) {
  with(/200/) {
    match($path) {

      log($path)
      
      # Removal of extra navigation and tabs across entire site
      @import pages/browse/allpages-excess.ts
      
      # AJAX calls for hero and global banner
      with(/^\/util\/GetDCMContent/) {
        # Want to cache this for a while
        log("Caching global banner")
        export("Cache-Time", "1200")
        $(".//img") {
          attribute("src") {
            value() {
              replace(/\s+$/, "")
            }
          }
        }
      }
      
      # PAGE_TYPE: home page
      # REF_URL: http://www.barenecessities.com/
      # REF_URL: http://www.barenecessities.com/?lid=66799577&LID={IFCONTENT:66799578}{IFSEARCH:66799577}
      with(/^\/((\?.*)?$|default\.)/) {
        @import pages/browse/home.ts
        log("Setting run_cachify to 'home'")
        var("run_cachify", "home")
      }

      # PAGE_TYPE: generic search
      # REF_URL: http://www.barenecessities.com/search.aspx?search=boyshorts&ft=1
      with(/^\/search.aspx/) {
        @import pages/browse/search.ts
      }

      # PAGE_TYPE: all brands listing (one of a kind)
      # REF_URL: http://www.barenecessities.com/brands.aspx
      with(/^\/brands.aspx/) {
        @import pages/browse/all-brands.ts
        log("Setting run_cachify to 'all-brands'")
        var("run_cachify", "all-brands")
      }

      # PAGE_TYPE: plus size catalog (and similar pages)
      # REF_URL: http://www.barenecessities.com/Plus-Size_catalog_nxs,35.htm
      # REF_URL: http://www.barenecessities.com/catalog.aspx?nxs=35
      # REF_URL: http://mstage.barenecessities.com/catalog.aspx?nxs=130&fl=true
      # REF_URL: http://www.barenecessities.com/sleepwear_catalog_nxs,38,fl,true.htm
      with(/^\/(Plus-Size_catalog|.*catalog.*fl(,|=)true)/) {
        log("--> Importing pages/browse/plus-size-catalog.ts")
        @import pages/browse/plus-size-catalog.ts
        log("Setting run_cachify to 'plus-size'")
        var("run_cachify", "plus-size")
      }

      # PAGE_TYPE: top sports bras (one of a kind)
      # REF_URL: http://www.barenecessities.com/special.aspx?specialpage=Topsportsbras
      with(/^\/special.*Topsportsbras/) {
        @import pages/browse/sportsbras.ts
        log("Setting run_cachify to 'top-sports-bras'")
        var("run_cachify", "top-sports-bras")
      }

      # PAGE_TYPE: shop by bra size (one of a kind)
      # REF_URL: http://www.barenecessities.com/sitemapbybrasize.aspx
      with(/^\/sitemapbybrasize/) {
        @import pages/browse/shop-by-bra-size.ts
        log("Setting run_cachify to 'shop-by-bra-size'")
        var("run_cachify", "shop-by-bra-size")
      }

      # PAGE_TYPE: callback url used by "Checkout with Paypal"
      # REF_URL: http://mstage.barenecessities.com/partners/paypal/paypallanding.aspx?status=SUCCESS&token=EC-18418915237043920&PayerID=HY9PSC5DHBDM6
      with(/paypallanding/) {
        @import pages/checkout/shipping-options.ts
      }

      # PAGE_TYPE: mailing list signup
      # REF_URL: http://www.barenecessities.com/catalogrequest.aspx
      with(/^\/catalogrequest/) {
        @import pages/browse/catalog-request.ts
      }

      # PAGE_TYPE: style and vendor catalog landing pages (similar to search)
      # REF_URL: http://www.barenecessities.com/Boyshorts-Panties_catalog_nxs,32,style,95.htm
      # REF_URL: http://www.barenecessities.com/Plus-Size-Swimwear_catalog_nxs,131.htm
      # REF_URL: http://www.barenecessities.com/Sale-Bras_catalog_nxs,75.htm
      # REF_URL: http://www.barenecessities.com/catalog.aspx?nxs=31&size=893&style=&vendor=750
      with(/(catalog.*(style|vendor|true|size)|^\/((.*Plus-Size)|Full-Figure|Sale).*_catalog_)/) {
        log("--> Importing pages/browse/catalog-style-vendor.ts")
        @import pages/browse/catalog-style-vendor.ts
      }

      # PAGE_TYPE: catalog pages with condensed url
      # REF_URL: http://www.barenecessities.com/catalog.aspx?nxs=35
      # REF_URL: http://www.barenecessities.com/catalog.aspx?nxs=91&sb=DD
      # REF_URL: http://www.barenecessities.com/catalog.aspx?nxs=121&cm_mmc=Targeted--20110713B%20--PS-_-PSTopLink4&referrer=30&cm_em=keira@barenecessities.com&lb=0
      with(/^\/catalog.*\?nxs=\d+/i) {
        @import pages/browse/catalog.ts
      }

      # PAGE_TYPE: mailing list email signup
      # REF_URL: http://www.barenecessities.com/signup.aspx?source=12
      # REF_URL: http://www.barenecessities.com/signup.aspx?boolSuccess=true&email=chris.chimenti@moovweb.com
      # IMPORTANT: This needs to go before catalog ref: ticket #104
      with(/^\/signup/) {
        @import pages/browse/signup-confirmation.ts
      }

      # PAGE_TYPE: generic catalog landing
      # REF_URL: http://www.barenecessities.com/Bras_catalog_nxs,31.htm
      # http://mlocal.barenecessities.com/signup.aspx?source=19&amp;cm_mmc=QRCD--catalog--Wacoal-_-Email&source=qrcode&term=WacoalEmail
      with(/catalog/) {
        @import pages/browse/catalog-landing.ts
      }

      # PAGE_TYPE: top N list (fancy graphic design, image heavy)
      # REF_URL: http://www.barenecessities.com/special.aspx?specialpage=womens-shapewear
      with(/^\/special.*womens-shapewear/) {
        @import pages/browse/shapewear.ts
      }

      # PAGE_TYPE: top N list (fancy graphic design, image heavy)
      # REF_URL: http://www.barenecessities.com/special.aspx?specialpage=eveden-brand-collections
      with(/^\/special.*eveden-brand-collections/) {
        @import pages/browse/love-at-first-fit.ts
      }

      # PAGE_TYPE: top N list (fancy graphic design, image heavy)
      # REF_URL: http://www.barenecessities.com/special.aspx?specialpage=TopPicks
      with(/^\/special/) {
        @import pages/browse/top-10-landing.ts
        log("Setting run_cachify to 'top 10 landing'")
        var("run_cachify", "top-10-landing")
      }

      # PAGE_TYPE: individual brand/vendor page
      # REF_URL: http://www.barenecessities.com/Polo-Ralph-Lauren_brand_228.htm
      with(/^\/vendor|brand/) {
        log("--> Importing pages/browse/brand.ts")
        @import pages/browse/brand.ts
      }

      # NO LONGER USED
      # PAGE_TYPE: sizing help (one of a kind)
      # REF_URL: http://www.barenecessities.com/feature.aspx?pagename=fit_sizing&cm_re=Fit-_-4.1-_-fit-sizing
      with(/^\/feature.*fit_sizing/) {
        @import pass-through.ts
        #log("Setting run_cachify to 'sizing'")
        #var("run_cachify", "sizing")
      }

      # PAGE_TYPE: fit tips & guides (one of a kind)
      # REF_URL: http://www.barenecessities.com/feature.aspx?pagename=fit
      with(/^\/feature.*fit/) {
        @import pages/browse/fit-tips.ts
        log("Setting run_cachify to 'fit-tips'")
        var("run_cachify", "fit-tips")
      }

      # PAGE_TYPE: feature page, type 1
      # REF_URL: http://www.barenecessities.com/feature.aspx?pagename=Maternity
      with(/^\/feature.*(menssocks|maternity|discountoffers|promotions|clearance|sale|jockey-underwear-information)/i) {
        @import pages/browse/feature1.ts
        log("Setting run_cachify to 'feature1'")
        var("run_cachify", "feature1")
      }

      # PAGE_TYPE: feature page, type 2
      # REF_URL: http://www.barenecessities.com/feature.aspx?pagename=womens-panties
      with(/^\/feature/) {
        @import pages/browse/feature2.ts
        log("Setting run_cachify to 'feature2'")
        var("run_cachify", "feature2")
      }

      # PAGE_TYPE: bridal underpinnings article
      # REF_URL: http://www.barenecessities.com/article.aspx?articlename=Bridal2&cm_re=Fit-_-4.2-_-bridal
      with(/article.*Bridal/) {
        @import pages/browse/bridal-underpinnings.ts
        log("Setting run_cachify to 'bridal underpinnings'")
        var("run_cachify", "bridal-underpinnings")
      }

      # PAGE_TYPE: article
      # REF_URL: http://www.barenecessities.com/article.aspx?articlename=ShapewearGlossary&cm_re=Fit-_-4.1-_-shapewearglossary
      with(/article.*(Glossary|customertestimonials)/) {
        @import pages/browse/article.ts
      }

      # PAGE_TYPE: recommendations after cart addition
      # REF_URL: http://www.barenecessities.com/matchingproducts.aspx?pf_id=Hanro1822&sppt_coord=1&size=SMALL&color=White&ourprice=$48.00&qty=1
      with(/^\/matchingproducts/) {
        @import pages/browse/matching-products.ts
      }

      # PAGE_TYPE: product email notification signup
      # REF_URL: http://www.barenecessities.com/productemailsignup.aspx?pf_id=Hanro1822&txtcolor=Black&txtsize=SMALL
      with(/\/productemailsignup/) {
        @import pages/more-info/mail-signup.ts
      }

      # PAGE_TYPE: more product info popup
      # REF_URL: http://www.barenecessities.com/productViews.aspx?imgName=null&Image_cat_id=3&pf_id=HugoBoss50179415
      with(/^\/productviews/i) {
        @import pages/browse/product-info.ts
      }

      # PAGE_TYPE: product details page
      # REF_URL: http://www.barenecessities.com/product.aspx?pf_id=ShockAbsorberB4490
      # REF_URL: http://www.barenecessities.com/barely-there-flawless-fit-microfiber-boyshorts-2855_product.htm?pf_id=BarelyThere2855
      with(/product/) {
        @import pages/browse/product-details.ts
        #@import pages/browse/_product-details_optimization.ts
        log("Setting run_cachify to 'product-details'")
        var("run_cachify", "product-details")
      }

      # PAGE_TYPE: about us page
      # REF_URL: http://www.barenecessities.com/aboutus.aspx
      with(/^\/aboutus/) {
        @import pages/more-info/about-us.ts
        log("Setting run_cachify to 'about-us'")
        var("run_cachify", "about-us")
      }

      # PAGE_TYPE: privacy policy page
      # REF_URL: http://www.barenecessities.com/privacy.aspx
      with(/^\/privacy/) {
        @import pages/more-info/privacy-pol.ts
        log("Setting run_cachify to 'privacy-policy'")
        var("run_cachify", "privacy-policy")
      }

      # PAGE_TYPE: customer service FAQ page
      # REF_URL: http://www.barenecessities.com/customerservice.aspx
      with(/^\/customerservice/) {
        @import pages/more-info/customer-service.ts
        log("Setting run_cachify to 'customer-service'")
        var("run_cachify", "customer-service")
      }

      # PAGE_TYPE: member sign-in
      # REF_URL: https://www.barenecessities.com/secure/MemberSignIn.aspx
      with(/^\/secure\/(m|M)ember(s|S)ign(i|I)n/) {
        @import pages/menu/signin.ts
      }

      # PAGE_TYPE: account info
      # REF_URL: https://www.barenecessities.com/secure/MembersOnlyHome.aspx
      with(/^\/secure\/MembersOnlyHome/) {
        @import pages/menu/account.ts
      }

      # PAGE_TYPE: update account info
      # REF_URL: https://www.barenecessities.com/secure/NewMemberForm.aspx?cf=1
      with(/^\/secure\/NewMemberForm/) {
        @import pages/menu/edit-account.ts
      }

      # PAGE_TYPE: update account info confirmation
      # REF_URL: https://www.barenecessities.com/secure/NewMemberConfirmation.aspx?mode=UpdateShopper&cf=1
      with(/^\/secure\/NewMemberConfirmation/) {
        @import pages/menu/account.ts
      }

      # PAGE_TYPE: change password
      # REF_URL: https://www.barenecessities.com/secure/changePassword.aspx
      with(/^\/secure\/changePassword/) {
        @import pages/menu/change-password.ts
      }

      # PAGE_TYPE: forgot password
      # REF_URL: https://www.barenecessities.com/secure/forgetpassword.aspx?email=josh.bussdieker@moovweb.com
      with(/^\/secure\/forgetpassword/) {
        @import pages/menu/forgot-password.ts
      }

      # PAGE_TYPE: order status
      # REF_URL: https://www.barenecessities.com/secure/receipts.aspx
      with(/^\/secure\/receipts/) {
        @import pages/menu/order-status.ts
      }

      # PAGE_TYPE: order status (receipt)
      # REF_URL: https://www.barenecessities.com/secure/receipt.aspx?orderId=BN11377995
      with(/^\/secure\/receipt/) {
        @import pages/menu/receipt.ts
      }

      # PAGE_TYPE: shopping cart
      # REF_URL: http://www.barenecessities.com/order_basket.aspx
      with(/^\/order_basket/) {
        @import pages/checkout/shopping-cart.ts
      }

      # PAGE_TYPE: correct your address page
      # REF_URL https://www.barenecessities.com/secure/checkout.aspx?pb=2
      with(/^\/secure\/checkout.*pb=2/) {
        @import pages/checkout/invalid-address.ts
      }

      # PAGE_TYPE: shipping options
      # REF_URL: https://www.barenecessities.com/secure/checkout.aspx?pb=3
      with(/^\/secure\/checkout.*pb=3/) {
        @import pages/checkout/shipping-options.ts
      }

      # PAGE_TYPE: payment options
      #REF_URL: https://www.barenecessities.com/secure/checkout.aspx?pb=4
      with(/^\/secure\/checkout.*pb=4/) {
        @import pages/checkout/payment-options.ts
      }

      # PAGE_TYPE: order receipt
      #REF_URL: https://www.barenecessities.com/secure/checkout.aspx?pb=7
      with(/^\/secure\/checkout.*pb=7/) {
        @import pages/checkout/order-receipt.ts
      }

      # PAGE_TYPE: shipping & billing address form
      # REF_URL: https://www.barenecessities.com/secure/Checkout.aspx
      with(/^\/secure\/((C|c)heckout|checkout.*pb=1)/) {
        @import pages/checkout/shipping-address.ts
      }

      # PAGE_TYPE: contact us page
      # REF_URL: http://www.barenecessities.com/contactus.aspx
      with(/^\/contactus/) {
        @import pages/more-info/contact-us.ts
        log("Setting run_cachify to 'contact-us'")
        var("run_cachify", "contact-us")
      }
    
      # PAGE_TYPE: feedback page
      # REF_URL: http://www.barenecessities.com/feedback.aspx
      with(/^\/feedback/) {
        @import pages/more-info/feedback.ts
      }

      # PAGE_TYPE: disclaimer
      # REF_URL: http://www.barenecessities.com/disclaimer.aspx
      with(/^\/disclaimer/) {
        @import pages/more-info/disclaimer.ts
      }

      # PAGE_TYPE: free shipping popup
      # REF_URL: http://www.barenecessities.com/promodetail.aspx?promo=Freeshipover70
      with(/^\/(promodetail|globalpromopopup)/i) {
        @import pages/browse/promodetail.ts
      }

      # PAGE_TYPE: faq from checkout shipping section
      # REF_URL: http://www.barenecessities.com/shopwithconfidence.aspx?tag=shipping#shipping
      # REF_URL: http://www.barenecessities.com/secure/privacy_view.aspx
      with(/^\/(shopwithconfidence|secure\/privacy_view)/) {
        @import pages/checkout/shopconfidence.ts
      }

      # PAGE_TYPE: error reported
      # REF_URL: http://www.barenecessities.com/ProblemReported.aspx
      with(/^\/problemreported/i) {
        @import pages/error/problem-reported.ts
      }

      # PAGE_TYPE: cookies disabled
      # REF_URL: http://www.barenecessities.com/cookies_disabled.aspx
      with(/^\/cookies_disabled/) {
        @import pages/error/cookies-disabled.ts
      }
      
      else() {
        @import pass-through.ts
      }
    }

    # Include site wide optimization
    @import pages/_base_optimization.ts
  }
  else() {
    match($path) {
      with(/defaultnotfound/i) {
        @import pages/browse/allpages-excess.ts
        @import pages/error/not-found.ts
      }
    }
  }
}
