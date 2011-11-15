#add class to body so that the css can be added to main. css
$("//html/body"){
 add_class("mvSearchPage") 
}
# ----- ConfigBlocks ----
#
#Config::IncludeBlockset
#[["blockset_name", "base"]]
#@import base.ts
  
  
  #Remove Stuff
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
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
    #[["selector", ".se_IPP"]]
    $("//*[contains(concat(' ', @class, ' '), ' se_IPP ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".se_store_only_ad"]]
    $("//*[contains(concat(' ', @class, ' '), ' se_store_only_ad ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".clearBoth"]]
    $("//*[contains(concat(' ', @class, ' '), ' clearBoth ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#se_results_banner"]]
    $("//*[@id = 'se_results_banner']") {
      remove()
    }
    
    
  # end BasicGroup
  
  #format pagination
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", ".se_noResultsHint"], ["negate", "true"]]
    var("element_exists", "false")
    $("(//*[contains(concat(' ', @class, ' '), ' se_noResultsHint ')])[1]") {
      var("element_exists", "true")
    }
    match($element_exists, "false") {
    
      #
      #Group::IgnoreGroup
      #[]
      # No match necessary - contents will be commented out
      #  #
      #  #Content::Formatting::WrapTextChildren
      #  #[["selector", ".se_srchfor"], ["tag_name", "span"], ["class_name", "mvSearchTextWrap"], ["multiple", ""], ["split_delimiter", ""]]
      #  $("(//*[contains(concat(' ', @class, ' '), ' se_srchfor ')])[1]") {
      #    wrap_text_children("span", class: 'mvSearchTextWrap')
      #  }
      #  
      #  
      #  #
      #  #Content::Formatting::AddAttribute
      #  #[["attribute", "class"], ["value", "mvRemoveMe"], ["selector", ".mvSearchTextWrap:last-of-type"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      #  var("done", "no")
      #  $("//*[contains(concat(' ', @class, ' '), ' mvSearchTextWrap ') and position() = last()]") {
      #    match($done, "no") {
      #        var("done", "yes")
      #      attribute("class") {
      #        value() {
      #            set("mvRemoveMe")
      #        }
      #      }
      #    }
      #  }
      #  
      #  
      #  #
      #  #Content::Formatting::InnerRegexReplace
      #  #[["selector", ".se_srchfor"], ["regex", "(:)"], ["replacement", " "], ["multiple", ""]]
      #  $("(//*[contains(concat(' ', @class, ' '), ' se_srchfor ')])[1]") {
      #    inner() {
      #      replace(/(:)/, " ")
      #    }
      #  }
      #  
      #  
      #  #
      #  #Content::Formatting::MoveToBeginningOf
      #  #[["move_me", ".se_srchfor > strong:last-of-type"], ["to_beginning_of_me", ".bl_nav_side_no_padding"], ["map_multiple", ""], ["ancestor_selector", ""]]
      #  $("(//*[contains(concat(' ', @class, ' '), ' bl_nav_side_no_padding ')])[1]") {
      #    move_here("(//*[contains(concat(' ', @class, ' '), ' se_srchfor ')]/strong[position() = last()])[1]", "top")
      #  }
      #  
      #  
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<strong>Results</strong>"], ["add_after", ".bl_nav_side_no_padding > strong"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_nav_side_no_padding ')]/strong)[1]") {
        inject_after("<strong>Results</strong>")
      }
      
      
    }
    
    
  # end BasicGroup
  
  #format page header
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvBDMenuDropdowItem"], ["selector", ".gn_left_nav_section .gn_left_nav_section"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' gn_left_nav_section ')]//*[contains(concat(' ', @class, ' '), ' gn_left_nav_section ')]") {
      match($done, "no") {
        attribute("class") {
          value() {
              set("mvBDMenuDropdowItem")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::MoveBefore
    #[["move_me", ".bl_nav_side_no_padding"], ["before_me", ".se_header_pagination"], ["map_moves", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' se_header_pagination ')])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' bl_nav_side_no_padding ')])[1]", "before")
    }
    
    
    #
    #Content::Formatting::InnerRegexReplace
    #[["selector", ".se_nav_title "], ["regex", "(NARROW RESULTS)"], ["replacement", "NARROW BY"], ["multiple", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' se_nav_title ')])[1]") {
      inner() {
        replace(/(NARROW RESULTS)/, "NARROW BY")
      }
    }
    
    
  # end BasicGroup
  
  #3 types of views
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::WrapElement
    #[["selector", ".productThumbnail"], ["class_name", "thumbnails"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
    var("found", "false")
    match($found, "false") {
      $("(//*[contains(concat(' ', @class, ' '), ' productThumbnail ')])[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("class", "thumbnails")
          move_here("//*[contains(concat(' ', @class, ' '), ' productThumbnail ')][not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::WrapIndividualElements
    #[["selector", ".thumbnails"], ["tag_name", "div"], ["class_name", ""], ["id", "moovThumbsWrap"], ["multiple", "true"]]
    $("//*[contains(concat(' ', @class, ' '), ' thumbnails ')]") {
      wrap("div") {
        attribute("id", "moovThumbsWrap")
      }
    }
    
    
    #
    #Group::CookieMatcherGroup
    #[["cookie_name", "mvView"], ["cookie_value_regex", "2"], ["no_cookie_counts", "true"], ["any", ""]]
    var("run_group", "false")
      # when the cookie is found I only run the group if it matches 
      match($cookie, /mvView=1/) {
        var("run_group", "true") 
      }
    match($run_group, "true") {
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", ".productThumbnail"], ["tag_name", "div"], ["class_name", "mvBDListView"], ["id", ""], ["multiple", "true"]]
      $("//*[contains(concat(' ', @class, ' '), ' productThumbnail ')]") {
        #wrap("div") {
        #  attribute("class", "mvBDProductListBox")
        #}
      }
      
      
    }
    
    #
    #Group::CookieMatcherGroup
    #[["cookie_name", "mvView"], ["cookie_value_regex", "1"], ["no_cookie_counts", ""], ["any", ""]]
    var("run_group", "false")
        # when the cookie is not found I still run the group
        match($cookie, not(/mvView/)) {
          var("run_group", "true")
        }
        # match if the cookie is found and matches a particular regex
        match($cookie, /mvView=2/) {
          var("run_group", "true")
          log(var("run_group"))
        }
    match($run_group, "true") {
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", ".productThumbnail"], ["tag_name", "div"], ["class_name", "mvBDProductListBox"], ["id", ""], ["multiple", "true"]]
      $("//*[contains(concat(' ', @class, ' '), ' productThumbnail ')]") {
        wrap("div")
      }
      
      
    }
    
    #
    #Content::Formatting::InnerRegexReplace
    #[["selector", ".productThumbnail a"], ["regex", "(wid=\\d+)"], ["replacement", "wid=200"], ["multiple", "true"]]
    $("//*[contains(concat(' ', @class, ' '), ' productThumbnail ')]//a") {
      inner() {
        replace(/(wid=\d+)/, "wid=200")
      }
    }
    
    
    #
    #Content::Formatting::WrapElement
    #[["selector", "#moovProductContainer"], ["class_name", ""], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
    var("found", "false")
    match($found, "false") {
      $("(//*[@id = 'moovProductContainer'])[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          move_here("//*[@id = 'moovProductContainer'][not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::MoveUp
    #[["move_me", ".se_result_image > a"]]
    $("//*[contains(concat(' ', @class, ' '), ' se_result_image ')]/a") {
      move_to("..", "before")
    }
    
    
    #
    #Content::Formatting::MoveUp
    #[["move_me", ".productThumbnail > a"]]
    $("//*[contains(concat(' ', @class, ' '), ' productThumbnail ')]/a") {
      move_to("..", "before")
    }
    
    
  # end BasicGroup
  
  #Accordionize
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvBDSubNavDropDown"], ["selector", ".mvBDMenuDropdowItem ul"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvBDMenuDropdowItem ')]//ul") {
      match($done, "no") {
        attribute("class") {
          value() {
              set("mvBDSubNavDropDown")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::WrapElement
    #[["selector", ".mvBDMenuDropdowItem"], ["class_name", "mvMenuDropdownitemWrap"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
    var("found", "false")
    match($found, "false") {
      $("(//*[contains(concat(' ', @class, ' '), ' mvBDMenuDropdowItem ')])[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("class", "mvMenuDropdownitemWrap")
          move_here("//*[contains(concat(' ', @class, ' '), ' mvBDMenuDropdowItem ')][not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::Dynamic::Accordian3
    #[["link_selector", ".se_nav_title"], ["content_selector", ".mvMenuDropdownitemWrap"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
    var("counter", "")
    var("content_id_string", "[")
    $("//*[contains(concat(' ', @class, ' '), ' mvMenuDropdownitemWrap ')]") {
        attribute("class") {
          value() {
            append(" mw_accordian_hide")
          }
        }
      var("counter") {
        append("a")
      }
      var("id", fetch("./@id"))
      match($id, /^$/) {
        attribute("id") {
          value() {
            set("acc_con")
            append($counter)
            append("47239")
          }
        }
      }
      var("id", fetch("./@id"))
      var("content_id_string") {
        append("'")
        append($id)
        append("',")
      }
    }
    var("content_id_string") {
      replace(/,$/, "]")
    }
    var("counter", "")
    $("//*[contains(concat(' ', @class, ' '), ' se_nav_title ')]") {
      var("counter") {
        append("a")
      }
      var("id", fetch("./@id"))
      match($id, /^$/) {
        attribute("id") {
          value() {
            set("acc_link")
            append($counter)
            append("47239")
          }
        }
      }
      var("id", fetch("./@id"))
      attribute("onclick") {
        value() {
          set("moovweb_toggle_accordian3('")
          append($id)
          append("', ")
          append($content_id_string)
          append(", 'mw_accordian_hide')")
        }
      }
    }
    
    
    #
    #Content::Formatting::Dynamic::Accordian4
    #[["link_selector", ".gn_left_nav_top"], ["content_selector", ".mvBDSubNavDropDown"], ["ancestor_selector", ".mvBDMenuDropdowItem"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
    var("anc_counter", "")
    $("//*[contains(concat(' ', @class, ' '), ' mvBDMenuDropdowItem ')]") {
      var("anc_counter") {
        append("b")
      }
      var("counter", "")
      var("content_id_string", "[")
      $(".//*[contains(concat(' ', @class, ' '), ' mvBDSubNavDropDown ')]") {
        attribute("class") {
          value() {
            append(" mw_accordian_hide")
          }
        }
        var("counter") {
          append("a")
        }
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("acc_con")
              append($counter)
              append($anc_counter)
              append("16470")
            }
          }
        }
        var("id", fetch("./@id"))
        var("content_id_string") {
          append("'")
          append($id)
          append("',")
        }
      }
      var("content_id_string") {
        replace(/,$/, "]")
      }
      var("counter", "")
      $(".//*[contains(concat(' ', @class, ' '), ' gn_left_nav_top ')]") {
        var("counter") {
          append("a")
        }
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("acc_link")
              append($counter)
              append($anc_counter)
              append("16470")
            }
          }
        }
        var("id", fetch("./@id"))
        attribute("onclick") {
          value() {
            set("moovweb_toggle_accordian3('")
            append($id)
            append("', ")
            append($content_id_string)
            append(", 'mw_accordian_hide')")
          }
        }
      }
    }
    
    
  # end BasicGroup
  
  #
  #Group::IgnoreGroup
  #[]
  # No match necessary - contents will be commented out
  #  #item carousell
  #  #Group::BasicGroup
  #  #[]
  #  # No need to wrap the contents at all
  #    #
  #    #Content::Javascript::AddScriptTag
  #    #[["javascript_path", "http://dl.dropbox.com/u/19014985/projects/bloomingdales/carousell.js"], ["add_after", ""]]
  #    $("//html/head") {
  #      insert_bottom("script") {
  #        attribute("src", "http://dl.dropbox.com/u/19014985/projects/bloomingdales/carousell.js")
  #        attribute("language", "javascript")
  #      }
  #    }
  #    
  #    
  #    #
  #    #Content::Javascript::AddInlineScriptTag
  #    #[["script", "var c = new Carousel(\".mvBDBigView\", \"#mvSlideShowButtons\",true);"], ["add_after", ""], ["add_before", ""]]
  #      $("html/body") {
  #        insert_bottom("script") {
  #          attribute("language", "javascript")
  #          inner("var c = new Carousel(\".mvBDBigView\", \"#mvSlideShowButtons\",true);")
  #        }
  #      }
  #    
  #    
  #  # end BasicGroup
  #  
  
  
  #
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", ".productThumbnail"], ["negate", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' productThumbnail ')])[1]") {
  
    #jsViewSwitcher
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Javascript::AddScriptTag
      #[["javascript_path", "http://dl.dropbox.com/u/19014985/projects/bloomingdales/productViewSwitcher.js"], ["add_after", "body > script:last-of-type"]]
      #$("//body/script[position() = last()]") {
      #  insert_after("script") {
      #    attribute("src", "http://dl.dropbox.com/u/19014985/projects/bloomingdales/productViewSwitcher.js")
      #    attribute("language", "javascript")
      #  }
      #}
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvAlignRight\"><div class=\"mvBDViewChangeButtonGroup\"> <div class=\"mvViewText\">View</div>    \t\t<div onclick=\"moovChangeClass(this.id,'thumbnails', 'mvBDListView', '2')\" class=\"mvBDViewChangeButton\" id=\"mvChangeToListView\"><div></div></div> \t\t \t\t <div onclick=\"moovChangeClass(this.id,'thumbnails', 'mvBDProductListBox', '1')\" class=\"mvBDViewChangeButton\" id=\"mvChangeToBoxView\"><div></div></div>        \t </div></div>"], ["add_after", ".bl_nav_side_no_padding"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_nav_side_no_padding ')])[1]") {
        inject_after("<div class=\"mvAlignRight\"><div class=\"mvBDViewChangeButtonGroup\"> <div class=\"mvViewText\">View</div>    		<div onclick=\"moovChangeClass(this.id,'thumbnails', 'mvBDListView', '2')\" class=\"mvBDViewChangeButton\" id=\"mvChangeToListView\"><div></div></div> 		 		 <div onclick=\"moovChangeClass(this.id,'thumbnails', 'mvBDProductListBox', '1')\" class=\"mvBDViewChangeButton\" id=\"mvChangeToBoxView\"><div></div></div>        	 </div></div>")
      }
      
      
    # end BasicGroup
    
  }
  
  
  #
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", ".productThumbnail"], ["negate", "true"]]
  var("element_exists", "false")
  $("(//*[contains(concat(' ', @class, ' '), ' productThumbnail ')])[1]") {
    var("element_exists", "true")
  }
  match($element_exists, "false") {
  
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".bl_nav_side_no_padding"]]
    $("//*[contains(concat(' ', @class, ' '), ' bl_nav_side_no_padding ')]") {
      remove()
    }
    
    
  }
  
  
  #
  #Content::Formatting::MoveUp
  #[["move_me", ".se_need_help"]]
  $("//*[contains(concat(' ', @class, ' '), ' se_need_help ')]") {
    move_to("..", "before")
  }
  
  
  #
  #Content::Formatting::InnerRegexReplace
  #[["selector", ".se_nav_title"], ["regex", "NARROW RESULTS"], ["replacement", "NARROW BY"], ["multiple", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' se_nav_title ')])[1]") {
    inner() {
      replace(/NARROW RESULTS/, "NARROW BY")
    }
  }
  
  
  #
  #Content::Formatting::MoveAfter
  #[["move_me", "#pageNumbersTop"], ["after_me", ".se_header_pagination"], ["map_multiple", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' se_header_pagination ')])[1]") {
    move_here("(//*[@id = 'pageNumbersTop'])[1]", "after")
  }
  
  
  #
  #Content::Formatting::SetInnerHTML
  #[["selector", ".se_sort"], ["html", "<div class=\"mvSortText\">Sort</div>"], ["prepend", "true"], ["append", ""]]
  $("//*[contains(concat(' ', @class, ' '), ' se_sort ')]") {
    inner() {
      prepend("<div class=\"mvSortText\">Sort</div>")
    }
  }
  
  
  #
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", "#designers_topnav"], ["negate", ""]]
  $("(//*[@id = 'designers_topnav'])[1]") {
  
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".bl_main > script"]]
    $("//*[contains(concat(' ', @class, ' '), ' bl_main ')]/script") {
      remove()
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", "#designers_topnav"], ["html", "<li><a href=\"/search/index.ognc?Action=designer&amp;designer=Women\" id=\"designers_topnav_women\">Women</a></li> \t<li> \t\t<a href=\"/search/index.ognc?Action=designer&amp;designer=Men\" id=\"designers_topnav_men\">Men</a> \t</li> \t<li> \t\t<a href=\"/search/index.ognc?Action=designer&amp;designer=Shoes\" id=\"designers_topnav_shoes\">Shoes</a> \t</li> \t<li> \t\t<a href=\"/search/index.ognc?Action=designer&amp;designer=Handbags\" id=\"designers_topnav_handbags\">Handbags</a> \t</li> \t<li><a href=\"/search/index.ognc?Action=designer&amp;designer=Beauty\" id=\"designers_topnav_beauty\">Beauty</a></li> \t<li><a href=\"/search/index.ognc?Action=designer&amp;designer=Jewelry+%26+Accessories\" id=\"designers_topnav_jewelry_accessories\">Jelelry &amp; Accessories</a></li> \t<li><a href=\"/search/index.ognc?Action=designer&amp;designer=Kids\" id=\"designers_topnav_kids\">Kids</a></li> \t<li><a href=\"/search/index.ognc?Action=designer&amp;designer=Home\" id=\"designers_topnav_home\">Home</a></li>"], ["prepend", ""], ["append", ""]]
    $("//*[@id = 'designers_topnav']") {
      inner("<li><a href=\"/search/index.ognc?Action=designer&amp;designer=Women\" id=\"designers_topnav_women\">Women</a></li> 	<li> 		<a href=\"/search/index.ognc?Action=designer&amp;designer=Men\" id=\"designers_topnav_men\">Men</a> 	</li> 	<li> 		<a href=\"/search/index.ognc?Action=designer&amp;designer=Shoes\" id=\"designers_topnav_shoes\">Shoes</a> 	</li> 	<li> 		<a href=\"/search/index.ognc?Action=designer&amp;designer=Handbags\" id=\"designers_topnav_handbags\">Handbags</a> 	</li> 	<li><a href=\"/search/index.ognc?Action=designer&amp;designer=Beauty\" id=\"designers_topnav_beauty\">Beauty</a></li> 	<li><a href=\"/search/index.ognc?Action=designer&amp;designer=Jewelry+%26+Accessories\" id=\"designers_topnav_jewelry_accessories\">Jelelry &amp; Accessories</a></li> 	<li><a href=\"/search/index.ognc?Action=designer&amp;designer=Kids\" id=\"designers_topnav_kids\">Kids</a></li> 	<li><a href=\"/search/index.ognc?Action=designer&amp;designer=Home\" id=\"designers_topnav_home\">Home</a></li>")
    }
    
    
  }
  
  
  #narrowBy auto close
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::Dynamic::AddClassOnEvent
    #[["target", ".mvMenuDropdownitemWrap"], ["trigger", "select.se_sort"], ["new_class", "mw_accordian_hide"], ["trigger_event", "mousedown"]]
    $("(//*[contains(concat(' ', @class, ' '), ' mvMenuDropdownitemWrap ')])[1]") {
      var("id", fetch("./@id"))
      match($id, /^$/) {
        attribute("id") {
          value() {
            set("addclasstarget80393")
          }
        }
      }
      var("target_id", fetch("./@id"))
    }
    $("(//select[contains(concat(' ', @class, ' '), ' se_sort ')])[1]") {
      var("id", fetch("./@id"))
      match($id, /^$/) {
        attribute("id") {
          value() {
            set("addclasstrigger80393")
          }
        }
      }
      var("trigger_id", fetch("./@id"))
    }
    match($trigger_id, not(/^$/)) {
      match($target_id, not(/^$/)) {
        $("//html/body") {
          insert_bottom("script") {
            inner() {
              set("document.getElementById('")
              append($trigger_id)
              append("').addEventListener('mousedown', function(){add_class(document.getElementById('")
              append($target_id)
              append("'),'mw_accordian_hide');},false);")
            }
          }
        }
      }
    }
    
    #
    #Content::Formatting::Dynamic::RemoveClassOnEvent
    #[["target", ".se_nav_title"], ["trigger", "select.se_sort"], ["old_class", "moovweb_open"], ["trigger_event", "mousedown"]]
    $("(//*[contains(concat(' ', @class, ' '), ' se_nav_title ')])[1]") {
      var("id", fetch("./@id"))
      match($id, /^$/) {
        attribute("id") {
          value() {
            set("addclasstarget17297")
          }
        }
      }
      var("target_id", fetch("./@id"))
    }
    $("(//select[contains(concat(' ', @class, ' '), ' se_sort ')])[1]") {
      var("id", fetch("./@id"))
      match($id, /^$/) {
        attribute("id") {
          value() {
            set("addclasstrigger17297")
          }
        }
      }
      var("trigger_id", fetch("./@id"))
    }
    match($trigger_id, not(/^$/)) {
      match($target_id, not(/^$/)) {
        $("//html/body") {
          insert_bottom("script") {
            inner() {
              set("document.getElementById('")
              append($trigger_id)
              append("').addEventListener('mousedown', function(){remove_class(document.getElementById('")
              append($target_id)
              append("'),'moovweb_open');},false);")
            }
          }
        }
      }
    }
    
  # end BasicGroup
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", " "], ["selector", "#mvBDBloomiesLink"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[@id = 'mvBDBloomiesLink']") {
    match($done, "no") {
        var("done", "yes")
      attribute("class") {
        value() {
            set(" ")
        }
      }
    }
  }
  
  
  #
  #Content::Formatting::MoveBefore
  #[["move_me", ".se_paddingTop_Need_Help"], ["before_me", "#se_localContentContainer_static"], ["map_moves", ""]]
  $("(//*[@id = 'se_localContentContainer_static'])[1]") {
    move_here("(//*[contains(concat(' ', @class, ' '), ' se_paddingTop_Need_Help ')])[1]", "before")
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "se_need_help"], ["selector", ".se_paddingTop_Need_Help"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[contains(concat(' ', @class, ' '), ' se_paddingTop_Need_Help ')]") {
    match($done, "no") {
        var("done", "yes")
      attribute("class") {
        value() {
            append(" se_need_help")
        }
      }
    }
  }
  
  
  # #
  #   #Content::Formatting::RemoveElements
  #   #[["selector", ".se_paddingBottom"]]
  #   $("//*[contains(concat(' ', @class, ' '), ' se_paddingBottom ')]") {
  #     remove()
  #   }
  #   
  
