
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
  

  

  
  @import sections/header.ts
  @import sections/footer.ts

  @import mappings.ts
  
  
  
  
  
  

}





