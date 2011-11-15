$("//html"){
  $("./head") {
    $("./title"){
      text(){
        set("Mobile Offers")
      }
    }# Required to add cmtag
    inject_bottom("<script type='text/javascript' src='http://assets.bloomingdales.com/javascript/eluminate.js'></script>")
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
    insert_after("script", type: "text/javascript", src: asset("cmcustom_mw.js", "js"))
    inject_bottom("<script src='http://assets.bloomingdales.com/web20/assets/script/bloomies/base/base.js' type='text/javascript'></script>")
    inject_bottom("<script src='http://assets.bloomingdales.com/web20/assets/script/bloomies/base/cmFunctions.js' type='text/javascript'></script>")

  }
  $("body") {
    $("script"){
      remove()
    }
    insert_javascript(read("html/loadOffers.js"))
    add_class("mw_offers")
    insert_bottom("script") {
      attribute("src", "www.bloomingdales.com/mobile/mobOffersAd.jsp")
      attribute("language", "javascript")
      attribute("type", "application/javascript")
      attribute("src") {
        value() {
          rewrite("link")
          replace(/^/, "http://")
        }
      }
    }
    $("//div[@id='bl_nav_top_container_tiles']/div[contains(@class, 'clearBoth')]"){
      insert("div", "after"){
        add_class("mw_offers_title")
        inner(){
          set("Offers")
        }
      }
    }
   # insert_bottom("script", "type='text/javascript'>BLOOMIES.coremetrics.pageViewExploreAttributes = new BLOOMIES.coremetrics.exploreAttributes();", type: "text/javascript")
   # insert_bottom("script", "pageTracker._initData();pageTracker._trackPageview();", type: "text/javascript")
   # insert_bottom("script", "BLOOMIES.coremetrics.pageViewExploreAttributes.add({12:getCookie('SL')});", type: "text/javascript")
    
    # Required to add cmtag
    insert_bottom("script", "BLOOMIES.coremetrics.pageViewExploreAttributes = new BLOOMIES.coremetrics.exploreAttributes();", typle: "javascript")
    insert_bottom("script","BLOOMIES.coremetrics.pageViewExploreAttributes.add({12:getCookie('SL')});", type: "javascript")
    # adding the pageview tag
    insert_bottom("script","BLOOMIES.coremetrics.cmCreatePageviewTag('Offers_mobile','Mobile Offers Page', '', '');", type: "text/javascript")
  }
    
  $("//div[@id='bl_hp_main']/*"){
    remove()
  }
  #remove to contense of the body
  $(".//div[@id = 'bl_hp_main']/div[contains(@class, 'bl_mainContent_no_bottom_padding')]"){
    $("./*"){
      remove()
    }
    attribute("id", "mvImageViewPort")
  }
}
