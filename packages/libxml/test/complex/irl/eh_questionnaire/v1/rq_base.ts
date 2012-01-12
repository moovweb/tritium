
# ----- ParsedHTMLBlocks ----
html() {
  #
  #Content::CSS::AddCSS
  #[["css_path", "//d35wknniannwqo.cloudfront.net/eharmony/998689328529/rq.css?moov_cache_name=eharmony-rq.css&moov_cache_version=998689328529"], ["encode_image_threshold", ""]]
  $('//html/head') {
    insert_bottom("link", rel: "stylesheet", type: "text/css", href: sass("v1/rq"))
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", "#headerContainer"]]
  $("//*[@id = 'headerContainer']") {
    remove()
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mRQJSWrap"], ["selector", "p:first-of-type"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("(//p[position() = 1])[1]") {
    match($done, "no") {
        var("done", "yes")
      attribute("class") {
        value() {
            append(" mRQJSWrap")
        }
      }
    }
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mRQ"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("(//body)[1]") {
    match($done, "no") {
        var("done", "yes")
      attribute("class") {
        value() {
            append(" mRQ")
        }
      }
    }
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mRQForm"], ["selector", "#rq_lt_col"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("(//*[@id = 'rq_lt_col'])[1]") {
    match($done, "no") {
        var("done", "yes")
      attribute("class") {
        value() {
            append(" mRQForm")
        }
      }
    }
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mRQFormQuestions"], ["selector", ".mRQForm > .column"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("(//*[contains(concat(' ', @class, ' '), ' mRQForm ')]/*[contains(concat(' ', @class, ' '), ' column ')])[1]") {
    match($done, "no") {
        var("done", "yes")
      attribute("class") {
        value() {
            append(" mRQFormQuestions")
        }
      }
    }
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mRQBottom"], ["selector", "#rq_rt_col"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("(//*[@id = 'rq_rt_col'])[1]") {
    match($done, "no") {
        var("done", "yes")
      attribute("class") {
        value() {
            append(" mRQBottom")
        }
      }
    }
  }
  
  
  #
  #Content::Formatting::RemoveExcept
  #[["remove", "#progressContainer"], ["keep", ".progressLabel"]]
  # 1 move all the keep stuff just after the remove stuff
  $("//*[@id = 'progressContainer']") {
    move_here(".//*[contains(concat(' ', @class, ' '), ' progressLabel ')]", "before")
    remove()
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", ".mRQBottom br"]]
  $("//*[contains(concat(' ', @class, ' '), ' mRQBottom ')]//br") {
    remove()
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", "#footerContainer"]]
  $("//*[@id = 'footerContainer']") {
    remove()
  }
  
  
  #Optimize
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Javascript::RemoveScriptTagSrcContains
    #[["src_phrase", "jquery.plugins"]]
    $("//script[contains(@src, 'jquery.plugins')]") {
      remove()
    }
    
    
    #
    #Content::Javascript::RemoveScriptTagSrcContains
    #[["src_phrase", "rq.js"]]
    $("//script[contains(@src, 'rq.js')]") {
      remove()
    }
    
    
    #
    #Content::Javascript::RemoveScriptTagSrcContains
    #[["src_phrase", "facebook"]]
    $("//script[contains(@src, 'facebook')]") {
      remove()
    }
    
    
    #
    #Content::Javascript::RemoveScriptTagSrcContains
    #[["src_phrase", "mapcontrol"]]
    $("//script[contains(@src, 'mapcontrol')]") {
      remove()
    }
    
    
    #
    #Content::Javascript::RemoveScriptTagContains
    #[["match", "facebook"]]
    $("//script[contains(text(),'facebook')]") {
      remove()
    }
    
    
    #
    #Content::Javascript::RemoveScriptTagSrcContains
    #[["src_phrase", "live.js"]]
    $("//script[contains(@src, 'live.js')]") {
      remove()
    }
    
    
    #
    #Content::Javascript::RemoveScriptTagSrcContains
    #[["src_phrase", "jquery.viewport"]]
    $("//script[contains(@src, 'jquery.viewport')]") {
      remove()
    }
    
    
    #
    #Content::Javascript::RemoveScriptTagSrcContains
    #[["src_phrase", "jquery.metadata"]]
    $("//script[contains(@src, 'jquery.metadata')]") {
      remove()
    }
    
    
    #
    #Content::Javascript::RemoveScriptTagSrcContains
    #[["src_phrase", "jquery.validate"]]
    $("//script[contains(@src, 'jquery.validate')]") {
      remove()
    }
    
    
    #
    #Content::Javascript::RemoveScriptTagSrcContains
    #[["src_phrase", "jquery.blockui"]]
    $("//script[contains(@src, 'jquery.blockui')]") {
      remove()
    }
    
    
    #
    #Content::Javascript::RemoveScriptTagSrcContains
    #[["src_phrase", "jquery-ui"]]
    $("//script[contains(@src, 'jquery-ui')]") {
      remove()
    }
    
    
    #
    #Content::Javascript::RemoveScriptTagContains
    #[["match", "jquery-1.5.2.min"]]
    $("//script[contains(text(),'jquery-1.5.2.min')]") {
      remove()
    }
    
    
    #
    #Content::Javascript::RemoveScriptTagSrcContains
    #[["src_phrase", "jquery.min"]]
    $("//script[contains(@src, 'jquery.min')]") {
      remove()
    }
    
    
    #
    #Content::Javascript::AddScriptTag
    #[["javascript_path", "//d35wknniannwqo.cloudfront.net/eharmony/998689328529/rq.libraries.js?moov_cache_name=eharmony-rq.libraries.js&moov_cache_version=998689328529"], ["add_after", ""]]
    $("//html/head") {
      insert_bottom("script") {
        attribute("src", "//d35wknniannwqo.cloudfront.net/eharmony/998689328529/rq.libraries.js?moov_cache_name=eharmony-rq.libraries.js&moov_cache_version=998689328529")
        attribute("language", "javascript")
      }
    }
    
    
    #
    #Content::Javascript::AddScriptTag
    #[["javascript_path", "//d35wknniannwqo.cloudfront.net/eharmony/998689328529/rq.bundle.js?moov_cache_name=eharmony-rq.bundle.js&moov_cache_version=998689328529"], ["add_after", ""]]
    $("//html/head") {
      insert_bottom("script") {
        attribute("src", "//d35wknniannwqo.cloudfront.net/eharmony/998689328529/rq.bundle.js?moov_cache_name=eharmony-rq.bundle.js&moov_cache_version=998689328529")
        attribute("language", "javascript")
      }
    }
    
    
  # end BasicGroup
  
  #
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", "title:contains(\"Questionnaire Error\")"], ["negate", ""]]
  $("(//title[contains(., \"Questionnaire Error\")])[1]") {
  
    #
    #Content::Formatting::RemoveElements
    #[["selector", "body > table:not(:nth-child(2))"]]
    $("//body/table[not (position() = 2)]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".sFooter"]]
    $("//*[contains(concat(' ', @class, ' '), ' sFooter ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "body > br"]]
    $("//body/br") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "bgcolor"], ["selector", "body > table, body > table table, body > table table td"]]
    $("//body/table") {
      attribute("bgcolor") {
        remove()
      }
    }
    $("//body/table//table") {
      attribute("bgcolor") {
        remove()
      }
    }
    $("//body/table//table//td") {
      attribute("bgcolor") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "body > table table td br"]]
    $("//body/table//table//td//br") {
      remove()
    }
    
    
    #
    #Content::Formatting::Table::Remove::ColumnDump
    #[["selector", ""]]
    $("//table") {
      # TODO: only go forward if this is a table element
      $("tr") {
        $("td") {
          name("div")
          move_to("..", "before")
        }
        remove()
      }
      name("div")
      attribute("was_table", "true")
      attribute("cellspacing") {
        remove()
      }
      attribute("cellpadding") {
        remove()
      }
      attribute("border") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mw_RQError"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("(//body)[1]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mw_RQError")
          }
        }
      }
    }
    
    
  }
  
  $("//div[contains(@class, 'unchanged')]") {
    attribute("class") {
      value() {
        replace("unchanged", "")
      }
    }
  }
  # $("//div/label/input[@type='radio' and @value='4']") {
  #   attribute("checked", "checked")
  # }
  
  #
  #Group::IgnoreGroup
  #[]
  # No match necessary - contents will be commented out
  #  #
  #  #Content::Inject::InjectHTML
  #  #[["html", "<div class=\"mw_RQHeader\"> \t<div class=\"mw_RQHeaderLogo\"></div> <a href=\"/singles/servlet/user/logout\" class=\"mw_RQHeaderLogout\">Logout</a></div>"], ["add_after", ""], ["multiple", ""], ["add_before", "body :first-child"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
  #  $("(//body//*[position() = 1 and self::*])[1]") {
  #    inject_before("<div class=\"mw_RQHeader\"> 	<div class=\"mw_RQHeaderLogo\"></div> <a href=\"/singles/servlet/user/logout\" class=\"mw_RQHeaderLogout\">Logout</a></div>")
  #  }
  #  
  #  
  
  
}