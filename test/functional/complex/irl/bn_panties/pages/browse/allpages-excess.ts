$("body") {
  #remove extra nav from top
  $("//div[@id='navigation']") {
    remove()
  }

  #remove extra tabs from bottom
  $("div[@id='tab_1'] | div[@id='tab_2'] | div[@id='tab_3'] | div[@id='tab_4'] | div[@id='tab_5'] | div[@id='tab_6'] | div[@id='tab_7'] | div[@id='tab_8'] | div[@id='tab_9'] | div[@id='tab_10'] | div[@id='tab_11'] | div[@id='tab_12']") {
    remove()
  }
  
  #remove extra lightbox thats showing up on mobile
  $("//div[@id='items_in_cart_popup_lightbox']") {
    remove()
  }
}

