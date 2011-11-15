# 
# Many pages that we reformat go into into an iframe; they shouldn't get the header or footer
# Logic provided by Venkatesh Sivasubramanian <vsivasubramanian@walmart.com>
#   1. Header frame has <body class="header">
#   2. Maincontent frame has <body class="framed">
#   3. Trolley frame has <body id="basketframe">

# Set the global on/off caching trigger
$cache = "true";

match($status) {
  with(/200/) {
    log("--> STATUS: 200")
    @import pages/_base_optimization.ts
    
    # Need to add a framed class to the AJAX file that is brought in on the bookslot
    # when using the click and collect option
    match($path, "(instorepickuplist|storedetails)\.jsp") {
      $("./body") {
        add_class("framed")
      }
    }
    # PAGE_TYPE: All pages*
    $("./body[not (contains(@class, 'framed') or @id='basketframe' or contains(@class, 'header'))]") {
      # Make sure to only add the header and footer in the appropriate iFrames
      # Hence the use of classes and ids
      log("++ Adding Header and Footer")
      $("..") {
        @import sections/header.ts
        
        # Site wide search implementation
        # TODO: get more details before we sign off on this 
        # @import sections/search_form.ts
        
        @import sections/footer.ts
      }
      
      # Test to see if assets are required on all pages
      # $("/html/head") {
      #   insert_bottom("link", rel: "stylesheet", type: "text/css", href: asset("main.css", "stylesheet"))
      #     # asset($device_stylesheet, "stylesheet") - Removing this to temporarly fix the multiple url issue.
      #   log("++ Adding Style Sheet")
      # }
    }

    match($path) {

      # PAGE_TYPE: Wierd Error Page
      # URL: /asda-estore/catalog/facetredirect.jsp?_DARGS=/asda-estore/catalog/emerchandising_range.jsp
      # This URL only corresponds to a 302 response to a POST request sending the user to a Shelf page
      # If you ever get here with a 200, it's an error most likely due to back button issues
      with(/asda-estore\/catalog\/facetredirect\.jsp\?_DARGS=\/asda-estore\//) {
        log("--> Oh no! 200 response here => some kind of error")
        log("++ Importing back_button_error.ts")
        @import pages/back_button_error.ts 
      }

      # PAGE_TYPE: Home Pages
      # I am mapping the homepage and all the iframes inside the page with this selection
      # Then i am using conditional match groups to seperate my styling for the main page and individual iframes
      # this way it will help us keep all the homepage related frames in one .ts file
      with(/(\/index\.jsp)|(\/home\-firsttime\.jsp)|(^\/asda-estore\/home\/homecontainer\.jsp)|(\/home\-with\-deliverydate\.jsp)/) {
        log("++ Importing home.ts")
        @import pages/home.ts
      }
      # PAGE_TYPE: Shop/Category Page
      # URL: 
      with(/\/categorylistingpage.jsp/) {
        log("++ Importing shop.ts")
        @import pages/shop.ts
      }
      # PAGE_TYPE: Sign In Container
      # URL: /asda-estore/register/signincontainer.jsp
      with(/\/signincontainer\.jsp/) {
        log("++ Importing sign_in.ts")
        @import pages/sign_in.ts
      }
      # PAGE_TYPE: Confirm action pages (Are you sure you want to?)
      # URL: /asda-estore/register/signoutcontainer.jsp
      with(/\/register\/(signoutcontainer)\.jsp|\/changedeliveryaddresscontainer\.jsp/) {
        log("++ Importing confirm_action.ts")
        @import pages/confirm_action.ts
      }
      
      # JP: This page is not meant to be available on the mobile site
      # TODO: We should make a decision what we want to do with the page
      # PAGE_TYPE: Account's Page
      # URL: /asda-estore/myaccount/accountmaincontainer.jsp
      with(/accountmaincontainer\.jsp/) {
        log("++ Importing account.ts")
        @import pages/account.ts
      }
      
      # PAGE_TYPE: Order's Page and Order Detail's Page
      # Order's Page URL: /asda-estore/myaccount/yourorderscontainer.jsp
      # Order Detail's Page URL: /asda-estore/myaccount/orderdetailscontainer.jsp?orderId=222236071
      with(/\/(yourorderscontainer|orderdetailscontainer|amendordercontainer|cancelorderconfirmationcontainer)\.jsp/) {
        log("++ Importing orders.ts")
        @import pages/orders.ts
      }
      

      # PAGE_TYPE: Quick Shop Page
      # Order's Page URL: /asda-estore/home/quickShopContainer.jsp
      with(/\/(quickShop|quickShopContainer)\.jsp/) {
        log("++ Importing quickShop.ts")
        @import pages/quickShop.ts
      }
      
      # PAGE_TYPE: Shoppin by list & Search by list
      # Shopping by list URL: /asda-estore/home/quickShopContainer.jsp
      # Shopping by list's Inner Frame: yourShoppinglistlayout.jsp
      # Searching by list URL: /asda-estore/myaccount/yourshoppinglistcontainer.jsp
      # Searching by list's Inner Frame : searchbylistlayout.jsp
      # Add items to shopping list link from the trolley page: shoppinglist_linkview.jsp
      with(/(shoppinglistcontainer|searchbylistcontainer|searchbylistlayout|Shoppinglistlayout|shoppinglist\_linkview)\.jsp/) {
        log("++ Importing shopping_list.ts")
        @import pages/shopping_list.ts
      }
      
      # PAGE_TYPE: Favorite's Page
      # Order's Page URL: /asda-estore/myaccount/yourshoppinglistcontainer.jsp
      with(/(favourites\/favouritelayout)|(favouritescontents)\.jsp/) {
        log("++ Importing favourites.ts")
        @import pages/favourites.ts
      }
      
      # PAGE_TYPE: Timeout Container
      # URL: /asda-estore/register/timeoutcontainer.jsp
      with(/\/register\/(timeoutcontainer)\.jsp/) {
        log("++ Importing timeout_container.ts")
        @import pages/timeout_container.ts
      }
      # PAGE_TYPE: Forgot Your Password
      # REF_URL: /asda-estore/register/forgotpwdcontainer.jsp 
      with(/\/register\/(forgotpwdcontainer)\.jsp/) {
        log("++ Importing forgot_password.ts")
        @import pages/forgot_password.ts
      }
      
      # PAGE_TYPE: Privacy Policy Container & terms-and-conditionscontainer
      # REF_URL: /asda-estore/common/static/terms-and-conditionscontainer.jsp 
      with(/\/common\/static\/(terms-and-conditionscontainer|privacy-policycontainer)\.jsp/) {
        log("++ Importing terms_and_conditions_privacy_and_policy.ts")
        @import pages/terms_and_conditions_privacy_and_policy.ts
      }
      
      # PAGE_TYPE: Register container
      # REF_URL: /asda-estore/register/registercontainer.jsp 
      with(/\/(registrationconfirmationcontainer|registercontainer)\.jsp/) {
        log("++ Importing register.ts")
        @import pages/register.ts
      }
      
      # PAGE_TYPE: Postcode Confirmation Container
      # REF_URL: /asda-estore/register/postcodeconfirmationcontainer.jsp
      with(/\/register\/(postcodeconfirmationcontainer)\.jsp/) {
        log("++ Importing postcode_confirmation_container.ts")
        @import pages/postcode_confirmation_container.ts
      }
      
      
      # PAGE_TYPE: Trolley on Shopping By List
      # URL = myaccount/shoppingbasket.jsp
      
      # PAGE_TYPE:Trolley frame in the Special Offers 
      # URL = linkSaveshoppingbasket.jsp
      
      # Page_Type: Trolley Frame Mutli-save Page's
      # URL: linkSaveshoppingbasket\.jsp

      # PAGE_TYPE: Trolley Frame  Have You Forgotten?
      # URL: /delivery/deliveryslotreminderframe\.jsp
      
      # Page_Type: Trolley Frame on Shelf page with Delivery Selected
      # URL: asda-estore/catalog/trolley-deliveryslot.jsp
      
      # PAGE_TYPE: Full Trolley View
      # URL: asda-estore/checkout/regularviewtrolleycontainer.jsp
      # URL: asda-estore/checkout/listviewtrolleycontainer.jsp (only when list view is active)
      
      # PAGE_TYPE: Intermediate Trolley
      # URL: intermediatetrolley.jsp
      # How to get here: Shop --> Bakery --> Add A product --> sign in -- you will see this page then --> get redirected to aisle page
      
      with(/(\/delivery\/deliveryslotreminderframe)|(\/home\/basket\-greyedout-hero)|(emptytrolleycontainer)|(^(checkout).*basket-greyedout-hero)|(\/trolley-deliveryslot)|(\/checkout\/regularviewtrolleycontainer)|(asda-estore\/checkout\/listviewtrolleycontainer)|(myaccount\/shoppingbasket)|(\/favourites\/shoppingbasket)|(specialoffers\/shoppingbasket)|(checkoutpayment\-trolley)|(linkSaveshoppingbasket)|(\/delivery\/deliveryslotreminderframe)|(intermediatetrolley)\.jsp/) {
        log("++ Importing trolley_frame.ts")
        log("--> Into Trolley Frame")
        @import pages/trolley_frame.ts
      }
      
      # PAGE_TYPE: Shelf Page
      # Container: sectionpagecontainer.jsp
      # Main Frame: emerchandising_range.jsp
      
      # PAGE_TYPE: Featured Offers
      # Container: sectionpagecontainer.jsp
      # Main Frame: emerchandizing_section.jsp
      
      # PAGE_TYPE: Special Offers:
      # Container: specialofferscontainer.jsp
      # Main Frame: emerchandising_range.jsp
      
      # PAGE_TYPE: Multi Save Page
      # Container: linksavecontainer.jsp
      # Main Frame: linksavepage.jsp
      
      # PAGE_TYPE: Search
      # Container: (^\/asda\-estore\/search\/searchcontainer) - Had to make it very specific since it was intercepting a mapping from Bookslot
      # Main Frame: searchlayout.jsp
      
      # PAGE_TYPE: Have You Forgotten?
      # Container: haveyouforgottencontainer.jsp
      # Main Frame: havuforgottenframe.jsp

      with(/(\/catalog\/sectionpagecontainer)|(emerchandi(s|z)ing\_(range|section))|(\/specialoffers\/specialofferscontainer)|(linksavecontainer)|(linksavepage)|(^\/asda\-estore\/search\/searchcontainer)|(searchlayout)|(\/checkout\/haveyouforgottencontainer)|(\/checkout\/havuforgottenframe)\.jsp/) {
        log("++ Importing shelf.ts")
        @import pages/shelf.ts
      }

      
      with(/products\/products\.jsp/) {
        $("./body//div[@id='productdetail']") {
          $("//html") {
            log("++ Importing product_details.ts")
            @import pages/product_details.ts
          }
        }
      }
      # PAGE_TYPE: 
      with(/^(checkout).*(section|range.jsp)/) {
        log("--> Loading a frame")
        # TODO: Check me to make sure I still work with a nested with
        with(/emerchandi(z|s)ing/) {
          log("++ Importing emerchandizing_frame.ts")
          @import pages/emerchandizing_frame.ts
        }
      }
      # This page maps to the top category frame that is present on most pages
      # REF_URL: headerlayout.jsp?departmentid=1214921923813&aisleid=1214921923858&pageConfiguration=10000001
      # This frame is mostly extraneous and not needed, but for updating certain scripts, it is absolutely necessary
      with(/(headerlayout|linksaveheader|header)\.jsp/) {
        log("++ Importing category_frame.ts")
        @import pages/category_frame.ts
      }
      
      #####################################        
      ####    Checkout Flow Mappings   ####
      #####################################
      # PAGE_TYPE: Book Slot
      # Step 1: Delivery
      # In addition, there are two separate book slot pages, both are getting mapped here
      with(/\/(checkout|delivery)\/(checkoutdeliveryslotgridcontainer|deliveryslotcontainer|deliveryslotgridframe)\.jsp/) {
        log("--> Mapping for Delivery in Checkout")
        log("++ Importing _base.ts and 1_delivery.ts")
        @import pages/checkout/_base.ts
        @import pages/checkout/1_delivery.ts
      }
      with(/checkoutaddresscontainer\.jsp/) {
        log("++ Importing checkoutaddresscontainer.ts")
        @import pages/checkout/_base.ts
        @import pages/checkout/_address_container.ts
      }
      with(/\/checkoutdeliveryslot-trolley\.jsp/) {
        log("++ Importing _popup_trolley.ts")
        @import pages/trolley_frame.ts
      }
      with(/\/(instorepickuplist|storedetails)\.jsp/) {
        log("++ Importing _click_and_collect.ts")
        @import pages/checkout/_click_and_collect.ts
      }

      # PAGE_TYPE: Products Not Available Page
      # Step 1.a: Products Not Available Page:
      with(/\/checkout\/(productsnotavailablecontainer|productsnotavailableframe)\.jsp/) {
        log("--> Mapping for the Products Not Available page")
        log("++ Importing _base.ts")
        #@import pages/checkout/1_a_delivery_impact.ts
        @import pages/checkout/_base.ts
        @import pages/checkout/_products_not_available.ts
      }
      # PAGE_TYPE: Payment
      # Step 2: Payment
      with(/checkout\/(checkoutpaymentheaderlayout|checkoutpaymentcardcontainer|checkoutpaymentcardframe)\.jsp/) {
        log("--> Mapping for Payment in Checkout")
        log("++ Importing _base.ts and 2_payment.ts")
        @import pages/checkout/_base.ts
        @import pages/checkout/2_payment.ts
      }
      # PAGE_TYPE: Promotions/eVouchers
      # Step 3: Promotions
      with(/\/evouchers\/evoucherscontainer\.jsp|\/checkout\/logincheck\.jsp/) {
        log("--> Mapping for Promotions/eVouchers in Checkout")
        log("++ Importing _base.ts and 3_promotions.ts")
        @import pages/checkout/_base.ts
        @import pages/checkout/3_promotions.ts
      }
      # PAGE_TYPE: Order Summary
      # Step 4: Summary
      with(/\/checkout\/(ordersummarycontainer)\.jsp/) {
        log("--> Mapping for Summary in Checkout")
        log("++ Importing _base.ts and 4_summary.ts")
        @import pages/checkout/_base.ts
        @import pages/checkout/4_summary.ts
        # Adding in a class to help the JS key correctly
        $("./body") {
          add_class("mw_checkout_summary_last_stop")
        }
      }
      # Step 4.a: 3DS Popup
      with(/mpiscreencontainer\.jsp/) {
        log("Matched mpi screen")
        $("//input[@name = 'TermUrl']") {
          log("Matched TermURL")
          attribute("value") {
            value() {
              rewrite("link")
            }
          }
        }
        log("--> Mapping for the 3DS popup page")
        log("++ Importing _base.ts and 4_a_3DS_popup.ts")
        @import pages/checkout/_base.ts
        @import pages/checkout/4_a_3DS_popup.ts
      }
      # PAGE_TYPE: Order Confirmation
      # Step 5: Confirmation
      with(/\/checkout\/(checkoutdeliveryslotgridcontainer|orderconfirmationcontainer)\.jsp/) {
        log("--> Mapping for Confirmation in Checkout")
        log("++ Importing _base.ts and 4_summary.ts and 5_confirmation.ts")
        # run the page through 4_summary because of the similarities
        @import pages/checkout/_base.ts
        @import pages/checkout/4_summary.ts
        @import pages/checkout/5_confirmation.ts
      }
      # Need this mapping to avoid breaking the login sequence
      with(/redirectsignpage\.jsp/) {
        log("++ Redirect signin page")
      }
      
      with(/servererror.jsp/){
        log("++ Server Error Page")
        @import pages/server_error.ts
      }
      #adding contact us page because they want feedback on mobile site
      with(/getintouch/){
        log("++ Contact Us Page")
        @import pages/getintouchcontainer.ts
      }

      # We didn't hit any of the mappings for pages that we wanted
      # so we have a page that is the desktop page, but proxied
      # No good. Let's serve up a page that we can control.
      # HOWEVER, we don't want to catch every page, so we have to be careful
      else() {
        match($host) {
          with(/your/) {
            log("++ Importing _non_proxied_page.ts")
            @import pages/_non_proxied_page.ts
          }
        }
        match($path) {
          with(/myaccount|banneroffers\/banneroffercontainer.jsp/) {
            log("++ Importing _non_proxied_page.ts")
            @import pages/_non_proxied_page.ts
          }
        }
        log($path) {
          prepend("No mapping applied to this:")
        }
      }
    }
  }
  else() {
    # not 200
    # PAGE_TYPE: errors and not founds
    # REF_URL: http://*.com/abcd
    log("--> Importing error.ts")
    @import pages/error.ts
  }
}
