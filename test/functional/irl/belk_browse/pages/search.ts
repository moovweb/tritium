$("/html/body") {

  attribute("id", "mw_search")
  
  $(".//div[@id='page']") {
    $("./div[@id='head' or @id='header']") {
      $("./ul") {
        remove()
      }
      $("./div[@id='promo']") {
        remove()
      }
    }
    
    # remove the side nav for clearance search results
    $("/html/body//div[@id='bread_crumb']/ul/li[contains(., 'Clearance')]") {
      $("/html/body//div[@id='aside']") {
        remove()
      }
    }
  
    $("./div[@id='main' or @id='article']") {
      # This whole section takes a list of <li>'s that sometimes show up at the top of the page
      # showing you a list of categories (or whatever) that your search returned. Aka, if I search
      # for "belt", then it says that it has listings in several categories for that.
      # I am moving that into the "filters" toggle box and making it behave like all the other
      # filters to save space.
      $("./div[@id='subnav']") {
        $("./ul") {
          $("./li") {
            name("div")
            inner() {
              replace(/$/, ": ")
            }
            wrap("div", class: "filter") {
              move_here("./following-sibling::ul[1]") {
                name("select")
                attribute("class", "dropdownLink")
                $("./li") {
                  name("option")
                  attribute("value", fetch("./a/@href"))
                  $("./a") {
                    name("span")
                  }
                }
                insert_top("option", "All", value: "#")
              }
  
              # Too hard to do a specific search here... but at least got the subtree
              move_to("../../..//div[@class='filters']", "top")
            }
          }
        }
      }
      $("./div[@id='aside' and not(contains(@class, 'mw_search_clearance'))]") {
        move_to("../div[@id='content']//div[@id='filter_and_sort']", "top")
        $("./ul") {
          attribute("class", "")
          $("./li") {
            attribute("data-ur-set", "toggler")
            $("./h3") {
              attribute("data-ur-toggler-component", "button")
              attribute("data-ur-state", "disabled")
              text("Narrow by Category")
              insert_bottom("div", class: "icons-white_nav_arrow_dn")
              insert_bottom("div", class: "icons-white_nav_arrow_up")
            }
            $("./ul") {
              attribute("data-ur-toggler-component", "content")
              attribute("data-ur-state", "disabled")
            }
          }
        }
      }
      $("./div[@id='content']") {
        $("./div[@id='search_results']") {
          $(".//div[@id='slider-container']") {
            remove()
          }
          $("./div[@class='summary']") {
            remove()
          }
          $("./br") {
            remove()
          }
          attribute("mw_test", "mw_test")
          $("./text()[contains(.,'items found')]") {
            wrap("span") {
              wrap("div", class: "mw_search_count") {
                move_here("./following-sibling::strong")
              }
            }
          }
        }
      }
    }
  }
}
