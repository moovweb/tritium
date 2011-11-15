# This script is used to grab the free shipping link from the left navigation 
# div and place it at the bottom of the current context. This script MUST be
# imported before the leftNav div is removed! This should be imported on
# nearly every page in the browse flow.

# Grab the div that contains the free shipping banner
move_here("(/html/body/form/div[@id='mainContainer']/div[@id='leftNav']/div[@id='leftNavSpecial'])[1]", "bottom") {
  # REMOVE FOR NOW, UNTIL CLIENT FIXES IT
  remove()
  # Grab the free shipping link
  # $("a[1]") {
  #     # Create dynamic banner based on mockup image
  #   insert_top("div", class: "mw_fs") {
  #         # These are the 3 elements in the banner (2 text divs and a background image)
  #     insert_top("div", class: "mw_fs_text") {
  #       text("FREE Shipping")
  #     }
  #         # Use the alt text for the second line of text
  #     insert_top("div", class: "mw_fs_text2") {
  #       text(fetch("./../../img/@alt"))
  #     }
  #         # This div is styled to have the details image on the right side
  #     insert_top("div", class: "icons-details")
  #   }
  # }
  # # Remove the image now that we've created our own visual version of the banner
  # $("a/img") {
  #   remove()
  # }
}
