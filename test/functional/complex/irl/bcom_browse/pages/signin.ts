#add class to body so that the css can be added to main. css
$("//html/body"){
 add_class("mvSignInPage") 
}

# ----- ConfigBlocks ----
#
#Config::IncludeBlockset
#[["blockset_name", "base"]]
#@import base.ts


  #remove stuff
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "width"], ["selector", "*"]]
    $("//*") {
      attribute("width") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "nowrap"], ["selector", "*"]]
    $("//*") {
      attribute("nowrap") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#mvBDSignInHeader"]]
    $("//*[@id = 'mvBDSignInHeader']") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#mvBDSignInBox"]]
    $("//*[@id = 'mvBDSignInBox']") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".ch_nav_top_sub"]]
    $("//*[contains(concat(' ', @class, ' '), ' ch_nav_top_sub ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".bl_nav_top_contain_outer"]]
    $("//*[contains(concat(' ', @class, ' '), ' bl_nav_top_contain_outer ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".ch_signin_toRegister"]]
    $("//*[contains(concat(' ', @class, ' '), ' ch_signin_toRegister ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".ch_signin_frmValue:contains('to Order Review using')"]]
    $("//*[contains(concat(' ', @class, ' '), ' ch_signin_frmValue ') and contains(., 'to Order Review using')]") {
      remove()
    }
    
    
  # end BasicGroup
  
  #format buttons
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvButton"], ["selector", "input[name=\"SIGNINSIGNIN_BUTTON\"], input[name=\"SUBMIT_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//input[@name = \"SIGNINSIGNIN_BUTTON\"]") {
      match($done, "no") {
        attribute("class") {
          value() {
              set("mvButton")
          }
        }
      }
    }
    $("//input[@name = \"SUBMIT_BUTTON\"]") {
      match($done, "no") {
        attribute("class") {
          value() {
              set("mvButton")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "type"], ["value", "submit"], ["selector", ".mvButton"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvButton ')]") {
      match($done, "no") {
        attribute("type") {
          value() {
              set("submit")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "src"], ["selector", ".mvButton"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvButton ')]") {
      attribute("src") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "value"], ["value", "guest checkout"], ["selector", "input[name=\"CHECKOUT_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//input[@name = \"CHECKOUT_BUTTON\"]") {
      attribute("type", "submit")
      add_class("mvButton")
      match($done, "no") {
        attribute("value") {
          value() {
              set("guest checkout")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "value"], ["value", "Sign In"], ["selector", "input[name=\"SIGNINSIGNIN_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//div[contains(@class, 'bl_mainContent_form_signIn_button')]/input[@name = \"SIGNINSIGNIN_BUTTON\"]") {
      match($done, "no") {
        attribute("value") {
          value() {
              set("Sign In")
          }
        }
      }
    }
    
    
    #expressCheckoutButton
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "value"], ["value", "checkout"], ["selector", "input[name=\"EXPRESS_CHECKOUT_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//input[@name = 'EXPRESS_CHECKOUT_BUTTON']") {
        match($done, "no") {
          attributes(value: "Checkout", class: "mvButton mvExpressCheckout", type: "submit", src: "")
        }
      }
      
      
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", "input[name=\"EXPRESS_CHECKOUT_BUTTON\"]"], ["tag_name", ""], ["class_name", "mvExpressCheckoutWrap"], ["id", ""], ["multiple", ""]]
      $("//input[@name = 'EXPRESS_CHECKOUT_BUTTON']") {
        wrap("div") {
          attribute("class", "mvExpressCheckoutWrap")
        }
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvOnestep\"></div>"], ["add_after", ""], ["multiple", ""], ["add_before", "input[name=\"EXPRESS_CHECKOUT_BUTTON\"]"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//input[@name = \"EXPRESS_CHECKOUT_BUTTON\"])[1]") {
        inject_before("<div class=\"mvOnestep\"></div>")
      }
      
      
    # end BasicGroup
    
  # end BasicGroup
  
  #guest checkout textr
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".ch_signin_noRegister > .ch_signin_Header"], ["html", "guest"], ["prepend", ""], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' ch_signin_noRegister ')]/*[contains(concat(' ', @class, ' '), ' ch_signin_Header ')]") {
      inner("guest")
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvGuestCheckout\">you are welcome to check out as a Guest. you will be given the opportunity to create an account during checkout.</div>"], ["add_after", ".ch_signin_noRegister > .ch_signin_Header"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' ch_signin_noRegister ')]/*[contains(concat(' ', @class, ' '), ' ch_signin_Header ')])[1]") {
      inject_after("<div class=\"mvGuestCheckout\">you are welcome to check out as a Guest. you will be given the opportunity to create an account during checkout.</div>")
    }
    
    
  # end BasicGroup
  
  #
  #Group::URLMatcherGroup
  #[["url_matcher", "index"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /index/) {
  
    #unifyHeaders
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvCheckoutHeader mvSignIn\"></div>"], ["add_after", ".bl_breadcrumb_object"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_breadcrumb_object ')])[1]") {
        inject_after("<div class=\"mvCheckoutHeader mvSignIn\"></div>")
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvCheckoutHeader mvNotRegistered\"></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".bl_mainContent_rightCol img"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_mainContent_rightCol ')]//img)[1]") {
        inject_before("<div class=\"mvCheckoutHeader mvNotRegistered\">Not Registered Yet?</div>")
      }
      
      
      #
      #Content::Formatting::SetInnerText
      #[["selector", ".ch_signin_noRegister > .ch_signin_Header"], ["text", " "], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
      # NOTE: not sure if /html() or /text() is what I want to be using here
      $("//*[contains(concat(' ', @class, ' '), ' ch_signin_noRegister ')]/*[contains(concat(' ', @class, ' '), ' ch_signin_Header ')]") {
        inner() {
          set(" ")
        }
      }
      
      
      #
      #Content::Formatting::SetInnerText
      #[["selector", ".ch_signin_registered > .ch_signin_Header"], ["text", " "], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
      # NOTE: not sure if /html() or /text() is what I want to be using here
      $("//*[contains(concat(' ', @class, ' '), ' ch_signin_registered ')]/*[contains(concat(' ', @class, ' '), ' ch_signin_Header ')]") {
        inner() {
          set(" ")
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvCheckoutHeader"], ["selector", ""], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
/*      var("done", "no")
      $("") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvCheckoutHeader")
            }
          }
        }
      }
      */
      
      #unifyHeaders
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::RemoveElements
        #[["selector", ".mvCheckoutHeader + img"]]
        $("//*[contains(concat(' ', @class, ' '), ' mvCheckoutHeader ')]/following-sibling::*[1]/self::img") {
          remove()
        }
        
        
        #
        #Content::Formatting::RemoveElements
        #[["selector", ".bl_mainContent_rightCol img"]]
        $("//*[contains(concat(' ', @class, ' '), ' bl_mainContent_rightCol ')]//img") {
          remove()
        }
        
        
      # end BasicGroup
      
    # end BasicGroup
    
  }
  
  #
  #Group::URLMatcherGroup
  #[["url_matcher", "password"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /password/) {
  
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvCheckoutHeader\">Request Your Password</div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#bl_hp_main"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'bl_hp_main'])[1]") {
      inject_before("<div class=\"mvCheckoutHeader\">Request Your Password</div>")
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".mvCheckoutHeader + img"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvCheckoutHeader ')]/following-sibling::*[1]/self::img") {
      remove()
    }
    
    
    #
    #Content::Formatting::MoveAfter
    #[["move_me", "a[href*=\"password\"]"], ["after_me", ".ch_signin_frmDescr:contains(\"Password\")"], ["map_multiple", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' ch_signin_frmDescr ') and contains(., \"Password\")])[1]") {
      move_here("(//a[contains(@href, \"password\")])[1]", "after")
    }
    
    
  }
  
  #
  #Content::Passthrough::ReversePassthroughAttribute
  #[["selector", ".bl_errorText img"], ["attribute", "src"], ["regex_capture", ""]]
  # WARNING: NOT IMPLEMENTED YET
  # To implement this we need the reverse rewrite function - rewrite("host")
  # This is not trivial because the host rewrite is different - it is an array
  # of regular expressions, not just one
  #
  #
  #$("//*[contains(concat(' ', @class, ' '), ' bl_errorText ')]//img") {
  #  attribute("src") {
  #    value() {
  #      rewrite("host")
  #    }
  #  }
  #}
  # 
  #
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvTable"], ["selector", "table"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//table") {
    match($done, "no") {
        var("done", "yes")
      attribute("class") {
        value() {
            set("mvTable")
        }
      }
    }
  }
  
  
  #
  #Content::Formatting::Table::Remove::PreserveLayout
  #[["selector", ""]]
  $("//table" ) {
    # first remove tbody if it exists
    $("tbody") {
      $("tr") {
        move_to("..", "before")
      }
      remove()
    }
    name("div")
    $("tr") {
      name("div")
      $("td") {
        name("span")
      }
      $("text()[normalize-space(.) = '']") {
        remove()
      }
    }
    $("text()[normalize-space(.) = '']") {
      remove()
    }
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "value"], ["value", "Submit"], ["selector", "input[name=\"SUBMIT_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//input[@name = \"SUBMIT_BUTTON\"]") {
    match($done, "no") {
        var("done", "yes")
      attribute("value") {
        value() {
            set("Submit")
        }
      }
    }
  }
  
  
  #
  #Content::Formatting::MoveUp
  #[["move_me", ".bl_mainContentFormLeftColAddress > .bl_mainContentFormLeftColAddressHeader"]]
  $("//*[contains(concat(' ', @class, ' '), ' bl_mainContentFormLeftColAddress ')]/*[contains(concat(' ', @class, ' '), ' bl_mainContentFormLeftColAddressHeader ')]") {
    move_to("..", "before")
  }
  
  
  #Checkout
  #Group::QueryParameterMatcherGroup
  #[["parameter_name", "fromCheckout"], ["negate", ""], ["parameter_value", "fromCheckout"], ["if_present", ""]]
    var("param_matched", "false")
    match($path) {
      with(/fromCheckout\=fromCheckout/) {
        var("param_matched", "true")
      }
    }
      match($param_matched, "true") {
  
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#mvBDSiteMenuHeader"]]
    $("//*[@id = 'mvBDSiteMenuHeader']") {
      remove()
    }
    
    
    # #
    # #Content::Formatting::RemoveElements
    # #[["selector", ".bl_nav_top_bag_text"]]
    # $("//*[contains(concat(' ', @class, ' '), ' bl_nav_top_bag_text ')]") {
    #   remove()
    # }
    # 
    
    #guestCheckout
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "type"], ["value", "submit"], ["selector", "input[name=\"CHECKOUT_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//input[@name = \"CHECKOUT_BUTTON\"]") {
        match($done, "no") {
            var("done", "yes")
          attribute("type") {
            value() {
                set("submit")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvButton"], ["selector", "input[name=\"CHECKOUT_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//input[@name = \"CHECKOUT_BUTTON\"]") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvButton")
            }
          }
        }
      }
      
      
    # end BasicGroup
    
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", ".bl_header_pg_img"]]
  $("//*[contains(concat(' ', @class, ' '), ' bl_header_pg_img ')]") {
    remove()
  }
  
  
  #
  #Group::URLMatcherGroup
  #[["url_matcher", "registrysignin"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /registrysignin/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "value"], ["value", "create registry"], ["selector", "#r_signin_createRegistryButtonContainer input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'r_signin_createRegistryButtonContainer']//input") {
      match($done, "no") {
          var("done", "yes")
        attribute("value") {
          value() {
              set("create registry")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "value"], ["value", "sign in"], ["selector", "#r_signin_signinButtonContainer input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'r_signin_signinButtonContainer']//input") {
      match($done, "no") {
          var("done", "yes")
        attribute("value") {
          value() {
              set("sign in")
          }
        }
      }
    }
    
    
  }
  
  #
  #Content::Formatting::MoveUp
  #[["move_me", "a.standard"]]
  $("//a[contains(concat(' ', @class, ' '), ' standard ')]") {
    move_to("..", "before")
  }
  
  
  #
  #Content::Formatting::MoveUp
  #[["move_me", "a.standard"]]
  $("//a[contains(concat(' ', @class, ' '), ' standard ')]") {
    move_to("..", "before")
  }
  
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "value"], ["value", "Checkout"], ["selector", "input[name=\"SIGNINSIGNIN_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    $("//div[contains(@class, 'ch_signin_frmValue')]/input[@name = 'SIGNINSIGNIN_BUTTON']") {
      attribute("value", "Checkout")
    }
  
#}

$("//div[contains(@class, 'bl_nav_top_bag_text')]"){
  $(".//script[contains(text(), 'Welcome()')]"){
    $("./../text()"){
      remove()
    }
    inject_before("<span>BAG: </span>")
    remove()
  }
  attribute("class", "mw_myBagLink")
  move_to("//div[contains(@class, 'mvHeaderWrapper')]", "bottom")
}

$("//div[contains(@class, 'ch_signin_frmDescr')][contains(text(), 'Email Address')]"){
  text(){
    set("Username")
  }
}


