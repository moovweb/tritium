$("/html/body") {
  add_class("mw_featured_shop")
  add_class("mw_beauty_and_fragrance")
  $("./div[@id='page_wrapper']/div[@id='page']") {
    $("./div[@id='head' or @id='header']") {
      $(".//div[@class='nav']") {
        remove()
      }
      $(".//div[@id='promo']") {
        remove()
      }
    }
    $("./div[@id='article']") {
      $("./div[@id='aside']") {
        remove()
      }
      $("./div[@id='content']") {
        $("./div[@id='bread_crumb']") {
          remove()
        }
        insert_top("div", id: "mw_promo_links")
        $("./div[@id='hero']") {
          $("./div[contains(@class, 'gel')]") {
            $("./img | ./map") {
              remove()
            }
          }
          $(".//map") {
            attribute("what", "true")
            $("./area") {
              $url = fetch("./@href")
              $text = fetch("./@alt")
              $("/html/body//div[@id='content']/div[@id='mw_promo_links']") {
                insert_bottom("div") {
                  insert_bottom("a", href: $url) {
                    insert_bottom("div", class: "mw_nav_text") {
                      text() {
                        append($text)
                      }
                    }
                    insert_bottom("div", class: "icons-subnav_arrow_right")
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
