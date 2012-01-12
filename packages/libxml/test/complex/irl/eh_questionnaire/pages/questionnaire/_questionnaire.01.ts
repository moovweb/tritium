# User accounts
# min.r7.uk.rq.1@mw.test.com

# This is the first form: div based
$("/html/body/form[@id='rq_form']") {
  # $mw_rq_radio_id
  # $mw_rq_radio_question
  #     xpath for text node
  # $mw_rq_radio_selection
  #     xpath for an array of <input type="radio">
  
  #
  # Start first subsection
  #
  $mw_rq_radio_id = "mw_rq_1_1"
  $mw_rq_radio_question = "/html/body/corpse//form[@id='rq_form']//li[@id='question_1']/div[contains(@class, 'question')]"
  $mw_rq_radio_selection = "/html/body/corpse//form[@id='rq_form']//li[@id='question_1']/div[contains(@class, 'answer')]//label"
  
  @import _radio.f.ts
  
  $mw_rq_multifield_id = "mw_rq_1_2"
  $mw_rq_multifield_question = "/html/body/corpse//form[@id='rq_form']//li[@id='question_2']/div[contains(@class, 'question')]"
  $mw_rq_multifield_answer_fields = "/html/body/corpse//form[@id='rq_form']//li[@id='question_2']/div[contains(@class, 'answer')]/input"
  
  @import _multifield.f.ts
  
  # $mw_rq_slider_selection
  #     xpath for an array of <input type="radio"> or one <input type="hidden">
  # $mw_rq_slider_lower_label
  #     xpath for text node
  # $mw_rq_slider_middle_label
  #     xpath for text node
  # $mw_rq_slider_upper_label
  #     xpath for text node
  # $mw_rq_slider_error
  $mw_rq_slider_id = "mw_rq_1_3"
  $mw_rq_slider_question = "/html/body/corpse//form[@id='rq_form']//li[@id='question_3']/div[contains(@class, 'question')]"
  $mw_rq_slider_selection = "/html/body/corpse//form[@id='rq_form']//li[@id='question_3']/div[contains(@class, 'slideContainer')]//input"
  $mw_rq_slider_lower_label = "/html/body/corpse//form[@id='rq_form']//li[@id='question_3']/div[contains(@class, 'slideContainer')]/ul/li[contains(@class, 'left')]/text()"
  $mw_rq_slider_middle_label = "/html/body/corpse//form[@id='rq_form']//li[@id='question_3']/div[contains(@class, 'slideContainer')]/ul/li[contains(@class, 'center')]/text()"
  $mw_rq_slider_upper_label = "/html/body/corpse//form[@id='rq_form']//li[@id='question_3']/div[contains(@class, 'slideContainer')]/ul/li[contains(@class, 'right')]/text()"
  
  @import _slider.f.ts
}

