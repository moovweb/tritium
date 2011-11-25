match($path) {
  with(/quickShopContainer.jsp/) {
    $("./body") {
      add_class("mw_quickShopContainer mw_ts_quickShop")
    }
  }
  
  with(/quickShop.jsp/) {
    $("./body") {
      add_class("mw_quickShop mw_ts_quickShop")
      inner_wrap("div") {
        remove()
#         add_class("remove")
      }
#         insert("<div>All the content from the page has been deleted to optimize the page, all we'll do is add some link here</div>")
      inject_top("<div id='mw_QuickShop'><h2>Quick<span>Shop</span></h2><ul><li><a class='mw_searchBrowse' target='_parent' href='/asda-estore/catalog/categorylistingpage.jsp'>Search or browse for items</a></li><li><a class='mw_allFav' target='_parent' onclick='javascript:BannerQuickShop_Lists_HomeRight_SI()' href='/asda-estore/favourites/favouritelayout.jsp?maxItemsToBeShown=15'>See all your favourite items from previous shops</a></li><li><a class='mw_ShopingList' target='_parent' href='/asda-estore/myaccount/yourshoppinglistcontainer.jsp'>Set up your own custom shopping lists</a></li><li><a class='mw_searchList' target='_parent' href='/asda-estore/search/searchbylistcontainer.jsp'>Search by list</a></li><ul></div>")
    }
  }
  
}
  
