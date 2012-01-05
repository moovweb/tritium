$("/html/body") {
  add_class("mw_belkbowl")
  $("./div[@id='page_wrapper']") {
    $("./div[@id='page']") {
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
          $("./div[@id='belkBowl']") {
            $("./div[@class='top']") {
              remove()
            }
            $("./div[@class='inner']") {
              $("./div[@class='leftNav']") {
                $("./img | ./map") {
                  remove()
                } 
              }
              $("./div[@class='rightContent']") {
                $("./img") {
                  remove()
                }
                $("./a[img[@class='banner']]") {
                  $("./img") {
                    remove()
                  }
                  text("Shop collegiate apparel")
                }
                $("./span[@class='date']") {
                  text("")
                  insert_bottom("div", "December 27, 2011")
                  insert_bottom("div", "8:00pm Charlotte")
                }
              }
            }
          }
        }
      }
    }
  }
}