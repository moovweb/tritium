# ----- ParsedHTMLBlocks ----
html() {
  #
  #Content::CSS::AddCSS
  #[["css_path", "http://dl.dropbox.com/u/6208053/macys_v2/macys_relatedContent.css"], ["encode_image_threshold", ""]]
  
  # Add page specific class
  $("//html/body") {
    add_class("mw_relatedContent")
  }
  
  #
  #Content::Formatting::MoveToBeginningOf
  #[["move_me", ".parentCategories"], ["to_beginning_of_me", "#localContentContainer"], ["map_multiple", ""], ["ancestor_selector", ""]]
  $("(//*[@id = 'localContentContainer'])[1]") {
    move_here("(//*[contains(concat(' ', @class, ' '), ' parentCategories ')])[1]", "top")
  }
  
  #
  #Group::URLMatcherGroup
  #[["url_matcher", "furniture-galleries"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /furniture-galleries/) {
  }
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", "#yui-history-iframe"]]
  $("//*[@id = 'yui-history-iframe']") {
    remove()
  }
  
  
  #page title
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvTitle"], ["selector", ".currentCatHeader"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' currentCatHeader ')]") {
      match($done, "no") {
        attribute("class") {
          value() {
              set("mvTitle")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvBackBtn"], ["selector", ".parentCategories.cat a"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' parentCategories ') and contains(concat(' ', @class, ' '), ' cat ')]//a") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvBackBtn")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::MoveAfter
    #[["move_me", ".parentCategories.cat a"], ["after_me", ".current.cat h1"], ["map_multiple", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' current ') and contains(concat(' ', @class, ' '), ' cat ')]//h1)[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' parentCategories ') and contains(concat(' ', @class, ' '), ' cat ')]//a)[1]", "after")
    }
    
    
  # end BasicGroup
  
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
  
  
}
