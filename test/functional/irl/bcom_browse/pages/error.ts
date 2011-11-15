# 404 page

$("/html/body"){
  add_class("mw_error")
  $(".//img[contains(@src, 'spacer.gif')]"){
    log(dump())
    remove()
  }
  $("//table"){
    $("./@style"){
      remove()
    }
    $(".//td"){
      $("./@width"){
        remove()
      }
      $("./@align"){
        remove()
      }
    }
  }
}

# 
match($status, /404/) {
  $("/html/body/div[@id='bl_main_container']/div[@class='bl_nav_top_container']") {
    $("./div[@class='mvHeaderWrapper']/div[@class='mvBDHeader']") {
      $("./div[@id='myBagLink']/a") {
        inner() {
          set('<span>Bag</span>')
        }
      }
      $("./div[@class='bl_nav_top_sub_search']/form") {
        inject_before('<div class="mvBDSearchButtonBox"><div class="mvBDSearchToggle moovweb_open" id="mvBDSearchButton" onclick="moovweb_toggle_accordian3(\'mvBDSearchButton\', [\'mvBDSearchFormToggle\'], \'mw_accordian_hide\')"><div class="mvSearchButtonWrap"><div id="mvSpyGlass"></div></div></div></div>')
        attribute('name', '')
        attribute('id', 'keywordSearch')
        attribute('target', '')
        wrap('div') {
          attribute('id', 'mvBDSearchFormToggle')
        }
      }
    }
    $("./div[@class='mvBloomMenuHeader']") {
      attribute('onclick', "moovweb_toggle_accordian3('mvBDSiteMenuHeader', ['acc_conab632459'], 'mw_accordian_hide')")
    }
    $("./div[@class='bl_nav_top_contain_outer']") {
      add_class('mw_accordian_hide')
      attribute('id', 'acc_conab632459')
      $("./div[@id='mvMoreLinkWrap']/div[@id='mvMoreAccordion']") {
        move_here("//div[@class='bl_nav_bot_section_navigation_options']")
        move_here("//div[@class='bl_nav_bot_section_navigation_options_first']")
      }
      $("./div[@class='bl_nav_top_sub']") {
        remove()
      }
    }
  }
  $("(//div[@class = 'bl_nav_bot_section_navigation_options_last'])[1]") {
    inject_after(" <div class=\"mvBDSocialFB\"><a href=\"http://www.facebook.com/Bloomingdales\" target=\"_blank\"><div id=\"mvBDFBIcon\"></div><span>Like Us</span></a></div><div class=\"mvBDSocial\"><a href=\"http://mobile.twitter.com/Bloomingdales\" target=\"_blank\"><div id=\"mvBDTWIcon\"></div><span>Follow Us</span></a></div>")
    $(".//img") {
      inject_after("<div>EMAIL SIGN-UP</div>")
      remove()
    }
  }
  $("//div[@id='mvBDSearchFormToggle']"){
    add_class("mw_accordian_hide")
  }
  $("//div[@id='mvBDSearchButton'][contains(@class, 'moovweb_open')]"){
    log(dump())
    $("./@class"){
      text(){
        log(dump())
        replace(/moovweb_open/, "")
      }
    }
  }
}

# # 404 page
# match($status, /505/) {
#     log("\n\n\n\n\n")
#   log($status)
#       log("\n\n\n\n\n")
#   $("/html/body/div[@id='bl_main_container']/div[@class='bl_nav_top_container']") {
#     $("./div[@class='mvHeaderWrapper']/div[@class='mvBDHeader']") {
#       $("./div[@id='myBagLink']/a") {
#         inner() {
#           set('<span>Bag</span>')
#         }
#       }
#       $("./div[@class='bl_nav_top_sub_search']/form") {
#         inject_before('<div class="mvBDSearchButtonBox"><div class="mvBDSearchToggle moovweb_open" id="mvBDSearchButton" onclick="moovweb_toggle_accordian3(\'mvBDSearchButton\', [\'mvBDSearchFormToggle\'], \'mw_accordian_hide\')"><div class="mvSearchButtonWrap"><div id="mvSpyGlass"></div></div></div></div>')
#         attribute('name', '')
#         attribute('id', 'keywordSearch')
#         attribute('target', '')
#         wrap('div') {
#           attribute('id', 'mvBDSearchFormToggle')
#         }
#       }
#     }
#     $("./div[@class='bl_main']") {
#       attribute('style', 'padding:40px 10px 10px;')
#     }
#     $("./div[@class='mvBloomMenuHeader']") {
#       attribute('onclick', "moovweb_toggle_accordian3('mvBDSiteMenuHeader', ['acc_conab632459'], 'mw_accordian_hide')")
#     }
#     $("./div[@class='bl_nav_top_contain_outer']") {
#       add_class('mw_accordian_hide')
#       attribute('id', 'acc_conab632459')
#       $("./div[@id='mvMoreLinkWrap']/div[@id='mvMoreAccordion']") {
#         move_here("//div[@class='bl_nav_bot_section_navigation_options']")
#         move_here("//div[@class='bl_nav_bot_section_navigation_options_first']")
#       }
#       $("./div[@class='bl_nav_top_sub']") {
#         remove()
#       }
#     }
#   }
# }