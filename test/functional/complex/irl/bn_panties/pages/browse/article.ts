$("body") {
  attribute("class", "mw_article")
  $("form/div[@id='mainContainer']") {
    # Remove left navigation pane
    $("div[@id='leftNav']") {
      remove()
    }
    # Remove bottom spacer
    $("div[@class='bn_footer_width']") {
      remove()
    }
    $(".//div[@id='contentContainer']") {
      insert_top("span", class: "mw_title") {
        text(fetch("./../div[1]//img[1]/@alt"))
        match($path, /BraGlossary/) {
          move_here("./../div/div[@id='parentContainer']/p/span/h1[1]")
        }
      }
      # Remove the top image div
      $("div[1]") {
        remove()
      }
      # Remove all style below here
      $(".//*") {
        attribute("style") {
          remove()
        }
      }
      # Remove the small image for links
      $("div/div//img") {
        remove()
      }
      # Reformat each article to be an accordian
      $("div[@class='article_div']") {
        add_class("mw_acc")
        # The last item always seems to be empty and breaks the style
        $("*[last()]") {
          remove()
        }
        # Select each article
        $("div") {
          add_class("mw_acc_section")
          attribute("data-ur-set", "toggler")
          # Grab the title of the article and make it the header for the accordian
          move_here("p/span[@class='featureTitle']", "top")
          # special case for testimonials
          move_here("p/*[last()][self::font]", "top") {
            inner() {
              replace(/\.\s*</, ". / <")
            }
            text() {
              replace(/^\s?-\s?/m, "")
              replace(/\/\s*(\w{3})\w+/, "/ \\1")
            }
            attribute("style", "")
            attribute("size", "")
            name("span")
          }
          $("span") {
            wrap("div") {
              add_class("mw_acc_header")
              # Add icons using sprites
              insert_bottom("div", class: "icons-accordion-closed")
              insert_bottom("div", class: "icons-accordion-open")
              attribute("data-ur-toggler-component", "button")
              attribute("data-ur-state", "disabled")
            }
          }
          # Keep the first paragraph of the article and move everything inside of it
          $("p[1]") {
            # handle testimonials
            $("font") {
              attribute("color", "")
              attribute("size", "")
              inner() {
                replace(/"\s*$/, "&rdquo;")
                replace(/^\s*"/, "&ldquo;")
              }
            }
            insert_bottom("div") {
              move_here("./../../p[2]/*", "bottom")
            }
            # Convert to div and make this the content section of the accordian
            name("div")
            add_class("mw_acc_items")
            attribute("data-ur-toggler-component", "content")
            attribute("data-ur-state", "disabled")
          }
          # Remove the remaining paragraphs that are now empty
          $("p") {
            remove()
          }
        }
      }
    }
  }
}
