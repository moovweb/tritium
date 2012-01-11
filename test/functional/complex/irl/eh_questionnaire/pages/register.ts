name("corpse")
wrap("body") {
  # Add page specific class
  add_class("mw_register")

  # Add the top logo div
  insert_top("div", class: "mw_header") {
    insert_top("div", "Register", class: "mw_page_title")
  }
  
  move_here("//corpse//form") {
    # relative path
    attribute("action", "/singles/servlet/homeRegS")
    
    $("./fieldset/button[@id='submit']") {
      text("submit")
      
      add_class("mw_button")
    }
    $("./fieldset/div[@id='form-seals']") {
      remove()
    }
    
    $(".//br") {
      remove()
    }
  }
  move_here("//corpse//script")
  
  $("./corpse") {
    remove()
  }
}
# Rewrite the meta refresh
#  When this form is submitted in a postitive test case a meta refresh tag will
#  be present. Rewrite the meta refres
$("//meta[@http-equiv='refresh']") {
  
  #Need stylesheet of RQ flow for the header we are going to inject
  $('/html/head') {
    insert_bottom("link", rel: "stylesheet", type: "text/css", href: asset("stylesheets/pages/reg_processing.css"))
  }

  #When doing meta refresh the client would like the header to match that of the RQ flow - remove old header
  $("/html/body/div[@class='mw_header']") {
    remove()
  }
  $("/html/body") {
    #Inject Spinner
    inject_top("<div style='display: block;' class='mw_SpinnerOverlay mw_SpinnerOverlayHide' id='addclasstarget51905'><div class='mw_SpinnerOverlaySpinner'></div></div>")
    
    #Inject RQ Flow header
    inject_top("<div class=\"mw_reg_process_header\"><div class=\"mw_reg_process_header_logo\"></div></div>")
    
    insert_after("script") {
      attribute("language", "javascript")
      inner("window.addEventListener(\"load\",function(){   var b = document.getElementsByClassName(\"mw_SpinnerOverlay\")[0];   b.style.height = document.body.offsetHeight + \"px\";   var c = b.getElementsByTagName(\"div\")[0]; /* the spinner */   remove_class(b, \"mw_SpinnerOverlayHide\");   c.style.left = (window.innerWidth - c.offsetWidth)/2 + \"px\";     c.style.margin = \"0\";   add_class(b, \"mw_SpinnerOverlayHide\");   window.addEventListener(\"scroll\", function(){     c.style.top = (window.innerHeight - c.offsetHeight)/2 + document.body.scrollTop + \"px\";   }, false); }, false);")
    }
  }
}

# Rewrite zipcode as postal?
$("/html/body/form//label[@for='zipCode']") {
  match($region) {
    with(/au|uk/) {
      text("Postcode:")
    }
    with(/ca/) {
      text("Postal Code:")
    }
  }
}
