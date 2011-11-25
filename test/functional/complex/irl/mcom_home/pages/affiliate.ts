# ----- ParsedHTMLBlocks ----
html() {
  #
  #Content::Formatting::SetInnerHTML
  #[["selector", "#container > div:first-child"], ["html", "<div style=\"color:#fff; padding:10px; font-size:18px; font-weight:bold;\">Become a Macy's Affiliate Today</div>"], ["prepend", ""], ["append", ""]]
  $("//*[@id = 'container']/*[position() = 1 and self::div]") {
    inner("<div style=\"color:#fff; padding:10px; font-size:18px; font-weight:bold;\">Become a Macy's Affiliate Today</div>")
  }
  
  
  #
  #Content::Formatting::SetInnerHTML
  #[["selector", "#container > div:nth-of-type(2) > div:first-child"], ["html", "<div class=\"mvRedFont\" style=\"font-size:19px;\">It's all about who you know</div>"], ["prepend", ""], ["append", ""]]
  $("//*[@id = 'container']/div[position() = 2]/*[position() = 1 and self::div]") {
    inner("<div class=\"mvRedFont\" style=\"font-size:19px;\">It's all about who you know</div>")
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "style"], ["value", "text-transform: uppercase; color:#e70000; padding:5px 0; font-size:14px;"], ["selector", "h2"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//h2") {
    match($done, "no") {
      attribute("style") {
        value() {
            set("text-transform: uppercase; color:#e70000; padding:5px 0; font-size:14px;")
        }
      }
    }
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "style"], ["value", "padding:5px 0;"], ["selector", ".bullet, .bulletPar"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[contains(concat(' ', @class, ' '), ' bullet ')]") {
    match($done, "no") {
      attribute("style") {
        value() {
            set("padding:5px 0;")
        }
      }
    }
  }
  $("//*[contains(concat(' ', @class, ' '), ' bulletPar ')]") {
    match($done, "no") {
      attribute("style") {
        value() {
            set("padding:5px 0;")
        }
      }
    }
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "style"], ["value", "text-decoration:underline; padding:15px 0; display:block;"], ["selector", ".bulletPar a"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[contains(concat(' ', @class, ' '), ' bulletPar ')]//a") {
    match($done, "no") {
      attribute("style") {
        value() {
            set("text-decoration:underline; padding:15px 0; display:block;")
        }
      }
    }
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "style"], ["value", "padding:5px 0;"], ["selector", ".bullet"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[contains(concat(' ', @class, ' '), ' bullet ')]") {
    match($done, "no") {
      attribute("style") {
        value() {
            set("padding:5px 0;")
        }
      }
    }
  }
  
  
}
