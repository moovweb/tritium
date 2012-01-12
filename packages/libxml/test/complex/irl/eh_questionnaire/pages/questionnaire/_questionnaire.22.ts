$("/html/body/form[@id='rq_form']") {
  $("/html/body/corpse//form[@id='rq_form']//li/div[contains(@class, 'question')]/*") {
    remove()
  }
  
  # $mw_rq_radio_id
  # $mw_rq_radio_question
  # $mw_rq_radio_selection
  insert_bottom("div", fetch("/html/body/corpse//form[@id='rq_form']//p[contains(@class, 'questionnaireText')]/text()"), class: "mw_rq_subsection_header")
  
  $mw_rq_radio_id = "mw_rq_22_1"
  $mw_rq_radio_question =  "/html/body/corpse//form[@id='rq_form']//li[@id='question_1']/div[contains(@class, 'question')]"
  $mw_rq_radio_selection = "/html/body/corpse//form[@id='rq_form']//li[@id='question_1']//label"
  
  @import _radio.f.ts
  
  $mw_rq_radio_id = "mw_rq_22_2"
  $mw_rq_radio_question =  "/html/body/corpse//form[@id='rq_form']//li[@id='question_2']/div[contains(@class, 'question')]"
  $mw_rq_radio_selection = "/html/body/corpse//form[@id='rq_form']//li[@id='question_2']//label"
  
  @import _radio.f.ts
  
  $mw_rq_slider_id = "mw_rq_22_3"
  $mw_rq_slider_question =  "/html/body/corpse//form[@id='rq_form']//li[@id='question_3']/div[contains(@class, 'question')]"
  $mw_rq_slider_selection = "/html/body/corpse//form[@id='rq_form']//li[@id='question_3']//label"
  
  @import _radio.f.ts
  
}