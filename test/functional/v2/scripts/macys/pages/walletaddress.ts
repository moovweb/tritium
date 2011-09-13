html() {

  
  $("//body"){
     add_class("mw_myinfo")
    $(".//div[@id='globalContentContainer']"){
      $("div[@id='localNavigationContainer']|div[@id='depthpathContainer']"){
        remove()
      }
      $(".//div[@id='profileContainer']"){
        $(".//br") { 
            remove()
            }
        $("div[@id='macysGlobalBanner']"){
          $(".//h1"){
            $("img[@alt='my address book']"){
              inject_before("<div class='mvTitle'><span>My Address Book</span><a class='mvBackBtn' href='/myinfo/index.ognc'>Account</a></div>")
              remove()
            }
            $("img[@alt='my wallet']"){
              inject_before("<div class='mvTitle'><span>My Wallet</span><a class='mvBackBtn' href='/myinfo/index.ognc'>Account</a></div>")
              remove()
            }
            $("span"){
              add_class("mvPadding0510")
            }
          }
         
        }
        $("div[2]") {
          add_class("mvPadding0510")
        }
        $("div/div[@class='fltRight']") {
          remove()
        }
        # for both of my wallet and my address
        $("form"){
          $("div[@id='profileBorderShadow']"){
            # saved address or credit card
            $("div[@id='profileListDisplay']/div[@id='profileList']") {
              $("span") {
                add_class("mvPadding0510")
              }
              $("div[contains(concat(' ', @class, ' '), ' profileListTable ')]"){
              add_class("mvShadowBox")
            }
          }
            $("div[@id='profileFormFields']/div[@id='profile']") {
              $("fieldset"){
                attribute("id", "formFieldsColumn")
                add_class("mvPadding10")
                $("ul/li") {
                  add_class("mvTextInputRow")
                $("input[@id='areaCode']/.."){
                  attribute("id", "phFields")
                }
                }
              }
              
            }
            
          }
        }
        # for my wallet
        $("form[@id='myWallet']"){
          $("div[@id='profileBorderShadow']"){
            $("div[@id='vSeperator']"){
              remove()
            }
            $("div[@id='profileListDisplay']/div[@id='profileList']"){
              $("div[@class='formheader']/img[@alt='Credit Card Information']"){
                inject_before("<div class='mvSubTitle'>Credit Card Information</div>")
                remove()
              }
            }
            $("div[@id='profileFormFields']/div[@id='profile']") {
              $("div[@class='formheader']/img"){
                inject_before("<div class='mvSubTitle'>Add Credit Card Information</div>")
                remove()
              }
            $("fieldset[2]"){
              $("legend"){
                name("div")
                add_class("mvSubTitle")
                move_to("..", "before")
              }
            }
            }
          }
          $("div[@id='formButtonBgGrey']/input") {
            #attribute("src","http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/saveCreditCardInfo.png")
            attribute('src', asset('buttons/saveCreditCardInfo.png', 'image'))
          }
          $("input[@value='EDIT']"){
            $("./../div[@id='profileBorderShadow']/div[@id='profileListDisplay']"){
              add_class("mvHideElement")
            }
            $("./../div[@id='profileBorderShadow']/div[@id='profileFormFields']/div[@id='profile']/div[@class='formheader']/div"){
              text("Edit Credit Card Information")
            }
          }
        }
       # for my address
          $("form[@id='myaddress']"){
            
            $("div[@id='profileBorderShadow']"){
              $("div[@id='profileListDisplay']/div[@id='profileList']"){
                $("div[@class='formheader']/img"){
                  inject_before("<div class='mvSubTitle'>Your Shipping Address</div>")
                  remove()
                }
              }
              $("div[@id='profileFormFields']/div[@id='profile']") {
                $("div[@class='formheader']/img"){
                  inject_before("<div class='mvSubTitle'>Add Shipping Address</div>")
                  remove()
                }
              }
            }
            $("div[@id='formButtonBgGrey']/input"){
              #attribute("src","http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/saveAddressBtn.png")
              attribute('src', asset('buttons/saveAddress.png', 'image'))
            }
            $("input[@value='UPDATE']"){
              $("./../div[@id='profileBorderShadow']/div[@id='profileListDisplay']"){
                add_class("mvHideElement")
              }
              $("./../div[@id='profileBorderShadow']/div[@id='profileFormFields']/div[@id='profile']/div[@class='formheader']/div"){
                text("Edit Shipping address")
              }
            }
          }
      }
    }
  }
}
