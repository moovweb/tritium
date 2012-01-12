$("/html") {
  $("./*") {
    remove()
  }
  
  insert_bottom("head") {
    insert_bottom("meta") {
      attribute("http-equiv", "refresh")
      attribute("content", "1; url=/singles/servlet/questionnaire/completed")
    }
  }
  insert_bottom("body") {
    insert_bottom("div", "", class: "mw_SpinnerOverlay") {
      insert_bottom("div", "", class: "mw_SpinnerOverlaySpinner")
    }
  }
}