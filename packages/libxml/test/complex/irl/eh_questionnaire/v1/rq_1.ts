
# ----- ConfigBlocks ----
#
#Config::IncludeBlockset
#[["blockset_name", "base"]]
@import base.ts


#
#Config::IncludeBlockset
#[["blockset_name", "rq_base"]]
@import rq_base.ts


#
#Config::IncludeBlockset
#[["blockset_name", "rq_sliders"]]
@import rq_sliders.ts


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
  #[["attribute", "class"], ["value", "mRQ_1"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//body") {
    match($done, "no") {
        var("done", "yes")
      attribute("class") {
        value() {
            append(" mRQ_1")
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
    $("//*[contains(concat(' ', @class, ' '), ' sectionHeader ')]") {
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
    #Content::Formatting::WrapTextChildren
    #[["selector", ".mRQFormQuestionsHead"], ["tag_name", ""], ["class_name", "mRQFormQuestionsHeadBottom"], ["multiple", ""], ["split_delimiter", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsHead ')])[1]") {
      wrap_text_children("div", class: 'mRQFormQuestionsHeadBottom')
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mRQFormQuestionsHeadTop\">Relationship Questionnaire</div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mRQFormQuestionsHeadBottom"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsHeadBottom ')])[1]") {
      inject_before("<div class=\"mRQFormQuestionsHeadTop\">Relationship Questionnaire</div>")
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mRQFormQuestionsHeadSub\">Please answer the following questions as completely and honestly as possible.</div>"], ["add_after", ".mRQFormQuestionsHeadBottom"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsHeadBottom ')])[1]") {
      inject_after("<div class=\"mRQFormQuestionsHeadSub\">Please answer the following questions as completely and honestly as possible.</div>")
    }
    
    
  # end BasicGroup
  
  #Questions Listing
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
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
    #[["html", "<ul class=\"mRQFormQuestionsListItemAnswerSliderSteps\"><li class=\"mRQFormQuestionsListItemAnswerSliderStepsItem\">1</li> \t<li class=\"mRQFormQuestionsListItemAnswerSliderStepsItem\">2</li> \t<li class=\"mRQFormQuestionsListItemAnswerSliderStepsItem\">3</li> \t<li class=\"mRQFormQuestionsListItemAnswerSliderStepsItem\">4</li> \t<li class=\"mRQFormQuestionsListItemAnswerSliderStepsItem\">5</li> \t<li class=\"mRQFormQuestionsListItemAnswerSliderStepsItem\">6</li> \t<li class=\"mRQFormQuestionsListItemAnswerSliderStepsItem\">7</li> </ul>"], ["add_after", ".mRQFormQuestionsListItemAnswerSlider"], ["multiple", "true"], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    #$("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItemAnswerSlider ')]") {
    #  inject_after("<ul class=\"mRQFormQuestionsListItemAnswerSliderSteps\"><li class=\"mRQFormQuestionsListItemAnswerSliderStepsItem\">1</li> 	<li class=\"mRQFormQuestionsListItemAnswerSliderStepsItem\">2</li> 	<li class=\"mRQFormQuestionsListItemAnswerSliderStepsItem\">3</li> 	<li class=\"mRQFormQuestionsListItemAnswerSliderStepsItem\">4</li> 	<li class=\"mRQFormQuestionsListItemAnswerSliderStepsItem\">5</li> 	<li class=\"mRQFormQuestionsListItemAnswerSliderStepsItem\">6</li> 	<li class=\"mRQFormQuestionsListItemAnswerSliderStepsItem\">7</li> </ul>")
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
      $("//*[@id = 'mRQFormQuestListItemAnsInIt_1']") {
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
      $("//*[@id = 'mRQFormQuestListItemAnsInIt_2']") {
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
      $("//*[@id = 'mRQFormQuestListItemAnsInIt_3']") {
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
    $("//*[contains(concat(' ', @class, ' '), ' mRQForm ')]/*[contains(concat(' ', @class, ' '), ' clr ')]//*[contains(concat(' ', @class, ' '), ' rqform ')]") {
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
    $("//*[contains(concat(' ', @class, ' '), ' mRQFormContinueWrap ')]//input") {
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
    $("//*[contains(concat(' ', @class, ' '), ' mRQBottom ')]") {
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
  
  #Optimize
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all# end BasicGroup
  
  #
  #Content::Formatting::SetInnerText
  #[["selector", ".right.mRQFormQuestionsListItemAnswerSliderListItem"], ["text", "Very Important"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
  # NOTE: not sure if /html() or /text() is what I want to be using here
  $("//*[contains(concat(' ', @class, ' '), ' right ') and contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItemAnswerSliderListItem ')]") {
    inner() {
      set("Very Important")
    }
  }
  
  
  #
  #Content::Formatting::SetInnerText
  #[["selector", ".left.mRQFormQuestionsListItemAnswerSliderListItem"], ["text", "Not At All"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
  # NOTE: not sure if /html() or /text() is what I want to be using here
  $("//*[contains(concat(' ', @class, ' '), ' left ') and contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItemAnswerSliderListItem ')]") {
    inner() {
      set("Not At All")
    }
  }
  
  
  #Updating input type for numbers
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "type"], ["value", "number"], ["selector", "#mRQFormQuestListItemAnsInIt_1, #mRQFormQuestListItemAnsInIt_2, #mRQFormQuestListItemAnsInIt_3,  #mRQFormQuestListItemAnsInIt_4"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'mRQFormQuestListItemAnsInIt_1']") {
      match($done, "no") {
        attribute("type") {
          value() {
              set("number")
          }
        }
      }
    }
    $("//*[@id = 'mRQFormQuestListItemAnsInIt_2']") {
      match($done, "no") {
        attribute("type") {
          value() {
              set("number")
          }
        }
      }
    }
    $("//*[@id = 'mRQFormQuestListItemAnsInIt_3']") {
      match($done, "no") {
        attribute("type") {
          value() {
              set("number")
          }
        }
      }
    }
    $("//*[@id = 'mRQFormQuestListItemAnsInIt_4']") {
      match($done, "no") {
        attribute("type") {
          value() {
              set("number")
          }
        }
      }
    }
    
    
  # end BasicGroup
  
  #
  #Content::Formatting::SetInnerText
  #[["selector", ".mRQFormQuestionsListItemQuestion"], ["text", ""], ["match_string", "."], ["replace_string", ":"], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
  # NOTE: not sure if /html() or /text() is what I want to be using here
  $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItemQuestion ')]") {
    inner() {
      replace(".", ":")
    }
  }
  
  $("/html/body//form//li[@id='question_2']/div[contains(@class, 'answer')]") {
    $("./input[1] | ./input[2]") {
      attribute("style", "width: 42px; margin-right: 3px; text-align: left;")
    }
    $("./input[3]") {
      attribute("style", "width: 84px;")
    }
  }
  
}