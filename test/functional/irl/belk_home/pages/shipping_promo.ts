$("/html/body") {
  add_class("mw_shipping_promo")
  $("./div[@id='page_wrapper']") {
    $("./div[@id='page']") {
      $("./div[@id='header']") {
        $(".//div[@class='nav']") {
          remove()
        }
      }
      $("./div[@id='main']") {
        $("./div[@id='aside']") {
          remove()
        }
        $("./div[@id='content']") {
          $("./div[@id='bread_crumb']") {
            remove()
          }
          $("./div[@id='block_box']") {
            $("./div[@id='image_holder']") {
              remove()
            }
            $("./div[@id='message_holder']") {
              $(".//br") {
                remove();
              }
            }
          }
        }
      }
    }
  }
}
