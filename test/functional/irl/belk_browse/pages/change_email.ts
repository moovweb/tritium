
$("/html/body[contains(@class,'forgot_password')]") {
  add_class("mw_forgot_password")
}
$("/html/body[contains(@class, 'sign_in')]") {
  add_class("mw_sign_in")
}
$("/html/body[contains(@class,'change_email')]") {
  add_class("mw_change_email")
}

$("/html/body") {
  $("./div[@id='page_wrapper']") {
    $("./div[@id='page']") {
      $("./div[@id='head']") {
        # remove main navigation and promo for this page
        $("./ul[@id='main_nav']") {
          remove()
        }
        $("./div[@id='promo']") {
          remove()
        }
      }
      $("./div[@id='main']") {
        $("./div[@id='subnav']") {
          move_to("../div[@id='content']", "after")
          $("./ul") {
            $("./li") {
              attribute("toggle-button", "h3")
              attribute("toggle-selector", "ul")
              $("./h3") {
                $("./a") {
                  # removing the href here because it seems redundant - each link is directly accessible here, without having to go to my account
                  attribute("href", "")
                }
              }
              $("./ul") {
                add_class("closed")
              }
            }
          }
        }
        $("./div[@id='content']") {
          $("./div[@id='account_details']") {
            $("./form") {
              $("./fieldset") {
                $("./ul") {
                  $("./li[input[@type='checkbox']]") {
                    add_class("mw_li_has_checkbox")
                    $("./input[@type='checkbox']") {
                      attribute("style", "")
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

