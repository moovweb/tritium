match($status) {
  with(/302/) {
    log("--> STATUS: 302")
    # redirect: just let it go through  
  }

  with(/200/) {
    log("--> STATUS: 200")
    @import pages/_base_optimization.ts
    match($path) {

      # REF_URL: http://www.belk.com/AST/Main/Belk_Primary/Women/Shop/Dresses/Better/PRD~15012075001339298KT/Lauren+by+Ralph+Lauren+Adara+Empire+Waist+Jersey+Dress.jsp?off=0
      # REF_URL: http://www.belk.com/AST/Main/Belk_Primary/Men/Shop/Blazers_Sportcoats/Patterns/PRD~3202670P9201VEX0023/Lauren+by+Ralph+Lauren+Tailored+Clothing+Izod+Houndstooth+Sportcoat.jsp?off=0
      # REF_URL: http://www.belk.com/AST/Main/Belk_Primary/Kids/Shop/Boys/Accessories/BeltsTies/PRD~4500683BOXPR4690IZ/J+Khaki+Box+Print+Tie+Boys+4+20.jsp?off=0
      # REF_URL: http://mlocal.belk.com/AST/Main/Wedding_Primary/Bed/Bed_Spreads_Coverlets/PRD~9200494LEGAC94857V/Biltmore+For+Your+Home+Legacy+Coverlet+Collection.jsp
      # *** NOTE *** Order matters, mutually exclusive
      # we need to put another match-with in this case because the wedding registry shares product.ts.
      # BUT we DON'T want to cachify the wedding registry pdp page because there's too much user specific data on that page
      # so we'll match separately and only run cachify on the normal pdp
      with(/\/PRD~/) {
        match($path) {
          with(/Wedding_Primary/) {
            log("--> PAGE_TYPE: product detail on wedding registry page")
            $("body") {
              @import pages/product.ts
    
              $(".//ul[@id='registry_info']") {
                $("/html/body") {
                  @import pages/bridalregistry/_manage_common.ts
                }
              }
            }
          }
          with(/Belk_Primary|Boutiques_Primary/) {
            log("--> PAGE_TYPE: product detail page")
            $("body") {
              log("")
              @import pages/product.ts
            }
            #var("run_cachify", "product detail")
          }
        }
        @import pages/_product_optimization.ts
      }
      
      # Belk's got endeca search pages that bring up brand landing pages
      # So a search for something like "polo" will bring up the Polo Ralph Lauren splash page
      # REF_URL: http://www.belk.com/AST/Featured/Promo_Details/WorldofLauren.jsp?FOLDER%3C%3Efolder_id=1408474395188353&bmUID=1309196958618
      with(/\/WorldofLauren\.jsp/) {
        log("--> featured shop")
        @import pages/endeca/world_of_lauren.ts
      }
      
      # sephora search
      # REF_URL: http://www.belk.com/AST/Main/Belk_Primary/Beauty_And_Fragrance.jsp?PRODUCT%3C%3Eprd_id=845524442034199&FOLDER%3C%3Efolder_id=2534374302134356&bmUID=1311018066778
      with(/\/Beauty_And_Fragrance\.jsp/) {
        log("--> Beauty and Fragrance")
        @import pages/endeca/beauty_and_fragrance.ts
      }
      
      # claiborne search
      # REF_URL: http://www.belk.com/AST/Featured/Promo_Details/Liz_Claiborne_Search.jsp
      with(/\/Liz_Claiborne_Search\.jsp/) {
        log("--> Liz Claiborne")
        @import pages/endeca/claiborne.ts
      }
      
      # jones new york search
      # REF_URL: AST/Featured/Promo_Details/WorldofJonesNewYork.jsp
      with(/\/WorldofJonesNewYork\.jsp/) {
        log("--> Jones New York")
        @import pages/endeca/jones_new_york.ts
      }
      
      # swim shop
      # REF_URL: http://belk.com/AST/Boutiques/Boutiques_Primary/wk45_Swim_2011_Shop.jsp
      with(/\/wk45_Swim_2011_Shop\.jsp/) {
        log("--> Swim Shop")
        @import pages/endeca/swim_shop.ts
      }
      
      # breast cancer awareness
      # REF_URL: http://m.belk.com/AST/Featured/Promo_Details/Breast_Cancer_Awareness.jsp
      with(/\/Breast_Cancer_Awareness\.jsp|breastcancerawareness/) {
        log("--> Breast Cancer Awareness")
        @import pages/endeca/breast_cancer_awareness.ts
      }
      
      # For the Home
      # REF_URL: http://www.belk.com/AST/Main/Belk_Primary/For_the_Home.jsp
      with(/\/For_the_Home\.jsp/) {
        log("--> For the Home")
        @import pages/endeca/for_the_home.ts
      }
      
      # wedding shop
      with(/\/WeddingShop\.jsp/) {
        log("--> Wedding Shop")
        @import pages/endeca/wedding_shop.ts
      }
      
      # REF_URL: http://www.belk.com/AST/Main/Belk_Primary/Women/Shop/Dresses.jsp
      # REF_URL: http://www.belk.com/AST/Main/Belk_Primary/Men/Shop/Blazers_Sportcoats.jsp
      # REF_URL: http://www.belk.com/AST/Main/Belk_Primary/Kids/Shop/Boys/Accessories.jsp
      #
      with(/\/Belk_Primary\/.*\/Shop|\/Belk_Primary\/.*\/Featured_Shop|\/Boutiques\/Boutiques_Primary\/|Belk_Primary\/.*\/Related_Shop|\/Levis_Brand_Shop\//) {
        log("--> sub category or product")
        # need to match on body here because these urls will also match the product pages
        match($path) {
          log($path)
          with(/\/wk25_Back_to_School\//) {
            log("--> PAGE_TYPE: back to school subcat landing")
            @import pages/back_to_school_subcat.ts
          }
          with(/\/wk37_Belk_Days_Bonusbuys/) {
            log("--> PAGE_TYPE: bonus days subcat landing")
            @import pages/bonus_days_subcat.ts
          }

          # levis
          # REF_URL: www.belk.com/levis
          with(/\/levis|Levi\.jsp/) {
            log("--> Endeca Levis")
            @import pages/endeca/levis.ts
          }
          
          # levis sub pages
          # REF_URL: http://mlocal.belk.com/AST/Boutiques/Boutiques_Primary/Levi/Shop/Men.jsp?cm_sp=Fall-_-BSLevisBrandBoutiqueMen-_-Hero
          with(/\/Levis_Brand_Shop\/|BSLevisBrandBoutique/) {
            log("--> Endeca Levis subpage")
            match($path) {
              with(/Extended_Sizes|Specialty/) {
                $("/html/body") {
                  add_class("mw_extended_sizes")
                }
              }
              with(/Curve/) {
                $("/html/body") {
                  add_class("mw_curve")
                }
              }
              with(/Women/) {
                $("/html/body") {
                  add_class("mw_levis_women")
                }
              }
              with(/Juniors/) {
                $("/html/body") {
                  add_class("mw_levis_juniors")
                }
              }
              with(/Boys/) {
                $("/html/body") {
                  add_class("mw_levis_boys")
                }
              }
              with(/Girls/) {
                log("--> Girls")
                $("/html/body") {
                  log("--> Body")
                  add_class("mw_levis_girls")
                }
              }
            }
            @import pages/endeca/levis_sub.ts
          }
          else() {
          }
        }
        $("body[contains(@class,'category') or contains(@class, 'boutique')]") {
          log("--> PAGE_TYPE: sub category")
          @import pages/subcat.ts

          $("..") {
            # optimization needs to run at html level
            @import pages/_subcat_optimization.ts
          }
        }
        var("run_cachify", "sub category")
      }
      
      with(/\/Belk_Primary\/.*\.jsp/) {
        @import pages/_category_landing.ts
      }
      
      with(/\/mobile\/home\.jsp/) {
        log("--> Mobile home page requested")
        @import pages/home_hero.ts
        export("Cache-Time", "1200")
      }
    
      # REF_URL: http://www.belk.com/home.jsp
      with(/^\/\z|home.jsp|\/AST\/Misc\/Belk_Stores\.jsp|^\/\z|home.jsp|\/AST\/Misc\/Belk_Stores\.jsp|cm_mmc=Search.*-.*Google/) {
        log("--> PAGE_TYPE: home")
        @import pages/_home_subnav.ts
        @import pages/home.ts
        @import pages/_home_optimization.ts
        
        var("run_cachify", "home")
      }
      
      # REF_URL:
      with(/\/BelkProfileCenter\?mode=new&embedded=true|\/email_exact_target_landing_page\.jsp|\/email_signup_exact_target\.jsp/) {
        log("--> PAGE_TYPE: email sign up")
        @import pages/email_sign_up.ts
      }
       
      # REF_URL: http://www.belk.com/search/search_results.jsp
      # REF_URL: http://belk.com/search/clearance_results.jsp?ZZ%3C%3EcS=28&ZZ%3C%3EtP=4294967292+30&ZZ%3C%3Et=Clearance&FOLDER%3C%3Efolder_id=2534374302043559&bmUID=1301682303080
      with(/search\/search_results.jsp|\/Featured\/Sales|bridal_search_results.jsp|search\/clearance_results\.jsp/) {
        log("--> PAGE_TYPE: search")
        @import pages/bridalregistry/_manage_common.ts
        @import pages/search.ts
        @import pages/_subcat_product_list.ts
        @import pages/_search_optimization.ts
        var("run_cachify", "search")
      }
    
      
      # REF_URL: http://www.belk.com/AST/Misc/Belk_Stores/Global_Navigation/Sign_In_Register.jsp
      with(/(\/Sign_In_Register\.jsp)|(signin\_register\.jsp)/) {
        log("--> PAGE_TYPE: Sign In")
        @import pages/signin_new.ts
      }
      
      
      # REF_URL: https://www.belk.com/AST/Misc/Belk_Stores/My_Account.jsp
      with(/\/My_Account\.jsp/) {
        log("--> PAGE_TYPE: Accounts")
        @import pages/my_account_menu.ts
        @import pages/my_account.ts
      }
      
      # REF_URL: https://www.belk.com/AST/Misc/Belk_Stores/My_Account/Billing_And_Payment.jsp
      with(/\/My_Account\/Billing_And_Payment\.jsp/) {
        log("--> PAGE_TYPE: My Account --> Billing and Payment")
        @import pages/my_account_menu.ts
        @import pages/my_account_billing_payment.ts
      }
      
      # REF_URL: https://mlocal.belk.com/myaccount/my_account_billing_edit.jsp
      # this is the page the user is directed to after successfully adding a card, editing a card
      with(/\/my_account_billing_edit\.jsp/) {
        log("--> PAGE_TYPE: My Account --> Billing Edit")
        @import pages/my_account_menu.ts
        @import pages/my_account_billing_payment.ts
      }
      
      # REF_URL: https://www.belk.com/myaccount/my_account_billing.jsp
      # this is the page the user is directed to after successfully removing a card
      with(/\/my_account_billing\.jsp/) {
        log("--> PAGE_TYPE: My Account --> Billing Edit Remove")
        @import pages/my_account_menu.ts
        @import pages/my_account_billing_payment.ts
      }
      
      # PAGE_TYPE: Registration
      # REF_URL: https://www.belk.com/AST/Misc/Belk_Stores/My_Account/Registration.jsp
      # REF_URL: https://www.belk.com/myaccount/registration.jsp?FOLDER%3C%3Efolder_id=2534374302036074&bmUID=1305014719898
      with(/\/Registration.jsp|\/registration.jsp/) {
        log("--> PAGE_TYPE: My Account or Registration")
        $("body[not(contains(@class, 'my_account'))]") {
          log("--> PAGE_TYPE: Registration")
          @import pages/registration.ts
        }
        $("body[contains(@class, 'my_account')]") {
          log("--> PAGE_TYPE: My Account")
          @import pages/my_account_menu.ts
          @import pages/my_account.ts
        }
      }
      
      # PAGE_TYPE: Email Address Changed or Forgot Password
      # REF_URL: https://www.belk.com/myaccount/my_account_change_email.jsp
      # REF_URL: https://www.belk.com/myaccount/my_account_forgot_password.jsp
      with(/\/my_account_change_email.jsp|\/my_account_forgot_password.jsp/) {
        @import pages/change_email.ts
        # after submitting the forgot password form, you're taken to the signin page
        # but the url is still my_account_forgot_password
        $("/html/body[contains(@class, 'sign_in')]") {
          @import pages/signin_new.ts
        }
      }
      
      # PAGE_TYPE: View All WishLists - Accounts Sub Pages
      # REF_URL: https://mlocal.www.belk.com/AST/Misc/Belk_Stores/My_Account/My_WishList.jsp
      with(/(\/My_WishList\.jsp)|(\/myaccount\/my_account_wish_list\.jsp)|(\/order_details\.jsp)|(\/My_Orders\.jsp)|(\/Order_Status\.jsp)/) {
        log("--> Wishlist or Order Status")
        @import pages/my_account_menu.ts
        @import pages/my_account_sub.ts
      }
      
      with(/my_account_edit_(profile|notifications)\.jsp/) {
        log("--> Edit Profile or Notifications")
        @import pages/my_account_sub.ts
        $("/html/body[contains(@class, 'my_account')]") {
          @import pages/my_account_menu.ts
          @import pages/my_account.ts
        }
      }
     #checkout_shipping_bride
      ## Checkout mappings - URLs alone not enough to identify pages
      ## We have to match on content as well
      with(/checkout_shipping|Shopping_Bag\.jsp|shopping_bag\.jsp|checkout_signin\.jsp|checkout_shipping\.jsp|checkout_billing\.jsp|checkout_review_order\.jsp|Checkout_Sign_Register\.jsp/) {
      
        log("---> maybe cart page")
        $("/html/body[contains(@class, 'home_page')]") {
          @import pages/_home_subnav.ts
          @import pages/home.ts
        }
        
        # wish list comes to this page too after it's done being edited
        $("/html/head/title[contains(., 'Wish List')]") {
          log("--> Wishlist Edit")
          @import pages/my_account_sub.ts
        }
        
        # PAGE_TYPE: cart
        $("./body/div[@id='page_wrapper']/div[@id='page']/div[@id='head' and @class != 'head_no_bg'] | ./head/title[contains(., 'Shopping Bag')]") {
          $("/html/body") {
            log("--> PAGE_TYPE: Cart")
            @import pages/checkout/cart.ts
          }
        }
        
        $("/html/body//div[@id='prod_details']") {
          log("-->Cart url, but product page, what")
          $("/html/body") {
            @import pages/product.ts
          }
        }
    
        $("./body/div[@id='page_wrapper']/div[@id='page']/div[@id='head' and @class='head_no_bg']") {
        
          # Handle the checkout header
          @import sections/checkout_header.ts
       
          $(".//div[@id='step']/ul") {
            # I need the '//' because sometimes the #step div is nested
            
            $("//div[@id='sd']") {
              @import sections/checkout_sidebar.ts
            }
    
            $("./li[@class='focus' and contains(.,'SignIn')]") {
              log("--> PAGE_TYPE: checkout signin")
              # @import pages/checkout/signin.ts
              @import pages/signin_new.ts
              $("/html/body//div[@id='content']") {
                @import sections/checkout_privacy_accordion.ts
              }
            }
    
            $("./li[@class='focus' and contains(.,'Shipping')]") {
              log("--> PAGE_TYPE: checkout shipping")
              @import pages/checkout/shipping.ts
            }
    
            $("./li[@class='focus' and contains(.,'Payment')]") {
              log("--> PAGE_TYPE: checkout payment")
              @import pages/checkout/payment.ts
            }
            
            $("./li[@class='focus' and contains(.,'Review')]") {
              log("--> PAGE_TYPE: checkout review")
              $("/html/body") {
                @import pages/checkout/review.ts
              }
            }
          }
        }
    
        # PAGE_TYPE: checkout order confirmation
        #
        $("./body//div[@id='content']/h1[contains(text(),'Order Confirmation')]") {
          @import pages/checkout/order_conf.ts
        }
      }
      
      # map reviews
      with(/review_submit\.jsp/) {
        log("--> Review Submit")
        @import pages/review_submit.ts
      }
      
      # map bridal registry
      # yes this is ugly as hell, but the url's are like this for the belk site.
      # shared url's but very different pages.
      with(/\/Gifts_And_Gift_Cards\/Wedding_Registry\/FindAWeddingRegistry\.jsp|\/bridalregistry\/bridal_registry\.jsp|\/bridalregistry\/bridal_registry_results\.jsp|\/bridalregistry\/bridal_registry_view\.jsp|\/BridalRegistry\/FindAnotherRegistry\.jsp|\/bridalregistry\/create_signin\.jsp|\/bridalregistry\/create_registrant_info\.jsp|\/bridalregistry\/create_registrant_options\.jsp|\/BridalRegistry\/Create\/EventDetails\.jsp|\/bridal_registry_registrant_edit\.jsp|\/bridalregistry\/create_review.jsp|\/BridalRegistry\/Create\/RegistryOptions\.jsp|\/bridalregistry\/bridal_registry_options_edit\.jsp|\/BridalRegistry\/UpdateRegistry\.jsp|bridal_registry_review_edit\.jsp|\/BridalRegistry\.jsp/) {
        @import pages/bridalregistry/bridalregistry.ts
        $("body") {
          # sometimes the edit pages come back to these mapped urls
          # when the registry has been created, the user edits details, and clicks continue
          $(".//ul[@id='registry_info']") {
            $("/html/body") {
              @import pages/bridalregistry/_manage_common.ts
              @import pages/bridalregistry/manage.ts
            }
          }
          
          # main page
          $(".//div[@id='wedding_login' or @class='landForms']") {
            $("/html/body") {
              add_class("mw_bridal_reg_main")
            }
            @import pages/bridalregistry/_main.ts
          }
          
          # search results
          # Their pagination functionality has a bug.  On the desktop site, after finding a registry, you'll get a page of results
          # Use the pagination to go to page 4
          # Then go to the bottom and Search Again for a different registry
          # When the new result set is returned, the previous and next buttons are gone.
          $(".//div[@id='search_results']") {
            $("/html/body") {
              add_class("mw_bridal_reg_search_results")
              @import pages/bridalregistry/_search_results.ts
            }
          }
          
          # registry items
          $("/html/body[contains(@class, 'registry_items')]") {
            add_class("mw_bridal_reg_items")
            @import pages/bridalregistry/_items.ts
          }
          
          # create registry is a 4 step process
          # a class of "focus" is applied to the current step
          $(".//div[@id='step']") {
            $("/html/body") {
              add_class("mw_bridal_reg_create_main")
              @import pages/bridalregistry/_create_common.ts
            }
            $("./ul/li[contains(@class, 'focus') and contains(., 'Add Account')]") {
              $("/html/body") {
                @import pages/bridalregistry/_create_sign_in.ts
              }
            }
            $("./ul/li[contains(@class, 'focus') and contains(., 'Event Details')]") {
              $("/html/body") {
                @import pages/bridalregistry/_create_event_details.ts
              }
            }
            $("./ul/li[contains(@class, 'focus') and contains(., 'Registry Options')]") {
              $("/html/body") {
                @import pages/bridalregistry/_create_options.ts
                log("what")
              }
            }
            $("./ul/li[contains(@class, 'focus') and contains(., 'Review Registry')]") {
              $("/html/body") {
                @import pages/bridalregistry/_create_review.ts
                log("what")
              }
       }
          }
          
          $(".//ul[@id='registry_info']") {
            # these are for the manage registry - update/edit 
            $("/html/body[contains(@class, 'bridal_registry_process')]") {
              add_class("mw_bridal_reg_create_main")
              @import pages/bridalregistry/_create_common.ts
              @import pages/bridalregistry/_manage_common.ts
              $("/html/body[contains(@class, 'bridal_registry_process') and contains(@class, 'event_details')]") {
                @import pages/bridalregistry/_create_event_details.ts
              }
              $("/html/body[contains(@class, 'bridal_registry_process') and contains(@class, 'review')]") {
                @import pages/bridalregistry/_create_review.ts
              }
              $("/html/body[contains(@class, 'bridal_registry_process') and contains(@class, 'options')]") {
                @import pages/bridalregistry/_create_options.ts
              }
            }
          }
        }
      }
      
      # map bridal registry manage page
      # this thing is like a mini-site
      with(/\/Wedding_Primary\.jsp|\/bridalregistry\/bridal_manage\.jsp|\/BridalRegistry\/UpdateRegistry\.jsp|\/bridalregistry\/bridal_registry_options_edit\.jsp|\/BridalRegistry\/RegistryTools\.jsp/) {
        @import pages/bridalregistry/_manage_common.ts
        @import pages/bridalregistry/manage.ts
      }
      
      with(/\/BridalRegistry\/RegistryTools\/QuickStart.jsp/) {
        @import pages/bridalregistry/_manage_common.ts
        @import pages/bridalregistry/manage_quickstart.ts
      }
      
      with(/\/bridalregistry\/bridal_my_gift_list\.jsp/) {
        @import pages/bridalregistry/_manage_common.ts
        @import pages/bridalregistry/manage_my_gift_list.ts
      }
  
      with(/\/Wedding_Primary\/.*\.jsp/) { #bridal category landing pages
        @import pages/bridalregistry/_manage_common.ts
        @import pages/_subcat_product_list.ts
      }

      # the bridal registry category pages are all unique in their urls
      # eg: https://mlocal.belk.com/AST/Main/Wedding_Primary/Dining_Entertaining/Fine_China.jsp
      # eg: https://mlocal.belk.com/AST/Main/Wedding_Primary/Bath/Accessories.jsp
      with(/\/Wedding_Primary\//) {
        $("body") {
          # is it safe enough to assume that if there is a filter, that we're looking at a browse page?
          $(".//div[@id='filter_and_sort']") {
            $("/html/body") {
              @import pages/bridalregistry/_manage_common.ts
              @import pages/_subcat_product_list.ts
            }
          }
        }
      }
      
      # map registry checklist
      with(/\/BridalRegistry\/RegistryTools\/RegistryChecklist\.jsp/) {
        @import pages/bridalregistry/_manage_common.ts
        @import pages/bridalregistry/manage_checklist.ts
      }
      
      # map locate a home store consultant 
      with(/\/BridalRegistry\/RegistryTools\/LocateaHomeStoreConsultant\.jsp/) {
        @import pages/bridalregistry/_manage_common.ts
        @import pages/bridalregistry/manage_store_consultant.ts
      }
      
      # map store locator main page
      with(/\/Store_Locator\.jsp|\/store_locator_results\.jsp|\/BridalRegistry\/RegistryTools\/LocateaHomeStoreConsultant\.jsp/) {
        @import pages/store_locator.ts

        var("run_cachify", "store locator")
      }
      
      # map store locator all by state page
      with(/\/stores_view_all\.jsp/) {
        @import pages/store_locator_state_results.ts

        var("run_cachify", "store locator state results")
      }
      
      # map store locator store detail
      with(/\/store_details\.jsp/) {
        @import pages/store_locator_store_detail.ts

        var("run_cachify", "store locator store detail")
      }
      
      with(/\/store\/store_results_near_current_location\.jsp/) {
        $("body") {
          add_class("mw_geocode_locator")
        }
        @import pages/store_locator.ts
      }
      
      with(/\/Gifts_And_Gift_Cards\.jsp|\/Circulars_And_Catalogs\.jsp|\/Belk_Rewards_Cards\/ApplyNow\.jsp/) {
        @import pages/passthrough.ts
      }
      
      ## Map the More Information sections
      with(/\/Belk_Stores\/(Customer_Service|Global_Navigation\/Gifts_And_Gift_Cards|Footer\/)/) {
        $("/html/head/title[contains(text(),'Privacy') or contains(text(), 'Accessibility') or contains(text(), 'Easy Returns') or contains(text(), 'Registration Information') or contains(text(), 'Terms of Use') or contains(text(), 'Pricing')]") {
          log("--> More Information - Privacy")
          @import pages/privacy.ts
        }
        $("/html/head/title[contains(text(),'Policies')]") {
          log("--> More Information - Policies")
          @import pages/policies_guidelines.ts
        }
        $("/html/head/title[contains(text(),'Shipping')]") {
          log("--> More Information - Shipping")
          @import pages/shipping.ts
        }
        $("/html/head/title[contains(text(),'Customer Service')]") {
          log("--> More Information - Customer Service")
          @import pages/contact.ts
        }
        $("/html/head/title[contains(text(),'Belk Gift Cards')]") {
          log("--> More Information - Gift & Gift Cards")
          @import pages/gifts.ts
        }
        var("run_cachify", "more info")
      }
      
      # http://www.belk.com/AST/Featured/Promo_Details/wk24_Collegiate.jsp
      with(/\/wk24_Collegiate.jsp/) {
        @import pages/collegiate.ts
      }
      
      # http://mlocal.belk.com/AST/Featured/Promo_Details/wk18_Coupon_15_Shopping_Pass.jsp
      # http://mlocal.belk.com/AST/Featured/coupons/belkcoupons.jsp
      with(/\/coupons\//) {
        @import pages/coupon.ts
      }
      
      # http://www.belk.com/AST/Misc/Belk_Stores/Shipping_Offers.jsp
      with(/\/Shipping_Offers.jsp|wk19_Free_Shipping_99_or_8_flat\.jsp|\/Promo_Details\/.*?Shipping/) {
        @import pages/shipping_promo.ts
      }
      
      # Belk Bowl
      # REF_URL: Bhttp://www.belk.com/AST/Featured/Promo_Details/BelkBowl.jsp
      with(/\/BelkBowl\.jsp/) {
        @import pages/belkbowl.ts
      }
      
      # REF_URL: http://www.belk.com/AST/Featured/Promo_Details/BelkBowlTickets.jsp
      with(/\/BelkBowlTickets\.jsp/) {
        @import pages/belkbowl_tickets.ts
      }
      
      # REF_URL: http://www.belk.com/AST/Featured/Promo_Details/wk25_Back_to_School.jsp
      with(/\/wk25_Back_to_School\.jsp/) {
        @import pages/back_to_school.ts
      }
      
      # down for maintenance
      with(/\/offline\.html/) {
        @import pages/temp_unavailable.ts
      }
      
      # map timeout error page
      with(/\/error\/timeout_error.jsp/) {
        @import pages/error_timeout.ts
      }
      
      # passthrough 
      else() {
        @import pages/passthrough.ts
      }
    }
  }

  else() {
    # not 200
    # PAGE_TYPE: errors and not-founds
    # REF_URL: http://www.belk.com/abcd
    #
    @import pages/error.ts
  }
}
