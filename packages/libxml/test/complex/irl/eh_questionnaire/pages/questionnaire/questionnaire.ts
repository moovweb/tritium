name("corpse")
wrap("body", class: "mw_questionnaire") {
  log("--> v2 questionnaire.ts")
  
  copy_here("/html/body/corpse//form") {
    text("")
    
    # There is some strange nokogiri bug that doesn't
    # let you insert a form element here.
    # So we have to wrap it
    wrap("div")
  }
  
}

match($path) {
  with(/\/1$/) {
    @import _questionnaire.01.ts
    @import _header.ts
    @import _footer.ts
    @import _optimize.ts
  }
  with(/\/2$/) {
    @import _questionnaire.02.ts
    @import _header.ts
    @import _footer.ts
    @import _optimize.ts
  }
  with(/\/3$/) {
    @import _questionnaire.03.ts
    @import _header.ts
    @import _footer.ts
    @import _optimize.ts
  }
  with(/\/4$/) {
    @import _questionnaire.04.ts
    @import _header.ts
    @import _footer.ts
    @import _optimize.ts
  }
  with(/\/5$/) {
    @import _questionnaire.05.ts
    @import _header.ts
    @import _footer.ts
    @import _optimize.ts
  }
  with(/\/6$/) {
    @import _questionnaire.06.ts
    @import _header.ts
    @import _footer.ts
    @import _optimize.ts
  }
  with(/\/7$/) {
    @import _questionnaire.07.ts
    @import _header.ts
    @import _footer.ts
    @import _optimize.ts
  }
  with(/\/8$/) {
    @import _questionnaire.08.ts
    @import _header.ts
    @import _footer.ts
    @import _optimize.ts
  }
  with(/\/9$/) {
    @import _questionnaire.09.ts
    @import _header.ts
    @import _footer.ts
    @import _optimize.ts
  }
  with(/\/10$/) {
    @import _questionnaire.10.ts
    @import _header.ts
    @import _footer.ts
    @import _optimize.ts
  }
  with(/\/11$/) {
    @import _questionnaire.11.ts
    @import _header.ts
    @import _footer.ts
    @import _optimize.ts
  }
  with(/\/12$/) {
    @import _questionnaire.12.ts
    @import _header.ts
    @import _footer.ts
    @import _optimize.ts
  }
  with(/\/13$/) {
    @import _questionnaire.13.ts
    @import _header.ts
    @import _footer.ts
    @import _optimize.ts
  }
  with(/\/14$/) {
    @import _questionnaire.14.ts
    @import _header.ts
    @import _footer.ts
    @import _optimize.ts
  }
  with(/\/15$/) {
    @import _questionnaire.15.ts
    @import _header.ts
    @import _footer.ts
    @import _optimize.ts
  }
  with(/\/16$/) {
    @import _questionnaire.16.ts
    @import _header.ts
    @import _footer.ts
    @import _optimize.ts
  }
  with(/\/17$/) {
    @import _questionnaire.17.ts
    @import _header.ts
    @import _footer.ts
    @import _optimize.ts
  }
  with(/\/18$/) {
    @import _questionnaire.18.ts
    @import _header.ts
    @import _footer.ts
    @import _optimize.ts
  }
  with(/\/19$/) {
    @import _questionnaire.19.ts
    @import _header.ts
    @import _footer.ts
    @import _optimize.ts
  }
  # with(/\/20$/) {
  #   @import _questionnaire.20.ts
  #   @import _header.ts
  #   @import _footer.ts
  #   @import _optimize.ts
  # }
  # with(/\/21$/) {
  #   @import _questionnaire.21.ts
  #   @import _header.ts
  #   @import _footer.ts
  #   @import _optimize.ts
  # }
  with(/\/22$/) {
    @import _questionnaire.22.ts
  }
}
