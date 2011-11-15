
$("/html"){
  $("./head"){
    # make sure on bag we have the correct baseServerURL
    insert_bottom("script", type: "text/javascript") {
      inner() {
        append('var baseServerURL = "http://')
        append($host)
        append('";')
      }
    }
  }
  $("./body"){
    add_class("mw_bag_page")
    $(".//div[@id='myBagLink']/a/script") {
      wrap("span", id: "brownBagItemsTotal")
    }
    
    $("./div/div/div/div[@id='bag']"){
      
      # inject bag image header
      inject_before("<div class='mw_image_header_wrap'><div id='mw_injected_bag_header'></div></div>")
      
      # move the bag id number
      $("//div[@id='bagIdContainer']"){
        $("./span/text()"){
          text(){
            replace(/Bag\s/, "")
          }
        }
        move_to("//div[@id='mw_injected_bag_header']", "after")
      }
      # the product container
      $(".//div[contains(@class, 'lineItem')]"){
        $("./div[contains(@class, 'itemSummary')]"){
          $("./div[contains(@class, 'itemDescr')]"){
            $("./text()[contains(., ',')]"){
              inject_after("<br>")
              text(){
                replace(/,/, "")
              }
            }
            $("./span[contains(., 'Web ID:')]"){
              wrap("div", class: "mw_web_id"){
                move_here("./../div[contains(@class, 'mw_web_id')]/following-sibling::text()[1]", "bottom")
              }
              $("./.."){
                log(dump())
                move_to("./../a", "after")
              }
            }
          }
          $("./div[contains(@class, 'itemShipInfo')]"){
            inner(){
              replace(/(\d+)/, concat("<span class='mw_pink_num'>", $1, "</span>")){
                log($1)
              }
              replace(/in stock:\s/i, "")
            }
            move_to("./../div[contains(@class, 'itemDescr')]/div[contains(@class, 'mw_web_id')]", "after")
          }
          $("./div[contains(@class, 'itemRemove')]"){
            move_to("./../div[contains(@class, 'itemDescr')]/div[contains(@class, 'itemShipInfo')]", "after")
          }
          $("./div[contains(@class, 'itemsInfoPrice')]"){
            inner(){
              prepend("<span class='mw_price'>price:</span>")
            }
            move_to("./../div[contains(@class, 'itemsInfoTotal')]", "before")
          }
          $("./div[contains(@class, 'itemsInfoTotal')]"){
            inject_before("<span class='mw_total'>total:</span>")
          }
          $("./div[contains(@class, 'itemsInfoQty')]"){
            inner(){
              prepend("<span class='mw_qty'>qty:</span>")
            }
          }
        }
      }
      
      # move the promo code section
      $("//div[contains(@class, 'bag_promoTotals')]"){
        $(".//div[contains(@class, 'promoCopy')]"){
          text(set("PROMO CODE(S)"))
        }
        $(".//input[@type='text']"){
          $num = concat("<div class='mw_promo_code_text'>Enter Code ", "(", index(), ")", "</div>")
          inject_before($num)
        }
        move_to("./..", "after")
      }
      
      # prepair the order summary container
         $("//div[contains(@class, 'orderTotalsBottom')]"){
           wrap("div", class: "mw_order_summary_wrap"){
             inject_top("<div class='mw_order_summary_title'>order summary</div>")
           }
           $(".//div[@id='iShip_bagTotal']"){
             text(){
              replace(/TOTAL:/i, "SUBTOTAL")
             }
           }
         }
      
      # prepair the various buttons on the page.
      $(".//input[@id='lnkApplyPromos']"){
        add_class("mw_apply_button")
        attribute("type", "submit")
        attribute("value", "Apply")
      }
      $(".//input[@id='btnExpressCheckout']"){
        add_class("mvButton")
        attribute("type", "submit")
        attribute("value", "express checkout")
        $("./../../span[@id='textExpressCheckout']"){
          remove()
        }
      }
      $(".//input[@id='btnContinueCheckout']"){
        add_class("mvButton")
        attribute("type", "submit")
        attribute("value", "checkout")
      }
      $(".//input[@id='btnContinueShopping']"){
        move_to("/html/body//div[contains(@class, 'mvHeaderWrapper')]", "bottom")
        attribute("type", "submit")
        attribute("value", "continue shopping")
        add_class("wm_continu_shopping")
      }
    }
    
    # remove some footer elements and inject checkout flow footer.
    $(".//div[@id='mvBDSiteMenuHeader']"){
      remove()
    }
    $(".//div[contains(@class,'bl_nav_bot_service_container')]"){
      remove()
    }
    $(".//div[contains(@class,'bl_nav_bot_service_container')]"){
      remove()
    }
    $(".//div[contains(@class, 'mvBDFooterText')]") {
      inject_before("<div class=\"mvCheckoutFooter\"><ul> <li class=\"mvShopSecure\"><div id=\"mvLockIcon\"></div>Shopping on bloomingdales.com is always safe and secure. Guaranteed. <a href=\"https://customerservice.bloomingdales.com/app/answers/detail/a_id/360/theme/popup/?cm_sp=NAVIGATION-_-BOTTOM_LINKS-_-SECURITY\">Details</a></li> <li class=\"mvEasyReturns\"><div id=\"mvBoxIcon\"></div>Enjoy easy returns. <a href=\"https://customerservice.bloomingdales.com/app/answers/detail/a_id/354/c/22/theme/popup/#returns\">Details</a></li> <li class=\"mvCustomerService\"><div id=\"mvPhoneIcon\"></div>Customer Service <a href=\"tel:+1-800-777-0000\">1-800-777-0000</a></li> </ul></div>")
    }
    $(".//div[contains(@class, 'bag_right')]"){
      remove()
    }
  }
}

