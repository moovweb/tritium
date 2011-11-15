# 
# # ----- ConfigBlocks ----
# #
# #Config::IncludeBlockset
# #[["blockset_name", "base"]]
# #@import base.ts
# 
# 
# 
# # ----- ParsedHTMLBlocks ----
# #html() {
#   #
#   #Content::CSS::AddCSS
#   #[["css_path", "http://dl.dropbox.com/u/19014985/projects/bloomingdales/popUps.css"], ["encode_image_threshold", ""]]
#   $('//html/head') {
#     insert_bottom("link", rel: "stylesheet", type: "text/css", href: "http://dl.dropbox.com/u/19014985/projects/bloomingdales/popUps.css")
#   }
  
  $('//html') {
    # search the document an 
    # embed tag and create a variable from its src
     $("//embed[1]"){
       $src = fetch("@src")
       log(concat("Embed source:",$src))
        $('head'){
          $('link'){
            remove()
          }
        }
        $("//body"){
          $newLocation = concat("document.location.replace('", $src, "')")
          attribute("onLoad", $newLocation )
          $("*"){
            remove()
          }
        }
     }
     # search the document for any script that adds an 
     # embed statement and create a variable from its src
    $("//script[contains(text(), 'embed')]"){
      inner(){
        replace(/<embed.+?src\s?=\s?"(.+?)".+?>/im){
          dump()
          log($1)
        }
      }
      # deep search for body after matching on an embed statement
      # so i can only run this line if its in the body.
      $('head'){
        $('link'){
          remove()
        }
      }
      $("//body"){
        $newLocation = concat("document.location.replace('", $1, "')")
        attribute("onLoad", $newLocation )
        $("*"){
          remove()
        }
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
  #[["selector", "[src*=\"woman.gif\"]"]]
  $("//*[contains(@src, \"woman.gif\")]") {
    remove()
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", ".se_paddingBottom img[src*=\".results.gif\"]"]]
  $("//*[contains(concat(' ', @class, ' '), ' se_paddingBottom ')]//img[contains(@src, \".results.gif\")]") {
    remove()
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvButton"], ["selector", "img[src*=\"b_closewindow.gif\"]"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//img[contains(@src, \"b_closewindow.gif\")]") {
    match($done, "no") {
      $("..") {
      attribute("class") {
        value() {
            append(" mvButton")
        }
      }
      }
    }
  }
  
  
  #
  #Content::Formatting::SetInnerHTML
  #[["selector", ".mvButton"], ["html", "back"], ["prepend", ""], ["append", ""]]
  $("//*[contains(concat(' ', @class, ' '), ' mvButton ')]") {
    inner("back")
  }
  
  
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
  
  
  #
  #Group::URLMatcherGroup
  #[["url_matcher", "\\/email\\/index"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /\/email\/index/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvEmailAFriend"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvEmailAFriend")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvButton"], ["selector", "input[name=\"SUBMIT_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//input[@name = \"SUBMIT_BUTTON\"]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvButton")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvCaptcha"], ["selector", ".img_security_word"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' img_security_word ')]") {
      match($done, "no") {
        $("..") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvCaptcha")
          }
        }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "type"], ["value", "submit"], ["selector", "input[name=\"SUBMIT_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//input[@name = \"SUBMIT_BUTTON\"]") {
      match($done, "no") {
          var("done", "yes")
        attribute("type") {
          value() {
              set("submit")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "style"], ["selector", ".bl_pop_body > div"]]
    $("//*[contains(concat(' ', @class, ' '), ' bl_pop_body ')]/div") {
      attribute("style") {
        remove()
      }
    }
    
    
    #
    #Content::Passthrough::Attribute
    #[["selector", ".img_security_word > img"], ["attribute", "src"], ["regex_capture", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' img_security_word ')]/img") {
      attribute("src") {
        value() {
          rewrite("link")
        }
      }
    }
    
    
  }
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "value"], ["value", "send now"], ["selector", ".mvEmailAFriend input[name=\"SUBMIT_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[contains(concat(' ', @class, ' '), ' mvEmailAFriend ')]//input[@name = \"SUBMIT_BUTTON\"]") {
    match($done, "no") {
        var("done", "yes")
      attribute("value") {
        value() {
            set("send now")
        }
      }
    }
  }
  
  match($path){
    with(/catalog\/product\/egcterms/){
      $("//body"){
        add_class("mw_gift_card_pop")
      }
    }
  }
  
  #add class to body for css
  $("//body"){
    add_class("mw_popup")
  }
  
  insert_javascript_bottom("x$('a[href*=\"top\"]').on('click', function(){window.scroll(0,0);})") 
  
#}
match($path) {
  with(/(catalog\/product\/vgcemailpreview\.ognc)/) {
    $("//img[@alt='Print E-Gift Card To Redeem In Store']/../img | //img[@alt='Print E-Gift Card To Redeem In Store']/../br") {
      remove()
    }
    
    $("//span[contains(@class,'bl_pdp_gwp_popUpText')]") {
      inject_after("<br>")
    }
    
    $("//a[@href='javascript:window.close();']/..") {
      move_to("//div[contains(@class,'moovweb_footer')]","before")
    }
  }
}
 