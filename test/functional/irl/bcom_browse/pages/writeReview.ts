
# ----- ParsedHTMLBlocks ----
#html() {
  #
  #Group::URLMatcherGroup
  #[["url_matcher", "writereview"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /writereview/) {
  
    #
    #Group::QueryParameterMatcherGroup
    #[["parameter_name", "innerreturn"], ["negate", ""], ["parameter_value", ""], ["if_present", "true"]]
      var("param_matched", "false")
      match($path) {
        with("innerreturn") {
          var("param_matched", "true")
        }
      }
        match($param_matched, "true") {
    }
    
  }
  
  #
  #Group::URLMatcherGroup
  #[["url_matcher", "writereview"], ["negate", "true"]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, not(/writereview/)) {
  
    #baseTag
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Inject::InjectHTML
      #[["html", "<base href=\"http://www1.bloomingdales.com\">"], ["add_after", "head > script"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//head/script)[1]") {
        inject_after("<base href=\"http://www1.bloomingdales.com\">")
      }
      
      
      #
      #Content::Passthrough::BaseTag
      #[["selector", "base"], ["regex_filter", ""], ["regex_exclusion", ""], ["force_this_blockset", ""]]
      # --- not found ---
      
    # end BasicGroup
    
    #
    #Group::IgnoreGroup
    #[]
    # No match necessary - contents will be commented out
    #  #
    #  #Content::CSS::AddCSS
    #  #[["css_path", "http://reviews.bloomingdales.com/static/7130/bazaarvoiceUI.css"], ["encode_image_threshold", ""]]
    #  $('//html/head') {
    #    insert_bottom("link", rel: "stylesheet", type: "text/css", href: "http://reviews.bloomingdales.com/static/7130/bazaarvoiceUI.css")
    #  }
    #  
    #  
    
    
    #
    #Content::CSS::AddCSS
    #[["css_path", "http://dl.dropbox.com/u/19014985/projects/bloomingdales/writeReview.css"], ["encode_image_threshold", ""]]
    # $('//html/head') {
    #   insert_bottom("link", rel: "stylesheet", type: "text/css", href: "http://dl.dropbox.com/u/19014985/projects/bloomingdales/writeReview.css")
    # }
    
    
    #
    #Content::Javascript::AddScriptTag
    #[["javascript_path", "http://dl.dropbox.com/u/19014985/projects/bloomingdales/js/writeAReview.js"], ["add_after", "body > div:last-of-type"]]
    $("//body/div[position() = last()]") {
      insert_after("script") {
        attribute("src", "http://dl.dropbox.com/u/19014985/projects/bloomingdales/js/writeAReview.js")
        attribute("language", "javascript")
      }
    }
    
  }
  
  $("//body"){
    add_class("mw_write_review")
  }
  
  $("//script[contains(.,'BVsubmissionCheckLoadState')]") {
    #text() {
    #  prepend("debugger;")
    #}
    text() {
      replace("BVisLoaded = false;", "BVisLoaded = true;")
    }
    #remove()
  }
#}