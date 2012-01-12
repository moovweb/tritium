$("/html/body/div/form[not(@id)]") {

  insert_bottom("div", fetch("/html/body/corpse//form//table//table//table//tr[4]//table//tr[1]/td/p/text()"), class: "mw_rq_subsection_header")
  
  $("/html/body/corpse//form//table//table//table//table//tr/td[./input[@type='radio' or @type='checkbox']]") {
    move_here("following-sibling::td/text()") {
      text() {
        replace(/^\s*|\s*$/, "")
      }
    }
  }
  $("/html/body/corpse//form//table//table//table//table//tr[1]/td/font[@size='1']") {
    inner() {
      replace(/\s*<br\s*\/?>\s*/, " ")
    }
  }

  $mw_rq_multifield_id = "mw_rq_19_1"
  $mw_rq_multifield_question = "/html/body/corpse//form//table//table//table//table//tr[2]/td[contains(text(), '1.')]/../td[2]/text()"
  $mw_rq_multifield_answer_fields = "/html/body/corpse//form//table//table//table//table//tr[2]/td[contains(text(), '1.')]/../td[3]/input"
  
  @import _multifield.f.ts
  
  $mw_rq_multifield_id = "mw_rq_19_2"
  $mw_rq_multifield_question = "/html/body/corpse//form//table//table//table//table//tr[3]/td[contains(text(), '2.')]/../td[2]/text()"
  $mw_rq_multifield_answer_fields = "/html/body/corpse//form//table//table//table//table//tr[3]/td[contains(text(), '2.')]/../td[3]/input"
  
  @import _multifield.f.ts
  
  $mw_rq_radio_id = "mw_rq_19_4"
  $mw_rq_radio_question = "/html/body/corpse//form//table//table//table//table//tr[5]/td[contains(text(), '4.')]/../td[2]/text()"
  $mw_rq_radio_selection = "/html/body/corpse//form//table//table//table//table//tr[5]/td[contains(text(), '4.')]/../td[3]//input[@type='radio'] | /html/body/corpse//form//table//table//table//table//tr[5]/td[contains(text(), '4.')]/../td[3]//input[@type='radio']/following-sibling::text()[1]"
  
  @import _radio.f.ts
  
  $mw_rq_slider_id = "mw_rq_19_5"
  $mw_rq_slider_question = "/html/body/corpse//form//table//table//table//table//tr[3]/td[contains(text(), '5.')]/text()"
  $mw_rq_slider_selection = "/html/body/corpse//form//table//table//table//table//tr[3]/td[contains(text(), '5.')]/..//input[@type='radio']"
  $mw_rq_slider_lower_label = "/html/body/corpse//form//table//table//table//table//tr[1]/td[not(@align)]/font/text()"
  $mw_rq_slider_middle_label = "/html/body/corpse//form//table//table//table//table//tr[1]/td[@align='center']/font/text()"
  $mw_rq_slider_upper_label = "/html/body/corpse//form//table//table//table//table//tr[1]/td[@align='right']/font/text()"
  
  @import _slider.f.ts
  
  $mw_rq_radio_id = "mw_rq_19_6"
  $mw_rq_radio_question = "/html/body/corpse//form//table//table//table//table//tr[7]/td[@colspan]/text()[1]"
  $mw_rq_radio_selection = "/html/body/corpse//form//table//table//table//table//tr[7]/td[@colspan]/input | /html/body/corpse//form//table//table//table//table//tr[7]/td[@colspan]/input/following-sibling::text()"

  @import _radio.f.ts
  
  $mw_rq_radio_id = "mw_rq_19_7"
  $mw_rq_radio_question = "/html/body/corpse//form//table//table//table//table//tr[8]/td[@colspan]/text()[1]"
  $mw_rq_radio_selection = "/html/body/corpse//form//table//table//table//table//tr[8]/td[@colspan]/input | /html/body/corpse//form//table//table//table//table//tr[8]/td[@colspan]/input/following-sibling::text()"

  @import _radio.f.ts
  
  insert_bottom("div", fetch("/html/body/corpse//form//table//table//table//tr[4]/td/div/p/text()"), class: "mw_rq_subsection_header")
  
  $mw_rq_radio_id = "mw_rq_19_8"
  $mw_rq_radio_question = "/html/body/corpse//form//table//table//table//tr[4]/td/div/ul/li/div[contains(@class, 'rq-col1')]/text()"
  $mw_rq_radio_selection = "/html/body/corpse//form//table//table//table//tr[4]/td/div/ul/li/div[contains(@class, 'rq-col2')]/label/input | /html/body/corpse//form//table//table//table//tr[4]/td/div/ul/li/div[contains(@class, 'rq-col2')]/label/text()"

  @import _radio.f.ts
  
  $("./div[@mw-item-id='mw_rq_19_1']/input") {
    add_class("mw_rq_single_line_text_field")
  }
  $("./div[@mw-item-id='mw_rq_19_2']/input") {
    add_class("mw_rq_single_line_text_field")
  }
  $("./div[@mw-item-id='mw_rq_19_4']/label[last()]") {
    insert_bottom("div") {
      copy_here("/html/body/corpse//form//table//table//table//table//tr[5]/td[contains(text(), '4.')]/../td[3]//input[@type='checkbox'] | /html/body/corpse//form//table//table//table//table//tr[5]/td[contains(text(), '4.')]/../td[3]//input[@type='checkbox']/following-sibling::text()[1]")
      
      wrap_text_children("span") {
        text() {
          replace(/^\s*|\s*$/, "")
        }
      }
      
      $("./input") {
        wrap("label") {
          move_here("following-sibling::span[1]")
        }
      }
    }
  }
}