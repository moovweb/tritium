html() {
  $("/html/body") {
    add_class("mw_bv_sweeps")
    # EXPLICIT: div[@id='doc3']/div[@id='bd']/div[@id='globalContentContainer']/div[@id='macysGlobalLayout']
    $("div[@id='doc3']/div[@id='bd']/div/div") {
      $("div[1]") {
        add_class("mw_img_replace")
        $("img") {
          remove()
        }
        insert("div") {
          insert("h1", "Rant. Rave. Win.")
          insert("span", "Write a review on macys.com for a chance to ")
          insert("span", "win a $1,000 gift card!")
        }
        insert("div", class: "mw_linear_bg") {
          insert("h2", "Here's how:")
          insert("ul") {
            insert("li") {
              insert("h3", "sign in ")
              insert("span", "to your account or register with macys.com &mdash; it's free.")
            }
            insert("li") {
              insert("h3", "search ")
              insert("span", "for a product you'd like to review.")
            }
            insert("li") {
              insert("h3", "submit ")
              insert("span", "your review and you'll be automatically entered.")
            }
          }
          insert("a", "Get Started Now", class: "mvRedBtn", href: "/index.ognc")
        }
      }
      $("div[2]") {
        attribute("style", "")
      }
    }
  }
}