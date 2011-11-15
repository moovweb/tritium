# Belk has multiple types of 'ajax_response.php' requests. Some of them
# return JSON and some return HTML. The type of request is indicated by
# the 'bmForm' query parameter

# form add
#/ajax/common/ajax_response.jsp?_=1305272449931&PRODUCT%3C%3Eprd_id=845524442029360&FOLDER%3C%3Efolder_id=2534374302140876&bmForm=form_product_detail&bmFormID=1305272449931&bmSubmit=add_to_cart&bmUID=1305272449931&bmHash=0fe23192504fb1d22161458bc3be01b75189e871

# wishlist add
#ajax/common/ajax_response.jsp?_=1305272195856&PRODUCT%3C%3Eprd_id=845524442029360&FOLDER%3C%3Efolder_id=2534374302140876&bmForm=form_product_detail&bmFormID=1305272195859&bmSubmit=add_to_wishlist&bmUID=1305272195859&bmHash=f042d080517db33e33f29374971ca6d5a14b0fac
match($path) {

  # for find in store
  # req url:
  # /ajax/common/ajax_response.jsp?_=1306490431594&PRODUCT%3C%3Eprd_id=845524442020723&FOLDER%3C%3Efolder_id=2534374302095095&bmForm=form_store_locator_modal&bmFormID=1306490431594&bmUID=1306490431594&bmHash=de46dc54b041dadd5eafbd7b3f17eea7e2b7539e
  with(/bmForm=form_store_locator_modal/) {
    log("*****")
    log("matched find in store ajax")
    log("*****")
    var("content_type", "text/javascript")
  }
  
  # and the ajax request for the results
  # /ajax/common/ajax_response.jsp?_=1306490700446&PRODUCT%3C%3Eprd_id=845524442020723&FOLDER%3C%3Efolder_id=2534374302095095&bmForm=form_store_locator&bmFormID=1306490700446&bmSubmit=btn_find_locator&bmUID=1306490700446&bmHash=6a5bf61ccf9c92ddb36e3b5ed8826cafc25dd807
  with(/bmForm=form_store_locator/) {
    log("*****")
    log("matched find in store results ajax")
    log("*****")
    var("content_type", "text/javascript")
  }

  with(/bmSubmit=add_to_cart/) {
    # This request is issued after you add something to your cart on the product page.
    # The response body is HTML that goes in a dialog, div id='modal_added_container'
    log("*****")
    log("add to cart ajax")
    log("*****")
    html_fragment() {
      @import pages/product_added_dialog.ts
    }
    replace(/%24/, "$")
    # Mark as ajax content type so it's not parsed as HTML again later
    var("content_type", "text/javascript")
  }
  
  with(/bmSubmit=promo_ajax_add_to_cart/) {
    log("*****")
    log("add to cart promo ajax")
    log("*****")
    html_fragment() {
      @import pages/product_added_dialog.ts
    }
    replace(/%24/, "$")
    # Mark as ajax content type so it's not parsed as HTML again later
    var("content_type", "text/javascript")
  }
  
  with(/bmForm=form_cart_widget/) {
    # This request is issued when you change the quantity of something in your cart.
    # The response is JSON, but the content-type header says HTML.
    # Fix the content type here so we don't parse it has HTML.
    var("content_type", "text/javascript")
  }
  
  # when the user is not logged in and attempts to add a product to the wishlist,
  # they are redirected to the desktop site to login.
  # Their AJAX response has the url that needs to be rewritten.
  # It looks like this:
  #{"success":"false","message":"Please Login to add item to wishlist","error_code":"LOGIN","redirect_url":"https://www.belk.com/myaccount/signin_register.jsp?ADD_CART_ITEM%3C%3Esku_size=33903&amp;ADD_CART_ITEM%3C%3Esku_color=417&amp;ADD_CART_ITEM%3C%3Equantity=1&amp;ADD_CART_ITEM%3C%3Eprd_id=845524442012523&amp;ADD_CART_ITEM%3C%3EATR_Department=Women&amp;PRODUCT%3C%3Eprd_id=845524442012523&amp;FOLDER%3C%3Efolder_id=2534374302141377&amp;bmForm=form_product_detail&amp;bmFormID=1304726452569&amp;bmSubmit=login_add_to_wishlist&amp;bmUID=1304726452569&amp;bmHash=98a7d64712f8d5a2bf6201b0bfc09e88ca3b631a"}
  
  with(/bmSubmit=add_to_wishlist/) {
    # cannot do a doc("html_fragment") here because the response is json
    log("*****")
    log("matched wishlist ajax")
    log("*****")
    var("content_type", "text/javascript")
    replace(/%24/, "$")
    replace(/P_MODAL/, "P_WISH")
    replace(/href=\\"(https.*?)"\s*title=\\"View Wish List\\"/) {
      log("*****")
      log($1)
      log("*****")
      $1 {
        rewrite("link")
      }
      set("href=\\\"\\1\" title=\\\"View Wish List\\\"")
                                                     # but it the exact literal was being set in the ajax response so it broke.
    }
    
    # when the user is not logged in and they attempt to add to wishlist
    # they are redirected to the login page.
    replace(/"redirect_url"\s*:\s*"(.*)"/) {
      log("*****")
      log($1)
      log("*****")
      $1 {
        rewrite("link")
      }
      set("\"redirect_url\":\"\\1\"")
    }
  }
  
  # for the wish list quick edit functionality
  with(/ajax\/getQuickEdit.jsp/) {
    log("*****")
    log("matched quick edit ajax")
    log("*****")
    
    # this doc() method is throwing off the image resizing that belk uses with scene7.  Their query params for images look like $PROD$ or $COLOR_SWATCH$.
    # but the doc() method is turning these $ into %24.
    html_fragment() {
      @import pages/_wishlist_quickedit_dialog.ts
    }
    # so we'll just replace them after we're done with the transformation in _wishlist_quickedit_dialog.ts
    replace(/%24/, "$")
    replace(/P_MODAL/, "P_WISH")
    var("content_type", "text/javascript")
    
  }
  
  # for email to a friend on the store detail page
  # req url looks like this
  # /ajax/common/ajax_response.jsp?_=1305960095643&FOLDER%3C%3Efolder_id=2534374302040863&bmForm=form_email_to_friend&bmFormID=1305960095643&bmUID=1305960095643&bmHash=f39190426afd43d10354814c94a55cea711d54e2
  with(/bmForm=form_email_to_friend/) {
    log("*****")
    log("matched email to friend ajax")
    log("*****")
    var("content_type", "text/javascript")
  }
  
  # for the create bridal registry page - bridal registry options
  # makes an ajax request for store location near you and near your friends and family
  # req url looks like this
  # /ajax/common/ajax_response.jsp?_=1306195848330&FOLDER%3C%3Efolder_id=1408474395188231&bmForm=form_store_locator&bmFormID=1306195848331&bmSubmit=btn_find_store_near_you&bmUID=1306195848331&bmHash=82e89f6f73187e6f22af27ebaecaff0c4f16dbb3
  with(/bmSubmit=btn_find_store_near_you/) {
    log("*****")
    log("matched find store near you/friends & family")
    log("*****")
    var("content_type", "text/javascript")
  }
  
  # for adding a product to the registry
  # req url looks like this
  # /ajax/common/ajax_response.jsp?_=1306345372101&PRODUCT%3C%3Eprd_id=845524441895431&FOLDER%3C%3Efolder_id=2534374302141578&bmForm=form_product_detail&bmFormID=1306345372101&bmSubmit=add_to_registry&bmUID=1306345372101&bmHash=76f356c6fda012689a8c13bade93182d4f345e6a
  with(/bmSubmit=add_to_registry/) {
    log("*****")
    log("matched add to registry ajax")
    log("*****")
    var("content_type", "text/javascript")
    replace(/%24/, "$")
    replace(/P_MODAL/, "P_WISH")
    # view registry link goes to belk.com, need it to passthrough
    replace(/href=\\"(https.*?)"\s*title=\\"View Registry\\"/) {
      log("*****")
      log($1)
      log("*****")
      $1 {
        rewrite("link")
      }
      set("href=\\\"\\1\" title=\\\"View Registry\\\"")
    }
    
    replace(/"redirect_url"\s*:\s*"(.*)"/) {
      log("*****")
      log($1)
      log("*****")
      $1 {
        rewrite("link")
      }
      set("\"redirect_url\":\"\\1\"")
    }
  }
  
  # for shipping address drop down change during checkout
  # /ajax/common/ajax_response.jsp?_=1310510820839&FOLDER%3C%3Efolder_id=2534374302036081&bmForm=form_get_ship_address&bmFormID=1310510820839&bmUID=1310510820839&bmHash=92dda91e5d1d743a
  with(/bmForm=form_get_ship_address/) {
    log("---> Shipping address change")
    var("content_type", "text/javascript")
  }
  
  # for quick editing shopping bag
  with(/\/shop\/ajax_shopping_bag.jsp/) {
    log("*****")
    log("matched shopping bag quick edit")
    log("*****")
    var("content_type", "text/javascript")
  }
  
  # for adding a free gift, during cart view, that comes with purchase of a product
  with(/\/ajax\/getPromoQuickView\.jsp/) {
    log("*****")
    log("matched shopping bag add gift with purchase")
    log("*****")
    replace(/^\/media\//, "//www.belk.com/media/")
    html_fragment() {
      @import pages/product_added_dialog.ts
    }
    var("content_type", "text/javascript")
  }
  
  # various ajax requests
  with(/ajax_redirect\.jsp/) {
    log("*****")
    log("matched ajax redirect")
    log("*****")
    var("content_type", "text/javascript")
    replace(/%24/, "$")
    replace(/P_MODAL/, "P_WISH")
    replace(/<a\s*href\s*=\s*"(https:.*?)"/) {
      $1 {
        rewrite("link")
      }
      log("*****")
      log($1)
      log("*****")
      set("<a href=\"\\1\"")
    }
    # view registry link goes to belk.com, need it to passthrough
    replace(/href=\\"(https.*?)"\s*title=\\"View Registry\\"/) {
      log("*****")
      log($1)
      log("*****")
      $1 {
        rewrite("link")
      }
      set("href=\\\"\\1\" title=\\\"View Registry\\\"")
    }
    
    replace(/"redirect_url"\s*:\s*"(.*)"/) {
      log("*****")
      log($1)
      log("*****")
      $1 {
        rewrite("link")
      }
      set("\"redirect_url\":\"\\1\"")
    }
  }
  
  else() {
    log("else")
  }

}

