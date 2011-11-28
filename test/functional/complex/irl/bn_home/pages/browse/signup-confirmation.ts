$("body") {
  attribute("class", "mw_signup_confirmation")

  $("form/div[@id='mainContainer']") {
    $("div[@id='leftNav' or @class='bn_footer_width']") {
      remove()
    }

    $("div[@class='mainContentContainer']/div[@id='contentContainer']") {
      $("div[@id='dcmTextContainer'][1]/a") {
        text(fetch("@title"))
        name("span")
      }
      # remove awkward break
      $("div[@id='dcmTextContainer']/p/br[3]") {
        inject_before(" ")
        remove()
      }
      
      $("div[@id='dcmStoreText']") {
        text(fetch("img/@alt"))
      }
      
      $("div[input]") {
        attribute("id", "mw_email_signup")
        $("input[@type='text']") {
          attribute("type", "email")
          attribute("value", "enter email")
          attribute("onfocus", "clearEmailText(this);")
          attribute("onblur", "fillEmailText(this);")
        }
        insert_top("div", class: "icons-email-icon")
        insert_bottom("input", type: "button", value: "GO", onclick: "document.getElementById('ctl00_cphMainContent_ctlEmailSignup_btnSignup').click();")
      }
    }
  }

}
