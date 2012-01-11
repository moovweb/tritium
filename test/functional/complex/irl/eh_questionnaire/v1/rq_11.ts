
# ----- ConfigBlocks ----
#
#Config::IncludeBlockset
#[["blockset_name", "base"]]
@import base.ts


#
#Config::IncludeBlockset
#[["blockset_name", "rq_base"]]
@import rq_base.ts



# ----- ParsedHTMLBlocks ----
html() {
  #
  #Content::Inject::InjectHTML
  #[["html", "<div class=\"mw_RQHeader\"> \t<div class=\"mw_RQHeaderLogo\"></div> <a href=\"/singles/servlet/user/logout\" class=\"mw_RQHeaderLogout\">Logout</a></div>"], ["add_after", ""], ["multiple", ""], ["add_before", "body :first-child"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
  $("(//body//*[position() = 1 and self::*])[1]") {
    inject_before("<div class=\"mw_RQHeader\"> 	<div class=\"mw_RQHeaderLogo\"></div> <a href=\"/singles/servlet/user/logout\" class=\"mw_RQHeaderLogout\">Logout</a></div>")
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mRQ_11"], ["selector", ".mRQ"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("(//*[contains(concat(' ', @class, ' '), ' mRQ ')])[1]") {
    match($done, "no") {
        var("done", "yes")
      attribute("class") {
        value() {
            append(" mRQ_11")
        }
      }
    }
  }
  
  
  #Remove Unnecessary Elements
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".mRQFormQuestions > b"]]
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestions ')]/b") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".mRQFormQuestions > p"]]
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestions ')]/p") {
      remove()
    }
    
    
  # end BasicGroup
  
  #RQ Form Header
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mRQFormQuestionsHead"], ["selector", ".sectionHeader"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("(//*[contains(concat(' ', @class, ' '), ' sectionHeader ')])[1]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mRQFormQuestionsHead")
          }
        }
      }
    }
    
    
    #
    #Group::IgnoreGroup
    #[]
    # No match necessary - contents will be commented out
    #  #
    #  #Content::Formatting::WrapTextChildren
    #  #[["selector", ".mRQFormQuestionsHead"], ["tag_name", ""], ["class_name", "mRemove"], ["multiple", ""], ["split_delimiter", ""]]
    #  $("(//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsHead ')])[1]") {
    #    wrap_text_children("div", class: 'mRemove')
    #  }
    #  
    #  
    #  #
    #  #Content::Formatting::SetInnerHTML
    #  #[["selector", ".mRQFormQuestionsHead"], ["html", "<div class=\"mRQFormQuestionsHeadContinue\">Please answer the following questions as completely and honestly as possible.</div>"], ["prepend", ""], ["append", ""]]
    #  $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsHead ')]") {
    #    inner("<div class=\"mRQFormQuestionsHeadContinue\">Please answer the following questions as completely and honestly as possible.</div>")
    #  }
    #  
    #  
    #  #
    #  #Content::Inject::InjectHTML
    #  #[["html", "<div class=\"mRQFormQuestionsHeadTop\">Relationship Questionnaire</div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mRQFormQuestionsHeadBottom"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    #  $("(//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsHeadBottom ')])[1]") {
    #    inject_before("<div class=\"mRQFormQuestionsHeadTop\">Relationship Questionnaire</div>")
    #  }
    #  
    #  
    #  #
    #  #Content::Inject::InjectHTML
    #  #[["html", "<div class=\"mRQFormQuestionsHeadSub\">Please answer the following questions as completely and honestly as possible.</div>"], ["add_after", ".mRQFormQuestionsHeadBottom"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    #  $("(//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsHeadBottom ')])[1]") {
    #    inject_after("<div class=\"mRQFormQuestionsHeadSub\">Please answer the following questions as completely and honestly as possible.</div>")
    #  }
    #  
    #  
    
    
  # end BasicGroup
  
  #Questions Listing
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #This is a fix for a one-off case of malformed HTML
    #Content::Formatting::MoveUp
    #[["move_me", ".inputList input[name*=\"no_pref_btn\"]"]]
    $("//*[contains(concat(' ', @class, ' '), ' inputList ')]//input[contains(@name, \"no_pref_btn\")]") {
      move_to("..", "before")
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mRQFormQuestionsList"], ["selector", ".mRQFormQuestions .rqform"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestions ')]//*[contains(concat(' ', @class, ' '), ' rqform ')]") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mRQFormQuestionsList")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mRQFormQuestionsListItem"], ["selector", ".mRQFormQuestionsList > li"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsList ')]/li") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mRQFormQuestionsListItem")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mRQFormQuestionsListItemQuestion"], ["selector", ".mRQFormQuestionsListItem .question"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItem ')]//*[contains(concat(' ', @class, ' '), ' question ')]") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mRQFormQuestionsListItemQuestion")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mRQFormQuestionsListItemAnswer"], ["selector", ".mRQFormQuestionsListItem .answer, .mRQFormQuestionsListItem .sliderContainer"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItem ')]//*[contains(concat(' ', @class, ' '), ' answer ')]") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mRQFormQuestionsListItemAnswer")
          }
        }
      }
    }
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItem ')]//*[contains(concat(' ', @class, ' '), ' sliderContainer ')]") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mRQFormQuestionsListItemAnswer")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mRQFormQuestionsListItemAnswer"], ["selector", ".mRQFormQuestionsListItem .mRQFormQuestionsListItemQuestion + div"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItem ')]//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItemQuestion ')]/following-sibling::*[1]/self::div") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mRQFormQuestionsListItemAnswer")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mRQFormQuestionsListItemAnswerChoice"], ["selector", ".mRQFormQuestionsListItemAnswer li"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "input[type=\"radio\"]"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItemAnswer ')]//li") {
      match($done, "no") {
          var("conditional", "false")
            $(".//input[@type = \"radio\"]") {
              var("conditional", "true")
            }
          match($conditional, "true") {
        attribute("class") {
          value() {
              append(" mRQFormQuestionsListItemAnswerChoice")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mRQFormQuestionsListItemAnswerCheck"], ["selector", ".mRQFormQuestionsListItemAnswer li"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "input[type=\"checkbox\"]"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItemAnswer ')]//li") {
      match($done, "no") {
          var("conditional", "false")
            $(".//input[@type = \"checkbox\"]") {
              var("conditional", "true")
            }
          match($conditional, "true") {
        attribute("class") {
          value() {
              append(" mRQFormQuestionsListItemAnswerCheck")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mRQFormQuestionsListItemAnswerSlider"], ["selector", ".mRQFormQuestionsListItemAnswer li"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ".sliderContainer"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItemAnswer ')]//li") {
      match($done, "no") {
          var("conditional", "false")
            $(".//*[contains(concat(' ', @class, ' '), ' sliderContainer ')]") {
              var("conditional", "true")
            }
          match($conditional, "true") {
        attribute("class") {
          value() {
              append(" mRQFormQuestionsListItemAnswerSlider")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".mRQFormQuestionsListItem br"]]
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItem ')]//br") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".mRQFormQuestionsListItemQuestion .number"]]
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItemQuestion ')]//*[contains(concat(' ', @class, ' '), ' number ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mRQFormQuestionsListItemAnswerSlider"], ["selector", ".sliderContainer"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' sliderContainer ')]") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mRQFormQuestionsListItemAnswerSlider")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mRQFormQuestionsListItemAnswerSliderList"], ["selector", ".slider-labels"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' slider-labels ')]") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mRQFormQuestionsListItemAnswerSliderList")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mRQFormQuestionsListItemAnswerSliderListItem"], ["selector", ".mRQFormQuestionsListItemAnswerSliderList li"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItemAnswerSliderList ')]//li") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mRQFormQuestionsListItemAnswerSliderListItem")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mRQFormQuestionsListItemFormRow"], ["selector", ".formRow"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' formRow ')]") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mRQFormQuestionsListItemFormRow")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mRQFormQuestionsListItemAnswerInput"], ["selector", ".mRQFormQuestionsListItemAnswer"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "input[type=\"text\"]"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItemAnswer ')]") {
      match($done, "no") {
          var("conditional", "false")
            $(".//input[@type = \"text\"]") {
              var("conditional", "true")
            }
          match($conditional, "true") {
        attribute("class") {
          value() {
              append(" mRQFormQuestionsListItemAnswerInput")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mRQFormQuestionsListItemAnswerSliderHandle"], ["selector", ".mRQFormQuestionsListItemAnswerSlider .ui-slider-handle"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItemAnswerSlider ')]//*[contains(concat(' ', @class, ' '), ' ui-slider-handle ')]") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mRQFormQuestionsListItemAnswerSliderHandle")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mRQFormQuestionsListItemAnswerSliderRow"], ["selector", ".mRQFormQuestionsListItemAnswerSlider .ui-slider"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItemAnswerSlider ')]//*[contains(concat(' ', @class, ' '), ' ui-slider ')]") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mRQFormQuestionsListItemAnswerSliderRow")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::WrapTextChildren
    #[["selector", ".mRQFormQuestionsListItemAnswerInput"], ["tag_name", "div"], ["class_name", "mRemove"], ["multiple", ""], ["split_delimiter", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItemAnswerInput ')])[1]") {
      wrap_text_children("div", class: 'mRemove')
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".mRemove"]]
    $("//*[contains(concat(' ', @class, ' '), ' mRemove ')]") {
      remove()
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<ul class=\"mRQFormQuestionsListItemAnswerSliderSteps\"> \t<li class=\"mRQFormQuestionsListItemAnswerSliderStepsItem\"></li> \t<li class=\"mRQFormQuestionsListItemAnswerSliderStepsItem\"></li> \t<li class=\"mRQFormQuestionsListItemAnswerSliderStepsItem\"></li> \t<li class=\"mRQFormQuestionsListItemAnswerSliderStepsItem\"></li> \t<li class=\"mRQFormQuestionsListItemAnswerSliderStepsItem\"></li> \t<li class=\"mRQFormQuestionsListItemAnswerSliderStepsItem\"></li> \t<li class=\"mRQFormQuestionsListItemAnswerSliderStepsItem\"></li> </ul>"], ["add_after", ".mRQFormQuestionsListItemAnswerSliderRow"], ["multiple", "true"], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    #$("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItemAnswerSliderRow ')]") {
    #  inject_after("<ul class=\"mRQFormQuestionsListItemAnswerSliderSteps\"> 	<li class=\"mRQFormQuestionsListItemAnswerSliderStepsItem\"></li> 	<li class=\"mRQFormQuestionsListItemAnswerSliderStepsItem\"></li> 	<li class=\"mRQFormQuestionsListItemAnswerSliderStepsItem\"></li> 	<li class=\"mRQFormQuestionsListItemAnswerSliderStepsItem\"></li> 	<li class=\"mRQFormQuestionsListItemAnswerSliderStepsItem\"></li> 	<li class=\"mRQFormQuestionsListItemAnswerSliderStepsItem\"></li> 	<li class=\"mRQFormQuestionsListItemAnswerSliderStepsItem\"></li> </ul>")
    #}
    @import sliderAnswers.ts
    
    
    #
    #Content::Formatting::WrapIndividualElements
    #[["selector", ".mRQFormQuestionsListItemAnswerSlider"], ["tag_name", "div"], ["class_name", "mRQFormQuestionsListItemAnswerSliderWrap"], ["id", ""], ["multiple", "true"]]
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItemAnswerSlider ')]") {
      wrap("div") {
        attribute("class", "mRQFormQuestionsListItemAnswerSliderWrap")
      }
    }
    
    
    #
    #Content::Labeling::NumberElements
    #[["selector", ".mRQFormQuestionsList"], ["prefix", "mRQFormQuestLi_"]]
    # Requires tritium >= 0.6.191
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsList ')][not (@id)]") {
      $mw_temp = "mRQFormQuestLi_"
      $mw_temp {
        append(index())
      }
      attribute("id", $mw_temp)
    }
    
    
    #
    #Content::Labeling::NumberElements
    #[["selector", ".mRQFormQuestionsListItem"], ["prefix", "mRQFormQuestLiIt_"]]
    # Requires tritium >= 0.6.191
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItem ')][not (@id)]") {
      $mw_temp = "mRQFormQuestLiIt_"
      $mw_temp {
        append(index())
      }
      attribute("id", $mw_temp)
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mRQFormQuestionsListBattery"], ["selector", ".mRQFormQuestionsList"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "li[id*=\"question_battery\"]"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsList ')]") {
      match($done, "no") {
          var("conditional", "false")
            $(".//li[contains(@id, \"question_battery\")]") {
              var("conditional", "true")
            }
          match($conditional, "true") {
        attribute("class") {
          value() {
              append(" mRQFormQuestionsListBattery")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mRQFormQuestionsListBatteryScaleTextWrap"], ["selector", ".mRQFormQuestionsListBattery .mRQFormQuestionsListItem"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ".radio-labels"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListBattery ')]//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItem ')]") {
      match($done, "no") {
          var("conditional", "false")
            $(".//*[contains(concat(' ', @class, ' '), ' radio-labels ')]") {
              var("conditional", "true")
            }
          match($conditional, "true") {
        attribute("class") {
          value() {
              append(" mRQFormQuestionsListBatteryScaleTextWrap")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".mRQFormQuestionsListBatteryScaleTextWrap:last-of-type"]]
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListBatteryScaleTextWrap ') and position() = last()]") {
      remove()
    }
    
    
    #
    #Content::Formatting::WrapTextChildren
    #[["selector", ".mRQFormQuestionsListBattery .mRQFormQuestionsListItem"], ["tag_name", ""], ["class_name", "mRQFormQuestionsListItemQuestion"], ["multiple", "true"], ["split_delimiter", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListBattery ')]//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItem ')]") {
      wrap_text_children("div", class: 'mRQFormQuestionsListItemQuestion')
    }
    
    
    #
    #Content::Formatting::RemoveElementsWithoutText
    #[["selector", ".mRQFormQuestionsListBatteryScaleTextWrap .mRQFormQuestionsListItemQuestion"]]
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListBatteryScaleTextWrap ')]//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItemQuestion ')][normalize-space() = '']") {
      remove()
    }
    
    
    #
    #Content::Formatting::MoveAfter
    #[["move_me", ".radio-labels"], ["after_me", ".mRQFormQuestionsListBatteryScaleTextWrap + .mRQFormQuestionsListItem > .mRQFormQuestionsListItemAnswer"], ["map_multiple", "true"]]
    var("counter", "a")
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListBatteryScaleTextWrap ')]/following-sibling::*[1]/self::*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItem ')]/*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItemAnswer ')]") {
      var("counter") {
        append("a")
      }
      attribute("parent_id", $counter)
    }
    var("counter", "a")
    $("//*[contains(concat(' ', @class, ' '), ' radio-labels ')]") {
      var("counter") {
        append("a")
      }
      var("xpath") {
        set("//*[@parent_id = '")
        append($counter)
        append("']")
      }
      move_to($xpath, "after")
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".mRQFormQuestionsListBatteryScaleTextWrap"]]
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListBatteryScaleTextWrap ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mRQFormQuestionsListBatteryScaleText"], ["selector", ".radio-labels"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' radio-labels ')]") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mRQFormQuestionsListBatteryScaleText")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mRQFormQuestionsListItemAnswerRadiosWrap"], ["selector", ".mRQFormQuestionsListItemAnswer .radios"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItemAnswer ')]//*[contains(concat(' ', @class, ' '), ' radios ')]") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mRQFormQuestionsListItemAnswerRadiosWrap")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mRQFormQuestionsListItemAnswerRadio"], ["selector", ".mRQFormQuestionsListItemAnswerRadiosWrap label"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItemAnswerRadiosWrap ')]//label") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mRQFormQuestionsListItemAnswerRadio")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mRQFormQuestionsListItemAnswerRadioButton"], ["selector", ".mRQFormQuestionsListItemAnswerRadio input"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItemAnswerRadio ')]//input") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mRQFormQuestionsListItemAnswerRadioButton")
          }
        }
      }
    }
    
    
    #
    #Group::IgnoreGroup
    #[]
    # No match necessary - contents will be commented out
    
    #Text Input Placeholders
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mRQFormQuestionsListItemAnswerInputItem"], ["selector", ".mRQFormQuestionsListItemAnswerInput input"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItemAnswerInput ')]//input") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mRQFormQuestionsListItemAnswerInputItem")
            }
          }
        }
      }
      
      
      #
      #Content::Labeling::NumberElements
      #[["selector", ".mRQFormQuestionsListItemAnswerInputItem"], ["prefix", "mRQFormQuestListItemAnsInIt_"]]
      # Requires tritium >= 0.6.191
      $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItemAnswerInputItem ')][not (@id)]") {
        $mw_temp = "mRQFormQuestListItemAnsInIt_"
        $mw_temp {
          append(index())
        }
        attribute("id", $mw_temp)
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "placeholder"], ["value", "mm"], ["selector", "#mRQFormQuestListItemAnsInIt_1"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("(//*[@id = 'mRQFormQuestListItemAnsInIt_1'])[1]") {
        match($done, "no") {
            var("done", "yes")
          attribute("placeholder") {
            value() {
                set("mm")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "placeholder"], ["value", "dd"], ["selector", "#mRQFormQuestListItemAnsInIt_2"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("(//*[@id = 'mRQFormQuestListItemAnsInIt_2'])[1]") {
        match($done, "no") {
            var("done", "yes")
          attribute("placeholder") {
            value() {
                set("dd")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "placeholder"], ["value", "yyyy"], ["selector", "#mRQFormQuestListItemAnsInIt_3"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("(//*[@id = 'mRQFormQuestListItemAnsInIt_3'])[1]") {
        match($done, "no") {
            var("done", "yes")
          attribute("placeholder") {
            value() {
                set("yyyy")
            }
          }
        }
      }
      
      
    # end BasicGroup
    
  # end BasicGroup
  
  #Continue
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mRQFormContinueWrap"], ["selector", ".mRQForm > .clr .rqform"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("(//*[contains(concat(' ', @class, ' '), ' mRQForm ')]/*[contains(concat(' ', @class, ' '), ' clr ')]//*[contains(concat(' ', @class, ' '), ' rqform ')])[1]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mRQFormContinueWrap")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mRQFormContinueInput"], ["selector", ".mRQFormContinueWrap input"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormContinueWrap ')]//input") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mRQFormContinueInput")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".mRQFormContinueInput:first-child"]]
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormContinueInput ') and position() = 1]") {
      remove()
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "value"], ["value", "Next >>"], ["selector", ".mRQFormContinueWrap input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("(//*[contains(concat(' ', @class, ' '), ' mRQFormContinueWrap ')]//input)[1]") {
      match($done, "no") {
          var("done", "yes")
        attribute("value") {
          value() {
              set("Next >>")
          }
        }
      }
    }
    
    
  # end BasicGroup
  
  #Progress
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mRQProgress"], ["selector", ".mRQBottom"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("(//*[contains(concat(' ', @class, ' '), ' mRQBottom ')])[1]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mRQProgress")
          }
        }
      }
    }
    
    
  # end BasicGroup
  
}