$("/html/body/div/form[not(@id)]") {
  
  $("/html/body/corpse//form[not(@id)]/table//table//table//table//tr//table//table//tr/td/font") {
    text() {
      replace(/\s*<br\s*\/?>\s*/, "")
    }
  }

  insert_bottom("div", fetch("/html/body/corpse//form//table//table//table//tr[4]//table//tr[1]/td/p/text()"), class: "mw_rq_subsection_header")

  $mw_rq_radio_id = "mw_rq_18_1"
  $mw_rq_radio_question = "/html/body/corpse//form[not(@id)]/table//table//table//table//tr[2]/td[@align='right']"
  $mw_rq_radio_selection = "/html/body/corpse//form[not(@id)]/table//table//table//table//tr[2]/td[@align='left']"
  
  @import _radio.f.ts
  
  $mw_rq_radio_id = "mw_rq_18_2"
  $mw_rq_radio_question = "/html/body/corpse//form[not(@id)]/table//table//table//table//tr[3]/td[@align='right']"
  $mw_rq_radio_selection = "/html/body/corpse//form[not(@id)]/table//table//table//table//tr[3]/td[@align='left']"
  
  @import _radio.f.ts
  
  $mw_rq_slider_id = "mw_rq_18_3"
  $mw_rq_slider_question = "/html/body/corpse//form[not(@id)]/table//table//table//table//tr[4]//table//tr/td[not(@align)]/text()"
  $mw_rq_slider_selection = "/html/body/corpse//form[not(@id)]/table//table//table//table//tr[4]//table//table//tr/td[@align]/input[@type='radio']"
  $mw_rq_slider_lower_label = "/html/body/corpse//form[not(@id)]/table//table//table//table//tr[4]//table//table//tr/td[not(@align)]/font/text()"
  $mw_rq_slider_middle_label = "/html/body/corpse//form[not(@id)]/table//table//table//table//tr[4]//table//table//tr/td[@align='center']/font/text()"
  $mw_rq_slider_upper_label = "/html/body/corpse//form[not(@id)]/table//table//table//table//tr[4]//table//table//tr/td[@align='right']/font/text()"
  
  @import _slider.f.ts
  
  $mw_rq_radio_id = "mw_rq_18_4"
  $mw_rq_radio_question = "/html/body/corpse//form[not(@id)]/table//table//table//table//tr[5]/td[@align='right']"
  $mw_rq_radio_selection = "/html/body/corpse//form[not(@id)]/table//table//table//table//tr[5]/td[@align='left']"
  
  @import _radio.f.ts
  
  $mw_rq_radio_id = "mw_rq_18_5"
  $mw_rq_radio_question = "/html/body/corpse//form[not(@id)]/table//table//table//table//tr[6]/td[@align='right']"
  $mw_rq_radio_selection = "/html/body/corpse//form[not(@id)]/table//table//table//table//tr[6]/td[@align='left']"
  
  @import _radio.f.ts
  
  $mw_rq_slider_id = "mw_rq_18_6"
  $mw_rq_slider_question = "/html/body/corpse//form[not(@id)]/table//table//table//table//tr[7]//table//tr/td[not(@align)]/text()"
  $mw_rq_slider_selection = "/html/body/corpse//form[not(@id)]/table//table//table//table//tr[7]//table//table//tr/td[@align]/input[@type='radio']"
  $mw_rq_slider_lower_label = "/html/body/corpse//form[not(@id)]/table//table//table//table//tr[7]//table//table//tr/td[not(@align)]/font/text()"
  $mw_rq_slider_middle_label = "/html/body/corpse//form[not(@id)]/table//table//table//table//tr[7]//table//table//tr/td[@align='center']/font/text()"
  $mw_rq_slider_upper_label = "/html/body/corpse//form[not(@id)]/table//table//table//table//tr[7]//table//table//tr/td[@align='right']/font/text()"
  
  @import _slider.f.ts
  
  copy_here("/html/body/corpse//form[not(@id)]/table//table//table//table//tr[8]/td[2]") {
    name("div")
    attribute("class", "mw_rq_question")

    wrap("div", mw-item-id: "mw_rq_18_6")
    
  }
  
}