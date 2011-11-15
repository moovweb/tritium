# ----- ParsedHTMLBlocks ----
html() {
  # Add page specific class
   $("//html/body") {
        add_class("mw_email")
      }
  #
  #Content::Formatting::SetInnerHTML
  #[["selector", ".popupBanner"], ["html", "<div>Email to a friend</div>"], ["prepend", ""], ["append", ""]]
  $("//*[contains(concat(' ', @class, ' '), ' popupBanner ')]") {
    inner("<div>Email to a friend</div>")
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", ".popupTable td.standard > br"]]
  $("//*[contains(concat(' ', @class, ' '), ' popupTable ')]//td[contains(concat(' ', @class, ' '), ' standard ')]/br") {
    remove()
  }
  
  
  #
  #Content::CSS::RemoveStyles
  #[["selector", ".popupBranding *, td[valign=\"top\"] > div"]]
  $("//*[contains(concat(' ', @class, ' '), ' popupBranding ')]//*") {
    attribute("style") {
      remove()
    }
  }
  $("//td[@valign = \"top\"]/div") {
    attribute("style") {
      remove()
    }
  }
  
  
  #
  #for show security image
  #Content::Passthrough::Attribute
  #[["selector", "img[src*='securityword.ognc']"], ["attribute", "src"], ["regex_capture", ""]]
  $("//img[contains(@src, 'securityword.ognc')]") {
    attribute("src") {
      value() {
        rewrite("link")
      }
    }
  }
  
  
  #
  #Content::Formatting::AddFileAttribute
  #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/sendBtn.png"], ["selector", "input[alt=\"Send\"]"]]
  # NOTE: just sets the attribute - doesn't do anything special for files
  $("//input[@alt = \"Send\"]") {
    #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/sendBtn.png")
    attribute('src', asset('images/buttons/send.png'))
  }
  
  
  #
  #Content::Formatting::AddFileAttribute
  #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/cancelBtn.png"], ["selector", "img[alt=\"Cancel\"]"]]
  # NOTE: just sets the attribute - doesn't do anything special for files
  $("//img[@alt = \"Cancel\"]") {
    #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/cancelBtn.png")
    attribute('src', asset('images/buttons/cancel.png'))
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
  #[["attribute", "class"], ["value", "mvInputRow"], ["selector", ".popupTable form > div > div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "span:nth-of-type(3)"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[contains(concat(' ', @class, ' '), ' popupTable ')]//form/div/div") {
    match($done, "no") {
        var("conditional", "false")
          $(".//span[position() = 3]") {
            var("conditional", "true")
          }
        match($conditional, "true") {
      attribute("class") {
        value() {
            set("mvInputRow")
        }
      }
        }
    }
  }
  
  
}
