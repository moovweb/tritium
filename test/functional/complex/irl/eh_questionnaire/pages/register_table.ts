# Rewrite the meta refresh
#  When this form is submitted in a postitive test case a meta refresh tag will
#  be present. Rewrite the meta refresh
$("//meta[@http-equiv='refresh'] | //meta[@http-equiv='REFRESH']") {
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

name("corpse")
wrap("body") {
  # Add page specific class
  add_class("mw_register")
  # Get any error messages
  move_here("//corpse//div[contains(@style, 'red') or contains(@style, '#f00')]") {
    add_class("mw_error")
    
    attribute("style") {
      remove()
    }
  }
  # Get registration form
  copy_here("//corpse//form[@name='registrationForm']")
  
  $("./form") {
    text("")
    
    move_here("//corpse//form[@name='registrationForm']//input[@type='hidden']")
    
    move_here("//corpse//form[@name='registrationForm']//font[contains(@class, 'linksmallhome')]") {
      move_here("./em", "after") {
        name("span")
      }
      
      remove()
    }
        
    insert_bottom("dl") {
      insert_bottom("dt") {
        insert_bottom("label") {
          inject_bottom("First Name:")
        }
      }
      insert_bottom("dd") {
        move_here("//corpse//form[@name='registrationForm']//input[@name='firstName']/following-sibling::*")
        move_here("//corpse//form[@name='registrationForm']//input[@name='firstName']", "top")
        
        $("./span") {
          add_class("footnote")
        }
      }
      insert_bottom("dt") {
        insert_bottom("label") {
          inject_bottom("I'm a:")
        }
      }
      insert_bottom("dd") {
        $("//corpse//form[@name='registrationForm']//select[@name='gender']/..") {
          wrap_text_children("span")
          
          $("*[not(child::*)]") {
            match(fetch("text()"), /\A[\s\u00a0]*\z/) {
              remove()
            }
          }
        }
        
        move_here("//corpse//form[@name='registrationForm']//select[@name='gender']/following-sibling::*")
        move_here("//corpse//form[@name='registrationForm']//select[@name='gender']", "top")
      }
      insert_bottom("dt") {
        insert_bottom("label") {
          match($region) {
            with(/au|uk/) {
              inject_bottom("Postcode:")
            }
            with(/ca/) {
              inject_bottom("Postal Code:")
            }
            with(/us|cp/) {
              inject_bottom("ZIP Code: ")
            }
          }
        }
      }
      insert_bottom("dd") {
        move_here("//corpse//form[@name='registrationForm']//input[@name='postalCode']")
      }
      insert_bottom("dt") {
        insert_bottom("label") {
          inject_bottom("Country:")
        }
      }
      insert_bottom("dd") {
        move_here("//corpse//form[@name='registrationForm']//select[@name='country']")
      }
      insert_bottom("dt") {
        insert_bottom("label") {
          inject_bottom("Email:")
        }
      }
      insert_bottom("dd") {
        move_here("//corpse//form[@name='registrationForm']//input[@name='emailAddress']/following-sibling::*")
        move_here("//corpse//form[@name='registrationForm']//input[@name='emailAddress']", "top")
        move_here("//body/form/span[1]")
        
        $("./span") {
          add_class("footnote")
        }
      }
      insert_bottom("dt") {
        insert_bottom("label") {
          inject_bottom("Confirm Email:")
        }
      }
      insert_bottom("dd") {
        move_here("//corpse//form[@name='registrationForm']//input[@name='confirmEmail']")
      }
      insert_bottom("dt") {
        insert_bottom("label") {
          inject_bottom("Password:")
        }
      }
      insert_bottom("dd") {
        move_here("//corpse//form[@name='registrationForm']//input[@name='password']/following-sibling::*")
        move_here("//corpse//form[@name='registrationForm']//input[@name='password']", "top")
        move_here("//body/form/span[1]")
        
        $("./span") {
          add_class("footnote")
        }
      }
      insert_bottom("dt") {
        insert_bottom("label") {
          inject_bottom("How did you hear about us?")
        }
      }
      insert_bottom("dd") {
        move_here("//corpse//form[@name='registrationForm']//select[@name='findEH']")
      }
    }
    
    move_here("//corpse//form[@name='registrationForm']//td[@colspan='2' and contains(@class, 'text1') and .//input[@name='tacConfirmation']]") {
      name("label")

      attribute("class", "mw_register_opt")
      attribute("colspan") {
        remove()
      }
      attribute("style") {
        remove()
      }
      
      $("div") {
        $mw_has_input = "false"
        
        $("./input") {
          move_to("..", "after")
          
          $mw_has_input = "true"
        }
        
        match($mw_has_input) {
          with("true") {
            remove()
          }
          else() {
            name("span")
            attribute("style") {
              remove()
            }
          }
        }
      }
    }
    move_here("//corpse//form[@name='registrationForm']//td[@colspan='2' and contains(@class, 'text1') and .//input[@name='newsLetterRequested']]") {
      name("label")

      attribute("class", "mw_register_opt")
      attribute("colspan") {
        remove()
      }
      attribute("style") {
        remove()
      }
      
      $("div") {
        $mw_has_input = "false"
        
        $("./input") {
          move_to("..", "after")
          
          $mw_has_input = "true"
        }
        
        match($mw_has_input) {
          with("true") {
            remove()
          }
          else() {
            name("span")
            attribute("style") {
              remove()
            }
          }
        }
      }
    }
    
    # Move this button here and hide it...
    move_here("//corpse//form[@name='registrationForm']//input[@id='registerButton' or @name='submit' or @type='image']") {
      attribute("src") {
        remove()
      }
      attribute("border") {
        remove()
      }
      attribute("style") {
        remove()
      }

      text("submit")

      add_class("mw_submit_button")
    }
    
    # ...inject this button here to click to above button
    # eHarmony responds with 500 with we don't submit the form
    # with the above 'image' button
    insert_bottom("button", "submit", class: "mw_button") {
      attribute("onclick", "document.getElementsByClass('mw_submit_button')[0].click()")
    }
    
    # move_here("//corpse//div[@id='disclaimer']")
    
    $(".//br | .//div[@id='form-seals']") {
      remove()
    }
  }
  # Add the top logo div
  insert_top("div", class: "mw_header") {
    insert_top("div", "Register", class: "mw_page_title")
  }
  
  move_here("//corpse//script")

  $("./corpse") {
    remove()
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

$("/html//script[contains(@src, 'tooltips.js') or contains(@src, 'slideshow.js')]") {
  remove()
}