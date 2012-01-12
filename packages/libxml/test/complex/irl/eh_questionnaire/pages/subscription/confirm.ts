$("//ul[contains(@class, 'mw_subscription_breadcrumbs')]/li[3]") {
  add_class("mw_breadcrumb_active")
}

move_here("//corpse//form[@name='ConfirmationForm']") {
  add_class("mw_confirm_form")
  
  match($region) {
    # with(/ca/) {
    #   @import confirm_ca.ts
    # }
    else() {
      insert_bottom("div", "", class: "mw_confirm_infobox") {
        insert_bottom("div", "", class: "mw_confirm_trasaction") {
          move_here("../../h3[1]")
          move_here("../../ul[1]")
        }
        insert_bottom("div", "", class: "mw_confirm_auto_renewal") {
          move_here("../../h3[1]")
          move_here("../../ul[1]")
        }
        insert_bottom("div", "", class: "mw_confirm_auto_renewal_info") {
          move_here("../../h3[1]")
          move_here("../../ul[1]")
        }
      }

      move_here("./div[@id='continue-div']/input") {
        attribute("src", asset("images/continue_text.png"))
      }

      insert_bottom("div") {
        move_here("..//input[@type='hidden']")
      }

      $("./div[not(contains(@class, 'mw_confirm_infobox'))]") {
        remove()
      }
    }
  }
}
