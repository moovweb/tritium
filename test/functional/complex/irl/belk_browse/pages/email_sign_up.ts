# i had to use a lot of deep searches here because sometimes the table is wrapped inside a form, and sometimes it isn't.
$("/html") {
  #$("./head") {
  #  
  #}
  $("./body") {
    # there are script tags on this page that reference absolute urls.  they need to be rewritten
    inner() {
      replace(/var\s*url\s*=\s*"(.*)"/) {
        log("-----------")
        log($1)
        log("-----------")
        $1 {
          rewrite("link")
        }
        set("var url = \"\\1\";")
      }
      replace(/window\.location\s*=\s*"(.*)"/) {
        log("-----------")
        log($1)
        log("-----------")
        $1 {
          rewrite("link")
        }
        set("window.location = \"\\1\";")
      }
    }
    insert_bottom("link", rel: "stylesheet", type: "text/css", href: sass("main"))
    add_class("mw_email_sign_up")
    
    $(".//form[@id='profile_center']") {
      name("div")
    }
    $("./table") {
      wrap("form", id: "profile_center")
    }
    $(".//table") {
      attribute("width", "")
      name("div")
      $(".//tr") {
        name("div")
        $("./td") {
          name("span")
          attribute("style", "")
          attribute("background", "")
          attribute("bgcolor", "")
          attribute("width", "")
          attribute("height", "")
        }
      }
    }
    $(".//span[contains(text(), 'About You')]") {
      $("../../.") {
        add_class("mw_about_you")
      }
    }
    $(".//span[contains(text(), 'Your communication preferences')]") {
      $("../../.") {
        add_class("mw_your_communication_prefs")
      }
    }
    $(".//span[contains(text(), 'Your shopping preferences')]") {
      $("../../.") {
        add_class("mw_your_shopping_prefs")
      }
    }
    $(".//input[@type='image']") {
      attribute("src", "")
      attribute("type", "submit")
      add_class("mw_submit")
      move_to("/html/body//div[1]", "bottom")
    }
    $(".//div[contains(@class, 'mw_about_you')]") {
      $("./div[1]") {
        add_class("mw_acc_heading")
        insert_after("div", class: "mw_about_you_content mw_acc_content") {
          move_here("following-sibling::div")
        }
      }
    }
    $(".//div[contains(@class, 'mw_your_communication_prefs')]") {
      $("./div[1]") {
        add_class("mw_acc_heading")
        insert_after("div", class: "mw_your_communication_prefs_content mw_acc_content") {
          move_here("following-sibling::div")
        }
      }
    }
    $(".//div[contains(@class, 'mw_your_shopping_prefs')]") {
      $("./div[1]") {
        add_class("mw_acc_heading")
        insert_after("div", class: "mw_your_shopping_prefs_content mw_acc_content") {
          move_here("following-sibling::div")
        }
      }
    }
    # inject script to send this iframe's body height to parent window via postMessage
    # used for cross-domain communication.  this iframe's domain is pages.belk.com, parent's is belk.com
    inject_bottom("<script type='text/javascript'>var h = document.body.offsetHeight; window.addEventListener('load', function() { window.parent.postMessage(h, '*'); }, false);</script>")
  }
}