match($path) {

  # URL: http://mlocal.groceries.asda.com/asda-estore/catalog/categorylistingpage.jsp
  # Page Type: Shop Page
  with(/asda-estore\/catalog\/categorylistingpage\.jsp/){
    export("Cache-Time", "1200")
    log("--> Caching --> categorylistingpage.jsp")
  }
  
  # URL: groceries.asda.com/asda-estore/home/quickShopContainer.jsp
  # Page Type: Quick shop's main container
  with(/\/home\/quickShopContainer\.jsp/) {
    export("Cache-Time", "1200")
    log("--> Caching --> quickShopContainer.jsp")
  }

  # URL: groceries.asda.com/asda-estore/home/quickShop.jsp
  # Page Type: Quick shop's content frame
  # Tarun doesn't want the website to be fast.
#   with(/\/home\/quickShop\.jsp/) {
#     export("Cache-Time", "1200")
#     log("--> Caching --> quickShop.jsp")
#   }
  
  # URL: http://mlocal.groceries.asda.com/asda-estore/catalog/sectionpagecontainer.jsp?departmentid=1214921923769&aisleid=1214921924657
  # Page Type: Shop Page
  with(/asda-estore\/catalog\/sectionpagecontainer\.jsp/){
    export("Cache-Time", "1200")
    log("--> Caching --> sectionpagecontainer.jsp")
  }
  
}
