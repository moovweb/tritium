
# ----- ConfigBlocks ----
#
#Config::IncludeBlockset
#[["blockset_name", "base"]]
#@import base.ts



# ----- ParsedHTMLBlocks ----
#html() {
  #
  #Content::CSS::AddCSS
  #[["css_path", "http://dl.dropbox.com/u/19014985/projects/bloomingdales/myAccount.css"], ["encode_image_threshold", ""]]
  $('//html/head') {
    insert_bottom("link", rel: "stylesheet", type: "text/css", href: "http://dl.dropbox.com/u/19014985/projects/bloomingdales/myAccount.css")
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", ".cr_header_left"]]
  $("//*[contains(concat(' ', @class, ' '), ' cr_header_left ')]") {
    remove()
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
  
  
#}