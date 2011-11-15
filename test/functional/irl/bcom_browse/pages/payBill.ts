$("body") {
  add_class("mvBillPay")
  # EXPLICIT: .../div[@id='bl_hp_main']/div[@id='bl_breadCrumbAndMainContentContainer']/div[@id='bl_payBillContentContainer']
  $("div[@id='bl_main_container']/div[@id='bl_nav_top_container_tiles']/div[@class='bl_main']/div/div[@id='bl_breadCrumbAndMainContentContainer']/div[@id='bl_payBillContentContainer']/div[@class='pmt_payBillHome_section_quickPay']") {
    $("div[starts-with(@class, 'pmt_payBillHome_section_content')]/div[@class='pmt_section_button']/a") {
      add_class("mvButton")
      text(fetch("img/@alt"))
    }
  }
  $(".//div[contains(@class, 'pmt_reactiveChatLinkContainer')]"){
    remove()
  }
  $(".//div[contains(@class, 'pmt_bottomRightButton')]/input[contains(@src, 'b_continue.gif')]"){
    add_class("mvButton")
    attribute("type", "submit")
    attribute("value", "continue")
  }
  $(".//div[contains(@class, 'pmt_accountSummary_childCardContainer')]"){
    $("./div[contains(@class, 'pmt_accountSummary_col2')]"){
      inject_before("<div></div>"){
        add_class("mw_credit_title")
        inner(){
          set("LAST STATEMENT BALANCE")
        }
      }
    }
    $("./div[contains(@class, 'pmt_accountSummary_col3')]"){
      inject_before("<div></div>"){
        add_class("mw_credit_title")
        inner(){
          set("CURRENT BALANCE")
        }
      }
    }
    $("./div[contains(@class, 'pmt_accountSummary_minPmtContainer')]"){
      inject_before("<div></div>"){
        add_class("mw_credit_title")
        inner(){
          set("MINIMUM PAYMENT")
        }
      }
    }
  }
  $("//input[@id='pmt_cpo_doNotCancelButton']"){
    attribute("type", "submit")
    attribute("value", "no, do not cancel payment")
    add_class("mvButton")
  }
  $("//input[@id='pmt_cpo_cancelButton']"){
    attribute("type", "submit")
    attribute("value", "yes, cancel payment")
    add_class("mvButton")
  }
  $("//div[contains(@class, 'pmt_accountSummary_action')]/input[contains(@src, 'pmt_b_payNow.gif')]"){
    attribute("type", "submit")
    attribute("value", "pay now")
    add_class("mvButton")
  }
  $("//div[contains(@class, 'pmt_bottomRightButton')]/input[@id='pmt_submit']"){
    attribute("type", "submit")
    attribute("value", "submit")
    add_class("mvButton")
  }
  $("//div[contains(@class, 'pmt_bottomLeftActionButtons')]//input[contains(@src, 'pmt_b_edit.gif')]"){
    attribute("type", "submit")
    attribute("value", "edit")
    add_class("mvGreyButton")
  }
  $("//div[contains(@class, 'pmt_bottomLeftActionButtons')]//input[@id='pmt_cancel']"){
    attribute("type", "submit")
    attribute("value", "cancel payment")
    add_class("mvGreyButton")
  }
}
