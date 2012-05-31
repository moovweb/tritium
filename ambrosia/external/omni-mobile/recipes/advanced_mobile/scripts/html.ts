
# HTML Transformations go here

$("/html") {
  
  # Needed for Perfect Proxy
  
  rewrite_links()
  
  
  absolutize_srcs()
    

  # Needed to begin mobilizing
  
  remove_all_styles()

  remove_html_comments()
  
  meta_tags()

  add_assets()
  

  
  @import keep_desktop_js.ts
  

  
  @import sections/header.ts
  @import sections/footer.ts

  @import mappings.ts
  
  
  
  
  # Remove desktop site javascript
  # PASSTHROUGH: To passthrough javascript, delete the function call below
  remove_desktop_js()
  
  
  
  # Include mw_analytics file to track the mobile site
  @import mw_analytics.ts
  

}





