$("/html/body/div/form[not(@id)]") {
  
  # Preprocess labels
  $("/html/body/corpse//form//table//table//table//tr[4]//table//tr[2]/td[@colspan]/font") {
    text() {
      replace(/\s*<br\s*\/>\s*/, " ")
    }
  }
  
  insert_bottom("div", fetch("/html/body/corpse//form//table//table//table//tr[4]//table//tr[1]/td/p/text()"), class: "mw_rq_subsection_header")
  
  match($region) {
    with("au") {
      $mw_rq_slider_lower_label = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[2]/td[@colspan and @align='right']/font/text()"
      $mw_rq_slider_middle_label = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[2]/td[@colspan and @align='center']/font/text()"
      $mw_rq_slider_upper_label = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[2]/td[@colspan and @align='left']/font/text()"
    }
    with("uk") {
      $mw_rq_slider_lower_label = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[2]/td[@colspan and @align='left']/font/text()"
      $mw_rq_slider_middle_label = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[2]/td[@colspan and @align='center']/font/text()"
      $mw_rq_slider_upper_label = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[2]/td[@colspan and @align='right']/font/text()"
    }
  }

  $mw_rq_slider_id = "mw_rq_16_1"
  $mw_rq_slider_question = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[4]/td[1]/table//tr/td[2]/font/b"
  $mw_rq_slider_selection = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[4]//input[@type='radio']"
  
  @import _slider.f.ts
  
  $mw_rq_slider_id = "mw_rq_16_2"
  $mw_rq_slider_question = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[5]/td[1]/table//tr/td[2]/font/b"
  $mw_rq_slider_selection = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[5]//input[@type='radio']"
  
  @import _slider.f.ts
  
  $mw_rq_slider_id = "mw_rq_16_3"
  $mw_rq_slider_question = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[6]/td[1]/table//tr/td[2]/font/b"
  $mw_rq_slider_selection = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[6]//input[@type='radio']"
  
  @import _slider.f.ts
  
  $mw_rq_slider_id = "mw_rq_16_4"
  $mw_rq_slider_question = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[7]/td[1]/table//tr/td[2]/font/b"
  $mw_rq_slider_selection = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[7]//input[@type='radio']"
  
  @import _slider.f.ts
  
  $mw_rq_slider_id = "mw_rq_16_5"
  $mw_rq_slider_question = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[8]/td[1]/table//tr/td[2]/font/b"
  $mw_rq_slider_selection = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[8]//input[@type='radio']"
  
  @import _slider.f.ts
  
  $mw_rq_slider_id = "mw_rq_16_6"
  $mw_rq_slider_question = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[9]/td[1]/table//tr/td[2]/font/b"
  $mw_rq_slider_selection = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[9]//input[@type='radio']"
  
  @import _slider.f.ts
  
  $mw_rq_slider_id = "mw_rq_16_7"
  $mw_rq_slider_question = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[10]/td[1]/table//tr/td[2]/font/b"
  $mw_rq_slider_selection = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[10]//input[@type='radio']"
  
  @import _slider.f.ts
  
  $mw_rq_slider_id = "mw_rq_16_8"
  $mw_rq_slider_question = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[11]/td[1]/table//tr/td[2]/font/b"
  $mw_rq_slider_selection = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[11]//input[@type='radio']"
  
  @import _slider.f.ts
  
  $mw_rq_slider_id = "mw_rq_16_9"
  $mw_rq_slider_question = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[12]/td[1]/table//tr/td[2]/font/b"
  $mw_rq_slider_selection = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[12]//input[@type='radio']"
  
  @import _slider.f.ts
  
  $mw_rq_slider_id = "mw_rq_16_10"
  $mw_rq_slider_question = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[13]/td[1]/table//tr/td[2]/font/b"
  $mw_rq_slider_selection = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[13]//input[@type='radio']"
  
  @import _slider.f.ts
  
  $mw_rq_slider_id = "mw_rq_16_11"
  $mw_rq_slider_question = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[14]/td[1]/table//tr/td[2]/font/b"
  $mw_rq_slider_selection = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[14]//input[@type='radio']"
  
  @import _slider.f.ts
  
  $mw_rq_slider_id = "mw_rq_16_12"
  $mw_rq_slider_question = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[15]/td[1]/table//tr/td[2]/font/b"
  $mw_rq_slider_selection = "/html/body/corpse//form//table//table//table//tr[4]//table//tr[15]//input[@type='radio']"
  
  @import _slider.f.ts
  
  $mw_rq_multifield_id = "mw_rq_16_13"
  $mw_rq_multifield_question = "/html/body/corpse//form//table//table//table//tr[6]/td/p/strong"
  $mw_rq_multifield_answer_fields = "/html/body/corpse//form//table//table//table//tr[6]/td/textarea"
  
  @import _multifield.f.ts
  
  $("./div[@mw-item-id='mw_rq_16_13']/div[./textarea]") {
    copy_here("/html/body/corpse//form//table//table//table//tr[6]/td/input[@type='text'] | /html/body/corpse//form//table//table//table//tr[6]/td/input[@type='text']/following-sibling::text()")
    
    $("./textarea") {
      attribute("cols") {
        remove()
      }
    }
  }
 
}