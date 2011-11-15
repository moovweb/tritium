$("/html/body") {
  add_class("mw_sign_in")
  $(".//div[@id='content']") {
    $(".//button[@title='Sign In and Checkout']") {
      $("./div") {
        name("span")
      }
      inject_bottom("<span>&rsaquo;</span>")
    }
    $("./div[@class='box_wrap']") {
      $("./div[@class='new_customer']") {
        $("./h2") {
          remove()
        }
        $("./div[@class='wrap']") {
          $("./p") {
            remove()
          }
        }
        move_to("../h3", "after")
      }
      $("./h3[contains(text(), 'Checkout')]") {
        inject_after("<div class='mw_new_customer_msg'>If you are a new customer, swipe down to register.</div>")
      }
      $("./div[@class='guest'][//a[contains(text(), 'Register and Checkout')]]") {
        attribute("mw_checkout", "true")
        $("./h2") {
          remove()
        }
        $("./div[@class='wrap']") {
          $("./p[last()]") {
            remove()
          }
        }
      }
      $("./div[@class='guest' and not(@mw_checkout)]") {
        $("./h2") {
          remove()
        }
        $("./div[@class='wrap']") {
          $("./p") {
            remove()
          }
        }
      }
    }
    $("./div[@class='register_or_login']") {
      remove()
    }
    $(".//div[contains(@class, 'hover2_modal_container')]") {
      attribute("data-ur-set", "toggler")
      $("./a") {
        attribute("class", "")
        attribute("href", "javascript:void(0)")
        attribute("data-ur-toggler-component", "button")
      }
      $("./div") {
        attribute("class", "")
        attribute("data-ur-toggler-component", "content")
      }
    }
  }
}
