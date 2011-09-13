
# ----- ParsedHTMLBlocks ----
html() {
  #add id to body
  #Content::Formatting::AddAttribute
  #[["attribute", "id"], ["value", "mvStoreBody"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//body") {
    match($done, "no") {
        var("done", "yes")
      attribute("id") {
        value() {
            set("mvStoreBody")
        }
      }
    }
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvWhiteBar"], ["selector", ".localNavigation a"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[contains(concat(' ', @class, ' '), ' localNavigation ')]//a") {
    match($done, "no") {
      $("..") {
      attribute("class") {
        value() {
            set("mvWhiteBar")
        }
      }
      }
    }
  }
  
  
  #
  #Content::Formatting::WrapElement
  #[["selector", ".localNavigation a"], ["class_name", "mvStoreNavWrapper"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
  var("found", "false")
  match($found, "false") {
    $("(//*[contains(concat(' ', @class, ' '), ' localNavigation ')]//a)[1]") {
      var("found", "true")
      insert_before("div") {
        attribute("the_wrapper", "true")
        attribute("class", "mvStoreNavWrapper")
        move_here("//*[contains(concat(' ', @class, ' '), ' localNavigation ')]//a[not (@the_wrapper)]", "bottom")
        attribute("the_wrapper") {
          remove()
        }
      }
    }
  }
  
  
  #
  #Content::Formatting::MoveBefore
  #[["move_me", ".mvStoreNavWrapper"], ["before_me", "#globalSubNavBox"], ["map_moves", ""]]
  $("(//*[@id = 'globalSubNavBox'])[1]") {
    move_here("(//*[contains(concat(' ', @class, ' '), ' mvStoreNavWrapper ')])[1]", "before")
  }
  
  
  #
  #Content::Formatting::WrapIndividualElements
  #[["selector", ".mvStoreNavWrapper a"], ["tag_name", "div"], ["class_name", "mvWhiteBar"], ["id", ""], ["multiple", "true"]]
  $("//*[contains(concat(' ', @class, ' '), ' mvStoreNavWrapper ')]//a") {
    wrap("div") {
      attribute("class", "mvWhiteBar")
    }
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", ".mvStoreNavWrapper .mvWhiteBar"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", "a:contains(\"Store Locations & Hours\")"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[contains(concat(' ', @class, ' '), ' mvStoreNavWrapper ')]//*[contains(concat(' ', @class, ' '), ' mvWhiteBar ')]") {
    match($done, "no") {
        var("conditional", "false")
          $(".//a[contains(., \"Store Locations & Hours\")]") {
            var("conditional", "true")
          }
        match($conditional, "true") {
        var("done", "yes")
      attribute("class") {
        value() {
            set("mvRemoveElement")
        }
      }
        }
    }
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", ".menu_spacer, .splashpage > div > div > div:first-of-type, .localNavigation, .mvRemoveElement, .mvStoreNavWrapper > .mvWhiteBar:nth-of-type(3)"]]
  $("//*[contains(concat(' ', @class, ' '), ' menu_spacer ')]") {
    remove()
  }
  $("//*[contains(concat(' ', @class, ' '), ' splashpage ')]/div/div/div[position() = 1]") {
    remove()
  }
  $("//*[contains(concat(' ', @class, ' '), ' localNavigation ')]") {
    remove()
  }
  $("//*[contains(concat(' ', @class, ' '), ' mvRemoveElement ')]") {
    remove()
  }
  $("//*[contains(concat(' ', @class, ' '), ' mvStoreNavWrapper ')]/*[contains(concat(' ', @class, ' '), ' mvWhiteBar ') and position() = 3]") {
    remove()
  }
  
  
}
