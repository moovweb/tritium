# ----- ParsedHTMLBlocks ----
html() {
  # Add page specific class
  $("/html/body") {
    match($blackberry) {
      with("true") {
        add_class("mw_home_bb")
      }
      else() {
        add_class("mw_home")
      }
    }
  }
  
  #
  #Content::Custom::Macys::PromoWellInsertion
  #[["add_after", "#doc3"]]
  # NOTE: Using the new JSONP script
  $("(//*[@id = 'doc3'])[1]") {
    insert_after("div", class:"mvMainContainer") {
      insert_top("script", src: "http://dl.dropbox.com/u/3940085/moovweb/Core/api_server/macys_promos.js")
    }
  }
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", "#bd"]]
  $("//*[@id = 'bd']") {
    remove()
  }
    
    #BLACKBERRY
    #
    #os=blackberry

    # matching blackberry os 4.6-5.x

    match($blackberry, "true") {
    #Content::CSS::AddCSS
    #[["css_path", "http://dl.dropbox.com/u/6208053/macys/macys_home_bb.css"]]
    $('//html/head') {
      insert_bottom("link", rel: "stylesheet", type: "text/css", href: sass('pages/macys_home_bb.css'))
    }

    } # ending blackberry os 4.6-5.x block
    
    
  # end BasicGroup
  
  #make search default open
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "class"], ["selector", "#globalSubNav"]]
    $("//*[@id = 'globalSubNav']") {
      attribute("class") {
        remove()
      }
    }
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "moovweb_open"], ["selector", ".mvSearchDropdown"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvSearchDropdown ')]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" moovweb_open")
          }
        }
      }
    }
  
    #
    #Content::Formatting::MoveBefore
    #[["move_me", ".mvBottomMenu"], ["before_me", ".moovweb_footer"], ["map_moves", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' moovweb_footer ')])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' mvBottomMenu ')])[1]", "before")
    }
  # end BasicGroup
  
  #APP NAV bars
  #Group::CookieMatcherGroup
  #[["cookie_name", "ishop_app"], ["cookie_value_regex", ""], ["no_cookie_counts", ""], ["any", ""]]
  var("run_group", "false")
  # match if the cookie is found
  match($cookie, /ishop_app/) {
    var("run_group", "true")
  }
  match($run_group, "true") {
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"globalNavigationBar_app\">  \t<div class=\"mvWhiteGrayBar\"><a href=\"/shop/womens?id=118\">Women</a></div>  \t<div class=\"mvWhiteGrayBar\"><a href=\"/shop/mens?id=1\">Men</a></div>  \t<div class=\"mvWhiteGrayBar\"><a href=\"/shop/for-the-home?id=22672\">For the Home</a></div>  \t<div class=\"mvWhiteGrayBar\"><a href=\"/shop/shoes?id=13247\">Shoes</a></div>  \t<div class=\"mvWhiteGrayBar\"><a href=\"/shop/juniors?id=16904\">Juniors</a></div>  \t<div class=\"mvWhiteGrayBar\"><a href=\"/shop/jewelry-watches?id=544\">Jewelry&nbsp;&amp;&nbsp;Watches</a></div>  \t<div class=\"mvWhiteGrayBar\"><a href=\"/shop/handbags-accessories?id=26846\">Handbags</a></div>  \t<div class=\"mvWhiteGrayBar\"><a href=\"/shop/beauty?id=669\">Beauty</a></div>  \t<div class=\"mvWhiteGrayBar\"><a href=\"/shop/kids?id=5991\">Kids</a></div>  \t<div class=\"mvWhiteGrayBar\"><a href=\"/shop/bed-bath?id=7495\">Bed&nbsp;&amp;&nbsp;Bath</a></div>  \t<div class=\"mvWhiteGrayBar\"><a href=\"/shop/furniture?id=29391\">Furniture</a></div>  \t<div class=\"mvWhiteGrayBar\"><a href=\"/shop/kitchen?id=7497\">Kitchen</a></div>  \t<div class=\"mvWhiteGrayBar\"><a href=\"/shop/sale?id=3536\">Sale</a></div>  </div>"], ["add_after", ".mvMainContainer"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' mvMainContainer ')])[1]") {
      inject_after("<div class=\"globalNavigationBar_app\">  	<div class=\"mvWhiteGrayBar\"><a href=\"/shop/womens?id=118\">Women</a></div>  	<div class=\"mvWhiteGrayBar\"><a href=\"/shop/mens?id=1\">Men</a></div>  	<div class=\"mvWhiteGrayBar\"><a href=\"/shop/for-the-home?id=22672\">For the Home</a></div>  	<div class=\"mvWhiteGrayBar\"><a href=\"/shop/shoes?id=13247\">Shoes</a></div>  	<div class=\"mvWhiteGrayBar\"><a href=\"/shop/juniors?id=16904\">Juniors</a></div>  	<div class=\"mvWhiteGrayBar\"><a href=\"/shop/jewelry-watches?id=544\">Jewelry&nbsp;&amp;&nbsp;Watches</a></div>  	<div class=\"mvWhiteGrayBar\"><a href=\"/shop/handbags-accessories?id=26846\">Handbags</a></div>  	<div class=\"mvWhiteGrayBar\"><a href=\"/shop/beauty?id=669\">Beauty</a></div>  	<div class=\"mvWhiteGrayBar\"><a href=\"/shop/kids?id=5991\">Kids</a></div>  	<div class=\"mvWhiteGrayBar\"><a href=\"/shop/bed-bath?id=7495\">Bed&nbsp;&amp;&nbsp;Bath</a></div>  	<div class=\"mvWhiteGrayBar\"><a href=\"/shop/furniture?id=29391\">Furniture</a></div>  	<div class=\"mvWhiteGrayBar\"><a href=\"/shop/kitchen?id=7497\">Kitchen</a></div>  	<div class=\"mvWhiteGrayBar\"><a href=\"/shop/sale?id=3536\">Sale</a></div>  </div>")
    }
  }
}
