# Changing the title to control the title for t
# $("/html/head") {
#   $("./title") {
#    inner(){
#     set("ASDA Groceries")
#    }
#   }
# }
$("./body/div[@id='mw_mainWrapper']") {
  add_class("mw_loading")
}
$("./body[contains(@class, 'mw_container')]") {
    
    inject_top(read("header.html"))
    # insert("<div id='mw_spinner1'><div class='mw_bar1'></div><div class='mw_bar2'></div><div class='mw_bar3'></div><div class='mw_bar4'></div><div class='mw_bar5'></div><div class='mw_bar6'></div><div class='mw_bar7'></div><div class='mw_bar8'></div></div>")
  # inject_top("<div id='mw_spinner2'><div class='mw_bar1'></div><div class='mw_bar2'></div><div class='mw_bar3'></div><div class='mw_bar4'></div><div class='mw_bar5'></div><div class='mw_bar6'></div><div class='mw_bar7'></div><div class='mw_bar8'></div></div>")
#   inject_top("<div id='mw_header'><div id='mw_header_float'><div id='mw_logo'><a href='/asda-estore/home/homecontainer.jsp'  class='icons-logo'>HomePage</a></div><div id='mw_nav_container'><a href='/asda-estore/catalog/categorylistingpage.jsp' id='mw_search_icon' class='icons-search'><label>Shop</label></a><a href='/asda-estore/favourites/favouritelayout.jsp'id='mw_favorites_icon' class='icons-favorite'><label>Favourites</label></a><a href='/asda-estore/checkout/regularviewtrolleycontainer.jsp' id='mw_trolley_icon' class='icons-trolley'><label>Trolley</label></a></div></div></div>")
# 
  #Your Favorite's URL: /asda-estore/favourites/favouritelayout.jsp

  # If the trolley iframe is there, add the toggler attribute to the frame, then disable the trolley buttons href
  $("./div[@id='mw_mainWrapper']/div[@id='mw_content']//iframe[@name='shoppingbasket']") {
    add_class("mw_trolleyTogglerFrame")
    add_class("mw_trolleyFrame")
    attribute("data-ur-toggler-component", "content")
    attribute("data-ur-state", "disabled")
    attribute("data-ur-id", "trolleyToggler")
    $("/html/body/div[@id='mw_header']//a[@id='mw_trolley_icon']") {
      attribute("href", "#")
      # Add these attribute to make the toggler happen, the good thing about placing them here is that they will be iframe aware and it applies only if there is an iframe
      attribute("data-ur-toggler-component", "button")
      attribute("data-ur-id", "trolleyToggler")
      attribute("data-ur-state", "disabled")
    }
  }
  $("./div[@id='mw_mainWrapper']/div[@id='mw_content']//iframe[@name='maincontent']") {
    add_class("mw_contentTogglerFrame")
    attribute("data-ur-toggler-component", "content")
    attribute("data-ur-state", "enabled")
    attribute("data-ur-id", "trolleyToggler")
    # Potential double reload fix
    # attribute("onload") {
    #   remove()
    # }
  }
  
  # Bundling this file
  # insert_bottom("script", src: asset("mw_trolley_value_header.js", "js"))
    # log($cookie)    
}

