$("/html/body/div/form") {
  $mw_rq_section_header = "/html/body/corpse//form//table//table//table//font[@size='4']/strong/text()"
  $mw_rq_save_n_exit = "/html/body/corpse//form//input[@name='saveAndExit.name']"
  
  $("/html/body/corpse//form[@id='rq_form']") {
    $mw_rq_section_header = "/html/body/corpse//form[@id='rq_form']//div[contains(@class, 'sectionHeader')]/text()"
    $mw_rq_save_n_exit = "/html/body/corpse//form[@id='rq_form']//input[@id='saveAndExitButton']"
  }
  
  # Errors
  insert_top("div", "", id: "mw_questionnaire_err") {
    copy_here("/html/body/corpse//ul[./li[contains(@class, 'questionnaireTextError')]]")
  }
  # Section label
  insert_top("div", fetch($mw_rq_section_header), id: "mw_rq_header_section_label")
  # Logo and Logout button
  insert_top("div", "", id: "mw_rq_header") {
    insert_bottom("div", "", id: "mw_rq_header_bar") {
      insert_bottom("div", "", class: "mw_rq_header_logo")
      
      insert_bottom("a", "Logout", id: "mw_rq_header_logout", onclick: "launchPopupFlag=false;", href: "/singles/servlet/user/logout")

      move_here($mw_rq_save_n_exit)
    }
  }
}
