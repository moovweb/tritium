
# ----- ParsedHTMLBlocks ----
html() {
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "href"], ["value", "javascript:self.close();"], ["selector", "a[href*=\"javascript:window\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//a[contains(@href, \"javascript:window\")]") {
    match($done, "no") {
      attribute("href") {
        value() {
            set("javascript:self.close();")
        }
      }
    }
  }
  
  
  #
  #Content::Formatting::Table::Remove::ColumnDump
  #[["selector", ""]]
  $("//table") {
    # TODO: only go forward if this is a table element
    $("tr") {
      $("td") {
        name("div")
        move_to("..", "before")
      }
      remove()
    }
    name("div")
    attribute("was_table", "true")
    attribute("cellspacing") {
      remove()
    }
    attribute("cellpadding") {
      remove()
    }
    attribute("border") {
      remove()
    }
  }
  
  
}