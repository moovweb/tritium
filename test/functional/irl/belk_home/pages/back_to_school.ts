$("/html/body") {
  add_class("mw_back_to_school")
  $("./div[@id='page_wrapper']/div[@id='page']") {
    $("./div[@id='header']") {
      $(".//div[@class='nav']") {
        remove()
      }
    }
    $("./div[@id='main']") {
      $("./div[@id='content']") {
        $("./div[@id='bread_crumb']") {
          remove()
        }
        $("./div[contains(@class, 'hero')]") {
          remove()
        }
        $("./map") {
          $("./area") {
            $url = fetch("./@href")
            $linkText = fetch("./@alt")
            $("../.") {
              insert_before("a", href: $url, $linkText) {
                insert_bottom("div", class: "icons-subnav_arrow_right")
              }
            }
          }
        }
      }
    }
  }
}