#}

# Move product color to the bottom of the cell
$(".//div[@class='mvBDListView']") {
  $("./div[@class='productThumbnail']") {
    $("./div") {
      $("./img") {
        move_to("../../div", "bottom")
      }
    }
  }
}
$("/html/body") {
  insert_javascript_bottom("x$(document).on('DOMContentLoaded', function () { x$('#topBtwnROff').un('mouseover'); x$('#topBtwnR img').on('click', function() {console.log('you touched me'); }); });")

	
	#581 remove related information section from search result pages.
	$('//div[contains(@class,"se_paddingTop")]/div[not(@id)]') {
		remove();
	}

}


# Expanded menus
match($path) {
  # Department
  with (/(&Action=expand&more=Department)|(&Action=expand&less=Department)/) {
    $("//div[@id='acc_linka47239']") {
      add_class("moovweb_open")
    }
    
    $("//div[@id='acc_cona47239']") {
      attribute("class") {
        value() {
          set("mvMenuDropdownitemWrap")
        }
      }
    }
    
    $("//div[@id='acc_linkabb16470']") {
      add_class("moovweb_open")
    }
    
    $("//ul[@id='acc_conabb16470']") {
      attribute("class") {
        value() {
          set("mvBDSubNavDropDown")
        }
      }
    }
    
    $("//ul[@id='acc_conaabb16470']") {
      attribute("class") {
        value() {
          set("mvBDSubNavDropDown")
        }
      }
    }
    
    $("(//a[contains(concat(' ', @class, ' '), ' se_moreless ')])[1]") {
      attribute("href") {
        value() {
          replace(/(&Action=expand&attrs=)/,"&Action=expand&less=Department&attrs=")
        }
      }
    }
  } #End of Department
  
  # Brand
  with (/(&Action=expand&more=Brand)|(&Action=expand&less=Brand)/) { 
    $("//div[@id='acc_linka47239']") {
      add_class("moovweb_open")
    }
    
    $("//div[@id='acc_cona47239']") {
      attribute("class") {
        value() {
          set("mvMenuDropdownitemWrap")
        }
      }
    }
    
    $("//div[@id='acc_linkabbb16470']") {
      add_class("moovweb_open")
    }
    
    $("//ul[@id='acc_conabbb16470']") {
      attribute("class") {
        value() {
          set("mvBDSubNavDropDown")
        }
      }
    }
    
    $("//ul[@id='acc_conaabbb16470']") {
      attribute("class") {
        value() {
          set("mvBDSubNavDropDown")
        }
      }
    }
    
    $("(//a[contains(concat(' ', @class, ' '), ' se_moreless ')])[2]") {
      attribute("href") {
        value() {
          replace(/(&Action=expand&attrs=)/,"&Action=expand&less=Brand&attrs=")
        }
      }
    }
  } #End of Brand
  
  # Change size and quality of the images from 200x200 to 115x115 px
  # which is the size we used to reduce them to using css.
  # This makes the total page size 681kbs instead of 1038kbs
  # which meens a gain of 357kb per search on every search
  # since the results aren't cached
  $(".//div[contains(@class, 'thumbnails')]") {
    $(".//a/img") {
      attribute("src") {
        value() {
          replace(/wid=[0-9]*/, "wid=115")
          replace(/qlt\=[0-9(\,)]*/, "qlt=75,0")
          replace(/hei=[0-9]*/, "hei=115")
          # replace(/jpeg&.*/, "jpeg")
          # change the last question mark into an ampersand for valid query parameters
          replace(/(\?.+)\?/, "\\1&")
        }
      }
    }
  }
  
  # Spriting
  $(".//div[@class='mvBDViewChangeButtonGroup']") {
    $("./div[@id='mvChangeToListView']/div") {
      inject_bottom("<div class = 'sprite_cat-listviewicon'></div>")
    }
    $("./div[@id='mvChangeToBoxView']/div") {
      inject_bottom("<div class = 'sprite_cat-gridViewIcon'></div>")
    }
  }
  $(".//div[@class='se_result_image']/img") {
    insert_before("div", class: "sprite_cat-more_colors")
    remove()
  }
}

