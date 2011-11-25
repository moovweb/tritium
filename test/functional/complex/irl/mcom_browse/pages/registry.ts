# ----- ParsedHTMLBlocks ----
html() {
  # Add page specific class
  $("/html/body") {
    add_class("mw_registry")
  }
  
  #URL MG - Registry Home Page
  #Group::URLMatcherGroup
  #[["url_matcher", "/registry/wedding/registryhome"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /\/registry\/wedding\/registryhome/) {
  
    #Body Id
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvRegistryBody"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("mvRegistryBody")
          }
        }
      }
    }
    
    
    #Page title
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvTitle\">Registry</div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#bd"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[@id = 'bd'])[1]") {
        inject_before("<div class=\"mvTitle\">Registry</div>")
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", "#welcomeHr"]]
      $("//*[@id = 'welcomeHr']") {
        remove()
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvShadowBox"], ["selector", "#cc1, #cc2, #cc3"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'cc1']") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvShadowBox")
          }
        }
      }
    }
    $("//*[@id = 'cc2']") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvShadowBox")
          }
        }
      }
    }
    $("//*[@id = 'cc3']") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvShadowBox")
          }
        }
      }
    }
    
    
    #Registry Home Page
        #Content::Formatting::SetInnerHTML
        #[["selector", "#createButton"], ["html", "<img src=\"http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/registryBtns/regCreateBtn.png\" />"], ["prepend", ""], ["append", ""]]
        $("//*[@id = 'createButton']") {
          #inner("<img src=\"http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/registryBtns/regCreateBtn.png\" />")
          inner("")
          insert("img", src: asset('images/buttons/registry/create.png'))
        }
        
        
        #
        #Content::Formatting::AddFileAttribute
        #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/registryBtns/regCreateBtn.png"], ["selector", "#createButton"]]
        # NOTE: just sets the attribute - doesn't do anything special for files
        $("//*[@id = 'createButton']") {
          #attribute("src","http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/registryBtns/regCreateBtn.png")
          attribute('src', asset('images/buttons/registry/create.png'))
        }
        
        
        #
        #Content::Formatting::SetInnerHTML
        #[["selector", "#cc1"], ["html", "<div class=\"mvSubTitle\" ><span>Register</span><span class=\"mvBoxSubTitle\">create your registry</span></div>"], ["prepend", "true"], ["append", ""]]
        $("//*[@id = 'cc1']") {
          inner() {
            prepend("<div class=\"mvSubTitle\" ><span>Register</span><span class=\"mvBoxSubTitle\">create your registry</span></div>")
          }
        }
        
        
      # end BasicGroup
      
      #Update and Edit
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::SetInnerHTML
        #[["selector", "#cc2"], ["html", "<div class=\"mvSubTitle\"><span>Update</span><span class=\"mvBoxSubTitle\">edit and add gifts</span></div>"], ["prepend", "true"], ["append", ""]]
        $("//*[@id = 'cc2']") {
          inner() {
            prepend("<div class=\"mvSubTitle\"><span>Update</span><span class=\"mvBoxSubTitle\">edit and add gifts</span></div>")
          }
        }
        
        
        #
        #Content::Inject::InjectHTML
        #[["html", "<div class=\"mvLabel\">Email:</div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#email"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[@id = 'email'])[1]") {
          inject_before("<div class=\"mvLabel\">Email:</div>")
        }
        
        
        #
        #Content::Inject::InjectHTML
        #[["html", "<div class=\"mvLabel\">Password:</div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#password"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[@id = 'password'])[1]") {
          inject_before("<div class=\"mvLabel\">Password:</div>")
        }
        
        
        #
        #Content::Formatting::AddFileAttribute
        #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/registryBtns/regSignin.png"], ["selector", "#cc2 #updateButton"]]
        # NOTE: just sets the attribute - doesn't do anything special for files
        $("//*[@id = 'cc2']//*[@id = 'updateButton']") {
          #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/registryBtns/regSignin.png")
          attribute('src', asset('images/buttons/registry/signin.png'))
        }
        
        
      # end BasicGroup
      
      #Give Find A Couples Registry
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::SetInnerHTML
        #[["selector", "#cc3"], ["html", "<div class=\"mvSubTitle\"><span >Give</span><span class=\"mvBoxSubTitle\">find a couple's registry</span></div>"], ["prepend", "true"], ["append", ""]]
        $("//*[@id = 'cc3']") {
          inner() {
            prepend("<div class=\"mvSubTitle\"><span >Give</span><span class=\"mvBoxSubTitle\">find a couple's registry</span></div>")
          }
        }
        
        
        #
        #Content::Inject::InjectHTML
        #[["html", "<div class=\"mvLabel\">Last Name:</div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#cc3 input[name=\"searchCriteria.lastName\"]"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[@id = 'cc3']//input[@name = \"searchCriteria.lastName\"])[1]") {
          inject_before("<div class=\"mvLabel\">Last Name:</div>")
        }
        
        
        #
        #Content::Inject::InjectHTML
        #[["html", "<div class=\"mvLabel\">First Name:</div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#cc3 input[name=\"searchCriteria.firstName\"]"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[@id = 'cc3']//input[@name = \"searchCriteria.firstName\"])[1]") {
          inject_before("<div class=\"mvLabel\">First Name:</div>")
        }
        
        
        #
        #Content::Formatting::AddFileAttribute
        #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/registryBtns/regSubmitBtn.png"], ["selector", "#cc3 #findButton"]]
        # NOTE: just sets the attribute - doesn't do anything special for files
        $("//*[@id = 'cc3']//*[@id = 'findButton']") {
          #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/registryBtns/regSubmitBtn.png")
          attribute('src', asset('images/buttons/registry/submit.png'))
        }
        
        
      # end BasicGroup
      
      #
      #Content::Formatting::WrapWithNextSibling
      #[["selector", ".mvLabel"], ["wrapper_class", "mvLableTextField"], ["sibling_count", "1"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvLabel ')]") {
        wrap("div") {
          attribute("class", "mvLableTextField")
          move_here("(following-sibling::*)[1]", "bottom")
        }
      }
      
      
    # end BasicGroup
    
    #Registry Home Page Signed In
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvShadowBox mvUpdateRegistry"], ["selector", "#cc21"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'cc21']") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvShadowBox mvUpdateRegistry")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddFileAttribute
      #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/registryBtns/regUpdateBtn.png"], ["selector", "#cc21 img"]]
      # NOTE: just sets the attribute - doesn't do anything special for files
      $("//*[@id = 'cc21']//img") {
        #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/registryBtns/regUpdateBtn.png")
        attribute('src', asset('images/buttons/registry/update.png'))
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvSubTitle\">Update<span class=\"mvBoxSubTitle\">Update your registry</span></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mvUpdateRegistry > a"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvUpdateRegistry ')]/a)[1]") {
        inject_before("<div class=\"mvSubTitle\">Update<span class=\"mvBoxSubTitle\">Update your registry</span></div>")
      }
      
      
    # end BasicGroup
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvRegistryHomeImg\"><img src=\"http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/banners/Registry_HP-2.jpg\"></div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#bd"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'bd'])[1]") {
      #inject_before("<div class=\"mvRegistryHomeImg\"><img src=\"http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/banners/Registry_HP-2.jpg\"></div>")
      insert_before("div", class: "mvRegistryHomeImg") {
        insert("img", src: asset('images/banners/Registry_HP-2.jpg'))
      }
    }
    
    
  }
  
  #URL MG - Create a New Registry
  #Group::URLMatcherGroup
  #[["url_matcher", "registrycaptureemail"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /registrycaptureemail/) {
  
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#createNewRegistry, .pswdHint br"]]
    $("//*[@id = 'createNewRegistry']") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' pswdHint ')]//br") {
      remove()
    }
    
    
    #Page title
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvTitle\">create a new registry</div>"], ["add_after", "#hd"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[@id = 'hd'])[1]") {
        inject_after("<div class=\"mvTitle\">create a new registry</div>")
      }
      
      
    # end BasicGroup
    
    #Body Id
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvCreateNewRegistry"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("mvCreateNewRegistry")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRBtn"], ["selector", "#hasProfileSubmitImg, #noProfileSubmitImg"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'hasProfileSubmitImg']") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvRBtn")
          }
        }
      }
    }
    $("//*[@id = 'noProfileSubmitImg']") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvRBtn")
          }
        }
      }
    }
    
    
    #Have Macy's Account
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddFileAttribute
      #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/createRegistryBtn.png"], ["selector", "#hasProfileSubmitImg"]]
      # NOTE: just sets the attribute - doesn't do anything special for files
      $("//*[@id = 'hasProfileSubmitImg']") {
        #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/createRegistryBtn.png")
        attribute('src', asset('images/buttons/registry/createRegistryBtn.png'))
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvShadowBottom"], ["selector", ".halfBlockLeft, .innerRight"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' halfBlockLeft ')]") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvShadowBottom")
          }
        }
      }
    }
    $("//*[contains(concat(' ', @class, ' '), ' innerRight ')]") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvShadowBottom")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvPasswordContainer"], ["selector", "#registrySignInVB #password"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'registrySignInVB']//*[@id = 'password']") {
      match($done, "no") {
        $("..") {
        attribute("class") {
          value() {
              append(" mvPasswordContainer")
          }
        }
        }
      }
    }
    
    
    #Don't Have Macy's Account
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddFileAttribute
      #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/createRegistryBtn.png"], ["selector", "#noProfileSubmitImg"]]
      # NOTE: just sets the attribute - doesn't do anything special for files
      $("//*[@id = 'noProfileSubmitImg']") {
        #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/createRegistryBtn.png")
        attribute('src', asset('images/buttons/registry/createRegistryBtn.png'))
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvShadowBottom"], ["selector", "#accessInStore"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'accessInStore']") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvShadowBottom")
          }
        }
      }
    }
    
    
  }
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvPswMessage"], ["selector", "#pswMessage"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[@id = 'pswMessage']") {
    match($done, "no") {
      $("..") {
        var("done", "yes")
      attribute("class") {
        value() {
            append(" mvPswMessage")
        }
      }
      }
    }
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", ".mvPswMessage > label"]]
  $("//*[contains(concat(' ', @class, ' '), ' mvPswMessage ')]/label") {
    remove()
  }
  
  
  #
  #Content::CSS::RemoveStyleProperty
  #[["property_name", "font-size"], ["selector", "div, span"]]
  $("//div[@style]") {
    attribute("style") {
      value() {
        replace(/font-size[^;]+(;|$)/, "")
      }
    }
  }
  $("//span[@style]") {
    attribute("style") {
      value() {
        replace(/font-size[^;]+(;|$)/, "")
      }
    }
  }
  
  
  #Create/update Registry
  #Group::URLMatcherGroup
  #[["url_matcher", "(registrycreateaccount|registryeditaccount)"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /(registrycreateaccount|registryeditaccount)/) {
  
    #Body Id
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvCreateNewRegistryStep1"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("mvCreateNewRegistryStep1")
          }
        }
      }
    }
    
    
    #Create your registry
    #Group::URLMatcherGroup
    #[["url_matcher", "registrycreateaccount"], ["negate", ""]]
    # This is a 'fake' url because it has http when it might mean https
    var("fake_url") {
      set(var("source_host"))
      append(var("path"))
      prepend("http://")
    }
    match($fake_url, /registrycreateaccount/) {
    
      #Adding mvSubTitle
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvSubTitle"], ["selector", ".h_noncapRed"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' h_noncapRed ')]") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvSubTitle")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", "#createRegistryHdr"], ["html", "<div class=\"mvTitle\" ><span>create your registry</span></div>"], ["prepend", ""], ["append", ""]]
      $("//*[@id = 'createRegistryHdr']") {
        inner("<div class=\"mvTitle\" ><span>create your registry</span></div>")
      }
      
      
      #
      #Content::Formatting::AddFileAttribute
      #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/registryBtns/register.png"], ["selector", "#submitImg"]]
      # NOTE: just sets the attribute - doesn't do anything special for files
      $("//*[@id = 'submitImg']") {
        #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/registryBtns/register.png")
        attribute('src', asset('images/buttons/registry/register.png'))
      }
      
      
    }
    
    #Update your registry
    #Group::URLMatcherGroup
    #[["url_matcher", "registryeditaccount"], ["negate", ""]]
    # This is a 'fake' url because it has http when it might mean https
    var("fake_url") {
      set(var("source_host"))
      append(var("path"))
      prepend("http://")
    }
    match($fake_url, /registryeditaccount/) {
    
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", "#editRegistryHdr"], ["html", "<div class=\"mvTitle\" >Update Your Registry</div>"], ["prepend", ""], ["append", ""]]
      $("//*[@id = 'editRegistryHdr']") {
        inner("<div class=\"mvTitle\" >Update Your Registry</div>")
      }
      
      
      #Edit registry accordian
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::WrapWithNextSibling
        #[["selector", "#formPaneInner > h3"], ["wrapper_class", "mvPaneInnerWrapper"], ["sibling_count", "1"]]
        $("//*[@id = 'formPaneInner']/h3") {
          wrap("div") {
            attribute("class", "mvPaneInnerWrapper")
            move_here("(following-sibling::*)[1]", "bottom")
          }
        }
        
        
        #
        #Content::Formatting::WrapTextChildren
        #[["selector", ".mvPaneInnerWrapper > h3"], ["tag_name", "span"], ["class_name", "mvPaneInnerTitle"], ["multiple", "true"], ["split_delimiter", ""]]
        $("//*[contains(concat(' ', @class, ' '), ' mvPaneInnerWrapper ')]/h3") {
          wrap_text_children("span", class: 'mvPaneInnerTitle')
        }
        
        
        #
        #Content::Inject::InjectHTML
        #[["html", "<span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span>"], ["add_after", ".mvPaneInnerTitle"], ["multiple", "true"], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("//*[contains(concat(' ', @class, ' '), ' mvPaneInnerTitle ')]") {
          inject_after("<span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span>")
        }
        
        
        #accordian bar
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvDarkGrayBar"], ["selector", ".mvPaneInnerWrapper > h3"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' mvPaneInnerWrapper ')]/h3") {
          match($done, "no") {
            attribute("class") {
              value() {
                  set("mvDarkGrayBar")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::Dynamic::Accordian4
        #[["link_selector", "h3"], ["content_selector", "h3 + div"], ["ancestor_selector", ".mvPaneInnerWrapper"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
        var("anc_counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvPaneInnerWrapper ')]") {
          var("anc_counter") {
            append("b")
          }
          var("counter", "")
          var("content_id_string", "[")
          $(".//h3/following-sibling::*[1]/self::div") {
            attribute("class") {
              value() {
                append(" mw_accordian_hide")
              }
            }
            var("counter") {
              append("a")
            }
            var("id", fetch("./@id"))
            match($id, /^$/) {
              attribute("id") {
                value() {
                  set("acc_con")
                  append($counter)
                  append($anc_counter)
                  append("38366")
                }
              }
            }
            var("id", fetch("./@id"))
            var("content_id_string") {
              append("'")
              append($id)
              append("',")
            }
          }
          var("content_id_string") {
            replace(/,$/, "]")
          }
          var("counter", "")
          $(".//h3") {
            var("counter") {
              append("a")
            }
            var("id", fetch("./@id"))
            match($id, /^$/) {
              attribute("id") {
                value() {
                  set("acc_link")
                  append($counter)
                  append($anc_counter)
                  append("38366")
                }
              }
            }
            var("id", fetch("./@id"))
            attribute("onclick") {
              value() {
                set("moovweb_toggle_accordian3('")
                append($id)
                append("', ")
                append($content_id_string)
                append(", 'mw_accordian_hide')")
              }
            }
          }
        }
        
        
      # end BasicGroup
      
      #
      #Content::Formatting::AddFileAttribute
      #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/registryBtns/regUpdateBtn.png"], ["selector", "#submitImg"]]
      # NOTE: just sets the attribute - doesn't do anything special for files
      $("//*[@id = 'submitImg']") {
        #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/registryBtns/regUpdateBtn.png")
        attribute('src', asset('images/buttons/registry/update.png'))
      }
      
      
    }
    
    #Adding mvSecondaryTitle
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvSecondaryTitle"], ["selector", "#registrantLgd, #coregistrantLgd, #giftsNowLgd, #giftsFutureLgd, #viewOptionsLgd, #storePrefLgd, #goingGreenLgd, #subscrEmailLgd, #subscrTextMsgLgd"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'registrantLgd']") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvSecondaryTitle")
          }
        }
      }
    }
    $("//*[@id = 'coregistrantLgd']") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvSecondaryTitle")
          }
        }
      }
    }
    $("//*[@id = 'giftsNowLgd']") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvSecondaryTitle")
          }
        }
      }
    }
    $("//*[@id = 'giftsFutureLgd']") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvSecondaryTitle")
          }
        }
      }
    }
    $("//*[@id = 'viewOptionsLgd']") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvSecondaryTitle")
          }
        }
      }
    }
    $("//*[@id = 'storePrefLgd']") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvSecondaryTitle")
          }
        }
      }
    }
    $("//*[@id = 'goingGreenLgd']") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvSecondaryTitle")
          }
        }
      }
    }
    $("//*[@id = 'subscrEmailLgd']") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvSecondaryTitle")
          }
        }
      }
    }
    $("//*[@id = 'subscrTextMsgLgd']") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvSecondaryTitle")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvLableTextField"], ["selector", ".mvContactInformation div[class*=\"row\"], .mvShippingInformation div[class*=\"row\"]"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvContactInformation ')]//div[contains(@class, \"row\")]") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvLableTextField")
          }
        }
      }
    }
    $("//*[contains(concat(' ', @class, ' '), ' mvShippingInformation ')]//div[contains(@class, \"row\")]") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvLableTextField")
          }
        }
      }
    }
    
    
  }
  
  #URL MG - Registry Singin In
  #Group::URLMatcherGroup
  #[["url_matcher", "registrysignin"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /registrysignin/) {
  
    #Add body ID
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvRegistrySigninBody"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("mvRegistrySigninBody")
          }
        }
      }
    }
    
    
    #Page Title
    #Content::Formatting::SetInnerHTML
    #[["selector", "#signIn"], ["html", "<div class=\"mvTitle\">Sign in</div>"], ["prepend", ""], ["append", ""]]
    $("//*[@id = 'signIn']") {
      inner("<div class=\"mvTitle\">Sign in</div>")
    }
    
    
    #ShadowBox
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvShadowBottom"], ["selector", "#registrySignInVB, .message.help, .halfBlockRight"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'registrySignInVB']") {
      match($done, "no") {
        attribute("class") {
          value() {
              set("mvShadowBottom")
          }
        }
      }
    }
    $("//*[contains(concat(' ', @class, ' '), ' message ') and contains(concat(' ', @class, ' '), ' help ')]") {
      match($done, "no") {
        attribute("class") {
          value() {
              set("mvShadowBottom")
          }
        }
      }
    }
    $("//*[contains(concat(' ', @class, ' '), ' halfBlockRight ')]") {
      match($done, "no") {
        attribute("class") {
          value() {
              set("mvShadowBottom")
          }
        }
      }
    }
    
    
    #Replace Create Btn Img
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/createBtn.png"], ["selector", "img[alt=\"Create\"]"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//img[@alt = \"Create\"]") {
      #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/createBtn.png")
      attribute('src', asset('images/buttons/create.png'))
    }
    
    
    #Replace Sign in Btn Img
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/signinBtn.png"], ["selector", "input[alt=\"Sign In\"]"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//input[@alt = \"Sign In\"]") {
      #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/signinBtn.png")
      attribute('src', asset('images/buttons/signin.png'))
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRegHelp"], ["selector", ".help"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' help ')]") {
      match($done, "no") {
        $("..") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvRegHelp")
          }
        }
        }
      }
    }
    
    
  }
  
  #Registry search
  #Group::URLMatcherGroup
  #[["url_matcher", "registrysearch"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /registrysearch/) {
  
    #Page Title
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvTitle\">Your Registry Search Results</div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#bd"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'bd'])[1]") {
      inject_before("<div class=\"mvTitle\">Your Registry Search Results</div>")
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvPadding10"], ["selector", "#titlePane"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'titlePane']") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvPadding10")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvShadowBox"], ["selector", "#searchFormContainer, #resultsPaneInner"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'searchFormContainer']") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvShadowBox")
          }
        }
      }
    }
    $("//*[@id = 'resultsPaneInner']") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvShadowBox")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvSubTitle"], ["selector", "#newSearchHr, #resultsHdr"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'newSearchHr']") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvSubTitle")
          }
        }
      }
    }
    $("//*[@id = 'resultsHdr']") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvSubTitle")
          }
        }
      }
    }
    
    
    #dump table
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::ReplaceTag
      #[["selector", "table, thead, tr, tbody"], ["new_tag_name", "div"], ["class_name", ""]]
      $("//table") {
        name("div")
      }
      $("//thead") {
        name("div")
      }
      $("//tr") {
        name("div")
      }
      $("//tbody") {
        name("div")
      }
      
      
      #
      #Content::Formatting::ReplaceTag
      #[["selector", "td"], ["new_tag_name", "span"], ["class_name", ""]]
      $("//td") {
        name("span")
      }
      
      
    # end BasicGroup
    
    #Search result table
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", "#resultsTable div > span:nth-of-type(1)"], ["html", "<span class=\"mvRegistryLabel\">registrant: </span>"], ["prepend", "true"], ["append", ""]]
      $("//*[@id = 'resultsTable']//div/span[position() = 1]") {
        inner() {
          prepend("<span class=\"mvRegistryLabel\">registrant: </span>")
        }
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", "#resultsTable  div > span:nth-of-type(2)"], ["html", "<span class=\"mvRegistryLabel\">co-registrant: </span>"], ["prepend", "true"], ["append", ""]]
      $("//*[@id = 'resultsTable']//div/span[position() = 2]") {
        inner() {
          prepend("<span class=\"mvRegistryLabel\">co-registrant: </span>")
        }
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", "#resultsTable  div > span:nth-of-type(3)"], ["html", "<span class=\"mvRegistryLabel\">event location: </span>"], ["prepend", "true"], ["append", ""]]
      $("//*[@id = 'resultsTable']//div/span[position() = 3]") {
        inner() {
          prepend("<span class=\"mvRegistryLabel\">event location: </span>")
        }
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", "#resultsTable  div > span:nth-of-type(4)"], ["html", "<span class=\"mvRegistryLabel\">event date: </span>"], ["prepend", "true"], ["append", ""]]
      $("//*[@id = 'resultsTable']//div/span[position() = 4]") {
        inner() {
          prepend("<span class=\"mvRegistryLabel\">event date: </span>")
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvRedBtn"], ["selector", "a:contains(\"view registry\")"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//a[contains(., \"view registry\")]") {
        match($done, "no") {
          $("..") {
          attribute("class") {
            value() {
                set("mvRedBtn")
            }
          }
          }
        }
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#searchTips, #searchTitle, #resultsTable > div:first-of-type"]]
    $("//*[@id = 'searchTips']") {
      remove()
    }
    $("//*[@id = 'searchTitle']") {
      remove()
    }
    $("//*[@id = 'resultsTable']/div[position() = 1]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "style"], ["selector", ".row.clearfix, .rowSelect.clearfix, .tbmark"]]
    $("//*[contains(concat(' ', @class, ' '), ' row ') and contains(concat(' ', @class, ' '), ' clearfix ')]") {
      attribute("style") {
        remove()
      }
    }
    $("//*[contains(concat(' ', @class, ' '), ' rowSelect ') and contains(concat(' ', @class, ' '), ' clearfix ')]") {
      attribute("style") {
        remove()
      }
    }
    $("//*[contains(concat(' ', @class, ' '), ' tbmark ')]") {
      attribute("style") {
        remove()
      }
    }
    
    
    #
    #Content::Javascript::ReplaceMatchingScriptTag
    #[["src_match", "search-min.js"], ["new_src", "http://dl.dropbox.com/u/9451381/moovweb/clients/macys/search.js"]]
    $("(//script[contains(@src, 'search-min.js')])[1]") {
      attribute("src", asset('/javascript/search.js'))
    }
    
    #Revise search
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Javascript::AddInlineScriptTag
      #[["script", "function scrollToWindow()   {    var ypos = document.getElementById('newSearchPane').offsetTop;    window.scrollTo(0,ypos);   } "], ["add_after", ""], ["add_before", ""]]
        $("html/body") {
          insert_bottom("script") {
            attribute("language", "javascript")
            inner("function scrollToWindow()   {    var ypos = document.getElementById('newSearchPane').offsetTop;    window.scrollTo(0,ypos);   } ")
          }
        }
      
      
      #
      #Content::Formatting::RemoveAttribute
      #[["attribute", "href"], ["selector", "#reviseSearchLink"]]
      $("//*[@id = 'reviseSearchLink']") {
        attribute("href") {
          remove()
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "onclick"], ["value", "scrollToWindow()"], ["selector", "#reviseSearchLink"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'reviseSearchLink']") {
        match($done, "no") {
            var("done", "yes")
          attribute("onclick") {
            value() {
                set("scrollToWindow()")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddFileAttribute
      #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/registryBtns/searchBtn.png"], ["selector", "input[alt=\"Search\"]"]]
      # NOTE: just sets the attribute - doesn't do anything special for files
      $("//input[@alt = \"Search\"]") {
        #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/registryBtns/searchBtn.png")
        attribute('src', asset('images/buttons/registry/search.png'))
      }
      
      
    # end BasicGroup
    
    #remove 0 result for app
    #Group::CookieMatcherGroup
    #[["cookie_name", "ishop_app"], ["cookie_value_regex", ""], ["no_cookie_counts", ""], ["any", ""]]
    var("run_group", "false")
        # match if the cookie is found
        match($cookie, /ishop_app/) {
          var("run_group", "true")
        }
    match($run_group, "true") {
      #
      #Content::Formatting::RemoveElements
      #[["selector", "#titlePane"]]
      $("//*[@id = 'titlePane']") {
        remove()
      }
      
      
    }
    
  }
  
  #Registry claim
  #Group::URLMatcherGroup
  #[["url_matcher", "registryclaim"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /registryclaim/) {
  
    #Page Title
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvTitle\" >find your registry</div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#bd"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'bd'])[1]") {
      inject_before("<div class=\"mvTitle\" >find your registry</div>")
    }
    
    
    #Access registry btn
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/registryBtns/accessRgegistryBtn.png"], ["selector", "input[alt=\"Access Registry\"]"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//input[@alt = \"Access Registry\"]") {
      #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/registryBtns/accessRgegistryBtn.png")
      attribute('src', asset('images/buttons/registry/accessRegistry.png'))
    }
    
    
    #Img to text
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::WrapElement
      #[["selector", "#createdInStore"], ["class_name", "h_allcapsGrey"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
      var("found", "false")
      match($found, "false") {
        $("(//*[@id = 'createdInStore'])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "h_allcapsGrey")
            move_here("//*[@id = 'createdInStore'][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::DumpImgAltText
      #[["image_selector", "#createdInStore"], ["target_selector", ".h_allcapsGrey"], ["map_multiple", ""]]
      $("(//*[@id = 'createdInStore'])[1]") {
        var("alt", fetch("./@alt"))
        $("(//*[contains(concat(' ', @class, ' '), ' h_allcapsGrey ')])[1]") {
          text($alt)
        }
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::RemoveWhiteSpace
    #[["selector", "#claimFields label"]]
    # NOTE: This will remove text elements that are whitespace only, but it will not remove
    # the preceding or following whitespace from elements that have some text
    $("//*[@id = 'claimFields']//label/text()[normalize-space(.) = '']") {
      remove()
    }
    
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/continueBtn.png"], ["selector", "input[alt=\"Continue\"]"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//input[@alt = \"Continue\"]") {
      #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/continueBtn.png")
      attribute('src', asset('images/buttons/continue.png'))
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#findRegistry, #message br, img#createdInStore"]]
    $("//*[@id = 'findRegistry']") {
      remove()
    }
    $("//*[@id = 'message']//br") {
      remove()
    }
    $("//img[@id = 'createdInStore']") {
      remove()
    }
    
    
  }
  
  #popup close red btn
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "https://moovweb-gage.s3.amazonaws.com/yupu/macys/account_btns/close_btn.gif"], ["selector", "input[alt=\"Close\"]"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//input[@alt = \"Close\"]") {
      #attribute("src", "https://moovweb-gage.s3.amazonaws.com/yupu/macys/account_btns/close_btn.gif")
      attribute('src', asset('images/buttons/close.gif'))
    }
    
    
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "https://moovweb-gage.s3.amazonaws.com/yupu/macys/account_btns/close_btn.gif"], ["selector", "#whyAskingClose img"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//*[@id = 'whyAskingClose']//img") {
      #attribute("src", "https://moovweb-gage.s3.amazonaws.com/yupu/macys/account_btns/close_btn.gif")
      attribute('src', asset('images/buttons/close.gif'))
    }
    
    
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "https://moovweb-gage.s3.amazonaws.com/yupu/macys/account_btns/close_btn.gif"], ["selector", "#viewOptionsClose img, #whyAskingClose img"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//*[@id = 'viewOptionsClose']//img") {
      #attribute("src", "https://moovweb-gage.s3.amazonaws.com/yupu/macys/account_btns/close_btn.gif")
      attribute('src', asset('images/buttons/close.gif'))
    }
    $("//*[@id = 'whyAskingClose']//img") {
      #attribute("src", "https://moovweb-gage.s3.amazonaws.com/yupu/macys/account_btns/close_btn.gif")
      attribute('src', asset('images/buttons/close.gif'))
    }
    
    
  # end BasicGroup
  
  #
  #Content::Formatting::MoveAfter
  #[["move_me", ".generalError"], ["after_me", ".mvTitle"], ["map_multiple", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' mvTitle ')])[1]") {
    move_here("(//*[contains(concat(' ', @class, ' '), ' generalError ')])[1]", "after")
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvErrorMeg"], ["selector", ".generalError"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[contains(concat(' ', @class, ' '), ' generalError ')]") {
    match($done, "no") {
      attribute("class") {
        value() {
            append(" mvErrorMeg")
        }
      }
    }
  }
  
  
  #Forgot password popup
  #Group::URLMatcherGroup
  #[["url_matcher", "(registrysignin|registrycaptureemail|registryclaimverify)"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /(registrysignin|registrycaptureemail|registryclaimverify)/) {
  
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/submitBtn.png"], ["selector", "#forgotPswdSubmit"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//*[@id = 'forgotPswdSubmit']") {
      #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/submitBtn.png")
      attribute('src', asset('images/buttons/submit.png'))
    }
    
    
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "https://moovweb-gage.s3.amazonaws.com/yupu/macys/account_btns/close_btn.gif"], ["selector", "#errorClose"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//*[@id = 'errorClose']") {
      #attribute("src", "https://moovweb-gage.s3.amazonaws.com/yupu/macys/account_btns/close_btn.gif")
      attribute('src', asset('images/buttons/close.png'))
    }
    
    
    #
    #Content::Formatting::MoveBefore
    #[["move_me", "#errorMessage"], ["before_me", "#forgotPswd .gainlayout"], ["map_moves", ""]]
    $("(//*[@id = 'forgotPswd']//*[contains(concat(' ', @class, ' '), ' gainlayout ')])[1]") {
      move_here("(//*[@id = 'errorMessage'])[1]", "before")
    }
    
    
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "https://moovweb-gage.s3.amazonaws.com/yupu/macys/account_btns/Sign-In-Again.png"], ["selector", "#innerConfirmSent #sentSubmit[alt=\"Sign In Again\"]"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//*[@id = 'innerConfirmSent']//*[@id = 'sentSubmit' and @alt = \"Sign In Again\"]") {
      #attribute("src", "https://moovweb-gage.s3.amazonaws.com/yupu/macys/account_btns/Sign-In-Again.png")
      attribute('src', asset('images/buttons/Sign-In-Again.png'))
    }
    
    
  }
  
  #
  #Content::CSS::RemoveStyles
  #[["selector", ".fieldsetContainer > .row.clearfix"]]
  $("//*[contains(concat(' ', @class, ' '), ' fieldsetContainer ')]/*[contains(concat(' ', @class, ' '), ' row ') and contains(concat(' ', @class, ' '), ' clearfix ')]") {
    attribute("style") {
      remove()
    }
  }
  
  
  #
  #This is for add 2px bold line on the bottom of title
  #Content::Formatting::WrapElement
  #[["selector", ".mvTitle"], ["class_name", "mvTitleWrapper"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
  var("found", "false")
  match($found, "false") {
    $("(//*[contains(concat(' ', @class, ' '), ' mvTitle ')])[1]") {
      var("found", "true")
      insert_before("div") {
        attribute("the_wrapper", "true")
        attribute("class", "mvTitleWrapper")
        move_here("//*[contains(concat(' ', @class, ' '), ' mvTitle ')][not (@the_wrapper)]", "bottom")
        attribute("the_wrapper") {
          remove()
        }
      }
    }
  }
  
  
}
