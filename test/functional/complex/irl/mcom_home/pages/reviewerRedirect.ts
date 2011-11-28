html(){
  $("html/body") {
    attribute("onload","")
    $("./*") {
      remove()
    }
    insert_top("script") {
      attribute("language", "javascript")
      inner( "window.addEventListener ('load', function() { var currentPathname = window.location.pathname; window.location ='http://reviews.macys.com' + currentPathname; }, false);")
    }
  }
  
  }