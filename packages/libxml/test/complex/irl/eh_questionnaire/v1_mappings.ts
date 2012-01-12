# Auto-generated mappings for eharmony
var("url") {
  set(var("host"))
  append(var("path"))
}

match($url) {
  with (/debug=true/) {
    log("Chose 'blockset' debug")
    @import v1/debug.ts
  }

  with (/postalcodevalidation/) {
    log("Chose 'blockset' postalcodevalidation")
    @import v1/postalcodevalidation.ts
  }

  with (/state\/(disclosure|notice)/) {
    log("Chose 'blockset' ny_disclosure_overlay")
    @import v1/ny_disclosure_overlay.ts
  }

  with (/\/single(s|s\/)$/) {
    log("Chose 'blockset' singles")
    @import v1/singles.ts
  }

  with (/(jquery.blockui.min.js|postalcodevalidation)/) {
    log("Chose 'blockset' passthrough")
    @import v1/passthrough.ts
  }

  #with (/\/pe$|\/pe.html/) {
  #  log("Chose 'blockset' format_redirect")
  #  @import v1/format_redirect.ts
  #}

  with (/\/renewal\/info/) {
    log("Chose 'blockset' renewal_rates_popup")
    @import v1/renewal_rates_popup.ts
  }

  with (/homeRegS/) {
    log("Chose 'blockset' homeRegS")
    @import v1/homeRegS.ts
  }

  with (/subscription/) {
    log("Chose 'blockset' subscription_chooseplan")
    @import v1/subscription_chooseplan.ts
  }

  with (/registration/) {
    log("Chose 'blockset' registration_rewrite")
    @import v1/registration_rewrite.ts
  }

  with (/localization.js/) {
    log("Chose 'blockset' localization_passthrough")
    @import v1/localization_passthrough.ts
  }

  with (/(logindispatcher|confirmation|rqintro|homeRegS)/) {
    log("Chose 'blockset' logindispatcher")
    @import v1/logindispatcher.ts
  }

  with (/moov/) {
    log("Chose 'blockset' subscription_chooseplan")
    @import v1/subscription_chooseplan.ts
  }

  with (/localization.js/) {
    log("Chose 'blockset' localization_script_rewrite")
    @import v1/localization_script_rewrite.ts
  }

  with (/questionnaire\/completed/) {
    log("Chose 'blockset' rq_complete_static")
    @import v1/rq_complete_static.ts
  }

  with (/\/completed\/2/) {
    log("Chose 'blockset' rq_complete_static")
    @import v1/rq_complete_static.ts
  }

  with (/rq\/photos\/upload/) {
    log("Chose 'blockset' rq_photo_upload")
    @import v1/rq_photo_upload.ts
  }

  with (/\/login\/noservice/) {
    log("Chose 'blockset' rq_unfit")
    @import v1/rq_unfit.ts
  }

  with (/.com\/$/) {
    log("Chose 'blockset' home")
    @import v1/home.ts
  }

  with (/questionnaire(\/|\/submit\/)(relationship|view)\/(1$|1\/$|1\?.*)/) {
    log("Chose 'blockset' rq_1")
    @import v1/rq_1.ts
  }

  with (/questionnaire(\/|\/submit\/)(relationship|view)\/(2$|2\/$|2\?.*)/) {
    log("Chose 'blockset' rq_2")
    @import v1/rq_2.ts
  }

  with (/questionnaire(\/|\/submit\/)(relationship|view)\/(3$|3\/$|3\?.*)/) {
    log("Chose 'blockset' rq_3")
    @import v1/rq_3.ts
  }

  with (/questionnaire(\/|\/submit\/)(relationship|view)\/(4$|4\/$|4\?.*)/) {
    log("Chose 'blockset' rq_4")
    @import v1/rq_4.ts
  }

  with (/questionnaire(\/|\/submit\/)(relationship|view)\/(5$|5\/$|5\?.*)/) {
    log("Chose 'blockset' rq_5")
    @import v1/rq_5.ts
  }

  with (/questionnaire(\/|\/submit\/)(relationship|view)\/(6$|6\/$|6\?.*)/) {
    log("Chose 'blockset' rq_6")
    @import v1/rq_6.ts
  }

  with (/questionnaire(\/|\/submit\/)(relationship|view)\/(7$|7\/$|7\?.*)/) {
    log("Chose 'blockset' rq_7")
    @import v1/rq_7.ts
  }

  with (/questionnaire(\/|\/submit\/)(relationship|view)\/(8$|8\/$|8\?.*)/) {
    log("Chose 'blockset' rq_8")
    @import v1/rq_8.ts
  }

  with (/questionnaire(\/|\/submit\/)(relationship|view)\/(9$|9\/$|9\?.*)/) {
    log("Chose 'blockset' rq_9")
    @import v1/rq_9.ts
  }

  with (/questionnaire(\/|\/submit\/)(relationship|view)\/(10$|10\/$|10\?.*)/) {
    log("Chose 'blockset' rq_10")
    @import v1/rq_10.ts
  }

  with (/questionnaire(\/|\/submit\/)(relationship|view)\/(11$|11\/$|11\?.*)/) {
    log("Chose 'blockset' rq_11")
    @import v1/rq_11.ts
  }

  with (/questionnaire(\/|\/submit\/)(relationship|view)\/(12$|12\/$|12\?.*)/) {
    log("Chose 'blockset' rq_12")
    @import v1/rq_12.ts
  }

  with (/questionnaire(\/|\/submit\/)(relationship|view)\/(13$|13\/$|13\?.*)/) {
    log("Chose 'blockset' rq_13")
    @import v1/rq_13.ts
  }

  with (/questionnaire(\/|\/submit\/)(relationship|view)\/(14$|14\/$|14\?.*)/) {
    log("Chose 'blockset' rq_14")
    @import v1/rq_14.ts
  }

  with (/questionnaire(\/|\/submit\/)(relationship|view)\/(15$|15\/$|15\?.*)/) {
    log("Chose 'blockset' rq_15")
    @import v1/rq_15.ts
  }

  with (/questionnaire(\/|\/submit\/)(relationship|view)\/(16$|16\/$|16\?.*)/) {
    log("Chose 'blockset' rq_16")
    @import v1/rq_16.ts
  }

  with (/questionnaire(\/|\/submit\/)(relationship|view)\/(17$|17\/$|17\?.*)/) {
    log("Chose 'blockset' rq_17")
    @import v1/rq_17.ts
  }

  with (/questionnaire(\/|\/submit\/).*(relationship|view)\/(18$|18\/$|18\?)/) {
    log("Chose 'blockset' rq_18")
    @import v1/rq_18.ts
  }

  with (/questionnaire(\/|\/submit\/)(relationship|view)\/(19$|19\/$|19\?.*)/) {
    log("Chose 'blockset' rq_19")
    @import v1/rq_19.ts
  }

  with (/questionnaire(\/|\/submit\/)(relationship|view)\/(21$|21\/$|21\?.*)/) {
    log("Chose 'blockset' rq_21")
    @import v1/rq_21.ts
  }

  with (/questionnaire(\/|\/submit\/)(relationship|view)\/(20$|20\/$|20\?.*)/) {
    log("Chose 'blockset' rq_20")
    @import v1/rq_20.ts
  }

  with (/questionnaire(\/|\/submit\/)(relationship|view)\/(22$|22\/$|22\?.*)/) {
    log("Chose 'blockset' rq_22")
    @import v1/rq_22.ts
  }

  with (/questionnaire(\/|\/submit\/).*(relationship|view)\/(23$|23\/$|23\?)/) {
    log("Chose 'blockset' rq_23")
    @import v1/rq_23.ts
  }

  with (/questionnaire(\/|\/submit\/).*(relationship|view)\/(24$|24\/$|24\?)/) {
    log("Chose 'blockset' rq_24")
    @import v1/rq_24.ts
  }

  with (/rqfirstpagetracking/) {
    log("Chose 'blockset' rq_redirects")
    @import v1/rq_redirects.ts
  }

  with (/.com\/login$/) {
    log("Chose 'blockset' login")
    @import v1/login.ts
  }

  with (/login|user|servlet/) {
    log("Chose 'blockset' login_temp")
    @import v1/login_temp.ts
  }

  with (/singles/) {
    log("Chose 'blockset' singles")
    @import v1/singles.ts
  }

  with (/\/terms$/) {
    log("Chose 'blockset' terms")
    @import v1/terms.ts
  }

  with (/(\/privacy\/statement$)/) {
    log("Chose 'blockset' privacy")
    @import v1/privacy.ts
  }

  with (/^zzzzzzzzzzzzzzzzzzzzz/) {
    log("Chose 'blockset' base")
    @import v1/base.ts
  }

}