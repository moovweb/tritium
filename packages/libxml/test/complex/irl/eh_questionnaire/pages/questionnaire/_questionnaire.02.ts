$("/html/body/form[@id='rq_form']") {
  
  # $mw_rq_slider_id
  # $mw_rq_slider_question
  #     xpath for text node
  # $mw_rq_slider_selection
  #     xpath for an array of <input type="radio">
  # $mw_rq_slider_lower_label
  #     xpath for text node
  # $mw_rq_slider_middle_label
  #     xpath for text node
  # $mw_rq_slider_upper_label
  #     xpath for text node
  # "/html/body/corpse//form[@id='rq_form']"
  
  #
  # Start first subsection
  #
  insert_bottom("div", fetch("/html/body/corpse//form[@id='rq_form']//ul[contains(@class, 'odd')]//li[contains(@class, 'questionRow')][1]/text()"), class: "mw_rq_subsection_header")
  
  insert_bottom("ul") {
    $mw_rq_slider_id = "mw_rq_2_1"
    $mw_rq_slider_question = "/html/body/corpse//form[@id='rq_form']//li[@id='question_battery_1']/div[contains(@class, 'question')]"
    $mw_rq_slider_selection = "/html/body/corpse//form[@id='rq_form']//li[@id='question_battery_1']/div[contains(@class, 'radioContainer')]//input"
    $mw_rq_slider_lower_label = "/html/body/corpse//form[@id='rq_form']//ul[1]//ul[contains(@class, 'radio-labels')]/li[contains(@class, 'left')]/text()"
    $mw_rq_slider_middle_label = "/html/body/corpse//form[@id='rq_form']//ul[1]//ul[contains(@class, 'radio-labels')]/li[contains(@class, 'center')]/text()"
    $mw_rq_slider_upper_label = "/html/body/corpse//form[@id='rq_form']//ul[1]//ul[contains(@class, 'radio-labels')]/li[contains(@class, 'right')]/text()"

    @import _slider.f.ts

    $mw_rq_slider_id = "mw_rq_2_2"
    $mw_rq_slider_question = "/html/body/corpse//form[@id='rq_form']//li[@id='question_battery_2']/div[contains(@class, 'question')]"
    $mw_rq_slider_selection = "/html/body/corpse//form[@id='rq_form']//li[@id='question_battery_2']/div[contains(@class, 'radioContainer')]//input"

    @import _slider.f.ts

    $mw_rq_slider_id = "mw_rq_2_3"
    $mw_rq_slider_question = "/html/body/corpse//form[@id='rq_form']//li[@id='question_battery_3']/div[contains(@class, 'question')]"
    $mw_rq_slider_selection = "/html/body/corpse//form[@id='rq_form']//li[@id='question_battery_3']/div[contains(@class, 'radioContainer')]//input"

    @import _slider.f.ts

    $mw_rq_slider_id = "mw_rq_2_4"
    $mw_rq_slider_question = "/html/body/corpse//form[@id='rq_form']//li[@id='question_battery_4']/div[contains(@class, 'question')]"
    $mw_rq_slider_selection = "/html/body/corpse//form[@id='rq_form']//li[@id='question_battery_4']/div[contains(@class, 'radioContainer')]//input"

    @import _slider.f.ts

    $mw_rq_slider_id = "mw_rq_2_5"
    $mw_rq_slider_question = "/html/body/corpse//form[@id='rq_form']//li[@id='question_battery_5']/div[contains(@class, 'question')]"
    $mw_rq_slider_selection = "/html/body/corpse//form[@id='rq_form']//li[@id='question_battery_5']/div[contains(@class, 'radioContainer')]//input"

    @import _slider.f.ts

    $mw_rq_slider_id = "mw_rq_2_6"
    $mw_rq_slider_question = "/html/body/corpse//form[@id='rq_form']//li[@id='question_battery_6']/div[contains(@class, 'question')]"
    $mw_rq_slider_selection = "/html/body/corpse//form[@id='rq_form']//li[@id='question_battery_6']/div[contains(@class, 'radioContainer')]//input"

    @import _slider.f.ts

    $mw_rq_slider_id = "mw_rq_2_7"
    $mw_rq_slider_question = "/html/body/corpse//form[@id='rq_form']//li[@id='question_battery_7']/div[contains(@class, 'question')]"
    $mw_rq_slider_selection = "/html/body/corpse//form[@id='rq_form']//li[@id='question_battery_7']/div[contains(@class, 'radioContainer')]//input"

    @import _slider.f.ts

  }
  
  #
  # Start second subsection
  #
  insert_bottom("div", fetch("/html/body/corpse//form[@id='rq_form']//ul[contains(@class, 'even')]//li[contains(@class, 'questionRow')]/text()"), class: "mw_rq_subsection_header")

  insert_bottom("ul") {
    $mw_rq_slider_id = "mw_rq_2_8"
    $mw_rq_slider_question = "/html/body/corpse//form[@id='rq_form']//li[@id='question_battery_8']/div[contains(@class, 'question')]"
    $mw_rq_slider_selection = "/html/body/corpse//form[@id='rq_form']//li[@id='question_battery_8']/div[contains(@class, 'radioContainer')]//input"
    $mw_rq_slider_lower_label = "/html/body/corpse//form[@id='rq_form']//ul[2]//ul[contains(@class, 'radio-labels')]/li[contains(@class, 'left')]/text()"
    $mw_rq_slider_middle_label = "/html/body/corpse//form[@id='rq_form']//ul[2]//ul[contains(@class, 'radio-labels')]/li[contains(@class, 'center')]/text()"
    $mw_rq_slider_upper_label = "/html/body/corpse//form[@id='rq_form']//ul[2]//ul[contains(@class, 'radio-labels')]/li[contains(@class, 'right')]/text()"

    @import _slider.f.ts

    $mw_rq_slider_id = "mw_rq_2_9"
    $mw_rq_slider_question = "/html/body/corpse//form[@id='rq_form']//li[@id='question_battery_9']/div[contains(@class, 'question')]"
    $mw_rq_slider_selection = "/html/body/corpse//form[@id='rq_form']//li[@id='question_battery_9']/div[contains(@class, 'radioContainer')]//input"

    @import _slider.f.ts

    copy_here("/html/body/corpse//form//input[@type='submit' and @name='saveAndContinue.name']")
  }
  
  $("./ul") {
    $("./div[@mw-item-id]") {
      wrap("li", class: "formR")
    }
  }

}

