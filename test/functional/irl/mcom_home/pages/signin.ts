# ----- ParsedHTMLBlocks ----
html() {
  
  #Clean up
  #Group::BasicGroup
  
    #Content::Formatting::Table::RemoveWidths
   
    $("html/body") {
      add_class("mw_signin")
      $(".//*"){
        attribute("align") {
          remove()
        }
      }
      $(".//table|.//tr|.//td") {
        attribute("width") {
          remove()
        }
      }
      $(".//td") {
        name("span")
      }
      $(".//table") {
        name("div")
      }
      $(".//tr") {
        name("div")
      }
      $(".//div") {
        attribute("style") {
          remove()
        }
      }
      $(".//span") {
        attribute("style") {
          remove()
        }
      }
    }
  # end BasicGroup
  
  #sign in for regular and checkout
  
  $("//div[@id='profileContainer']") {
    #error message
    $("div[@class='generalError']") {
      add_class("mvErrorMeg")
    }
    #sign in page title 
    $("div[@id='macysGlobalBanner']//img[@alt='Sign In']") {
      inject_before("<div class=\"mvTitle\"><span>Sign in</span><a class=\"mvBackBtn\" href=\"/\">Home</a></div>")
      remove()
    }
    $("div[@id='loginDiv']"){
      $("h3"){ 
        remove()
      }
      add_class("mvShadowBottom")
      # 11E start
      #Sigin Form
      $(".//form[@id ='signInVB']") {
        # # Need to disable autocomplete because Android abuses the feature
        #        attribute("autocomplete", "off")
        $("div[@id='signInSubmit']/input") {
          #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/signinBtn.png")
          attribute('src', asset('buttons/signin.png', 'image'))
        }
        $("ul/li/label/..") {
          add_class("mvTextFieldWrapper")
          $("label") {
            add_class("mvLabel")
          } 
          $("span[@class='small']") {
            name("div")
          }         
        }
        #remove element for checkout signin
        $("div[@class='directorder']") {
          remove()
        }
        $("div[@class='guestSignInSubmit']") {
          $("input[@name='normalCheckout']") {
            #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/signinContinue.png")
            attribute('src', asset('buttons/signinContinue.png', 'image'))
          }
          $("input[@name='expressCheckout']") {
            #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/expressCheckout.png")
            attribute('src', asset('buttons/expressCheckout.png', 'image'))
          }
        }
      }
      # 11E end
      
      # 11F start
      #Sigin Form
      $(".//form[@id ='signInForm']") {
        # # Need to disable autocomplete because Android abuses the feature
        #        attribute("autocomplete", "off")
        $("div[@id='signInSubmit']/input") {
          #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/signinBtn.png")
          attribute('src', asset('buttons/signin.png', 'image'))
        }
        $("ul/li/label/..") {
          add_class("mvTextFieldWrapper")
          $("label") {
            add_class("mvLabel")
          } 
          $("span[@class='small']") {
            name("div")
          }         
        }
        #remove element for checkout signin
        $("div[@class='directorder']") {
          remove()
        }
        $("div[@class='guestSignInSubmit']") {
          $("input[@name='normalCheckout']") {
            #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/signinContinue.png")
            attribute('src', asset('buttons/signinContinue.png', 'image'))
          }
          $("input[@name='expressCheckout']") {
            #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/expressCheckout.png")
            attribute('src', asset('buttons/expressCheckout.png', 'image'))
          }
        }
      }
      # 11F end
    }
    #create account
    $("div[@id='vSeperator']") { 
      text("DON'T HAVE A MACYS.COM PROFILE?")
    }
    $("div[@id='createProfileDiv']") {
      add_class("mvShadowBottom") 
      $("h3") { 
        remove()
      }
      $("div[@id='createProfileSubmit']/a/img") {
        #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/createBtn.png")           
        attribute('src', asset('buttons/create.png', 'image'))
      }
    }
  }

  #Forgotten password
  #Group::URLMatcherGroup
  #[["url_matcher", "password"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /\/forgotpassword/) {
    
    $("//div[@id='profileContainer']"){
     $("div[@id='registryLink']") {
       add_class("mvPadding10")
     }
     $("div[@id='macysGlobalBanner']") {
       $("div/h1") {
        text("Forgotten password")
        add_class("mvTitle")
      }
     }
     $("div[@id='profile']") {
       add_class("mvShadowBottom")
       $("form[@id='signInVB']"){
         $(".//label[@for='forgotPwd']"){
           remove()
         }
         $(".//input[@id='forgotPwd']"){
           #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/submitBtn.png")
           attribute('src', asset('buttons/submit.png', 'image'))
         }
         $(".//span[@class='small']") {
           name("div")
         }
       }
     }
   }
   #$(".//a[contains(@class,'globalMiniCartItems')]"){
   #  move_to("..","before")
   # }
  }
  
  #checkout sign in only
  $("//div[@id='checkoutMastheadContainer']") {
    $("//div[@id='doc3']"){
      $(".//div[@id='profileContainer']") {
        $("form") {
          $("div[@id='vSeperator']") {
            text("I DON'T WANT TO CREATE A PROFILE")
          }
          $("div[@id='createProfileDiv']") {
            $("p") {
              remove()
            }
            $("img") {
              remove() 
            }
            $("div[@id='withoutProfileButton']") {
              $("input"){ 
                #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/checkoutGuest.png")
                attribute('src', asset('buttons/checkoutGuest.png', 'image'))
              }
              add_class("mvShadowBottom")
            }      
          }
        }
      }
      $(".//a[@class='globalMiniCartItems']") {
        move_to("..", "before")
      }
    }
  }
  $(".//div[@id='wrapper']/div") {
    $(".//div[@id='btn']") {
      $("./img") {
        attribute("src") {
          remove()
        }
        name("div")
      }
    }
    $(".//div[@id='emailDiv']/h1") {
      $("./img") {
       remove()
      }
      text() {
        append("forgot your password?")
      }
      add_class("mvRedText")
      wrap("div", class: "mvHeader")
    }
    $(".//div[@id='captchaDiv']/h1") {
      $("./img") {
       remove()
      }
      text() {
        append("forgot your password?")
      }
      add_class("mvRedText")
      wrap("div", class: "mvHeader")
    }
    $(".//div[@id='confirmDiv']"){
      $("h1") {
        $("./img") {
         remove()
        }
        text() {
          append("Email sent!")
        }
        add_class("mvRedText")
        wrap("div", class: "mvHeader")
      }
    }
    #add_class("yui3-widget yui3-overlay yui3-widget-positioned yui3-widget-stacked yui3-overlay-hidden")
    $(".//li[@id='overlaySubmitbtnDiv']") {
      #insert_after("input", type: "button", value: "Continue", onclick: "x$('#overlaySubmitbtnDiv > input')[0].click();")
      #move_to("..", "after")
      
    }
    $(".//input[@id='verifyCaptchaBtn']") {
      wrap("div", class: "captcha_bottom")
    }
    $(".//input[@id='closeBtn']") {
      wrap("div", class: "confirm_bottom")
    }
  }
}
