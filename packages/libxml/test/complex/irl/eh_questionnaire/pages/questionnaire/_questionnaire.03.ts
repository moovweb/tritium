$("/html/body/div/form[not(@id)]") {
  
  # Preprocess
  $("/html/body/corpse//form//table//table//table//table//tr/td[not(@*) and .//input[@type='radio'] and .//input[@type='checkbox']]") {
    # Do NOT switch the order of any of these. It matters.
    inner() {
      replace(/\s*([1-4])\./, "</td><td id=\"mw_rq_q$1\">")
      replace(/\s*<br\s*\/?>\s*/, "")
    }
    move_here("./td[@id='mw_rq_q2']/table", "after")
  }
  
  $mw_rq_radio_id = "mw_rq_3_1"
  $mw_rq_radio_question = "/html/body/corpse//form//table//table//table//table//td[@id='mw_rq_q1']/text()[1]"
  $mw_rq_radio_selection = "/html/body/corpse//form//table//table//table//table//td[@id='mw_rq_q1']/text()[1]/following-sibling::input | /html/body/corpse//form//table//table//table//table//td[@id='mw_rq_q1']/text()[1]/following-sibling::text()"
  
  @import _radio.f.ts
  
  $mw_rq_checkbox_id = "mw_rq_3_2"
  $mw_rq_checkbox_question = "/html/body/corpse//form//table//table//table//table//td[@id='mw_rq_q2']/text()[1]"
  $mw_rq_checkbox_selection = "/html/body/corpse//form//table//table//table//table//td[@id='mw_rq_q2']/text()[1]/following-sibling::input | /html/body/corpse//form//table//table//table//table//td[@id='mw_rq_q2']/text()[1]/following-sibling::text()"
  
  @import _checkbox.f.ts
  
  $mw_rq_slider_id = "mw_rq_3_3"
  $mw_rq_slider_question = "/html/body/corpse//form//table//table//table//table//td[@id='mw_rq_q3']/text()"
  $mw_rq_slider_selection = "/html/body/corpse//form//table//table//table//table//td[@id='mw_rq_q3']/following-sibling::td//input"
  $mw_rq_slider_lower_label = "/html/body/corpse//form//table//table//table//table//td[@id='mw_rq_q3']/following-sibling::td//tr[1]/td[@colspan and not(@align)]/font/text()"
  $mw_rq_slider_middle_label = "/html/body/corpse//form//table//table//table//table//td[@id='mw_rq_q3']/following-sibling::td//tr[1]/td[@colspan and @align='center']/font/text()"
  $mw_rq_slider_upper_label = "/html/body/corpse//form//table//table//table//table//td[@id='mw_rq_q3']/following-sibling::td//tr[1]/td[@colspan and @align='right']/font/text()"
  
  @import _slider.f.ts
  
  # The domination questions
  match($region, "au") {
    $mw_rq_radio_id = "mw_rq_3_4"
    $mw_rq_radio_question = "/html/body/corpse//form//table//table//table//table//td[@id='mw_rq_q4']/text()[1]"
    $mw_rq_radio_selection = "/html/body/corpse//form//table//table//table//table//td[@id='mw_rq_q4']/text()[1]/following-sibling::input | /html/body/corpse//form//table//table//table//table//td[@id='mw_rq_q4']/text()[1]/following-sibling::text()"
  
    @import _radio.f.ts
  }
  
}