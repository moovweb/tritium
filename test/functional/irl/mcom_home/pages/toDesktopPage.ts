# ----- ParsedHTMLBlocks ----
html() {
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "id"], ["value", "signInProfileInfo"], ["selector", "#globalMastheadMiniCart > p:nth-of-type(2)"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[@id = 'globalMastheadMiniCart']/p[position() = 2]") {
    match($done, "no") {
      var("done", "yes")
      attribute("id") {
        value() {
          set("signInProfileInfo")
        }
      }
    }
  }
$("//body"){
  add_class("mw_NoPassthroughpages")
}

  #
  #Content::Formatting::RemoveElements
  #[["selector", "#bd"]]
  $("//*[@id = 'bd']|//div[@class='lithium-wrapper']") {
    remove()
  }

  #go desktop site
  #if it is js, just open the page.
  #Group::URLMatcherGroup
  #[["url_matcher", ".*\\.jsp"], ["negate", "true"]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }

  match($fake_url, not(/.*\.jsp/)) {

    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvNomobile\" style=\"text-align:center; font-size:15px; padding-top:80px; height:140px; line-height:200%;\"><div>This feature is not supported.</div></dv>"], ["add_after", "#doc3"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'doc3'])[1]|//div[@class = 'lia-page']") {
      inject_after("<div class=\"mvNomobile\" style=\"text-align:center; font-size:15px; padding-top:80px; height:140px; line-height:200%;\"><div>This feature is not supported.</div></dv>")
    }
    $("//div[@class='mvNomobile']") {
      inject_bottom('<a class="desktop_site" href="">Go to Full HTML Version</a>')
      $("./a[@class='desktop_site']") {
        /*
        var("rurl", $source_host)
        var("rurl") {
          # all secure pages will become insecure, but macy's will secure them with a redirect
          prepend("http://")
          append($path)
          match($path) {
            with(/\?/) {
              append("&stop_mobi=true")
            }
            else() {
              append("?stop_mobi=true")
            }
          }
        }
        */
        var("rurl", $path)
        var("rurl") {
          match($path) {
            with(/\?/) {
              append("&perfectProxy=true")
            }
            else() {
              append("?perfectProxy=true")
            }
          }
        }
        attribute("href", $rurl)
      }
    }


    #
    #Content::Inject::InjectDesktopSiteLink
    #[["add_after", ".mvNomobile > div"]]
    # --- not found ---

    #
    #Content::Formatting::SetInnerText
    #[["selector", ".mvNomobile .desktop_site"], ["text", "Go to Full HTML Version"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
    # NOTE: not sure if /html() or /text() is what I want to be using here
    $("//*[contains(concat(' ', @class, ' '), ' mvNomobile ')]//*[contains(concat(' ', @class, ' '), ' desktop_site ')]") {
      inner() {
        set("Go to Full HTML Version")
      }
    }


    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "onclick"], ["selector", ".desktop_site"]]
    $("//*[contains(concat(' ', @class, ' '), ' desktop_site ')]") {
      attribute("onclick") {
        remove()
      }
    }


  }

  #rebate
  match($fake_url, /(\/promotion\/rebate\.ognc)/) {
    $("//img[@alt='Rebate']|//span[@class='black']//img"){
      attribute("width", "100%")
    }
    $("//table"){
      name("div")
      $(".//tr"){
        name("div")
        $(".//td"){
          name("span")
        }
      }

    }
    $("//div[@class='mvNomobile']|//img[@class='buttonSubmitBorders']"){
      remove()
    }
  }
  #beauty blog 
  match($fake_url, /(Beauty-Blog)/) {
    $("//center"){
      name("div")
    }
    $("//span[@class='mvMenuDropdown']"){
      attribute("style","border-right:none;")
    }
  }
  # redirect to find in store page iff you search for that exact term and it didn't match searchers
  match($path, /find\%20in\%20store/) {
    $("html/head") {
      $content = $host
      var("content") {
        prepend("0; url='http://")
        append("/store/index.ognc'")
      }
      insert_bottom("meta", http-equiv: "refresh", content: $content)
    }
    $("html/body/div[@id='doc3']") {
      insert_bottom("div", id: "bd") {
        attribute("style", "padding: 10px; font-size: 16px;")
        inject("This page has moved. Redirecting you to 'Find A Store'...")
      }
    }
  }
  #https://mlocal.macys.com/sns/content/storecard.jsp?aurl=https://www.preprod6macys.fds.com  
  match($fake_url, /(storecard\.jsp)/){
    $("//body"){
      attribute("id", "mvStoreCradBody")
      $(".//div[@class                = 'popupContentStore']"){
        $("div/div[@id                = 'popupBannerStore']/span[@class='formText']") {
          $("br"){
            remove()
          }
          $("img"){
            inject_before("<div class = 'mvRedFont'>ADD A STORE CARD TO YOUR PROFILE</div>")
            remove()
          } 
        } 
      } 
    }
  }
#https://mlocal.macys.com/sns/content/benefits.jsp?aurl=https://www.macys.com
match($fake_url,/(content\/benefits\.jsp)/) {
  $("//body"){
    attribute("id", "mvBenefitsBody")
    
  }
}
$path{
  replace(/mwDesktopPage=(.+?)$/i){
  }
  log($1)
}
    $('//body//a[contains(@class, "desktop_site")]'){
      attribute("href", $1)
      dump()
    }
  }

