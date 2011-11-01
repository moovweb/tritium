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
      #Sigin Form
      $(".//form[@id ='signInVB']") {
        $("div[@id='signInSubmit']/input") {
          #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/signinBtn.png")
          attribute('src', asset('images/buttons/signin.png'))
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
            attribute('src', asset('images/buttons/signinContinue.png'))
          }
          $("input[@name='expressCheckout']") {
            #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/expressCheckout.png")
            attribute('src', asset('images/buttons/expressCheckout.png'))
          }
        }
      }
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
        attribute('src', asset('images/buttons/create.png'))
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
           attribute('src', asset('images/buttons/submit.png'))
         }
         $(".//span[@class='small']") {
           name("div")
         }
       }
     }
   }
   $(".//a[contains(@class,'globalMiniCartItems')]"){
     move_to("..","before")
    }
  }
  
  #checkout sign in only
  $("//div[@id='checkoutMastheadContainer']") {
    inject_after("<div class='mvTitle'>Checkout</div>")
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
                attribute('src', asset('images/buttons/checkoutGuest.png'))
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
}
