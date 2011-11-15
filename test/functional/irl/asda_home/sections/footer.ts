$("./body[contains(@class, 'mw_container')]") {
  # Bundling this file
  # insert_bottom("script", src: asset("mw_hide_spinner.js", "js"))
  inject_bottom("<div id=\"mw_footer\"><div id=\"mw_footerTop\"><ul><li><a id=\"mw_quickShop\" class=\"icons-quickshop\"href=\"/asda-estore/home/quickShopContainer.jsp\">QuickShop</a></li><li><a id=\"mw_account\" class=\"icons-orders\"href=\"/asda-estore/myaccount/yourorderscontainer.jsp\">Your Orders</a></li></ul></div><div id=\"mw_footerBottom\"><ul><li><a id=\"mw_desktop_link\" href='http://groceries.asda.com'>Desktop Website</a>&nbsp; ::&nbsp;</li><li><a href=\"/asda-estore/common/static/privacy-policycontainer.jsp\" class=\"mw_PrivacyPolicy\" >Privacy Policy</a>&nbsp; ::&nbsp;</li><li><a href=\"/asda-estore/common/static/terms-and-conditionscontainer.jsp\" class=\"mw_TermsCond\">Terms & Conditions</a></li></ul></div><div id=\"mw_Asda\"><a class=\"mw_ContactUs\" href=\"/asda-estore/help/getintouchcontainer.jsp\">Contact Us</a><span class=\"mw_asdaCopyRight\"> &copy; ASDA 2011&nbsp;</span></div></div>") 
  # Desktop site linkml
  # Your Orders URL: /asda-estore/myaccount/yourorderscontainer.jsp
  # Quick Shop's URL: /asda-estore/home/quickShopContainer.jsp
  # Accounts URL: /asda-estore/myaccount/accountmaincontainer.jsp

  # Sign In/Out 
  # The logic is being done through JS
  $("./div[@id='mw_footer']") {
    $("./div[@id='mw_footerTop']") {
      $("./ul") {
        insert_bottom("li", class: "mw_userInOut", id: "mw_user_sinout")
      }
    }
  }
  insert_bottom("div") {
    log("--> Adding in the Hidden Desktop Div")
    attribute("id", "mw_desktop_link_config")
    attribute("rewriter_json", $rewrite_incoming_json)
    attribute("cookie_hours", "1")
    attribute("matcher", $rewrite_incoming_matcher)
    attribute("replacement", $rewrite_incoming_replacement)
  }
}

# Styling the redirection page
$("/html/head/title") {
  var("mw_title",fetch("./text()"))
  match($mw_title){
    with(/Redirecting/){
      log("--> Redirection in effect")
      $("/html/body") {
        add_class("mw_redirecting")
        $("./*") {
          add_class("mw_hide")
        }
        $(".//div[@id='mw_spinner']") {
          move_to("../..")
          attribute("class","")
          attribute("id","mw_spinner1")
          wrap("div", class:"mw_spinner_container")
        }
        insert_top("div", "Redirecting, please wait...", class:"mw_redirection_message")
      }
    }
  }
}
