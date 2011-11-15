# The yourshoppinglistcontainer does not have a body tag
# and this is causes the whole page to act differently
# After clicking add to shopping list from the container you navigate to this page shoppinglist_linkcontainer.jsp which is missing a body tag
match($path, /shoppinglistcontainer|favouritelayout|shoppinglist_linkcontainer\.jsp/) {
  $("/html/frameset") {
    wrap("body", class:"mw_shoppingList")
  }
}



# This files only purpose is to reformat the framesets into iframes, making it possible for us to 
# adjust and style them
# This is highly simplified file over the parameter techinique we were trying before

$("/html/body") {
  log("--> Into container.ts situation")
  # add a class to the body to make styling a bit easier
  add_class("mw_containers")
  # if we find a frameset step into it
  $("./frameset") {
    # we found the frameset, remove any noscripts
    $("../noscript") {
      remove()
    }
    # mobile doesn't need the header frame
    # WRONG -- the mobile site does need the header frame,
    # Javascript breaks without it
    $("./frame[@name='header']") {
      attribute("src", "")
      # remove()
    }
    # wrapping the inner content of the frameset
    inner_wrap("div", id: "mw_content") {
      $(".//frame") {
        # renaming the frames tags to iframes
        name("iframe")
        # Add the uranium attributes to toggler the trolley
      }
      # There is a second, inner frameset. We want to pull the new iframes out of it, then delete it
      $("./frameset") {
        # move the the iframes to the parent frameset
        $("./iframe") {
          move_to("../..")
        }
        remove();
      }
      # once everything is wrapped move them all to the body
      move_to("/html/body")
    }
    # Delete the actual frameset
    remove()
    
  }

  # since everything inside the body, wrap everything in one container (for styling purposes)
  inner_wrap("div", id: "mw_mainWrapper")
}