$("/html") {
  $("./body") {
    $(".//div[contains(@class, 'bag_left')]") {
      $("./div[@class='errorContainer']") {
        move_to("../div[@id='mergedBagWrapper']/div[@class='name']", "after")
      }
    }
    $(".//input[@id='addToCurrentBag']") {
      attribute("type", "submit")
      add_class("mvButton")
      add_class("mvAddToCurrentBag")
      attribute("src") {
        remove()
      }
      attribute("value", fetch("./@alt"))
    }
    $(".//div[@id='mergedBagWrapper']") {
      inner_wrap("div", class: "mw_border_wrapper")
    }
  }
}

match($path) {
  with(/bag\/merge/) {
    $("/html/body") {
      add_class("mw_bag_merge")
    }
  }
  with(/shippingfees/) {
    $("/html/body") {
      add_class("mw_shipping_fees")
    }
  }
}


$("/html") {
  $("./body[contains(concat(' ', @class, ' '), ' mw_shipping_fees ')]") {
    $(".//table[contains(@style, 'width:600px;')]") {
      attribute("style", "width:100%;")
    }
    $(".//table[@width='400']") {
      attribute("style", "width:100%;")
    }
    $(".//td[@class='bl_pop_top_contain']") {
      name("div")
      move_to("//div[@class='bl_pop_body']", "before")
    }
  }
  # spriting
  $(".//div[@class='mvCheckoutFooter']") {
    $(".//div[@id='mvLockIcon']") {
      add_class("to_be_sprited-lock")
    }
    $(".//div[@id='mvBoxIcon']") {
      add_class("to_be_sprited-box")
    }
    $(".//div[@id='mvPhoneIcon']") {
      add_class("to_be_sprited-phoneimg")
    }
  }
}



