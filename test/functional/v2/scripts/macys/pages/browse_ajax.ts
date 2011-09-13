
# ----- ConfigBlocks ----
#
#Config::ForcePassthroughType
#[["keyword", "guess_html"]]
# This block does not make sense in v2 and is usually not required


# ----- ParsedHTMLBlocks ----
html() {
  #Products
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::WrapElement
    #[["selector", ".productThumbnail"], ["class_name", "mvProductThumbWrapper"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", "div"], ["only_include_direct_children", "true"]]
    $("//*[contains(concat(' ', @class, ' '), ' productThumbnail ')]") {
      $("(.//div)[1]") {
        # call it a divvv at first to make sure that the move_here
        # selector doesn't capture it and try to move it inside itself
        # - then later rename it to a div
        insert_before("div") {
          attribute("class", "mvProductThumbWrapper")
        attribute("the_wrapper", "true")
          move_here("../div[not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvSpecialSaving"], ["selector", ".crossfadeOffers"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' crossfadeOffers ')]") {
      match($done, "no") {
        $("..") {
        attribute("class") {
          value() {
              append(" mvSpecialSaving")
          }
        }
        }
      }
    }
    
    
    #
    #Content::Formatting::MoveToEndOf
    #[["move_me", ".crossfadeOffers"], ["to_end_of_me", ".mvSpecialSaving"], ["map_multiple", "true"], ["ancestor_selector", ""], ["move_to_one_element", ""]]
    var("counter", "a")
    $("//*[contains(concat(' ', @class, ' '), ' mvSpecialSaving ')]") {
      var("counter") {
        append("a")
      }
      attribute("id3368", $counter)
    }
    var("counter", "a")
    $("//*[contains(concat(' ', @class, ' '), ' crossfadeOffers ')]") {
      var("counter") {
        append("a")
      }
      var("xpath") {
        set("//*[@id3368 = '")
        append($counter)
        append("']")
      }
      move_to($xpath, "bottom")
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvMoreColorContainer"], ["selector", ".mvProductThumbWrapper"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ".moreColors"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvProductThumbWrapper ')]") {
      match($done, "no") {
          var("conditional", "false")
            $(".//*[contains(concat(' ', @class, ' '), ' moreColors ')]") {
              var("conditional", "true")
            }
          match($conditional, "true") {
        attribute("class") {
          value() {
              append(" mvMoreColorContainer")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::MoveToEndOf
    #[["move_me", ".moreColors"], ["to_end_of_me", ".mvMoreColorContainer"], ["map_multiple", "true"], ["ancestor_selector", ""], ["move_to_one_element", ""]]
    var("counter", "a")
    $("//*[contains(concat(' ', @class, ' '), ' mvMoreColorContainer ')]") {
      var("counter") {
        append("a")
      }
      attribute("id5763", $counter)
    }
    var("counter", "a")
    $("//*[contains(concat(' ', @class, ' '), ' moreColors ')]") {
      var("counter") {
        append("a")
      }
      var("xpath") {
        set("//*[@id5763 = '")
        append($counter)
        append("']")
      }
      move_to($xpath, "bottom")
    }
    
    
    #
    #Content::Formatting::ReplaceTag
    #[["selector", ".prices > span"], ["new_tag_name", "div"], ["class_name", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' prices ')]/span") {
      name("div")
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".prices br"]]
    $("//*[contains(concat(' ', @class, ' '), ' prices ')]//br") {
      remove()
    }
    
    
  # end BasicGroup
  
  #
  #Content::Passthrough::Link
  #[["selector", ".productThumbnailLink"], ["regex_filter", ""], ["regex_exclusion", ""], ["force_this_blockset", ""]]
  # NOTE: AF: Very loose implementation. Just rewriting all the anchor tags as
  # we tend to do in v2
  $("//*[contains(concat(' ', @class, ' '), ' productThumbnailLink ')]") {
    attribute("href") {
      value() {
        rewrite("link")
      }
    }
  }
  
  
  # Hardcore optimization mode
  ############################
  
  # The below operations are repeated in browse.ts in the opt folder
  # Removing the color swatches and adding a descriptor instead
  # Edit the thumbnail images class so that it is optimized and
  # the same as the initial HTML request
  # Remove other unnecessary stuff
  
  #Thumbnails
  # No need to wrap the contents at all
    #
    #Removing these images causes the ajax requests to err. (The wrong images seem to be loaded)
    #Content::Formatting::RemoveAttribute
    #[["attribute", "src"], ["selector", ".altCrossfadeImage"]]
    $("//*[contains(concat(' ', @class, ' '), ' altCrossfadeImage ')]") {
      attribute("src") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::AddQueryParameter
    #[["query_parameter_name", "wid"], ["query_parameter_value", "155"], ["selector", ".thumbnailImage"], ["tag_attribute", "src"], ["if_not_present", ""], ["get_parameter_value_from_chain_args", ""]]
    # Change size and quality to be the same as the browse page so we bring in only one version
    $("//*[contains(concat(' ', @class, ' '), ' thumbnailImage ')]") {
      attribute("src") {
        value() {
          #append("?wid=82")
          replace(/wid=[0-9]*/, "wid=152")
          replace(/qlt\=[0-9(\,)]*/, "qlt=75,0")
          replace(/hei=[0-9]*/, "hei=186")
          # change the last question mark into an ampersand for valid query parameters
          replace(/(\?.+)\?/, "\\1&")
        }
      }
    }
    
    # Remove the value for the extra unused image
    $(".//a[contains(@class, 'imageLink')]/input[2]") {
      attribute("value") {
         remove()
      }
      remove()
    }
    
  match($optimize_the_shit_out_of_me, "true") {
    $(".//div[contains(@class, 'productThumbnail')]") {
      $("./div[@class='overlayImgBox']") {
        remove()
      }
      $(".//ul[@class='morecolors']") {
        inject_before("<div class='mvMoreColor'>More Colors Available</div>")
        remove()
      }
      $(".//div[contains(@class, 'moreColorsBar')]") {
        remove()
      }
      $(".//div[contains(@class, 'moreColors')]") {
        inner() {
          set("<div class='mvMoreColor'>more colors available</div>")
        }
      }
    }
  }

  
  $("//*[@class='moreView']") {
    remove()
  }
  
}
