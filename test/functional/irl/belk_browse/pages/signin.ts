$("/html/body") {
  attribute("id", "mwSignIn")
  add_class("mw_sign_in")
  $("//div[@id='page']") {
    $(".//div[@id='head']") {
      $("./ul[@id='main_nav']") {
        attribute("class", "mwRemoveMe")
      }
      $("./div[@id='promo']") {
        attribute("class", "mwRemoveMe")
      }
      $("./div[@id='search_bar']") {
        attribute("class", "mwRemoveMe")
      }
      $("./*[@class='mwRemoveMe']") {
        remove()
      }
    }
    $("./div[@id='main']") {
      $(".//div[contains(@class, 'hover_modal_container')]") {
        attribute("toggle-button", ".hover_modal_a")
        attribute("toggle-selector", ".hover_modal_div")
        $("./a[contains(@class, 'hover_modal_a')]") {
          attribute("mw_test", "mw_test")
        }
        $("./div[contains(@class, 'hover_modal_div')]") {
          add_class("closed")
          attribute("style", "display:none")
        }
      }
      $("./div[@id='content']") {
        $("./div[@class='register_or_login']") {
          remove()
        }
      }
    }
    $("//p[@class='action']/button") {
      attribute("class", "mwContinueNextStepBTN")
    }
  }
  $(".//div[contains(@class,'action_1')]") {
    $("./div/a") {
      attribute("class", "mwContinueNextStepBTN")
    }
  }
}
