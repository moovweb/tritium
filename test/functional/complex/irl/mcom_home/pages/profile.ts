html(){

  #clean up
  $("//html/body"){
     add_class("mw_myinfo")
    attribute("id","mvProfile")
    $(".//div[@id='globalContentContainer']"){
      $("div[@id='localNavigationContainer']"){
        remove()
      }
      $("div[@id='depthpathContainer']"){
        remove()
      }

      
      #edit profile only
      $("div[@id='localContentContainer']/div[@id='profileContainer']"){
        $("h1"){
          $("span"){
            add_class("mvPadding0510")
          }
          $("img"){
            inject_before("<div class='mvTitle'><span>My Profile</span><a class='mvBackBtn' href='/myinfo/index.ognc'>Account</a></div>")
            remove()
          }
        }
         $("form") {
             $(".//div[@class='existingCard']"){
               $(".//img[@class='absmiddle']"){
                 remove()
               }
               $(".//span[@class='paperStatementContext']"){
                 remove()
               }
               $(".//div[@class='hSeparator']"){
                 remove()
               }
               #                $(".//div[@class='hSeparator']"){
               #                  remvoe()
               #                }
               $(".//img[@alt='Delete Card']/.."){
                 text("delete card")
                 add_class("mvDarkBtn")

               }
                                      }
             $("div[@id='formButtonBgGrey']"){
                $("input[@alt='Update Profile']") {
                  #attribute("src","http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/updateProfile.png")
                  attribute('src', asset('other/updateProfile.png', 'image'))
                }
              }
          }

      }
        #create profile only
        $("div[@id='createProfileContainer']/div[@id='profileContainer']"){
          $("h1"){
            $("span"){
              add_class("mvPadding0510")
            }
            $("img"){
              inject_before("<div class='mvTitle'><span>Create Profile</span><a class='mvBackBtn' href='/account/signin'>Sign in</a></div>")
              remove()
            }
          }
          $("ul"){ 
            add_class("mvPadding0510")
          }
          $("form") {
             $("div[@id='buttonBgGrey']"){
                add_class("mvPadding0510")
                $("input[@alt='Create Profile']") {
                  #attribute("src","http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/createProfileBtn.png")
                  attribute('src', asset('buttons/createProfile.png', 'image'))
                }
              }
          }
          $("div[@id='vCallDiv']") {
            remove()
          }
        }
      #both of create and edit profile
      $("div/div[@id='profileContainer']"){
        #make all of input src passthrough
        $(".//input[@src]") {
          var("src", fetch("./@src"))
          attribute("src") {
            value() {
              # if the src starts with a slash (/) but not a double slash (//) then add the host
              match($src, /^\/[^\/]/) {
                prepend($source_host)
                prepend("//")
              }
              # TODO: handle the case where the image URL is page-relative (doesn't start with http
              # or a slash)
            }
          }
        }

        $(".//table") {
          attribute("width") {
            remove()
          }
        }

        $(".//*[contains(concat(' ', @class, ' '), ' clearboth ')]") {
          remove()
        }
        $("p"){
          add_class("mvPadding0510")
        }
        $("form"){
          $("div[@id='profileBorderShadow']"){
            #edit my profile form
            $("div[@id='formFieldsColumn']") {
              add_class("mvShadowBox")
              $("div[@id='profile']/fieldset/ul/li"){
                add_class("mvTextInputRow")

              }

            }
            #add macys card to your profile
            $("div[@id='cardDisplayColumn']/div[@id='addCardDiv']") {
              $("p") {
                add_class("mvPadding10")
              }
              $("h2/img"){
                inject_before("<div class='mvSubTitle' style='font-size:15px;'>wants to add your macy’s card to your profile?</div>")
                remove()
              }

              $("div[@class='expandDiv']") {
                $("div[@class='hSeparator']"){
                  remove()
                }
                $("div[@class='addAnotherCard']|div[@id='addAnotherCard']") {
                  add_class("mvShadowBox")
                  $(".//label[@for='newRegisterCardVB\.goGreen']"){
                    $("img"){
                      remove()
                    }
                    $("span[@class='paperStatementContext']|span[@id='paperStatementContext']"){
                      remove()
                    }
                  }
                }
              }
            }

          }
         
        }
        $("div[@class='instFtTxt']"){
          $("a"){
            remove()
          }
          add_class("mvPadding10")
          $("div[@id='invitelayer']"){
            remove()
          }
        }

      }

    }
  }

}
