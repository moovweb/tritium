#$("/html/body") {
#  add_class("mw_coupon")
#  $("./div[@id='page_wrapper']") {
#    $("./div[@id='page']") {
#      $(".//div[@class='nav']") {
#        remove()
#      }
#      $(".//div[@id='content']") {
#        #$(".//a[not(contains(@href, '#'))]") {
#        #  remove()
#        #}
#        $("./div[@id='bread_crumb']") {
#          remove()
#        }
#        $("./div[@id='coupon']") {
#          $("./h3") {
#            remove()
#          }
#          $("./div[@id='hdr_left' or @id='hdr_right']") {
#            remove()
#          }
#          $(".//div[contains(@class, 'messageHolder')]") {
#            $("./a[@class='showDisclaimer']") {
#              attribute("class", "")
#              var("exclusions_acc", fetch("./@href"))
#              attribute("data-ur-id", $exclusions_acc)
#              attribute("data-ur-toggler-component", "button")
#            }
#            $("./div[@class='disclaimerBox']") {
#              attribute("data-ur-id", $exclusions_acc)
#              attribute("data-ur-toggler-component", "content")
#            }
#            
#          }
#        }
#        $(".//div[@id='block_box']") {
#          $(".//div[@class='threeWays']") {
#            $("./a[img]") {
#              remove()
#            }
#          }
#          $("./div[@id='threeWays']") {
#            $("./a[contains(@href, 'onlinecreditcenter2')]") {
#              remove()
#            }
#            $("./h3") {
#              text("Great Ways to Save")
#            }
#            $("./h6") {
#              inject_before("<div class='mw_content'></div>")
#            }
#            $("./h6 | p") {
#              move_to("(preceding-sibling::div[@class='mw_content'])[last()]")
#            }
#            move_to("../.", "bottom")
#          }
#          $("./div[@id='image_holder']") {
#            var("savings", fetch("@alt"))
#            remove()
#          }
#          $("./div[@id='message_holder']") {
#            $("./h1") {
#              text("Great Ways To Save")
#              insert_after("div", class: "mw_coupon") {
#                text($savings)
#              }
#            }
#            $("./h2[contains(text(), 'Shop in a Belk Store')]") {
#              $("following-sibling::div[@id='passcode'] | following-sibling::p[1]") {
#                remove()
#              }
#              remove()
#            }
#            $("./div[@id='shop_now_button']") {
#              move_to("../p[1]", "after")
#            }
#          }
#        }
#      }
#    }
#  }
#}

$("/html/body") {
  add_class("mw_coupon")
  $("./div[@id='page_wrapper']") {
    $("./div[@id='page']") {
      $(".//div[@class='nav']") {
        remove()
      }
      $(".//div[@id='content']") {
        $(".//img") {
          remove()
        }
        $(".//h2") {
          $("..") {
            attribute("class", "mw_a_coupon")
          }
        }
        $(".//div[@id='threeWays']") {
          move_to("(preceding-sibling::div[@class='mw_a_coupon'])[last()]")
        }
        $(".//div[@id='message_holder' and not(@class)]") {
          move_to("(preceding-sibling::div[@class='mw_a_coupon'])[last()]")
        }
        $(".//div[@class='showDisclaimer']") {
          name("a")
          attribute("href", "javascript:void(0)")
          attribute("class", "mw_show_disclaimer")
          attribute("data-ur-toggler-component", "button")
          $("..") {
            add_class("mw_disclaimer")
            attribute("data-ur-set", "toggler")
            $("./div[@class='disclaimer_box']") {
              attribute("data-ur-toggler-component", "content")
            }
          }
        }
      }
    }
  }
}
