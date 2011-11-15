$("body") {
  attribute("class", "mw_feature1")
  match($path, /feature.*Maternity/) {
    add_class("mw_maternity")
  }
  $("form/div[@id='mainContainer']") {
    $("div[@id='leftNav']") {
      remove()
    }
    $("div[@class='mainContentContainer']/div[@id='contentContainer2']") {
      $("span[@id='FeatureContainer1_1']") {
        name("div")
        text(fetch("img/@alt"))
        attribute("style") {
          remove()
        }
      }

      $("span | div[not (@class)] | div[not (@class='vendorDeetsCategories' or @id='FeatureContainer1_1')]") {
        remove()
      }
      $("div[@class='vendorDeetsCategories']") {
        move_here("table//table") {
          name("div")
          move_here(".//td") {
            name("div")
          }
          $("tr | tbody | div[3] | div[2]/a[img] | div/br") {
            remove()
          }
        }
        $("table[1]") {
          remove()
        }
        # Convert all anchors inside the search result
        $("div//a") {
          name("span")
        }
        # Make each category tile clickable
        $("div") {
          name("a")
          attribute("href", fetch(".//span[1]/@href"))
        }
        $("a/div/span/img") {
          attribute("src") {
            value() {
              replace(/\?.*/, "?size=85,0")
            }
          }
        }
        move_here("div[@id='searchBar']", "before")
      }
      $("../following-sibling::div[1]") {
        remove()
      }
    }
  }
}
