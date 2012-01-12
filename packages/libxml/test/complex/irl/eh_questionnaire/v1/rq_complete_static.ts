
# ----- ConfigBlocks ----
#
#Config::IncludeBlockset
#[["blockset_name", "base"]]
@import base.ts


#
#Config::IncludeBlockset
#[["blockset_name", "rq_base"]]
@import rq_base.ts



# ----- ParsedHTMLBlocks ----
html() {
  #
  #Default block
  #Content::CSS::RemoveCSS
  #[["regex_exclusion", ""]]
  $("/html/head//style") {
    remove()
  }
  $("/html/head//link[@rel = 'stylesheet']") {
    remove()
  }
  
  #
  #Default block
  #Content::Formatting::AddViewport
  #[["scalable", ""]]
  $("/html/head") {
    insert_top("meta") {
      attribute("name", "viewport")
      attribute("content", "width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;")
    }
  }
  
  #
  #Default block
  #Content::Absolutize::AbsolutizeFavicon
  #[]
  $("/html/head") {
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
  #Step 1 of 2, remove body element
  #Content::Formatting::RemoveElements
  #[["selector", "body"]]
  $("//body") {
    remove()
  }
  
  
  #
  #Content::Features::InsertExtractedHTMLChunk
  #[["add_after", "head"], ["chunk_name", "rq_complete_static"], ["source_url", "http://d1topzp4nao5hp.cloudfront.net/eharmony/rq_complete_body.html"], ["source_selector", "body"], ["dont_cache", ""]]
  # NOTE: No converter for this block because it is rarely used.
  # On macys it is always in an ignore group
  # Might be used on movies, lendingtree, hammacher, and eharmony
  $("/html/head") {
    inject_after(read("rq_complete.html")) {
      $(".//img[@id='mw_rq_complete_congrats']") {
        attribute("src", asset("images/rq_congrats.png"))
      }
      $(".//div[@id='pageContainer']//a[@id='mw_rq_complete_continue']") {
        $rq_complete_continue_href = $host
        
        var("rq_complete_continue_href") {
          prepend("//")
          append("/singles/servlet/user/mymatches")
        }
        
        attribute("href", $rq_complete_continue_href)
      }
    }
  }
  
  #
  #Content::CSS::AddCSS
  #[["css_path", "//d35wknniannwqo.cloudfront.net/eharmony/998689328529/rq_complete.css?moov_cache_name=eharmony-rq_complete.css&moov_cache_version=998689328529"], ["encode_image_threshold", ""]]
  $('//html/head') {
    insert_bottom("link", rel: "stylesheet", type: "text/css", href: sass("v1/subscription_global"))
    insert_bottom("link", rel: "stylesheet", type: "text/css", href: sass("v1/rq"))
  }
  
  
}
# ----- PostRawHTMLBlocks ----
#
#Default block
#Content::Inject::InjectCopyrightNoticeComment
#[]
# NOT IMPLEMENTING for now

