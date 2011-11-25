$("body") {
  add_class("mw_more_product_info")
  $("form/div[@id='popupContainer']") {
    $("div[@id='popupHdr']") {
      remove()
    }
    
    $("div[@class='popupMain']") {
      $("table/tr/td/child::text()[normalize-space(.)]") {
        wrap("span")
      }
      move_here("table/tr/td/*")
      $("table | img") {
        remove()
      }
      $("a[img]") {
        var("alt", fetch("img/@alt"))
        insert_bottom("span", $alt)
        $("img") {
          remove()
        }
      }
    }
  }
}
