html(){
  $("html/body") {
    attribute("onload","")
    $("./*") {
      remove()
    }
    insert_top("script") {
      attribute("language", "javascript")
      inner( "window.addEventListener ('load', function() { var currentParameter = window.location.search; window.location ='http://social.macys.com/mc/main.jsp' + currentParameter; }, false);")
    }
  }
  
  }