$("//ul[contains(@class, 'mw_subscription_breadcrumbs')]/li[1]") {
  add_class("mw_breadcrumb_active")
}

move_here("//corpse//form[@name='SelectSubscriptionForm']") {
  add_class("mw_select_form")
  
  # $(".//div[contains(@class, 'plans-container')]") {
  #   $
  # }
  
  match($region) {
    # with(/ca/) {
    #   @import select_ca.ts
    # }
    else() {
      move_here(".//div[contains(@class, 'plans-container')]") {
        insert_bottom("div", "", class: "mw_plan_list") {
          move_here("../div[contains(@class, 'specialofferbox')]")
          move_here("../div[@id='tc-plans']")
          move_here("../div[@id='basic-plans']")

          $(".//table[contains(@class, 'plans')]") {
            name("ul")

            move_here(".//td") {
              name("li")
            }
          }
          $(".//tbody | .//tr | .//div[contains(@class, 'plan-desc')]") {
            remove()
          }
        }
        $("./ul[contains(@class, 'tab-container')]/li/a/span") {
          text() {
            replace(/ Plan$/, "")
          }
        }
        $("./div[contains(@class, 'separator')] | .//br | .//sup") {
          remove()
        }

      }

      move_here(".//div[@id='promobox']") {
        add_class("mw_promotion_box")
        
        $("./div") {
          $("./input[@type='text']") {
            attribute("placeholder", fetch("preceding-sibling::label/text()"))
            $("preceding-sibling::label") {
              remove()
            }
          }
          $("./br") {
            remove()
          }
        }
      }

      move_here(".//ul[contains(@class, 'featurebox')]") {
        $("./li") {
          move_here("./span[contains(@class, 'basic-chk')]", "top") {
            inject("<span class=\"mw_feature_list_item_text\">B</span>")
          }
          move_here("./span[contains(@class, 'total-chk')]", "top") {
            inject("<span class=\"mw_feature_list_item_text\">TC</span>")
          }
        }
        wrap("div", class: "mw_featurebox_wrap") {
          move_here("./ul/li[1]/span[contains(@class, 'headtitle')]", "top") {
            attribute("class", "title")
          }
          $("./ul/li[1]") {
            remove()
          }
        }
      }

      insert_bottom("div") {
        move_here("..//input[@type='hidden']")
      }

      move_here(".//div[@id='sub_notes']", "after")
    }
  }

}