
# ----- RawHTMLBlocks ----
#
#Content::Raw::RegexReplaceCapture
#[["match", "(i\\s?=\\s?0)\\s?;\\s?i\\s?<\\s?NameArray"], ["replace", "i=1"], ["multiline", ""]]





# ----- ConfigBlocks ----
#
#Config::IncludeBlockset
#[["blockset_name", "base"]]
#@import base.ts
  $("//html/body"){
    add_class("mw_about")
  }
  #
  #
  #this moves the bread crumb up one so that
  #about us bread crumb never shows
  #if i can scope it to script tags we can
  #remove the html tag and move the file to its
  #appropriat location.
  #
  #
  $("//script"){
    text(){
      replace(/(i\s?=\s?0)\s?;\s?i\s?<\s?NameArray/) {
        replace($1, "i=1 ")
      }
    }
  }
  
  #about section international information page
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /((shopping\/international\.jsp)|(campaign\/campaign\.ognc)|(shopping\/thankYou\.jsp))/) {
    $("//body") {
      add_class("mw_international")
    }
    $("//input"){
      attribute("style", "")
    }
    $("//input[@value=\"SUBMIT_BUTTON\"]"){
      add_class("mvButton")
      attribute("type", "submit")
      attribute("value", "submit")
    }
  
  
  
    var("fake_url") {
      set(var("source_host"))
      append(var("path"))
      prepend("http://")
    }
    match($fake_url, /(shopping\/thankYou\.jsp)/) {
      $("//body") {
        add_class("mw_confirmation")
      }
    }
  }
  #
  #Content::Formatting::RemoveAttribute
  #[["attribute", "width"], ["selector", "*"]]
  $("//*") {
    attribute("width") {
      remove()
    }
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", ".bl_cs_banner"]]
  $("//*[contains(concat(' ', @class, ' '), ' bl_cs_banner ')]") {
    remove()
  }
  
  
  #
  #Group::URLMatcherGroup
  #[["url_matcher", "about\\/index"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /about\/index/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvAboutUsHome"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvAboutUsHome")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvStoreLocatorLink"], ["selector", "a[href*=\"/store/index.ognc\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//a[contains(@href, \"/store/index.ognc\")]") {
      match($done, "no") {
        $("..") {
        attribute("class") {
          value() {
              set("mvStoreLocatorLink")
          }
        }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRemoveMe"], ["selector", ".mvStoreLocatorLink + li"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvStoreLocatorLink ')]/following-sibling::*[1]/self::li") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvRemoveMe")
          }
        }
      }
    }
    
    
  }
  
  #
  #Group::URLMatcherGroup
  #[["url_matcher", "shopping\\/index"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /shopping\/index/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvServicesIndex"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvServicesIndex")
          }
        }
      }
    }
    
    
  }
  
  #
  #Group::URLMatcherGroup
  #[["url_matcher", "newstores\\.jsp"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /newstores\.jsp/) {
  
    #
    #Content::Passthrough::ReversePassthroughAttribute
    #[["selector", ".cs_new_store_text_bottom a"], ["attribute", "href"], ["regex_capture", ""]]
    # WARNING: NOT IMPLEMENTED YET
    # To implement this we need the reverse rewrite function - rewrite("host")
    # This is not trivial because the host rewrite is different - it is an array
    # of regular expressions, not just one
    #
    #
    #$("//*[contains(concat(' ', @class, ' '), ' cs_new_store_text_bottom ')]//a") {
    #  attribute("href") {
    #    value() {
    #      rewrite("host")
    #    }
    #  }
    #}
    # 
    #
    
  }
  
  #
  #Group::URLMatcherGroup
  #[["url_matcher", "shopping\\/product-recall"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /shopping\/product-recall/) {
  
    #
    #Content::Passthrough::ReversePassthroughAttribute
    #[["selector", ".bl_mainContent a"], ["attribute", "href"], ["regex_capture", ""]]
    # WARNING: NOT IMPLEMENTED YET
    # To implement this we need the reverse rewrite function - rewrite("host")
    # This is not trivial because the host rewrite is different - it is an array
    # of regular expressions, not just one
    #
    #
    #$("//*[contains(concat(' ', @class, ' '), ' bl_mainContent ')]//a") {
    #  attribute("href") {
    #    value() {
    #      rewrite("host")
    #    }
    #  }
    #}
    # 
    #
    
  }
  
  #
  #Group::URLMatcherGroup
  #[["url_matcher", "shopping\\/interior"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /shopping\/interior/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvCouchImageWrap"], ["selector", ".bl_cs_brown_bag"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' bl_cs_brown_bag ')]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvCouchImageWrap")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::MoveBefore
    #[["move_me", ".bl_cs_brown_bag"], ["before_me", ".bl_cs_mainContent"], ["map_moves", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' bl_cs_mainContent ')])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' bl_cs_brown_bag ')])[1]", "before")
    }
    
    
  }
  
  #
  #Group::URLMatcherGroup
  #[["url_matcher", "shopping/sizecharts/women"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /shopping\/sizecharts\/women/) {
  
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "usemap"], ["selector", "img"]]
    $("//img") {
      attribute("usemap") {
        remove()
      }
    }
    
    
    # add women sizing chart css
    $("//body") {
      add_class("mvWomenSizingChart")
      $("//map"){
        remove()
      }
    }
    
    
  }
  
  #
  #Content::Passthrough::Attribute
  #[["selector", ".bl_title_txt a"], ["attribute", "href"], ["regex_capture", ""]]
  $("//*[contains(concat(' ', @class, ' '), ' bl_title_txt ')]//a") {
    attribute("href") {
      value() {
        rewrite("link")
      }
    }
  }
  
  
  #
  #Content::Passthrough::ReversePassthroughAttribute
  #[["selector", "a[href*=\"cpsc.gov/\"]"], ["attribute", "href"], ["regex_capture", ""]]
  # WARNING: NOT IMPLEMENTED YET
  # To implement this we need the reverse rewrite function - rewrite("host")
  # This is not trivial because the host rewrite is different - it is an array
  # of regular expressions, not just one
  #
  #
  #$("//a[contains(@href, \"cpsc.gov/\")]") {
  #  attribute("href") {
  #    value() {
  #      rewrite("host")
  #    }
  #  }
  #}
  # 
  #

	$("//body[contains(@class, 'bl_pop')]") {
		add_class("mw_popup")
		
//		$("//div[@class='bl_pop_top_container']") {
//			$(".//td") {
//				move_to("//div[@class='bl_pop_top_container']")
//				name("div")
//				$(".//img[@alt='Close Window']/..") {		
//					add_class("mvButton")
//					$("./img") {
//						remove()
//					}
//					text("Close")
//				}
//				$(".//img[@alt=\"Bloomingdale's\"]/..") {
//					add_class("bl_pop_top_logo")
//					attribute("alt","Bloomingdale's")
//					$("./img") {
//						remove()
//					}
//				}
//			}
//			$("./table") {
//				remove()
//			}
//		}
	}

