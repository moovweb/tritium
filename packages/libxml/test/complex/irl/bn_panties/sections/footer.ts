# THIS FILE NO LONGER SEEMS TO RUN. I DON'T HAVE TIME TO FIGURE OUT WHY,
# BUT THE CULPRIT MUST BE IN THE NOW-CONVOLUTED HTML.TS.
# --AARON, 12/13/2011

$("div[@id='footer_bot']") {
  $("*[position() > 1]") {
    remove()
  }
  # Setup the desktop site link
    # Insert the desktop site link
  insert_bottom("a", id: "mw_desktop_link", href: "http://www.barenecessities.com") {
        # Insert the icon using sprites
    insert_bottom("div", class: "icons-desktop-link")
    wrap("div")
  }
}

$("div[@id='footer_top']") {
  # Updated to remove "join our mailing list" (a[2]) and "affiliate program" (a[6]) (-JBB)
  $("a[1] | a[2] | a[6] | img") {
    remove()
  }
  # Wrap the footer top links in a span
  $("./a") {
    inner_wrap("span") {
      # Add icons using sprites
      insert_bottom("span", class: "icons-orange-link-arrow")
    }
  }
}
