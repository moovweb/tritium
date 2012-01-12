$("/html/body/div/form[contains(@action, '/singles/servlet/questionnaire/submit/relationship')]") {
  insert_bottom("div", "", id: "mw_rq_footer") {
    insert_bottom("button", "Next >>", onclick: "document.forms[0]['saveAndContinue.name'].click()", id: "mw_rq_footer_button")
    insert_bottom("div", fetch("/html/body/corpse//form//table//table//table//table/tr[1]/td[@align='center']/font[@size='2']/text()"), id: "mw_rq_footer_progress")
    
    copy_here("/html/body/corpse//form//input[@type='submit' and @name='saveAndContinue.name']")
  }
}