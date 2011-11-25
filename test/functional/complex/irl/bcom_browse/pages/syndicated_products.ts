
# ----- ConfigBlocks ----
#
#Config::IncludeBlockset
#[["blockset_name", "base"]]
#@import base.ts



# ----- ParsedHTMLBlocks ----
#html() {
  #
  #Content::CSS::AddCSS
  #[["css_path", "http://dl.dropbox.com/u/19014985/projects/bloomingdales/search.css"], ["encode_image_threshold", ""]]
  $('//html/head') {
    insert_bottom("link", rel: "stylesheet", type: "text/css", href: "http://dl.dropbox.com/u/19014985/projects/bloomingdales/search.css")
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvRemoveMe"], ["selector", ".outOfScreen"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[contains(concat(' ', @class, ' '), ' outOfScreen ')]") {
    match($done, "no") {
        var("done", "yes")
      attribute("class") {
        value() {
            set("mvRemoveMe")
        }
      }
    }
  }
  
  
  #chanel
  #Group::URLMatcherGroup
  #[["url_matcher", "syndicated\\/chanel"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /syndicated\/chanel/) {
  
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".bl_chanel_container"], ["html", "<div class=\"moovProductNotAvailable\"> For Chanel fragrance and cosmetic products, please visit our full website from a computer. For the full Chanel product line, please visit your local Bloomingdale&rsquo;s store. </div>"], ["prepend", ""], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' bl_chanel_container ')]") {
      inner("<div class=\"moovProductNotAvailable\"> For Chanel fragrance and cosmetic products, please visit our full website from a computer. For the full Chanel product line, please visit your local Bloomingdale&rsquo;s store. </div>")
    }
    
    
  }
  
  #coach
  #Group::URLMatcherGroup
  #[["url_matcher", "coach\\/catalog"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /coach\/catalog/) {

    #
    #Content::Formatting::SetInnerHTML
    #[["selector", "#bl_bq_main"], ["html", "<div class=\"moovProductNotAvailable\"> For Coach products, please visit our full website from a computer. For the full Chanel product line, please visit your local Bloomingdale&rsquo;s store. </div>"], ["prepend", ""], ["append", ""]]
    $("//*[@id = 'bl_bq_main']") {
      inner("<div class=\"moovProductNotAvailable\"> For Coach products, please visit our full website from a computer. For the full Chanel product line, please visit your local Bloomingdale&rsquo;s store. </div>")
    }


  }

  #remove chanel style tag
  $("//div[contains(@class, 'bl_main')]/style"){
    remove()
  }
#}