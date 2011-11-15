html(){
  $("/html"){
    $("head"){
      # this is for modified following file to fix checkout and merge bag go desktop site, and apply promote code btn get replaced while update item amount
      # http://mlocal.qa9codemacys.fds.com/navapp/web20/mlocal/combo/bag.script-201109300111-min.js
      $("script[contains(@src, 'bag.script')]"){
        attribute("src", asset('bag.script-min.js','js'))
      }
    }
    $("body"){
      #add body ID
      attribute("id","mvBagBody")
      $(".//div[@class='bagContent']"){
        #replace add to current bag btn
        $(".//div[@class = 'addToCurrentBag']/input") {
          attribute('src', asset('buttons/addToCurrentBag.png', 'image'))
        }
        #each item
        $("div[@class='yourShoppingBag']|div[@class='savedItems']"){
          add_class("mvTitle")
        }
        $("div[@id='pricesMessage']|div[@id='shoppingBagId']|div[@class='savedItemInfo']"){
          add_class("mvPadding0510")
        }
        $("div[@id='itemsContainer']|div[@id='mergedItemsContainer']"){
          $("div[@class='itemsHeader']"){
            remove()
          }
          $(".//div[contains(@class, 'lineItem ')]"){
            add_class("mvShadowBox")
            $("br"){
              remove()
            }
            $("div[@class='colQty']/select[1]"){
              inject_before("Qty. ")
            }
            $("div[@class='colPrice']/div[@class='bagItemPrice']") {
              inject_top("<span>price: </span>")
            }
            $("div[@class='registrantsInfo ']"){
              move_to("..", "before")
            }
            $(".//div[@class='colTotal']") {
              inject_top("<b>total: </b>")
            }

          }
        }
        $("div[@id='itemsContainer']/div[@class='clearFloats']") {
          remove()
        }
      }
      $(".//div[@id='bagFooterContent']"){
        $(".//div[@id='freeShippingEveryDay']"){
          remove()
        }
        $(".//a[@id='stdShipping']"){
          # attribute("href", "/checkoutswf/shippingFees")
          #                  attribute("target","_blank")
        }
        $(".//div[@class ='promocodeFindnow']/a"){
          attribute("href","http://social.macys.com/mc/main.jsp?campaign_id=61&channel_id=1")
          attribute("target","_blank")
        }
        # replace apply promote code btn
        $(".//input[@id = 'applyPromoCode']") {
          attribute('src', asset('buttons/apply.png', 'image'))
        }
        # replace bag btns
        $(".//div[contains(@class,'shoppingButtons')]") {
          $("img[@id = 'continueShoppingButton']") {
            attribute('src', asset('buttons/continueShopping.png', 'image'))
          }
          $("img[@id = 'continueCheckout']") {
            attribute('src', asset('buttons/checkoutBag.png', 'image'))
          }
          $("div[@id='expressCheckoutContainer']"){
            $("img[@id = 'expressCheckoutID']") {
              attribute('src', asset('buttons/expressCheckout.png', 'image'))
            }
            $("div[@id = 'expressCheckoutInfoText']"){
              add_class("mvPadding10")
            }
          }
        }
      }
      match($fake_url, /(\/bag\/checkout\/policies\/shipping\.jsp)/){
        add_class("mwShippingPolicy")
        $(".//div"){
          attribute("style", "")
        }
      }
    }
  }
}

