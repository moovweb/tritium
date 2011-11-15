$("/html/body") {
  add_class("mw_featured_shop mw_claiborne")
  $("./div[@id='page_wrapper']/div[@id='page']") {
    $("./div[@id='head' or @id='header']") {
      $(".//div[@class='nav']") {
        remove()
      }
      $(".//div[@id='promo']") {
        remove()
      }
    }
    $("./div[@id='main' or @id='article']") {
      $("./div[@id='aside']") {
        remove()
      }
      $("./div[@id='content']") {
        $("./div[@id='bread_crumb']") {
          remove()
        }
        $("./img") {
          $altText = fetch("./@alt")
        }
        insert_top("div", id: "mw_promo_links") {
          insert_before("h1", id: "mw_page_title") {
            text($altText)
          }
        }
        $(".//map") {
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
        
        $(".//img | .//map") {
          remove()
        }
      }
    }
  }
}
