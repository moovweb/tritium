# URL: /asda-estore/common/static/terms-and-conditionscontainer.jsp
# Page appears when your session times out and you are forced to reenter your login info

$("./body") {
  add_class("mw_terms_and_conditions_privacy_and_policy")
  $("./div[@id='mw_mainWrapper']") {
    # Removing all the addtional content from the body
    $("./div[@id='footer' or @id='header'] | ./ul | ./a") {
      remove()
    }
    $("./div/div/div[@class='leftcol twocol']") {
      # remove ASDA's style
      $("./div[@id='printReady']") {
        $("./link") {
          remove()
        }
      }
      # everything on this page is under this xpath below
      $(".//form/div") {
        # add class so we can style the title with css
        add_class("mw_title_wrapper")
        $("./div[contains(@id, 'para-text')]") {
          #Removing an outstanding link at the bottom of the first accordion
          inner() {
            replace(/http:\/\/groceries\.asda.com\:80\/asda-estore/, "")
          }

          inject_top("<div></div>")
          $("./div[1]") {
            add_class("mw_term_title")
            inject_top("<div></div>")
          }
          # setup toggler
          $("./h4") {
            add_class("mw_accordianBtn")
            attribute("data-ur-toggler-component", "button")
            attribute("data-ur-state", "disabled")
            wrap("div")
            $("..") {
              attribute("data-ur-set", "toggler")
              inject_bottom("<div class='mw_accordianContent' ></div>")
              $("./div") {
                attribute("data-ur-toggler-component", "content")
                attribute("data-ur-state", "disable")
              }
            }
          }
          # pick up the content, and put it into the right toggler content. If it's a br tag, remove it
          select("br") {
            remove()
          }
          $("./p | ./br | ./ul") {
            move_to("../p/preceding-sibling::div[1]/div | ../br/preceding-sibling::div[1]/div | ../ul/preceding-sibling::div[1]/div")
          }
        }
      }
    }
  }
}
