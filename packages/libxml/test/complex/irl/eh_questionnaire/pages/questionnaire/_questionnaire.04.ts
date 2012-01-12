$("/html/body/div/form[not(@id)]") {
  
  # The slider labels are manually wrapped using <br>,
  # We want to to change this
  $("/html/body/corpse//form/table//table//table//table[2]//tr[1]/td/font") {
    inner() {
      replace(/\s*<br\s*\/?>\s*/, " ")
    }
  }
  # Checkboxes are indented using none break space,
  # Since there's no way to tell how many levels of indenting there are,
  # We'll just have to keep this format
  $("/html/body/corpse//form/table//table//table//table//tr[2]/td[2]/input") {
    # An extra variable in here is needed to work out some Tritium quarks
    $indent_id = fetch("@value")
    
    # Tritium has some quarks working with HTML entities,
    # So we'll have to create a span here, then move it to
    # appropriate place later
    insert_before("span", fetch("preceding-sibling::text()[1]") {
      replace(/^\s*|\s*$/, "")
    }, mw-indent-id: $indent_id)
  }
  
  $mw_rq_radio_id = "mw_rq_4_1"
  $mw_rq_radio_question = "/html/body/corpse//form/table//table//table//table//tr[1]/td[1]/p/text()"
  $mw_rq_radio_selection = "/html/body/corpse//form/table//table//table//table//tr[2]/td[1]/input | /html/body/corpse//form/table//table//table//table//tr[2]/td[1]/input/following-sibling::text()[1]"
  
  @import _radio.f.ts
  
  $mw_rq_checkbox_id = "mw_rq_4_2"
  $mw_rq_checkbox_question = "/html/body/corpse//form/table//table//table//table//tr/td[2]/p/text()"
  $mw_rq_checkbox_selection = "/html/body/corpse//form/table//table//table//table//tr[2]/td[2]/input | /html/body/corpse//form/table//table//table//table//tr[2]/td[2]/input/following-sibling::text()[1]"
  
  # Check if exist
  # This is to prevent the specific script below from
  # executing if the question doesn't exist.
  match(fetch($mw_rq_checkbox_question), /.*/) {
    @import _checkbox.f.ts
  }
  
  $mw_rq_slider_id = "mw_rq_4_3"
  $mw_rq_slider_question = "/html/body/corpse//form/table//table//table//table[2]//tr[1]/td[1]/text()"
  $mw_rq_slider_selection = "/html/body/corpse//form/table//table//table//table[2]//tr[3]/td/input"
  $mw_rq_slider_lower_label = "/html/body/corpse//form/table//table//table//table[2]//tr[1]/td[not(@align)]/font/text()"
  $mw_rq_slider_middle_label = "/html/body/corpse//form/table//table//table//table[2]//tr[1]/td[@align='center']/font/text()"
  $mw_rq_slider_upper_label = "/html/body/corpse//form/table//table//table//table[2]//tr[1]/td[@align='right']/font/text()"
  
  @import _slider.f.ts
  
  $("./div[@mw-item-id='mw_rq_4_2']") {
    $("./div[contains(@class, 'mw_rq_question')]") {
      copy_here("/html/body/corpse//form/table//table//table//table[1]//tr[2]/td[2]/text()[2]/../text()[position() < 3]", "before") {
        wrap("label") {
          # Inspect the text...
          match(text()) {
            # If it has content..then we clean it up
            with(/[a-zA-Z]+/) {
              text() {
                replace(/^\s*|\s*$/, "")
              }
            }
            # If it's all just space, then we remove it
            else() {
              remove()
            }
          }
        }
      }
      move_to("..", "top")
    }
    $("./label[./input]") {
      var("dyn_xpath", "/html/body/corpse//form/table//table//table//table//tr[2]/td[2]/span[@mw-indent-id='REPLACE_THIS']") {
        replace("REPLACE_THIS", fetch("./input/@value"))
      }
      
      move_here($dyn_xpath, "top")
    }
  }
  
}