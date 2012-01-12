
# ----- RawHTMLBlocks ----
#
#Content::Raw::RegexReplace
#[["match", "ehsinglescomprod"], ["replace", "ehsinglesmobileweb"], ["multiline", ""]]
replace(/ehsinglescomprod/, "ehsinglesmobileweb")



# ----- ParsedHTMLBlocks ----
html() {
  #Default
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Default block
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
    #Default block
    #Content::Passthrough::Form
    #[["regex_exclusion", ""]]
    # NOTE: AF: Very loose implementation. Just rewriting all the forms as
    # we tend to do in v2
    $("//form") { 
      attribute("action") {
        value() {
          rewrite("link")
        }
      }
    }
    
    
    #
    #Default block
    #Content::CSS::RemoveCSS
    #[["regex_exclusion", ""]]
    $("//style") {
      remove()
    }
    $("//link[@rel = 'stylesheet']") {
      remove()
    }
    
    
    #
    #Default block
    #Content::Absolutize::AbsolutizeImages
    #[]
    $("//img[@src]") {
      var("src", fetch("./@src"))
      attribute("src") {
        value() {
          # if the src starts with a slash (/) but not a double slash (//) then add the host
          match($src, /^\/[^\/]/) {
            prepend($source_host)
            prepend("//")
          }
          # TODO: handle the case where the image URL is page-relative (doesn't start with http
          # or a slash)
        }
      }
    }
    
    
    #
    #Default block
    #Content::Development::SubdomainFix
    #[]
    # NOT IMPLEMENTING - development blocks are unnecessary
    
    
    #
    #Default block
    #Content::Development::KillBrowserCache
    #[]
    # NOT IMPLEMENTING - development blocks are unnecessary
    
    
    #
    #Default block
    #Content::Formatting::AddViewport
    #[["scalable", ""]]
    $("html/head") {
      insert_top("meta") {
        attribute("name", "viewport")
        attribute("content", "width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;")
      }
    }
    
    #
    #Default block
    #Content::Absolutize::AbsolutizeFavicon
    #[]
    $("html/head") {
      var("icon_exists", "false")
      # Find the shortcut icons and give them the source host if they don't have a host
      $(".//link[@rel = 'shortcut icon' or @rel = 'icon']") {
        var("icon_exists", "true")
        var("href", fetch("./@href"))
        attribute("href") {
          value() {
            # if the URL begins with a slash put the source host in front
            # TODO: handle the case when the favicon doesn't begin with http or a slash
            match($href, /^\//) {
              prepend($source_host)
              prepend("//")
            }
          }
        }
      }
      # If there are no shortcut icons, add one
      match($icon_exists, "false") {
        insert_bottom("link") {
          attribute("rel", "shortcut icon")
          attribute("href") {
            value() {
              set($source_host)
              prepend("//")
              append("/favicon.ico")
            }
          }
        }
      }
    }
    
    
    #
    #Content::Passthrough::Ajax
    #[]
    # --- not found ---
    
  # end BasicGroup
  
}