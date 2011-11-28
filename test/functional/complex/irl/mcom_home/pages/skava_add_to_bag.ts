
# ----- ParsedHTMLBlocks ----
html() {
  #Redirect to Cart
  #Group::QueryParameterMatcherGroup
  #[["parameter_name", "view_cart"], ["negate", ""], ["parameter_value", "true"]]
    var("param_matched", "false")
    match($path) {
      with(/["view_cart"]\=true/) {
        var("param_matched", "true")
      }
    }
      match($param_matched, "true") {
  
    #
    #Content::Passthrough::Link
    #[["selector", ""], ["regex_filter", ""], ["regex_exclusion", ""], ["force_this_blockset", ""]]
    # NOTE: AF: Very loose implementation. Just rewriting all the anchor tags as
    # we tend to do in v2
    $("//a") {
      attribute("href") {
        value() {
          rewrite("link")
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mw_checkout_button"], ["selector", ".divCart_button > a"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' divCart_button ')]/a") {
      match($done, "no") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("mw_checkout_button")
          }
        }
      }
    }
    
    
    #Redirect if no Error
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", "//td[@class=\"errorText\"]/text()"], ["negate", "true"]]
    var("element_exists", "false")
    $("(//td[@class=\"errorText\"]/text())[1]") {
      var("element_exists", "true")
    }
    match($element_exists, "false") {
    
      #
      #Hacky -- but good enough for now.
      #Content::Formatting::AddWindowOnload
      #[["callback", "function(){window.location=\"http://www1.macys.moov1.com/bag/index.ognc\"}"], ["chain", ""]]
      $("html/body") {
        insert_bottom("script", type: 'text/javascript') {
          text("window.addEventListener('load',function(){window.location=\"http://www1.macys.moov1.com/bag/index.ognc\"}, false);")
        }
      }
      
      
    }
  }
  
  #Add to Cart - JSONP
  #Group::QueryParameterMatcherGroup
  #[["parameter_name", "view_cart"], ["negate", "true"], ["parameter_value", "true"]]
    var("param_matched", "false")
    match($path) {
      with(/["view_cart"]\=true/) {
        var("param_matched", "true")
      }
    }
      match($param_matched, "false") {
  
    #Condense Success Info
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Inject::InjectHTML
      #[["html", "<div id=\"response_data\"><span id=\"error_text\"></span><span id=\"success\">0</span></div>"], ["add_after", "#hd"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[@id = 'hd'])[1]") {
        inject_after("<div id=\"response_data\"><span id=\"error_text\"></span><span id=\"success\">0</span></div>")
      }
      
      
      #
      #Content::Formatting::DuplicateInnerText
      #[["duplicate_source", ".errorText"], ["duplicate_target", "#error_text"], ["multiple", ""], ["common_ancestor", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' errorText ')])[1]") {
        var("text", fetch("text()"))
        $("(//*[@id = 'error_text'])[1]") {
          inner($text)
        }
      }
      
      
      #Get Callback
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Inject::InjectHTML
        #[["html", "<span id=\"callback\"></span>"], ["add_after", "#success"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[@id = 'success'])[1]") {
          inject_after("<span id=\"callback\"></span>")
        }
        
        
        #
        #Content::Formatting::SetInnerText
        #[["selector", "#callback"], ["text", ""], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", "callback"], ["chain", ""]]
        # NOTE: not sure if /html() or /text() is what I want to be using here
        $("//*[@id = 'callback']") {
          inner() {
            var("param_value") {
              set($path)
              replace(".*callback=([^\&])", "//1")
            }
            set($param_value)
          }
        }
        
        
      # end BasicGroup
      
      #
      #Group::ConditionalSelectorGroup
      #[["conditional_selector", ".divCart_item .atb_con_qty_td"], ["negate", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' divCart_item ')]//*[contains(concat(' ', @class, ' '), ' atb_con_qty_td ')])[1]") {
      
        #
        #Content::Formatting::SetInnerText
        #[["selector", "#response_data > #success"], ["text", "1"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
        # NOTE: not sure if /html() or /text() is what I want to be using here
        $("//*[@id = 'response_data']/*[@id = 'success']") {
          inner() {
            set("1")
          }
        }
        
        
      }
      
      
      #
      #Content::Formatting::Obliterate
      #[["selector", "#response_data"], ["head_selector", ""]]
      $("//html/body") {
        # move the selected elements into a new div
        insert_top("div") {
          move_here("//*[@id = 'response_data']")
          # remove the rest of the elements in the body
          $("following-sibling::*") {
            remove()
          }
          # move the selected elements out of their wrapper
          $("*") {
            move_to("..", "after")
          }
          # delete the wrapper - don't need it anymore
          remove()
        }
      }
      
      
    # end BasicGroup
    
  }
  
}
