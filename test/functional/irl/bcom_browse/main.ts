# import robots
@import robots.ts

# Hard code to US and USD
export("Set-Cookie", "shippingCountry=US")
export("Set-Cookie", "currency=USD")

#do i optomize, what dose optomize prime say?
$optomize_prime = "nope"

# Tevfik
# optimization variable
$optimize_the_shit_out_of_me = "true"

with(/((redirect\.jsp)|(\/redirect\?))/) {
  replace(/onload=\".*?replace\(['\"](.*?)['\"]/) {
      rewrite("link")
  }
}

# Varnish caching will be determined via this variable
$cache_me = "false";

# start matching fool!
# Fix content_type and all malformed html here
match($path) {

  # make bcoms xhr assetts jsonp 
  with(/((mobile\/mobMainAd\.)|(mobile\/mobOffersAd\.))/){
    log("mobile ads loded")
    $content_type = "application/javascript"
    export("Content-Type", "application/javascript")
    log('content_type')
    log($content_type)
    replace(/\n/mi, "")
    replace(/\s+/mi, " ")
    replace(/'/, "\\'")
    replace(/(\A.+?)?(<bloomingdales>)/, "function foolmeonce(){}\nmw_assets('<bloomingdales>")
    replace(/(<\/bloomingdales>.*)/, "</bloomingdales>');")
  }
  # bcom does not use the correct json header so check for ?jsonContent=true parameter
  # this allows most popups to work.
  with(/((jsonContent=true)|(category\/facetedmeta\?)|(\/bag\/((registry)?add|update)($|\?))|(wedding\/updateregistry(($)|(\?)))|(\/wedding\/addtoregistry(($)|(\?))))/) {
    log("WARNING: ", $content_type, " being changed to application/json")
    $content_type = "application/json"
    
    # this allows me to see any redirect urls hidden inside.
    log(" ")
    log("JSON Dump:")
    log(dump())
    log(" ")
  }
  with(/container-min\.js/){
    # this is only passed through in the registry
    # i remove all window scroll events for the overlay's with this regex.
    replace(/B\.windowScrollEvent\.fire\(\);/, "")
  }
  with(/(international\/priceData)/) {
    
    # this prevents this js from hitting nokogeri
  }

  with(/^\/bag\/remove/) {
    # this prevents this shopping cart json from being seen as html
  }
  
  with(/^\/bag\/view/) {
    # don't parse the return value
  }

  # removing the topnav images
  # home page
  with(/standard\.js/) {
    match($optimize_the_shit_out_of_me) {
      with("true") {
        log("Removing the topnav images")
        replace(/START Rollovers(.)+END Popup Window Functions/im, "Removed by Moovweb")
      }
    }
  }
  # category pages
  with(/global\.tiles\.base_script-[0-9]*-?min\.js/) {
    match($optimize_the_shit_out_of_me) {
      with("true") {
        log("Removing the topnav images")
        replace(/var topnav(.)+function rollOver/im, "/*Images Removed by Moovweb*/function rollOver")
      }
    }
  }
  # registry pages
  with(/registry\.js/) {
    log($path)
    match($optimize_the_shit_out_of_me) {
      with("true") {
        log("Removing the topnav images")
        replace(/START Rollovers(.)+END Navigation Rollovers/im, "Removed by Moovweb")
      }
    }
  }

  # rewrite js onload redirects
  with(/((redirect\.jsp)|(\/redirect\?))/) {
    
    replace(/onload=\".*?replace\(['\"](.*?)['\"]/) {
      rewrite("link")
    }
    
  }
  else() {
    match($content_type) {
      with(/html/) {
        match($path) {
          
          with(/p505\./){
            $status = "505"
            log($status)
          }
          with(/p404\./){
             $status = "404"
             log($status)
          }
          # grab the bag page before it is parced and add some closing div tags
          # this fixes the form wrapping issue
          with(/\/bag\/index\./){
            replace(/(<\/form>)/) {
              replace($1, "</form></div></div>")
              log(" ")
              log($1)
            }
          }
          with(/(\/search\/index\.)|(search\/results\.)/){
            replace(/(<\/body>\s+?<\/html>)/, ""){
            log("replacing:")
            log($1)
            } 
          }
          # fix html on the ezpay(pay bill) page
          with(/credit\/ezpay\/select\./){
            replace(/(<select\sname="AccountNumber".+?(<\/select>))/mi){
              $temp = $1
              $temp{
                append("</form>")
              }
              replace($1, $temp)
            }
            log("replacing:")
            #log($1)
          }
          # prevent nokogiri from converting &nbsp; to actual character
          with (/^\/shop\/catalog\/product\/thumbnail/) {
            replace(/&/, "&amp;")
          }
          # with(/credit\/ezpay\/pay\./){
          #   replace(/<\/body>/){#(<div\s+?class="cr_box_payBill_message)"/mi){
          #     $temp = $1
          #     $temp{
          #       prepend("</form><div")
          #     }
          #     replace($1, $temp)
          #   }
          #   log($temp)
          #   log("replacing:")
          # }
        }
        html() {
          # adding html.ts and doing my url rewrite there.
          @import html.ts
        }
        replace(/%7C/, "|")
      }
    } # end content_type
  }

}

// match($cache_me, "true") {
//  log("Caching ", $path)
//  export("Cache-Time", "300")
// }

#convert &amp;nbsp; back to &nbsp;
match($path, /^\/shop\/catalog\/product\/thumbnail/) {
  replace(/&amp;/, "&")
}