# This is the second form: table based
$("/html/body/div/form[not(@id)]") {
  $("/html/body/corpse//form//table//table//table//tr[3]//table") {
    inner() {
      replace(/\s*<br>\s*/, " ")
    }
  }
  
  #
  # Start first subsection
  #
  $mw_rq_radio_id = "mw_rq_1_1"
  $mw_rq_radio_question = "/html/body/corpse//form//table//table//table//tr[1]/td[@align='right']/p"
  $mw_rq_radio_selection = "/html/body/corpse//form//table//table//table//tr[1]/td[@width='50%']"
  
  @import _radio.f.ts

  $mw_rq_multifield_id = "mw_rq_1_2"
  $mw_rq_multifield_question = "/html/body/corpse//form//table//table//table//tr[2]/td[@align='right']/p"
  $mw_rq_multifield_answer_fields = "/html/body/corpse//form//table//table//table//tr[2]/td/input | /html/body/corpse//form//table//table//table//tr[2]/td[./input]/text()"
  
  @import _multifield.f.ts
  
  $mw_rq_slider_id = "mw_rq_1_3"
  $mw_rq_slider_question = "/html/body/corpse//form//table//table//table//tr[3]//table//tr[3]/td[1]"
  $mw_rq_slider_selection = "/html/body/corpse//form//table//table//table//tr[3]//table//tr[3]//input[@type='radio']"
  $mw_rq_slider_lower_label = "/html/body/corpse//form//table//table//table//tr[3]//table//tr[1]/td[not(@align)]/font/text()"
  $mw_rq_slider_middle_label = "/html/body/corpse//form//table//table//table//tr[3]//table//tr[1]/td[@align='center']/font/text()"
  $mw_rq_slider_upper_label = "/html/body/corpse//form//table//table//table//tr[3]//table//tr[1]/td[@align='right']/font/text()"
  
  @import _slider.f.ts
  
  $mw_rq_radio_id = "mw_rq_1_4"
  $mw_rq_radio_question = "/html/body/corpse//form//table//table//table//tr[4]/td[@align='right']/p"
  $mw_rq_radio_selection = "/html/body/corpse//form//table//table//table//tr[4]/td[@width='50%']"
  
  @import _radio.f.ts

  $mw_rq_multifield_id = "mw_rq_1_5"
  $mw_rq_multifield_question = "/html/body/corpse//form//table//table//table//tr[5]/td[@align='right']/p"
  $mw_rq_multifield_answer_fields = "/html/body/corpse//form//table//table//table//tr[5]/td/input[@type='text']"
  
  @import _multifield.f.ts

  $mw_rq_multifield_id = "mw_rq_1_6"
  $mw_rq_multifield_question = "/html/body/corpse//form//table//table//table//tr[6]/td[@align='right']/p"
  $mw_rq_multifield_answer_fields = "/html/body/corpse//form//table//table//table//tr[6]/td/input[@type='text']"
  
  @import _multifield.f.ts

  $mw_rq_radio_id = "mw_rq_1_7"
  $mw_rq_radio_question = "/html/body/corpse//form//table//table//table//tr[7]/td[@align='right']/p"
  $mw_rq_radio_selection = "/html/body/corpse//form//table//table//table//tr[7]/td[@width='50%']"
  
  @import _radio.f.ts

  $mw_rq_radio_id = "mw_rq_1_8"
  $mw_rq_radio_question = "/html/body/corpse//form//table//table//table//tr[8]/td[@align='right']/p"
  $mw_rq_radio_selection = "/html/body/corpse//form//table//table//table//tr[8]/td[@width='50%']"
  
  @import _radio.f.ts

  $mw_rq_radio_id = "mw_rq_1_9"
  $mw_rq_radio_question = "/html/body/corpse//form//table//table//table//tr[9]/td[@align='right']/p"
  $mw_rq_radio_selection = "/html/body/corpse//form//table//table//table//tr[9]/td[@width='50%']"
  
  @import _radio.f.ts

  $mw_rq_slider_id = "mw_rq_1_10"
  $mw_rq_slider_question = "/html/body/corpse//form//table//table//table//tr[10]//table//tr[3]/td[1]"
  $mw_rq_slider_selection = "/html/body/corpse//form//table//table//table//tr[10]//table//tr[3]//input[@type='radio']"
  $mw_rq_slider_lower_label = "/html/body/corpse//form//table//table//table//tr[10]//table//tr[1]/td[not(@align)]/font/text()"
  $mw_rq_slider_middle_label = "/html/body/corpse//form//table//table//table//tr[10]//table//tr[1]/td[@align='center']/font/text()"
  $mw_rq_slider_upper_label = "/html/body/corpse//form//table//table//table//tr[10]//table//tr[1]/td[@align='right']/font/text()"
  
  @import _slider.f.ts
  
  $("./div[@mw-item-id='mw_rq_1_2']/div") {
    wrap_text_children("span") {
      $("self::span[contains(text(), 'dd')]") {
        remove()
      }
    }
    $("./input[@name='value(day)']") {
      attribute("placeholder", "dd")
    }
    $("./input[@name='value(month)']") {
      attribute("placeholder", "mm")
    }
    $("./input[@name='value(year)']") {
      attribute("placeholder", "yyyy")
    }
    $("./span") {
      text() {
        replace(/^\s*|\s*$/, "")
        replace(/\/\s*\//, "/")
      }
    }
    $("./node()[not(node())]") {
      # remove()
    }
  }
  $("./div[@mw-item-id='mw_rq_1_5']/div/input") {
    add_class("mw_rq_single_line_text_field")
  }
  $("./div[@mw-item-id='mw_rq_1_6']/div/input") {
    add_class("mw_rq_single_line_text_field")
  }
}