# ----- ParsedHTMLBlocks ----
html() {
  # Add page specific class
  $("/html") {
    $("./head") {
      $(".//script[contains(@src, 'accountsummary.js')]") {
        insert_after("script", type: "text/javascript", src: asset("accountsummary.js", "js"))
        remove()
      }
    }
    $("./body") {
      add_class("mw_reward")
    }
  }
  #remove tab corner
  $("//*[contains(concat(' ', @class, ' '), ' tabCorner ')]") {
    remove()
  }
  #
  #Content::Absolutize::AbsolutizeInputTags
  #[]
  $("//input[@src]") {
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
  
  #
  #Content::Formatting::RemoveAttribute
  #[["attribute", "width"], ["selector", "table"]]
  $("//table") {
    attribute("width") {
      remove()
    }
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", ".clearboth"]]
  $("//*[contains(concat(' ', @class, ' '), ' clearboth ')]") {
    remove()
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", "#localNavigationContainer, #depthpathContainer"]]
  $("//*[@id = 'localNavigationContainer']") {
    remove()
  }
  $("//*[@id = 'depthpathContainer']") {
    remove()
  }
  
  
  #Rewards
  #Group::URLMatcherGroup
  #[["url_matcher", "\\/mymacysrewards\\/accountassociation"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /\/mymacysrewards\/accountassociation/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvRewardHome"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("mvRewardHome")
          }
        }
      }
    }
    
    
    #Page Title
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvTitle\"><span>My Macy's Rewards</span><a class=\"mvBackBtn\" href=\"/myinfo/index.ognc\">Account</a></div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#bd"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'bd'])[1]") {
      inject_before("<div class=\"mvTitle\"><span>My Macy's Rewards</span><a class=\"mvBackBtn\" href=\"/myinfo/index.ognc\">Account</a></div>")
    }
    
    
    #
    #Content::CSS::RemoveStyles
    #[["selector", "label, input, div"]]
    $("//label") {
      attribute("style") {
        remove()
      }
    }
    $("//input") {
      attribute("style") {
        remove()
      }
    }
    $("//div") {
      attribute("style") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "img[alt=\"My Macy's Rewards\"], br, .tabCorner"]]
    $("//img[@alt = \"My Macy's Rewards\"]") {
      remove()
    }
    $("//br") {
      remove()
    }
    
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "style"], ["value", "padding:10px 10px 0 10px; display:block;"], ["selector", "#macysGlobalLayout > p, #macysGlobalLayout > div > b"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'macysGlobalLayout']/p") {
      match($done, "no") {
        attribute("style") {
          value() {
              set("padding:10px 10px 0 10px; display:block;")
          }
        }
      }
    }
    $("//*[@id = 'macysGlobalLayout']/div/b") {
      match($done, "no") {
        attribute("style") {
          value() {
              set("padding:10px 10px 0 10px; display:block;")
          }
        }
      }
    }
    
    
    
    
    
    #Replace Img Btn
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/continueBtn.png"], ["selector", "#continue"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//*[@id = 'continue']") {
      #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/continueBtn.png")
      attribute('src', asset('buttons/continue.png', 'image'))
    }
    
    
    #Error Meg
    #Content::Formatting::WrapElement
    #[["selector", ".generalError"], ["class_name", "mvErrorMeg"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
    var("found", "false")
    match($found, "false") {
      $("(//*[contains(concat(' ', @class, ' '), ' generalError ')])[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("class", "mvErrorMeg")
          move_here("//*[contains(concat(' ', @class, ' '), ' generalError ')][not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
   #move verify option tab to the bottom of form
   
    
  }
  
  #Rewards summary
  #Group::URLMatcherGroup
  #[["url_matcher", "\\/mymacysrewards\\/accountsummary"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /\/mymacysrewards\/accountsummary/) {
  
    #Page Title
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvTitle\"><span>My Macy's Rewards Summary</span><a class=\"mvBackBtn\" href=\"/myinfo/index.ognc\">Account</a></div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#bd"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'bd'])[1]") {
      inject_before("<div class=\"mvTitle\"><span>My Macy's Rewards Summary</span><a class=\"mvBackBtn\" href=\"/myinfo/index.ognc\">Account</a></div>")
    }
    
    
    #Add body ID
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvRewardSummaryBody"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("mvRewardSummaryBody")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", ".mainBlock > div"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", "img"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mainBlock ')]/div") {
      match($done, "no") {
          var("conditional", "false")
            $(".//img") {
              var("conditional", "true")
            }
          match($conditional, "true") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvRemoveElement")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "img[alt=\"My Macy's Rewards\"], br, .mvRemoveElement, .mainBlock > div:empty, #macysGlobalLayout > div:first-of-type"]]
    $("//img[@alt = \"My Macy's Rewards\"]") {
      remove()
    }
   
    $("//*[contains(concat(' ', @class, ' '), ' mvRemoveElement ')]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' mainBlock ')]/div[not (node())]") {
      remove()
    }
    $("//*[@id = 'macysGlobalLayout']/div[position() = 1]") {
      remove()
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvPadding1010"], ["selector", "#macysGlobalLayout > div"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'macysGlobalLayout']/div") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvPadding1010")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::WrapElement
    #[["selector", ".titleBar, .mainBlock"], ["class_name", "mvShadowBox"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
    var("found", "false")
    match($found, "false") {
      $("(//*[contains(concat(' ', @class, ' '), ' titleBar ')])[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("class", "mvShadowBox")
          move_here("//*[contains(concat(' ', @class, ' '), ' titleBar ')][not (@the_wrapper)]", "bottom")
          move_here("//*[contains(concat(' ', @class, ' '), ' mainBlock ')][not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    match($found, "false") {
      $("(//*[contains(concat(' ', @class, ' '), ' mainBlock ')])[1]") {
        $("br"){
          remove()
        }
        $("div/div[@class='rightBlock']"){  
          inject_after("<div class='mvGetRewards'><div class='mvBigGrayTitle'>two ways to get rewarded</div><div><strong>In-store: </strong>Present your keytag or phone number at the register when making a purchase.</div><div><strong>Online: </strong>Just shop! Your Loyalty number is automatically linked to your profile and purchases.</div></div>")
          }
        $("div/div[@class='leftBlock']"){  
          $("div[last()]"){
            move_to("../../div[@class='rightBlock']","after")
          }
          $("br"){     
            remove()       
            } 
            
        }
        
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("class", "mvShadowBox")
          move_here("//*[contains(concat(' ', @class, ' '), ' titleBar ')][not (@the_wrapper)]", "bottom")
          move_here("//*[contains(concat(' ', @class, ' '), ' mainBlock ')][not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::Table::Remove::PreserveLayout
    #[["selector", "#bubbletable"]]
    $("//*[@id = 'bubbletable']" ) {
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
    
    
  }
  
  #Online Rewards
  #Group::URLMatcherGroup
  #[["url_matcher", "(\\/m\\/rewards\\/)|(\\/mymacysrewards\\/enrollment)|(\\/signin\\/)"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /(\/m\/rewards\/)|(\/mymacysrewards\/enrollment)|(\/signin\/)/) {
  
    #Rewards nav bars
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Inject::InjectHTML
      #[["html", "<div>  <div class=\"mvTitle\">My Macy's Star Rewards</div>  <div class=\"mvSubTitle\"> <span class=\"mvPageMenu\" ></span> </div>  <div class=\"mvRewardNav\">  <div class=\"mvWhiteBar\"><a class=\"mvRewardsAbout\">About My Macy's Rewards</a></div>  <div class=\"mvWhiteBar\"><a class=\"mvRewardsEnroll\">Enroll Now</a></div>  <div class=\"mvWhiteBar\"><a class=\"mvRewardsAccount\">My Macy's Rewards Account</a></div>  <div class=\"mvWhiteBar\"><a class=\"mvRewardsTerm\" >Terms&nbsp;&amp;&nbsp;Conditions</a></div>  <div class=\"mvWhiteBar\"><a class=\"mvRewardsFAQ\"  title=\"FAQ\">FAQ</a></div>  </div>  </div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#rewards_header"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[@id = 'rewards_header'])[1]") {
        inject_before("<div>  <div class=\"mvTitle\">My Macy's Star Rewards</div>  <div class=\"mvSubTitle\"> <span class=\"mvPageMenu\" ></span> </div>  <div class=\"mvRewardNav\">  <div class=\"mvWhiteBar\"><a class=\"mvRewardsAbout\">About My Macy's Rewards</a></div>  <div class=\"mvWhiteBar\"><a class=\"mvRewardsEnroll\">Enroll Now</a></div>  <div class=\"mvWhiteBar\"><a class=\"mvRewardsAccount\">My Macy's Rewards Account</a></div>  <div class=\"mvWhiteBar\"><a class=\"mvRewardsTerm\" >Terms&nbsp;&amp;&nbsp;Conditions</a></div>  <div class=\"mvWhiteBar\"><a class=\"mvRewardsFAQ\"  title=\"FAQ\">FAQ</a></div>  </div>  </div>")
      }
      
      
      #
      #Content::Passthrough::Attribute
      #[["selector", "map[name=\"rewards_header_landing\"] > area, #rewards_topLinks > a"], ["attribute", "href"], ["regex_capture", ""]]
      $("//map[@name = \"rewards_header_landing\"]/area") {
        attribute("href") {
          value() {
            rewrite("link")
          }
        }
      }
      
      
      #
      #Content::Formatting::DuplicateAttribute
      #[["duplicate_source", "map[name=\"rewards_header_landing\"] > area[alt=\"ENROLL NOW\"]"], ["duplicate_target", ".mvRewardsEnroll"], ["attribute", "href"], ["multiple", ""], ["ancestor", ""]]
      $("(//map[@name = \"rewards_header_landing\"]/area[@alt = \"ENROLL NOW\"])[1]") {
        var("duplicate_attribute", fetch("./@href"))
        $("(//*[contains(concat(' ', @class, ' '), ' mvRewardsEnroll ')])[1]") {
          attribute("href", $duplicate_attribute)
        }
      }
      
      
      #
      #Content::Formatting::DuplicateAttribute
      #[["duplicate_source", "map[name=\"rewards_header_landing\"] > area[alt=\"MY MACY'S REWARDS ACCOUNT\"]"], ["duplicate_target", ".mvRewardsAccount"], ["attribute", "href"], ["multiple", ""], ["ancestor", ""]]
      $("(//map[@name = \"rewards_header_landing\"]/area[@alt = \"MY MACY'S REWARDS ACCOUNT\"])[1]") {
        var("duplicate_attribute", fetch("./@href"))
        $("(//*[contains(concat(' ', @class, ' '), ' mvRewardsAccount ')])[1]") {
          attribute("href", $duplicate_attribute)
        }
      }
      
      
      #
      #Content::Formatting::DuplicateAttribute
      #[["duplicate_source", "#rewards_topLinks > a.tnc"], ["duplicate_target", ".mvRewardsTerm"], ["attribute", "href"], ["multiple", ""], ["ancestor", ""]]
      $("(//*[@id = 'rewards_topLinks']/a[contains(concat(' ', @class, ' '), ' tnc ')])[1]") {
        var("duplicate_attribute", fetch("./@href"))
        $("(//*[contains(concat(' ', @class, ' '), ' mvRewardsTerm ')])[1]") {
          attribute("href", $duplicate_attribute)
        }
      }
      
      
      #
      #Content::Formatting::DuplicateAttribute
      #[["duplicate_source", "#rewards_topLinks > a.faq"], ["duplicate_target", ".mvRewardsFAQ"], ["attribute", "href"], ["multiple", ""], ["ancestor", ""]]
      $("(//*[@id = 'rewards_topLinks']/a[contains(concat(' ', @class, ' '), ' faq ')])[1]") {
        var("duplicate_attribute", fetch("./@href"))
        $("(//*[contains(concat(' ', @class, ' '), ' mvRewardsFAQ ')])[1]") {
          attribute("href", $duplicate_attribute)
        }
      }
      
      
      #
      #Content::Formatting::DuplicateAttribute
      #[["duplicate_source", "map[name=\"rewards_header_landing\"] > area[alt=\"ABOUT MY MACY'S REWARDS\"]"], ["duplicate_target", ".mvRewardsAbout"], ["attribute", "href"], ["multiple", ""], ["ancestor", ""]]
      $("(//map[@name = \"rewards_header_landing\"]/area[@alt = \"ABOUT MY MACY'S REWARDS\"])[1]") {
        var("duplicate_attribute", fetch("./@href"))
        $("(//*[contains(concat(' ', @class, ' '), ' mvRewardsAbout ')])[1]") {
          attribute("href", $duplicate_attribute)
        }
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#rewardsLeftImage, #rewardsLandingVideoContainer, .enrollImage, #rewards_footer, #rewards_header, .instructionImage"]]
    $("//*[@id = 'rewardsLeftImage']") {
      remove()
    }
    $("//*[@id = 'rewardsLandingVideoContainer']") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' enrollImage ')]") {
      remove()
    }
    $("//*[@id = 'rewards_footer']") {
      remove()
    }
    $("//*[@id = 'rewards_header']") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' instructionImage ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::Dynamic::Accordian3
    #[["link_selector", ".mvPageMenu"], ["content_selector", ".mvRewardNav"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
    var("counter", "")
    var("content_id_string", "[")
    $("//*[contains(concat(' ', @class, ' '), ' mvRewardNav ')]") {
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
            append("33336")
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
    $("//*[contains(concat(' ', @class, ' '), ' mvPageMenu ')]") {
      var("counter") {
        append("a")
      }
      var("id", fetch("./@id"))
      match($id, /^$/) {
        attribute("id") {
          value() {
            set("acc_link")
            append($counter)
            append("33336")
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
    
    
    #rewards Landing Page
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", "#rewardsLandingPageContainer"], ["negate", ""]]
    $("(//*[@id = 'rewardsLandingPageContainer'])[1]") {
    
      #
      #Content::Inject::InjectHTML
      #[["html", "<h1>ABOUT MY MACY'S REWARDS</h1>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mvPageMenu"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvPageMenu ')])[1]") {
        inject_before("<h1>ABOUT MY MACY'S REWARDS</h1>")
      }
      
      
      #
      #Content::Labeling::NumberElements
      #[["selector", ".rewardsLandingSection"], ["prefix", "rewardsLandingSection_"]]
      # Requires tritium >= 0.6.191
      $("//*[contains(concat(' ', @class, ' '), ' rewardsLandingSection ')][not (@id)]") {
        $mw_temp = "rewardsLandingSection_"
        $mw_temp {
          append(index())
        }
        attribute("id", $mw_temp)
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".mvRewardNav   >  div.mvWhiteBar:nth-of-type(1), .rewardsLandingBacktoTop, #rewardsLandingSection_1 > div:first-of-type, .rewardsLandingSectionText > br"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvRewardNav ')]/div[contains(concat(' ', @class, ' '), ' mvWhiteBar ') and position() = 1]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' rewardsLandingBacktoTop ')]") {
        remove()
      }
      $("//*[@id = 'rewardsLandingSection_1']/div[position() = 1]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' rewardsLandingSectionText ')]/br") {
        remove()
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", "#rewardsLandingWelcomeContainer > h1"], ["html", "<div class=\"mvBigGrayTitle\">WELCOME</div>Introducing My Macy's Rewards, a great new program that makes every day add up.<div class=\"mvWelcomeIntro\"></div>"], ["prepend", ""], ["append", ""]]
      $("//*[@id = 'rewardsLandingWelcomeContainer']/h1") {
        inner("<div class=\"mvBigGrayTitle\">WELCOME</div>Introducing My Macy's Rewards, a great new program that makes every day add up.<div class=\"mvWelcomeIntro\"></div>")
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvShadowBottom"], ["selector", "#rewardsLandingWelcomeContainer"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'rewardsLandingWelcomeContainer']") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvShadowBottom")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddFileAttribute
      #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/enrollNowBtn.png"], ["selector", ".enroll img"]]
      # NOTE: just sets the attribute - doesn't do anything special for files
      $("//*[contains(concat(' ', @class, ' '), ' enroll ')]//img") {
        #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/enrollNowBtn.png")
        attribute('src', asset('buttons/enrollNow.png', 'image'))
      }
      
      
    }
    
    
    #get started Rewards account
    #Group::URLMatcherGroup
    #[["url_matcher", "\\/update-your-profile"], ["negate", ""]]
    # This is a 'fake' url because it has http when it might mean https
    var("fake_url") {
      set(var("source_host"))
      append(var("path"))
      prepend("http://")
    }
    match($fake_url, /\/update-your-profile/) {
    
      #add body id
      #Content::Formatting::AddAttribute
      #[["attribute", "id"], ["value", "mvGetStartedReward"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//body") {
        match($done, "no") {
            var("done", "yes")
          attribute("id") {
            value() {
                set("mvGetStartedReward")
            }
          }
        }
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<h1>My Macy's Rewards Account</h1>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mvPageMenu"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvPageMenu ')])[1]") {
        inject_before("<h1>My Macy's Rewards Account</h1>")
      }
      
      
      #
      #Content::Formatting::DumpImgAltText
      #[["image_selector", ".instructionSectionCopy > div > img"], ["target_selector", ".instructionSectionCopy > div"], ["map_multiple", "true"]]
      var("counter", "a")
      $("//*[contains(concat(' ', @class, ' '), ' instructionSectionCopy ')]/div/img") {
        var("counter") {
          append("a")
        }
        var($counter, fetch("./@alt"))
      }
      var("counter", "a")
      $("//*[contains(concat(' ', @class, ' '), ' instructionSectionCopy ')]/div") {
        var("counter") {
          append("a")
        }
        # TODO: change this to the latter so that it replaces the contents instead
        # of adding to it - i was getting an inexplicable error when I tried it before
        inject(var($counter))
        #inner {
        #  set(var($counter))
        #}
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvBigGrayTitle"], ["selector", "img[alt=\"Thanks for joining My Macy's Rewards\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//img[@alt = \"Thanks for joining My Macy's Rewards\"]") {
        match($done, "no") {
          $("..") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvBigGrayTitle")
            }
          }
          }
        }
      }
      
      
      #
      #Content::Formatting::DumpImgAltText
      #[["image_selector", "img[alt=\"Thanks for joining My Macy's Rewards\"]"], ["target_selector", ".mvBigGrayTitle"], ["map_multiple", "true"]]
      var("counter", "a")
      $("//img[@alt = \"Thanks for joining My Macy's Rewards\"]") {
        var("counter") {
          append("a")
        }
        var($counter, fetch("./@alt"))
      }
      var("counter", "a")
      $("//*[contains(concat(' ', @class, ' '), ' mvBigGrayTitle ')]") {
        var("counter") {
          append("a")
        }
        # TODO: change this to the latter so that it replaces the contents instead
        # of adding to it - i was getting an inexplicable error when I tried it before
        inject(var($counter))
        #inner {
        #  set(var($counter))
        #}
      }
      
      
      #
      #Content::CSS::RemoveStyles
      #[["selector", ".instructionMain > div"]]
      $("//*[contains(concat(' ', @class, ' '), ' instructionMain ')]/div") {
        attribute("style") {
          remove()
        }
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".instructionImage, .instructionMain >br, .instructionSectionNum, .instructionSectionCopy > div > img, .mvBigGrayTitle img, div[style=\"clear:both;\"], .mvRewardNav   >  div.mvWhiteBar:nth-of-type(3)"]]
      $("//*[contains(concat(' ', @class, ' '), ' instructionImage ')]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' instructionMain ')]/br") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' instructionSectionNum ')]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' instructionSectionCopy ')]/div/img") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' mvBigGrayTitle ')]//img") {
        remove()
      }
      $("//div[@style = \"clear:both;\"]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' mvRewardNav ')]/div[contains(concat(' ', @class, ' '), ' mvWhiteBar ') and position() = 3]") {
        remove()
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvGetStartedIntro"], ["selector", "img[alt=\"It's easy to add your loyalty number to your profile. Follow these 3 simple steps to get started.\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//img[@alt = \"It's easy to add your loyalty number to your profile. Follow these 3 simple steps to get started.\"]") {
        match($done, "no") {
          $("..") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvGetStartedIntro")
            }
          }
          }
        }
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".mvGetStartedIntro"], ["html", "<div class=\"mvLightGrayTitle\">It's easy to add your loyalty number to your profile.</div><div>Follow these 3 simple steps to get started.</div>"], ["prepend", ""], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' mvGetStartedIntro ')]") {
        inner("<div class=\"mvLightGrayTitle\">It's easy to add your loyalty number to your profile.</div><div>Follow these 3 simple steps to get started.</div>")
      }
      
      
      #
      #Content::Formatting::SetInnerText
      #[["selector", ".instructionMain > div:nth-of-type(4) > div > div"], ["text", "1. "], ["match_string", ""], ["replace_string", ""], ["prepend", "true"], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
      # NOTE: not sure if /html() or /text() is what I want to be using here
      $("//*[contains(concat(' ', @class, ' '), ' instructionMain ')]/div[position() = 4]/div/div") {
        inner() {
          prepend("1. ")
        }
      }
      
      
      #
      #Content::Formatting::SetInnerText
      #[["selector", ".instructionMain > div:nth-of-type(5) > div > div"], ["text", "2. "], ["match_string", ""], ["replace_string", ""], ["prepend", "true"], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
      # NOTE: not sure if /html() or /text() is what I want to be using here
      $("//*[contains(concat(' ', @class, ' '), ' instructionMain ')]/div[position() = 5]/div/div") {
        inner() {
          prepend("2. ")
        }
      }
      
      
      #
      #Content::Formatting::SetInnerText
      #[["selector", ".instructionMain > div:nth-of-type(6) > div > div"], ["text", "3. "], ["match_string", ""], ["replace_string", ""], ["prepend", "true"], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
      # NOTE: not sure if /html() or /text() is what I want to be using here
      $("//*[contains(concat(' ', @class, ' '), ' instructionMain ')]/div[position() = 6]/div/div") {
        inner() {
          prepend("3. ")
        }
      }
      
      
    }
    
    #FAQ
    #Group::URLMatcherGroup
    #[["url_matcher", "\\/faq"], ["negate", ""]]
    # This is a 'fake' url because it has http when it might mean https
    var("fake_url") {
      set(var("source_host"))
      append(var("path"))
      prepend("http://")
    }
    match($fake_url, /\/faq/) {
    
      #
      #Content::Formatting::MoveBefore
      #[["move_me", "#rewardsFAQPageContainer > h1"], ["before_me", ".mvPageMenu"], ["map_moves", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvPageMenu ')])[1]") {
        move_here("(//*[@id = 'rewardsFAQPageContainer']/h1)[1]", "before")
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".mvRewardNav   >  div.mvWhiteBar:nth-of-type(5), .rewardsFAQBacktoTop, .rewardsFAQAnswersSection > a"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvRewardNav ')]/div[contains(concat(' ', @class, ' '), ' mvWhiteBar ') and position() = 5]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' rewardsFAQBacktoTop ')]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' rewardsFAQAnswersSection ')]/a") {
        remove()
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", "#rewardsFAQQuestions, .mvRewardNav   >  div.mvWhiteBar:nth-of-type(5), .rewardsFAQBacktoTop, .rewardsFAQAnswersSection > a"]]
      $("//*[@id = 'rewardsFAQQuestions']") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' mvRewardNav ')]/div[contains(concat(' ', @class, ' '), ' mvWhiteBar ') and position() = 5]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' rewardsFAQBacktoTop ')]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' rewardsFAQAnswersSection ')]/a") {
        remove()
      }
      
      
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", ".rewardsFAQAnswers_Q"], ["tag_name", "div"], ["class_name", "mvRewardsFAQAnswers_Q"], ["id", ""], ["multiple", "true"]]
      $("//*[contains(concat(' ', @class, ' '), ' rewardsFAQAnswers_Q ')]") {
        wrap("div") {
          attribute("class", "mvRewardsFAQAnswers_Q")
        }
      }
      
      
      #
      #Content::Formatting::Dynamic::Accordian4
      #[["link_selector", ".mvRewardsFAQAnswers_Q"], ["content_selector", ".rewardsFAQAnswers_A"], ["ancestor_selector", ".rewardsFAQAnswersSection"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
      var("anc_counter", "")
      $("//*[contains(concat(' ', @class, ' '), ' rewardsFAQAnswersSection ')]") {
        var("anc_counter") {
          append("b")
        }
        var("counter", "")
        var("content_id_string", "[")
        $(".//*[contains(concat(' ', @class, ' '), ' rewardsFAQAnswers_A ')]") {
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
                append("19338")
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
        $(".//*[contains(concat(' ', @class, ' '), ' mvRewardsFAQAnswers_Q ')]") {
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
                append("19338")
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
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span>"], ["add_after", ""], ["multiple", "true"], ["add_before", ".rewardsFAQAnswers_Q"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' rewardsFAQAnswers_Q ')]") {
        inject_before("<span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span>")
      }
      
      
    }
    
    #star rewards signin
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", "#signin"], ["negate", ""]]
    $("(//*[@id = 'signin'])[1]") {
    
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "id"], ["value", "mvRewardSigninBody"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//body") {
        match($done, "no") {
            var("done", "yes")
          attribute("id") {
            value() {
                set("mvRewardSigninBody")
            }
          }
        }
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<h1>Enroll now</h1>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mvPageMenu"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvPageMenu ')])[1]") {
        inject_before("<h1>Enroll now</h1>")
      }
      
      
      #
      #Content::Formatting::AddFileAttribute
      #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/signinEnrollbtns.png"], ["selector", "input[value=\"SIGNINSIGNIN_BUTTON\"]"]]
      # NOTE: just sets the attribute - doesn't do anything special for files
      $("//input[@value = \"SIGNINSIGNIN_BUTTON\"]") {
        #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/signinEnrollbtns.png")
        attribute('src', asset('buttons/signinEnroll.png', 'image'))
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", "#signin > div:first-of-type"], ["html", "<div class=\"mvBigGrayTitle\">ENROLL TODAY!</div><div>Sign up for My Macy's Rewards to start getting rewards today!</div>"], ["prepend", ""], ["append", ""]]
      $("//*[@id = 'signin']/div[position() = 1]") {
        inner("<div class=\"mvBigGrayTitle\">ENROLL TODAY!</div><div>Sign up for My Macy's Rewards to start getting rewards today!</div>")
      }
      
      
      #
      #Content::Formatting::AddFileAttribute
      #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/createProfileEnroll.png"], ["selector", "img.buttonSubmitBorders"]]
      # NOTE: just sets the attribute - doesn't do anything special for files
      $("//img[contains(concat(' ', @class, ' '), ' buttonSubmitBorders ')]") {
        #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/createProfileEnroll.png")
        attribute('src', asset('buttons/createProfileEnroll.png', 'image'))
      }
      
      
      #
      #Content::CSS::RemoveStyles
      #[["selector", "div, span"]]
      $("//div") {
        attribute("style") {
          remove()
        }
      }
      $("//span") {
        attribute("style") {
          remove()
        }
      }
      
      
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", "form >img"], ["tag_name", "div"], ["class_name", "mvRedTitle"], ["id", ""], ["multiple", "true"]]
      $("//form/img") {
        wrap("div") {
          attribute("class", "mvRedTitle")
        }
      }
      
      
      #
      #Content::Formatting::DumpImgAltText
      #[["image_selector", ".mvRedTitle img"], ["target_selector", ".mvRedTitle"], ["map_multiple", "true"]]
      var("counter", "a")
      $("//*[contains(concat(' ', @class, ' '), ' mvRedTitle ')]//img") {
        var("counter") {
          append("a")
        }
        var($counter, fetch("./@alt"))
      }
      var("counter", "a")
      $("//*[contains(concat(' ', @class, ' '), ' mvRedTitle ')]") {
        var("counter") {
          append("a")
        }
        # TODO: change this to the latter so that it replaces the contents instead
        # of adding to it - i was getting an inexplicable error when I tried it before
        inject(var($counter))
        #inner {
        #  set(var($counter))
        #}
      }
      
      
      #
      #Content::Formatting::RemoveEmptyElements
      #[["selector", "#signin > div"]]
      $("//*[@id = 'signin']/div[not(descendant::*)]") {
        remove()
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".mvRewardNav   >  div.mvWhiteBar:nth-of-type(2), br, .mvRedTitle img"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvRewardNav ')]/div[contains(concat(' ', @class, ' '), ' mvWhiteBar ') and position() = 2]") {
        remove()
      }
      $("//br") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' mvRedTitle ')]//img") {
        remove()
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvShadowBottom"], ["selector", "#signin > div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'signin']/div") {
        match($done, "no") {
          attribute("class") {
            value() {
                set("mvShadowBottom")
            }
          }
        }
      }
      
      
    }
    
    
    #Enroll form
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", "form#myMacysRewardsEnrollForm"], ["negate", ""]]
    $("(//form[@id = 'myMacysRewardsEnrollForm'])[1]") {
    
      #
      #Content::Formatting::AddFileAttribute
      #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/enrollNowBtn.png"], ["selector", "input[title=\"ENROLL NOW\"]"]]
      # NOTE: just sets the attribute - doesn't do anything special for files
      $("//input[@title = \"ENROLL NOW\"]") {
        #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/enrollNowBtn.png")
        attribute('src', asset('buttons/enrollNow.png', 'image'))
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".mvRewardNav   >  div.mvWhiteBar:nth-of-type(2)"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvRewardNav ')]/div[contains(concat(' ', @class, ' '), ' mvWhiteBar ') and position() = 2]") {
        remove()
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<h1>Enroll now</h1>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mvPageMenu"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvPageMenu ')])[1]") {
        inject_before("<h1>Enroll now</h1>")
      }
      
      
      #
      #Content::CSS::RemoveStyles
      #[["selector", "div, span,  label"]]
      $("//div") {
        attribute("style") {
          remove()
        }
      }
      $("//span") {
        attribute("style") {
          remove()
        }
      }
      $("//label") {
        attribute("style") {
          remove()
        }
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".enrollMain > div:first-of-type"], ["html", "<div class=\"mvBigGrayTitle\">ENROLL IN MACY'S REWARDS</div><div class=\"mvEnrollFormInfo\">It's easy to enroll! Just review your online account information and provide your city, state and phone number for My Macy's Rewards ID purposes.</div>"], ["prepend", ""], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' enrollMain ')]/div[position() = 1]") {
        inner("<div class=\"mvBigGrayTitle\">ENROLL IN MACY'S REWARDS</div><div class=\"mvEnrollFormInfo\">It's easy to enroll! Just review your online account information and provide your city, state and phone number for My Macy's Rewards ID purposes.</div>")
      }
      
      
      #
      #Content::Formatting::AddFileAttribute
      #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/acceptContinueSmall.png"], ["selector", "input#accept"]]
      # NOTE: just sets the attribute - doesn't do anything special for files
      $("//input[@id = 'accept']") {
        #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/acceptContinueSmall.png")
        attribute('src', asset('buttons/acceptContinueSmall.png', 'image'))
      }
      
      
      #
      #Content::Formatting::AddFileAttribute
      #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/cancelSmall.png"], ["selector", "input#cancel"]]
      # NOTE: just sets the attribute - doesn't do anything special for files
      $("//input[@id = 'cancel']") {
        #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/cancelSmall.png")
        attribute('src', asset('buttons/cancelSmall.png', 'image'))
      }
      
      
    }
    
    
    #Enroll congratulations
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", "#confirm"], ["negate", ""]]
    $("(//*[@id = 'confirm'])[1]") {
    
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".confirmImage, .mvRewardNav   >  div.mvWhiteBar:nth-of-type(2), .centerBlock, .apply"]]
      $("//*[contains(concat(' ', @class, ' '), ' confirmImage ')]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' mvRewardNav ')]/div[contains(concat(' ', @class, ' '), ' mvWhiteBar ') and position() = 2]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' centerBlock ')]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' apply ')]") {
        remove()
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<h1>Enroll now</h1>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mvPageMenu"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvPageMenu ')])[1]") {
        inject_before("<h1>Enroll now</h1>")
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvShadowBottom"], ["selector", ".rightBlock, .leftBlock, #confirmBanner"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' rightBlock ')]") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvShadowBottom")
            }
          }
        }
      }
      $("//*[contains(concat(' ', @class, ' '), ' leftBlock ')]") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvShadowBottom")
            }
          }
        }
      }
      $("//*[@id = 'confirmBanner']") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvShadowBottom")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".confirmMain > div:first-of-type"], ["html", "<div class=\"mvBigGrayTitle\">CONGRATULATIONS!</div><div class=\"mvEnrollFormInfo\">Thanks for joining My Macy's Rewards - we'll send you a confirmation email shortly! Your keytag will be arriving in the mail soon. Want to start getting rewards now? Just print your loyalty number and go shopping today!</div>"], ["prepend", ""], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' confirmMain ')]/div[position() = 1]") {
        inner("<div class=\"mvBigGrayTitle\">CONGRATULATIONS!</div><div class=\"mvEnrollFormInfo\">Thanks for joining My Macy's Rewards - we'll send you a confirmation email shortly! Your keytag will be arriving in the mail soon. Want to start getting rewards now? Just print your loyalty number and go shopping today!</div>")
      }
      
      
    }
    
    
  }
  
  #Terms & conditions
  #Group::URLMatcherGroup
  #[["url_matcher", "(\\/terms-and-conditions)|(termsandconditions)"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /(\/terms-and-conditions)|(termsandconditions)/) {
  
    #
    #Content::Formatting::MoveBefore
    #[["move_me", "#rewardsTACPageContainer > h1"], ["before_me", ".mvPageMenu"], ["map_moves", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' mvPageMenu ')])[1]") {
      move_here("(//*[@id = 'rewardsTACPageContainer']/h1)[1]", "before")
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvCloseBtn"], ["selector", "#rewardsTACContentContainer + div"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", "img[alt=\"close this window.\"]"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'rewardsTACContentContainer']/following-sibling::*[1]/self::div") {
      match($done, "no") {
          var("conditional", "false")
            $(".//img[@alt = \"close this window.\"]") {
              var("conditional", "true")
            }
          match($conditional, "true") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvCloseBtn")
          }
        }
          }
      }
    }
    
    
    #
    #Content::CSS::RemoveStyles
    #[["selector", ".mvCloseBtn"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvCloseBtn ')]") {
      attribute("style") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", "#rewardsTACContentContainer .chartHeader > td:nth-of-type(3)"], ["html", "<div>%<br>(outside&nbsp;Macy's*)</div>"], ["prepend", ""], ["append", ""]]
    $("//*[@id = 'rewardsTACContentContainer']//*[contains(concat(' ', @class, ' '), ' chartHeader ')]/td[position() = 3]") {
      inner("<div>%<br>(outside&nbsp;Macy's*)</div>")
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", "#rewardsTACContentContainer .chartHeader > td:nth-of-type(2)"], ["html", "<div>%<br>(At&nbsp;Macy's*)</div>"], ["prepend", ""], ["append", ""]]
    $("//*[@id = 'rewardsTACContentContainer']//*[contains(concat(' ', @class, ' '), ' chartHeader ')]/td[position() = 2]") {
      inner("<div>%<br>(At&nbsp;Macy's*)</div>")
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", "#rewardsTACContentContainer .chartHeader > td:nth-of-type(1)"], ["html", "<div>form of<br>payment</div>"], ["prepend", ""], ["append", ""]]
    $("//*[@id = 'rewardsTACContentContainer']//*[contains(concat(' ', @class, ' '), ' chartHeader ')]/td[position() = 1]") {
      inner("<div>form of<br>payment</div>")
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".mvRewardNav   >  div.mvWhiteBar:nth-of-type(4)"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvRewardNav ')]/div[contains(concat(' ', @class, ' '), ' mvWhiteBar ') and position() = 4]") {
      remove()
    }
    
    
  }
  
  #Online Rewards forgot password
  #https://www.macys.com/signin/password.ognc?fromPage=mymacysrewardsenroll&d=mhs
  #Group::URLMatcherGroup
  #[["url_matcher", "\\/signin\\/password\\.ognc"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /\/signin\/password\.ognc/) {
  
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
    #Content::CSS::RemoveStyleProperty
    #[["property_name", "margin-left"], ["selector", ""]]
    $("//div[@style]") {
      attribute("style") {
        value() {
          replace(/margin-left[^;]+(;|$)/, "")
        }
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "br"]]
    $("//br") {
      remove()
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvRewardForgetPasswordBody"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("mvRewardForgetPasswordBody")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", "#macysGlobalBanner"], ["html", "<div class=\"mvTitle\">Forgotten Password</div>"], ["prepend", ""], ["append", ""]]
    $("//*[@id = 'macysGlobalBanner']") {
      inner("<div class=\"mvTitle\">Forgotten Password</div>")
    }
    
    
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/submitBtn.png"], ["selector", "input[alt=\"SUBMIT\"]"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//input[@alt = \"SUBMIT\"]") {
      #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/submitBtn.png")
      attribute('src', asset('buttons/submit.png', 'image'))
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvErrorMeg"], ["selector", ".errorText"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' errorText ')]") {
      match($done, "no") {
        $("..") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvErrorMeg")
          }
        }
        }
      }
    }
    
    
  }
  match($fake_url, /\/mymacysrewards\/accountmanagement/) {
    $("//div[@id='macysGlobalLayout']"){
      $("div[@id='editMyMacysUpperCopy']"){
        inject_before("<div class='mvTitle' ><span style='font-size:16px; padding-top:4px;'>Edit My Macy's Rewards Profile</span><a class=\"mvBackBtn\" href='/myinfo/index.ognc'>Account</a></div>")
       
        $("br"){
          remove()
        }

        $("div/img/.."){
          remove()
        }
        $("div"){
          add_class("mvPadding0510")
        }
      }
      $("form[@id='myMacysRewardsEditAccountForm']"){
        $("div[1]"){
          attribute("style") {
            remove()
          }
        }
        
        $("div/label[@for='loyaltyAccountInfo.accountHolderContactInfo.bestPhone.areaCode']/.."){
          add_class("mvPhoneInputs")
        }
       
        $("div[2]"){
          add_class("mvLoyaltyNumber")
          $("div") {
            name("span")
          }
        }
         $("//*[@class = 'buttonNonSubmitBorders']") {
                            attribute('src', asset('buttons/cancel.png', 'image'))
                            $("../.."){
                            attribute('style','float:left;')
                            $(".."){
                              $("label"){
                              remove()
                              }
                              $("div[2]"){
                                remove()
                              }
                            }
                          
                          }
                          }
                           $("//*[@class = 'buttonSubmitBorders']") {
                              attribute('src', asset('buttons/SaveChanges.png', 'image'))
                               $(".."){
                                attribute('style','float:left;')
                              }
                            }
      }
    }
  }  
}
