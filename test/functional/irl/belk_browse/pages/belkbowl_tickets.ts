$("/html/body") {
  add_class("mw_belkbowl_tickets")
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
                $("./p") {
                  text() {
                    replace(/^[^\w]+/m, "") # remove extraneous white space
                  }
                  $("./br") {
                    remove();
                  }
                }
                $("./div[contains(@class, 'row')]") {
                  $("./div[contains(@class, 'col one')]") {
                    $("./ul") {
                      move_here("../../div[@class='col two']/ul", "after")
                    }
                    $("./ul[1]") {
                      $("./li") {
                        add_class("mw_game")
                        move_here("(../../ul[2]/li[1])", "bottom") {
                          name("span")
                          add_class("mw_date")
                        }
                      }
                    }
                  }
                  $("./div[contains(@class, 'col two')]") {
                    remove()
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