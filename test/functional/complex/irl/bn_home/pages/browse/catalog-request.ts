$("body") {
  add_class("mw_catalog_request")
  @import _remove_left_nav.ts
  $("form/div[@id='mainContainer']") {
    $("div[@class='bn_footer_width']") {
      remove()
    }
    $("div[@class='mainContentContainer']/div[@id='contentContainer']") {
      add_class("mw_acc")
      move_here("div/table/tr/td/*")
      $("div[1]") {
        remove()
      }
      $("img") {
        remove()
      }
      $("div[@align='right']") {
        attribute("align", "")
      }
      $("input[contains(@id, 'EMAIL')]") {
        attribute("type", "email")
        attribute("autocapitalize", "off")
      }
      $("input[@type='image']") {
        var("alt", fetch("@alt"))
          # button hack
        insert_before("input", type: "button") {
          attribute("value", $alt)
          attribute("onclick", "this.nextSibling.click()")
        }
      }
      $("div/font | font") {
        attribute("size", "")
        $("span") {
          attribute("style") {
            value() {
              replace(/font-size:.*?;/, "")
            }
          }
        }
      }
    }
  }
}