# coppied bag page popups information from convirted code.
  #popups
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::Table::Remove::PreserveLayout
    #[["selector", ".bl_pop table"]]
    $("//*[contains(concat(' ', @class, ' '), ' bl_pop ')]//table" ) {
      # first remove tbody if it exists
      $("tbody") {
        $("tr") {
          move_to("..", "before")
        }
        remove()
      }
      name("div")
      $("tr") {
        name("div")
        $("td") {
          name("span")
        }
        $("text()[normalize-space(.) = '']") {
          remove()
        }
      }
      $("text()[normalize-space(.) = '']") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvButton"], ["selector", ".bl_pop_top_contain a"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' bl_pop_top_contain ')]//a") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvButton")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".bl_pop_top_contain a"], ["html", "<span>back</span>"], ["prepend", ""], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' bl_pop_top_contain ')]//a") {
      inner("<span>back</span>")
    }
    
    
    #
    #Group::URLMatcherGroup
    #[["url_matcher", "shippingfees"], ["negate", ""]]
    # This is a 'fake' url because it has http when it might mean https
    var("fake_url") {
      set(var("source_host"))
      append(var("path"))
      prepend("http://")
    }
    match($fake_url, /shippingfees/) {
    
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvExampleTable"], ["selector", ".F1_S1_C1_T1_W1 > .mvWasTable"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' F1_S1_C1_T1_W1 ')]/*[contains(concat(' ', @class, ' '), ' mvWasTable ')]") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvExampleTable")
            }
          }
        }
      }
      
      # add class to body for popup
      $("//body") {
        add_class("mvShippingCost")
      }

      
      #
      #Content::Formatting::RemoveAttribute
      #[["attribute", ".mvExampleTable > div > span"], ["selector", "width"]]
      $("//width") {
        attribute(".mvExampleTable > div > span") {
          remove()
        }
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".mvExampleTable > div > span:empty"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvExampleTable ')]/div/span[not (node())]") {
        remove()
      }
      
      
    }
    
    #
    #Group::URLMatcherGroup
    #[["url_matcher", "shippolicy"], ["negate", ""]]
    # This is a 'fake' url because it has http when it might mean https
    var("fake_url") {
      set(var("source_host"))
      append(var("path"))
      prepend("http://")
    }
    match($fake_url, /shippolicy/) {
    
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".bl_pop_body"], ["html", "<div class=\"bl_pop_body\"> <a name=\"top\"></a><div class=\"mvShippingHeader\"><img border=\"0\" src=\"https://www.bloomingdales.com/img/headers/header_shippolicy.gif\" alt=\"Shipping Policy\"></div>  <br><div class=\"un_separate\"> <b>In Stock Merchandise</b>  <br>Usually is processed and shipped (in other words, leaves our fulfillment center) within 3 business days. bloomingdales.com will let you know at checkout or by a follow-up message if the merchandise you have selected is not currently in stock or if we need to confirm availability. For that merchandise, we will give you an expected shipping time at checkout. All orders are subject to credit approval. </div> <div class=\"un_separate\"> <b>Jewelry</b>  <br>Jewelry cannot be shipped to P.O. Boxes. These items must be sent to a street address. </div> <div class=\"un_separate\"> <a name=\"standard\"></a><b>Standard delivery</b>  <br>We deliver via UPS or a comparable delivery service. We use U.S. Postal Service for PO Boxes, APO and FPO addresses. Items ordered at the same time may not always be shipped together; your delivery charge, however, will be based on the total merchandise amount per address. </div> <div class=\"un_separate\"> <a name=\"standard\"></a><b>Free Shipping Policy</b>  <br>We offer free standard shipping everyday for orders over $300* or on orders over $150** if you shop using your Bloomingdale's card. <a href=\"/service/credit/index.ognc\">Apply for a Bloomingdale's card now</a>. </div> <div class=\"un_separate\">*Free standard shipping on orders of $300 or more at Bloomingdales.com and Bloomingdales.com/Registry. Not valid when shipping to multiple addresses. No adjustments to prior purchases. Offer excludes Gift Cards, COACH (offer may apply at special times, see COACH Shop for details), Furniture, and Mattresses. Not valid in Bloomingdale's stores or Bloomingdale's The Outlet stores. Valid only when shipping to the U.S. </div> <div class=\"un_separate\">**Free standard shipping on orders of $150 or more when you use your Bloomingdale's card at Bloomingdales.com and Bloomingdales.com/Registry. Not valid when shipping to multiple addresses. No adjustments to prior purchases. Offer excludes Gift Cards, COACH (offer may apply at special times, see COACH Shop for details), Furniture, and Mattresses. Not valid in Bloomingdale's stores or Bloomingdale's The Outlet stores. Valid only when shipping to the U.S. </div> <a name=\"costs\"></a><span class=\"mvTitle\">Shipping Fees</span> <br><div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;Under $25.00</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">$6.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">$6.00&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;$25.01 - $50.00</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">&nbsp;$8.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">&nbsp;$8.00&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;$50.01 - $75.00</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">&nbsp;$10.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">&nbsp;$10.00&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;$75.01 - $100.00</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">&nbsp;$11.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">&nbsp;$11.00&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;$100.01 - $149.99*</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">&nbsp;$13.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">&nbsp;$13.00&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;$150.00* - $200.00</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">&nbsp;$16.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">&nbsp;Free&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;$200.01 - $299.99*</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">&nbsp;$18.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">&nbsp;Free&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;$300.00 and Up</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">&nbsp;Free&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">&nbsp;Free&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;Premium Delivery</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">Additional&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$7.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">Additional&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$7.00&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;Express Delivery</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">Additional&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$13.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">Additional&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$13.00&nbsp;</span> </div> <div class=\"un_bag_prod_last\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;Shipping to more than one address</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">Additional&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$5.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">Additional&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$5.00&nbsp;</span> </div> </div> <div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Standard Order Received By:</span><span class=\"tab_cont\">&nbsp;Sunday</span> <br><span class=\"un_bold\">Standard Order Shipped By:</span><span class=\"tab_cont\">Wednesday&nbsp;</span> <br><span class=\"un_bold\">Expected Delivery:</span><span class=\"tab_cont\">1-6 business days later&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Standard Order Received By:</span><span class=\"tab_cont\">&nbsp;Monday</span> <br><span class=\"un_bold\">Standard Order Shipped By:</span><span class=\"tab_cont\">Thursday&nbsp;&nbsp;</span> <br><span class=\"un_bold\">Expected Delivery:</span><span class=\"tab_cont\">1-6 business days later&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Standard Order Received By:</span><span class=\"tab_cont\">&nbsp;Tuesday</span> <br><span class=\"un_bold\">Standard Order Shipped By:</span><span class=\"tab_cont\">Friday&nbsp;&nbsp;</span> <br><span class=\"un_bold\">Expected Delivery:</span><span class=\"tab_cont\">1-6 business days later&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Standard Order Received By:</span><span class=\"tab_cont\">&nbsp;Wednesday</span> <br><span class=\"un_bold\">Standard Order Shipped By:</span><span class=\"tab_cont\">Monday&nbsp;&nbsp;</span> <br><span class=\"un_bold\">Expected Delivery:</span><span class=\"tab_cont\">1-6 business days later&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Standard Order Received By:</span><span class=\"tab_cont\">&nbsp;Thursday</span> <br><span class=\"un_bold\">Standard Order Shipped By:</span><span class=\"tab_cont\">Tuesday&nbsp;&nbsp;</span> <br><span class=\"un_bold\">Expected Delivery:</span><span class=\"tab_cont\">1-6 business days later&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Standard Order Received By:</span><span class=\"tab_cont\">&nbsp;Friday</span> <br><span class=\"un_bold\">Standard Order Shipped By:</span><span class=\"tab_cont\">Wednesday&nbsp;&nbsp;</span> <br><span class=\"un_bold\">Expected Delivery:</span><span class=\"tab_cont\">1-6 business days later&nbsp;</span> </div> <div class=\"un_bag_prod_last\"> <span class=\"un_bold\">Standard Order Received By:</span><span class=\"tab_cont\">&nbsp;Saturday</span> <br><span class=\"un_bold\">Standard Order Shipped By:</span><span class=\"tab_cont\">Wednesday&nbsp;&nbsp;</span> <br><span class=\"un_bold\">Expected Delivery:</span><span class=\"tab_cont\">1-6 business days later&nbsp;</span> </div> </div>Note: Since the merchandise you order may be filled from several locations, items may arrive separately. You will not incur additional shipping charges under these circumstances. However, when ordering gift items that you wish to have shipped to different addresses, there will be a separate charge for each address.<br><div class=\"un_separate\"> <b>Shipping Surcharges</b>  <br>Based on their size and/or weight, certain items bear a Shipping Surcharge. Shipping Surcharges are shown on product pages before you place an item in your Shopping Bag and will be added into the total shipping costs for your order. </div> <div class=\"un_separate\"> <b>Shipping To Multiple Locations</b>  <br>When you ship items to multiple addresses, we will add $5.00 for each additional address. Orders including only electronic gift cards are not charged the additional fee. </div> <div class=\"un_separate\"> <a name=\"rush\"></a><span class=\"mvTitle\">Rush Delivery</span> <br><span class=\"un_normal\" style=\"color: #C00\">Please Note: We are unable to provide express shipping to P.O. Boxes.</span>  </div> <div class=\"un_separate\"> <b>Premium Delivery</b> - add $7.00 to Standard Shipping Costs. Orders placed before 5:00 p.m. ET for in-stock merchandise are processed the following business day.<br>* Some shipments to Alaska and Hawaii require additional time in transit<br>* Some shipments to and from certain locations may require additional time in transit<br> </div> <div class=\"un_separate\"> <b>Premium Delivery</b> <br> </div> <div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Sunday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Monday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Wednesday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Monday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Tuesday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Thursday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Tuesday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Wednesday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Friday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Wednesday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Thursday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Monday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Thursday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Friday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Tuesday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Friday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Monday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Wednesday</span> </div> <div class=\"un_bag_prod_last\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Saturday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Monday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Wednesday</span> </div> </div> <b>Express Delivery</b> - add $13.00 to Standard Shipping Costs. Orders placed before 5:00 p.m. ET for in-stock merchandise are processed the following business day.<br><div class=\"un_separate\"> <b>Express Delivery</b> <br> </div> <div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Sunday</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Monday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Tuesday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Monday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Tuesday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Wednesday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Tuesday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Wednesday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Thursday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Wednesday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Thursday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Friday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Thursday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Friday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Monday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Friday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Monday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Tuesday</span> </div> <div class=\"un_bag_prod_last\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Saturday</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Monday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Tuesday</span> </div> </div> <a name=\"giftwrap\"></a><span class=\"mvTitle\">Gift Boxes, Wraps &amp; Messages</span> <br><b>Gift Boxes</b>  <br>Let us package your gifts in our exclusive boxes. A gift card with your personal message can be enclosed, if you wish. One item per box: $5.00 (not available on all items). Click on \"Add Gift Options\" during checkout on the order summary page. <br><div class=\"un_separate\"> <b>Gift Wrap</b>  <br>Registry gifts will be wrapped in our premier white croc-embossed gift paper with a champagne grosgrain ribbon. One item per box: $5.00 </div> <div class=\"un_separate\"> <b>Gift Messages </b>  <br>You can create a personalized gift message on the Shipping Information page during checkout whether you have selected a gift box or not. Your message will be delivered along with your shipment. </div> <a href=\"#top\"> <div class=\"un_right\">Back to Top</div> </a> </div>"], ["prepend", ""], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' bl_pop_body ')]") {
        inner("<div class=\"bl_pop_body\"> <a name=\"top\"></a><div class=\"mvShippingHeader\"><img border=\"0\" src=\"https://www.bloomingdales.com/img/headers/header_shippolicy.gif\" alt=\"Shipping Policy\"></div>  <br><div class=\"un_separate\"> <b>In Stock Merchandise</b>  <br>Usually is processed and shipped (in other words, leaves our fulfillment center) within 3 business days. bloomingdales.com will let you know at checkout or by a follow-up message if the merchandise you have selected is not currently in stock or if we need to confirm availability. For that merchandise, we will give you an expected shipping time at checkout. All orders are subject to credit approval. </div> <div class=\"un_separate\"> <b>Jewelry</b>  <br>Jewelry cannot be shipped to P.O. Boxes. These items must be sent to a street address. </div> <div class=\"un_separate\"> <a name=\"standard\"></a><b>Standard delivery</b>  <br>We deliver via UPS or a comparable delivery service. We use U.S. Postal Service for PO Boxes, APO and FPO addresses. Items ordered at the same time may not always be shipped together; your delivery charge, however, will be based on the total merchandise amount per address. </div> <div class=\"un_separate\"> <a name=\"standard\"></a><b>Free Shipping Policy</b>  <br>We offer free standard shipping everyday for orders over $300* or on orders over $150** if you shop using your Bloomingdale's card. <a href=\"/service/credit/index.ognc\">Apply for a Bloomingdale's card now</a>. </div> <div class=\"un_separate\">*Free standard shipping on orders of $300 or more at Bloomingdales.com and Bloomingdales.com/Registry. Not valid when shipping to multiple addresses. No adjustments to prior purchases. Offer excludes Gift Cards, COACH (offer may apply at special times, see COACH Shop for details), Furniture, and Mattresses. Not valid in Bloomingdale's stores or Bloomingdale's The Outlet stores. Valid only when shipping to the U.S. </div> <div class=\"un_separate\">**Free standard shipping on orders of $150 or more when you use your Bloomingdale's card at Bloomingdales.com and Bloomingdales.com/Registry. Not valid when shipping to multiple addresses. No adjustments to prior purchases. Offer excludes Gift Cards, COACH (offer may apply at special times, see COACH Shop for details), Furniture, and Mattresses. Not valid in Bloomingdale's stores or Bloomingdale's The Outlet stores. Valid only when shipping to the U.S. </div> <a name=\"costs\"></a><span class=\"mvTitle\">Shipping Fees</span> <br><div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;Under $25.00</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">$6.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">$6.00&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;$25.01 - $50.00</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">&nbsp;$8.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">&nbsp;$8.00&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;$50.01 - $75.00</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">&nbsp;$10.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">&nbsp;$10.00&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;$75.01 - $100.00</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">&nbsp;$11.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">&nbsp;$11.00&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;$100.01 - $149.99*</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">&nbsp;$13.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">&nbsp;$13.00&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;$150.00* - $200.00</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">&nbsp;$16.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">&nbsp;Free&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;$200.01 - $299.99*</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">&nbsp;$18.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">&nbsp;Free&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;$300.00 and Up</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">&nbsp;Free&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">&nbsp;Free&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;Premium Delivery</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">Additional&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$7.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">Additional&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$7.00&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;Express Delivery</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">Additional&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$13.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">Additional&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$13.00&nbsp;</span> </div> <div class=\"un_bag_prod_last\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;Shipping to more than one address</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">Additional&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$5.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">Additional&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$5.00&nbsp;</span> </div> </div> <div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Standard Order Received By:</span><span class=\"tab_cont\">&nbsp;Sunday</span> <br><span class=\"un_bold\">Standard Order Shipped By:</span><span class=\"tab_cont\">Wednesday&nbsp;</span> <br><span class=\"un_bold\">Expected Delivery:</span><span class=\"tab_cont\">1-6 business days later&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Standard Order Received By:</span><span class=\"tab_cont\">&nbsp;Monday</span> <br><span class=\"un_bold\">Standard Order Shipped By:</span><span class=\"tab_cont\">Thursday&nbsp;&nbsp;</span> <br><span class=\"un_bold\">Expected Delivery:</span><span class=\"tab_cont\">1-6 business days later&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Standard Order Received By:</span><span class=\"tab_cont\">&nbsp;Tuesday</span> <br><span class=\"un_bold\">Standard Order Shipped By:</span><span class=\"tab_cont\">Friday&nbsp;&nbsp;</span> <br><span class=\"un_bold\">Expected Delivery:</span><span class=\"tab_cont\">1-6 business days later&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Standard Order Received By:</span><span class=\"tab_cont\">&nbsp;Wednesday</span> <br><span class=\"un_bold\">Standard Order Shipped By:</span><span class=\"tab_cont\">Monday&nbsp;&nbsp;</span> <br><span class=\"un_bold\">Expected Delivery:</span><span class=\"tab_cont\">1-6 business days later&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Standard Order Received By:</span><span class=\"tab_cont\">&nbsp;Thursday</span> <br><span class=\"un_bold\">Standard Order Shipped By:</span><span class=\"tab_cont\">Tuesday&nbsp;&nbsp;</span> <br><span class=\"un_bold\">Expected Delivery:</span><span class=\"tab_cont\">1-6 business days later&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Standard Order Received By:</span><span class=\"tab_cont\">&nbsp;Friday</span> <br><span class=\"un_bold\">Standard Order Shipped By:</span><span class=\"tab_cont\">Wednesday&nbsp;&nbsp;</span> <br><span class=\"un_bold\">Expected Delivery:</span><span class=\"tab_cont\">1-6 business days later&nbsp;</span> </div> <div class=\"un_bag_prod_last\"> <span class=\"un_bold\">Standard Order Received By:</span><span class=\"tab_cont\">&nbsp;Saturday</span> <br><span class=\"un_bold\">Standard Order Shipped By:</span><span class=\"tab_cont\">Wednesday&nbsp;&nbsp;</span> <br><span class=\"un_bold\">Expected Delivery:</span><span class=\"tab_cont\">1-6 business days later&nbsp;</span> </div> </div>Note: Since the merchandise you order may be filled from several locations, items may arrive separately. You will not incur additional shipping charges under these circumstances. However, when ordering gift items that you wish to have shipped to different addresses, there will be a separate charge for each address.<br><div class=\"un_separate\"> <b>Shipping Surcharges</b>  <br>Based on their size and/or weight, certain items bear a Shipping Surcharge. Shipping Surcharges are shown on product pages before you place an item in your Shopping Bag and will be added into the total shipping costs for your order. </div> <div class=\"un_separate\"> <b>Shipping To Multiple Locations</b>  <br>When you ship items to multiple addresses, we will add $5.00 for each additional address. Orders including only electronic gift cards are not charged the additional fee. </div> <div class=\"un_separate\"> <a name=\"rush\"></a><span class=\"mvTitle\">Rush Delivery</span> <br><span class=\"un_normal\" style=\"color: #C00\">Please Note: We are unable to provide express shipping to P.O. Boxes.</span>  </div> <div class=\"un_separate\"> <b>Premium Delivery</b> - add $7.00 to Standard Shipping Costs. Orders placed before 5:00 p.m. ET for in-stock merchandise are processed the following business day.<br>* Some shipments to Alaska and Hawaii require additional time in transit<br>* Some shipments to and from certain locations may require additional time in transit<br> </div> <div class=\"un_separate\"> <b>Premium Delivery</b> <br> </div> <div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Sunday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Monday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Wednesday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Monday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Tuesday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Thursday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Tuesday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Wednesday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Friday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Wednesday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Thursday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Monday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Thursday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Friday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Tuesday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Friday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Monday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Wednesday</span> </div> <div class=\"un_bag_prod_last\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Saturday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Monday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Wednesday</span> </div> </div> <b>Express Delivery</b> - add $13.00 to Standard Shipping Costs. Orders placed before 5:00 p.m. ET for in-stock merchandise are processed the following business day.<br><div class=\"un_separate\"> <b>Express Delivery</b> <br> </div> <div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Sunday</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Monday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Tuesday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Monday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Tuesday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Wednesday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Tuesday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Wednesday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Thursday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Wednesday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Thursday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Friday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Thursday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Friday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Monday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Friday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Monday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Tuesday</span> </div> <div class=\"un_bag_prod_last\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Saturday</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Monday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Tuesday</span> </div> </div> <a name=\"giftwrap\"></a><span class=\"mvTitle\">Gift Boxes, Wraps &amp; Messages</span> <br><b>Gift Boxes</b>  <br>Let us package your gifts in our exclusive boxes. A gift card with your personal message can be enclosed, if you wish. One item per box: $5.00 (not available on all items). Click on \"Add Gift Options\" during checkout on the order summary page. <br><div class=\"un_separate\"> <b>Gift Wrap</b>  <br>Registry gifts will be wrapped in our premier white croc-embossed gift paper with a champagne grosgrain ribbon. One item per box: $5.00 </div> <div class=\"un_separate\"> <b>Gift Messages </b>  <br>You can create a personalized gift message on the Shipping Information page during checkout whether you have selected a gift box or not. Your message will be delivered along with your shipment. </div> <a href=\"#top\"> <div class=\"un_right\">Back to Top</div> </a> </div>")
      }
      
      
    }
    
  # end BasicGroup
  
  #bonus add to bag button
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "type"], ["value", "submit"], ["selector", ".ch_bag_buttonAdd input"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' ch_bag_buttonAdd ')]//input") {
      match($done, "no") {
        attribute("type") {
          value() {
              set("submit")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "value"], ["value", "add to bag"], ["selector", ".ch_bag_buttonAdd input"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' ch_bag_buttonAdd ')]//input") {
      match($done, "no") {
        attribute("value") {
          value() {
              set("add to bag")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvButton mvSmallButton"], ["selector", ".ch_bag_buttonAdd input"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' ch_bag_buttonAdd ')]//input") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvButton mvSmallButton")
          }
        }
      }
    }
    
    
  # end BasicGroup
