
# ----- ConfigBlocks ----
#
#Config::IncludeBlockset
#[["blockset_name", "base"]]
@import base.ts



# ----- ParsedHTMLBlocks ----
html() {
  #
  #Content::CSS::AddCSS
  #[["css_path", "https://dl.dropbox.com/u/6208053/macys/photoon_menu.css"]]
  $('//html/head') {
    insert_bottom("link", rel: "stylesheet", type: "text/css", href: sass("pages/photoon_menu.css"))
  }
  
  
  #Header
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #Remove Images From Menus
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #Top Menu
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Meta::ExtractAttributeValues
        #[["selector", ".globalNavigationBar img"], ["attribute", "alt"], ["regex_capture", ""], ["result_key", ""]]
        $("//*[contains(concat(' ', @class, ' '), ' globalNavigationBar ')]//img") {
          $chain = concat("chain", index())
          var($chain, fetch("./@alt"))
        }
        
        
        #
        #Content::Formatting::SetInnerText
        #[["selector", ".globalNavigationBar a"], ["text", ""], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", "true"]]
        # NOTE: not sure if /html() or /text() is what I want to be using here
        $("//*[contains(concat(' ', @class, ' '), ' globalNavigationBar ')]//a") {
          $chain = concat("chain", index())
          inner() {
            set(var($chain))
          }
        }
        
        
        #
        #Content::Formatting::RemoveElements
        #[["selector", ".globalNavigationBar img"]]
        $("//*[contains(concat(' ', @class, ' '), ' globalNavigationBar ')]//img") {
          remove()
        }
        
        
        #Correct text- for the home
        #For the home alt is home furnishings which is incorrect.
        #Content::Formatting::SetInnerText
        #[["selector", ".globalNavigationBar li a:contains(\"home furnishings\")"], ["text", "for the home"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
        # NOTE: not sure if /html() or /text() is what I want to be using here
        $("//*[contains(concat(' ', @class, ' '), ' globalNavigationBar ')]//li//a[contains(., \"home furnishings\")]") {
          inner() {
            set("for the home")
          }
        }
        
        
      # end BasicGroup
      
      #Secondary Menu
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Meta::ExtractAttributeValues
        #[["selector", ".subNavImageMap img"], ["attribute", "alt"], ["regex_capture", ""], ["result_key", ""]]
        $("//*[contains(concat(' ', @class, ' '), ' subNavImageMap ')]//img") {
          $chain = concat("chain", index())
          var($chain, fetch("./@alt"))
        }
        
        
        #
        #Content::Formatting::SetInnerText
        #[["selector", ".subNavImageMap > a"], ["text", ""], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", "true"]]
        # NOTE: not sure if /html() or /text() is what I want to be using here
        $("//*[contains(concat(' ', @class, ' '), ' subNavImageMap ')]/a") {
          $chain = concat("chain", index())
          inner() {
            set(var($chain))
          }
        }
        
        
        #
        #Content::Formatting::RemoveElements
        #[["selector", ".subNavImageMap img"]]
        $("//*[contains(concat(' ', @class, ' '), ' subNavImageMap ')]//img") {
          remove()
        }
        
        
      # end BasicGroup
      
      #Search Form
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Inject::InjectHTML
        #[["html", "<span></span>"], ["add_after", "#globalSubNav > form > img"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[@id = 'globalSubNav']/form/img)[1]") {
          inject_after("<span></span>")
        }
        
        
        #
        #Content::Meta::ExtractAttributeValues
        #[["selector", "#globalSubNav > form > img"], ["attribute", "alt"], ["regex_capture", ""], ["result_key", ""]]
        $("//*[@id = 'globalSubNav']/form/img") {
        $chain = concat("chain", index())
          var($chain, fetch("./@alt"))
        }
        
        
        #
        #Content::Formatting::SetInnerText
        #[["selector", "#globalSubNav > form > span"], ["text", ""], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", "true"]]
        # NOTE: not sure if /html() or /text() is what I want to be using here
        $("//*[@id = 'globalSubNav']/form/span") {
          $chain = concat("chain", index())
          inner() {
            set(var($chain))
          }
        }
        
        
        #
        #Content::Formatting::RemoveElements
        #[["selector", "#globalSubNav > form > img"]]
        $("//*[@id = 'globalSubNav']/form/img") {
          remove()
        }
        
        
      # end BasicGroup
      
    # end BasicGroup
    
    #
    #Content::Formatting::MoveBefore
    #[["move_me", "#globalNav"], ["before_me", "#doc3"], ["map_moves", ""]]
    $("(//*[@id = 'doc3'])[1]") {
      move_here("(//*[@id = 'globalNav'])[1]", "before")
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#doc3"]]
    $("//*[@id = 'doc3']") {
      remove()
    }
    
    
  # end BasicGroup
  
  #Remove Elements Group
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#globalContentContainer"]]
    $("//*[@id = 'globalContentContainer']") {
      remove()
    }
    
    
  # end BasicGroup
  
  #Photon Integration
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Inject::InjectHTML
    #[["html", "<meta name='mw_page_type' content='Menu'>"], ["add_after", "title"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//title)[1]") {
      inject_after("<meta name='mw_page_type' content='Menu'>")
    }
    
    
  # end BasicGroup
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", ".moovweb_footer"]]
  $("//*[contains(concat(' ', @class, ' '), ' moovweb_footer ')]") {
    remove()
  }
  
  
}
