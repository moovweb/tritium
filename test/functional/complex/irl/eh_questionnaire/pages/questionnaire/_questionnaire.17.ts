$("/html/body/div/form[not(@id)]") {
  
  $("/html/body/corpse//form[not(@id)]/table//table//table//tr/td[@align and @valign and ./input[@type='checkbox']]") {
    move_here("following-sibling::td[1]/text()") {
      text() {
        replace(/^\s*|\s*$/, "")
      }
    }
    $("following-sibling::td[1]") {
      remove()
    }
  }
  
  $mw_rq_checkbox_id = "mw_rq_17_1"
  $mw_rq_checkbox_question = "/html/body/corpse//form[not(@id)]/table//table//table//tr/td/p[contains(@class, 'questionnaireText')]"
  $mw_rq_checkbox_selection = "/html/body/corpse//form[not(@id)]/table//table//table//tr/td/table//input[@type='checkbox'] | /html/body/corpse//form[not(@id)]/table//table//table//tr/td/table//input[@type='checkbox']/following-sibling::text()[1]"
  
  $($mw_rq_checkbox_question) {
    inner() {
      replace(/<\/?strong>/, "")
    }
  }
  
  @import _checkbox.f.ts
  
}