$("/html/body/div/form[not(@id)]") {
  $("/html/body/corpse//form//table//table") {
    inner() {
      replace(/\s*<br\s*\/?>\s*/, " ")
    }
  }
  
  insert_bottom("div", fetch("/html/body/corpse//form//table//table//table//tr[4]//table//tr[1]/td/p[contains(@class, 'questionnaireText')][1]"), class: "mw_rq_subsection_header")
  
  $mw_rq_radio_id = "mw_rq_2_1"
  $mw_rq_radio_question = "/html/body/corpse//form//table//table//table//table//tr/td[contains(text(), '1.')]/following-sibling::td[1]/text()"
  $mw_rq_radio_selection = "/html/body/corpse//form//table//table//table//table//tr/td[contains(text(), '1.')]/following-sibling::td[2]"
  
  @import _radio.f.ts
  
  $mw_rq_slider_id = "mw_rq_2_2"
  $mw_rq_slider_question = "/html/body/corpse//form//table//table//table//table//tr/td[contains(text(), '2.')]"
  $mw_rq_slider_selection = "/html/body/corpse//form//table//table//table//table//tr/td[contains(text(), '2.')]/..//input[@type='radio']"
  $mw_rq_slider_lower_label = "/html/body/corpse//form//table//table//table//table//tr/td[contains(text(), '2.')]/../preceding-sibling::tr/td[not(@align) and @colspan]/font/text()"
  $mw_rq_slider_middle_label = "/html/body/corpse//form//table//table//table//table//tr/td[contains(text(), '2.')]/../preceding-sibling::tr/td[@align='center']/font/text()"
  $mw_rq_slider_upper_label = "/html/body/corpse//form//table//table//table//table//tr/td[contains(text(), '2.')]/../preceding-sibling::tr/td[@align='right']/font/text()"
  
  @import _slider.f.ts
  
  $mw_rq_multifield_id = "mw_rq_2_3"
  $mw_rq_multifield_question = "/html/body/corpse//form//table//table//table//table//tr/td[contains(text(), '3.')]/following-sibling::td[@align='right']"
  $mw_rq_multifield_answer_fields = "/html/body/corpse//form//table//table//table//table//tr/td[contains(text(), '3.')]/following-sibling::td[@align='left']/input"
  
  @import _multifield.f.ts
  
  $mw_rq_multifield_id = "mw_rq_2_4"
  $mw_rq_multifield_question = "/html/body/corpse//form//table//table//table//table//tr/td[contains(text(), '4.')]/following-sibling::td[@align='right']"
  $mw_rq_multifield_answer_fields = "/html/body/corpse//form//table//table//table//table//tr/td[contains(text(), '4.')]/following-sibling::td[@align='left']/input | /html/body/corpse//form//table//table//table//table//tr/td[contains(text(), '4.')]/following-sibling::td[@align='left']/text()"
  
  @import _multifield.f.ts
  
  $mw_rq_slider_id = "mw_rq_2_5"
  $mw_rq_slider_question = "/html/body/corpse//form//table//table//table//table//tr/td[contains(text(), '5.')]"
  $mw_rq_slider_selection = "/html/body/corpse//form//table//table//table//table//tr/td[contains(text(), '5.')]/..//input[@type='radio']"
  $mw_rq_slider_lower_label = "/html/body/corpse//form//table//table//table//table//tr/td[contains(text(), '5.')]/../preceding-sibling::tr/td[not(@align) and @colspan]/font/text()"
  $mw_rq_slider_middle_label = "/html/body/corpse//form//table//table//table//table//tr/td[contains(text(), '5.')]/../preceding-sibling::tr/td[@align='center']/font/text()"
  $mw_rq_slider_upper_label = "/html/body/corpse//form//table//table//table//table//tr/td[contains(text(), '5.')]/../preceding-sibling::tr/td[@align='right']/font/text()"
  
  @import _slider.f.ts
  
  $mw_rq_radio_id = "mw_rq_2_6"
  $mw_rq_radio_question = "/html/body/corpse//form//table//table//table//table//tr[@valign='top'][4]/td[@align='right']"
  $mw_rq_radio_selection = "/html/body/corpse//form//table//table//table//table//tr[@valign='top'][4]/td[@align='left']"
  
  @import _radio.f.ts
  
  $mw_rq_checkbox_id = "mw_rq_2_7"
  $mw_rq_checkbox_question = "/html/body/corpse//form//table//table//table//table//tr[@valign='top'][5]/td[@align='right']"
  $mw_rq_checkbox_selection = "/html/body/corpse//form//table//table//table//table//tr[@valign='top'][5]/td[@align='left']"
  
  @import _checkbox.f.ts
  
  $mw_rq_slider_id = "mw_rq_2_8"
  $mw_rq_slider_question = "/html/body/corpse//form//table//table//table//table//tr/td[contains(text(), '8.')]"
  $mw_rq_slider_selection = "/html/body/corpse//form//table//table//table//table//tr/td[contains(text(), '8.')]/..//input[@type='radio']"
  $mw_rq_slider_lower_label = "/html/body/corpse//form//table//table//table//table//tr/td[contains(text(), '8.')]/../preceding-sibling::tr/td[not(@align) and @colspan]/font/text()"
  $mw_rq_slider_middle_label = "/html/body/corpse//form//table//table//table//table//tr/td[contains(text(), '8.')]/../preceding-sibling::tr/td[@align='center']/font/text()"
  $mw_rq_slider_upper_label = "/html/body/corpse//form//table//table//table//table//tr/td[contains(text(), '8.')]/../preceding-sibling::tr/td[@align='right']/font/text()"
  
  @import _slider.f.ts
  
  insert_bottom("div", fetch("/html/body/corpse//form//table//table//table//tr[6]//table//tr[1]/td/p[contains(@class, 'questionnaireText')]"), class: "mw_rq_subsection_header")
  
  $mw_rq_slider_lower_label = "/html/body/corpse//form//table//table//table//tr[6]//table//tr[2]/td[@colspan and @align='left']/font/text()"
  $mw_rq_slider_middle_label = "/html/body/corpse//form//table//table//table//tr[6]//table//tr[2]/td[@colspan and @align='center']/font/text()"
  $mw_rq_slider_upper_label = "/html/body/corpse//form//table//table//table//tr[6]//table//tr[2]/td[@colspan and @align='right']/font/text()"
  
  $mw_rq_slider_id = "mw_rq_2_9_1"
  $mw_rq_slider_question = "/html/body/corpse//form//table//table//table//tr[6]//table//tr[4]//table//tr/td[2]/font/b"
  $mw_rq_slider_selection = "/html/body/corpse//form//table//table//table//tr[6]//table//tr[4]//input[@type='radio']"
  
  @import _slider.f.ts
  
  $mw_rq_slider_id = "mw_rq_2_9_2"
  $mw_rq_slider_question = "/html/body/corpse//form//table//table//table//tr[6]//table//tr[5]//table//tr/td[2]/font/b"
  $mw_rq_slider_selection = "/html/body/corpse//form//table//table//table//tr[6]//table//tr[5]//input[@type='radio']"
  
  @import _slider.f.ts
  
  $mw_rq_slider_id = "mw_rq_2_9_3"
  $mw_rq_slider_question = "/html/body/corpse//form//table//table//table//tr[6]//table//tr[6]//table//tr/td[2]/font/b"
  $mw_rq_slider_selection = "/html/body/corpse//form//table//table//table//tr[6]//table//tr[6]//input[@type='radio']"
  
  @import _slider.f.ts
  
  $mw_rq_slider_id = "mw_rq_2_9_4"
  $mw_rq_slider_question = "/html/body/corpse//form//table//table//table//tr[6]//table//tr[7]//table//tr/td[2]/font/b"
  $mw_rq_slider_selection = "/html/body/corpse//form//table//table//table//tr[6]//table//tr[7]//input[@type='radio']"
  
  @import _slider.f.ts
  
  $mw_rq_slider_id = "mw_rq_2_9_5"
  $mw_rq_slider_question = "/html/body/corpse//form//table//table//table//tr[6]//table//tr[8]//table//tr/td[2]/font/b"
  $mw_rq_slider_selection = "/html/body/corpse//form//table//table//table//tr[6]//table//tr[8]//input[@type='radio']"
  
  @import _slider.f.ts
  
  $mw_rq_slider_id = "mw_rq_2_9_6"
  $mw_rq_slider_question = "/html/body/corpse//form//table//table//table//tr[6]//table//tr[9]//table//tr/td[2]/font/b"
  $mw_rq_slider_selection = "/html/body/corpse//form//table//table//table//tr[6]//table//tr[9]//input[@type='radio']"
  
  @import _slider.f.ts
  
  $mw_rq_slider_id = "mw_rq_2_9_7"
  $mw_rq_slider_question = "/html/body/corpse//form//table//table//table//tr[6]//table//tr[10]//table//tr/td[2]/font/b"
  $mw_rq_slider_selection = "/html/body/corpse//form//table//table//table//tr[6]//table//tr[10]//input[@type='radio']"
  
  @import _slider.f.ts
  
  insert_bottom("div", fetch("/html/body/corpse//form//table//table//table//tr[8]//table//tr[1]/td/p[contains(@class, 'questionnaireText')]"), class: "mw_rq_subsection_header")

  $mw_rq_slider_lower_label = "/html/body/corpse//form//table//table//table//tr[8]//table//tr[2]/td[@colspan and @align='left']/font/text()"
  $mw_rq_slider_middle_label = "/html/body/corpse//form//table//table//table//tr[8]//table//tr[2]/td[@colspan and @align='center']/font/text()"
  $mw_rq_slider_upper_label = "/html/body/corpse//form//table//table//table//tr[8]//table//tr[2]/td[@colspan and @align='right']/font/text()"
  
  $mw_rq_slider_id = "mw_rq_2_10_1"
  $mw_rq_slider_question = "/html/body/corpse//form//table//table//table//tr[8]//table//tr[4]//table//tr/td[2]/font/b"
  $mw_rq_slider_selection = "/html/body/corpse//form//table//table//table//tr[8]//table//tr[4]//input[@type='radio']"
  
  @import _slider.f.ts
  
  $mw_rq_slider_id = "mw_rq_2_10_2"
  $mw_rq_slider_question = "/html/body/corpse//form//table//table//table//tr[8]//table//tr[4]//table//tr/td[2]/font/b"
  $mw_rq_slider_selection = "/html/body/corpse//form//table//table//table//tr[8]//table//tr[4]//input[@type='radio']"
  
  @import _slider.f.ts
  
  $("./div[@mw-item-id='mw_rq_2_3']/div/input") {
    add_class("mw_rq_single_line_text_field")
  }
  
  $("./div[@mw-item-id='mw_rq_2_4']/div") {
    inner() {
      replace("-- OR --", "<span style=\"display:block\">-- OR --</span>")
    }
  }
}