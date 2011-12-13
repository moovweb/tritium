$("body") {
  attribute("class", "mw_feature2")

  $("form/div[@id='mainContainer']") {

    $("div[@id='leftNav']") {
      remove()
    }

    $("div[@class='mainContentContainer']/div[@id='contentContainer2']") {
      # CLOBBERS ONLOAD JS; WILL REPLACE IF NEEDED
      $("span[@class='feature_content'][1]") {
        text(fetch("img/@alt"))
        attribute("style") {
          remove()
        }
      }
      $("span[@class='feature_content'][2]") {
        remove()
      }

      move_here("div[@id='ctl00_cphMainContent_standard2Panel']/table//table")
      $("div | span[not (@class)]") {
        remove()
      }

      $("table") {
        name("div")
        move_here(".//td") {
          name("div")
          $(".//*[@style]") {
            attribute("style") {
              remove()
            }
          }
        }
        $("tr") {
          remove()
        }
      }

      $("div/div[@class='standard2Text']") {
        name("span")
        # Remove spacer image
        $(".//img") {
          remove()
        }
        # Remove banner that can only be idetified by empty divs
        $("div[not (child::*)]") {
          $("./../..") {
            remove()
          }
        }
      }
      # Remove bottom spacer
      $("../following-sibling::div[1]") {
        remove()
      }
      
      $("span[1]") {
        move_here("../div[@id='searchBar']", "after")
      }
    }
  }
}
