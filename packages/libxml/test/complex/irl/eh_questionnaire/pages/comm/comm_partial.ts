$("./div[contains(@class, ' mailbox-content')]") {
  # Read CEQ form
  $("./div[@class='padding'] | ./form/div[@class='padding']") {
    #add_class("mw_testing")
    $("./table") {
      $(".//tr/td") {
        # The second strong is the selected answer
        $("./strong[2]") {
          name("li")
          add_class("mw_selected")
        }
        wrap_text_children("li")
        $("./br") {
          remove()
        }
        insert_bottom("ul") {
          move_here("../li") {
            inner() {
              replace(/^\s*.../, "")
            }
          }
        }
      }
      move_to("../..", "bottom")
    }
    # Remove the last br to fix formatting
    $("./br[position() = last()]") {
      remove()
    }
  }
  # Add the divider div (Read CEQ)
  $("./div[@class='hold btn-hold'] | ./form/div[@class='hold btn-hold']") {
    @import button_hold.ts
    $("./a[1]") {
      # Read the text and add icon
      @import button_rewrite.ts
    }
  }
  # Read OEQ
  $("./div[@class='mailbox-content-main']") {
    $("./div[@class='hold']") {
      move_to("../..", "bottom")
    }
  }
  # Remove reference to upload picture
  $("./div[@class='hold'][contains(.,'In the meantime, we recommend')]") {
    wrap_text_children("p")
    $("./p") {
      inner() {
        replace("In the meantime, we recommend", "")
      }
    }
    $("./br") {
      remove()
    }
    $("./a") {
      remove()
    }
    $("./p[position()=last()]") {
      remove()
    }
  }
  # Submit based forms below
  $("./div[@class='mailbox-content-main']") {
    # Remove unwanted paragraphs from OQ answer form
    $("./form[@name='openQuestionAnswerForm']") {
      $("./p[position()=1 or position()=3]") {
        remove()
      }
    }
    # Remove reference to upload picture
    $("./p[contains(.,'Now is a great time to ')]") {
      remove()
    }
    # Pre-selected CEQ form
    $("./form[@name='ChooseClosedQuestionForm'][input[@name='method' and @value='choosePastQuestions']]") {
    }
    # Edit CEQ form
    $("./form[@name='ChooseClosedQuestionForm'][input[@name='method' and @value='chooseQuestions']]") {
      # Remove the question numbering
      $(".//em") {
        remove()
      }
      # Make this answer list match the pre-selected CEQ list
      $("./div[@class='hold']/ul/li/div[@id]") {
        # Make each text child an li with the text in a span
        wrap_text_children("li") {
          wrap("span")
        }
        # Create a list and move them there
        insert_top("ul") {
          move_here("../li")
        }
        # Remove remaining elements
        $("./strong | ./br") {
          remove()
        }
      }
    }
    # Answer CEQ form
    $("./form[@name='AnswerClosedQuestionForm']") {
    }
    # Read their CEQ
    $("./div[@class='hold btn-hold']") {
      @import button_hold.ts
      # Read the text and add icon
      $("./a[1]") {
        # Read the text and add icon
        @import button_rewrite.ts
      }
    }
    # View selected MHCS to send
    $("./form[@name='viewMhcsForm'][input[@name='method' and @value='viewOwnerMhcs']]") {
      # Remove unneeded line breaks
      $("./div[@class='padding']") {
        $("./br") {
          remove()
        }
      }
    }
    # Send eharmony mail
    $("./form[@name='writeMessageForm']") {
      $("./div/div[@class='hold btn-hold']/button[@name='sendMessageButton.x']") {
        @import button_rewrite.ts
      }
      $("./p/a | ./p/br") {
        remove()
      }
    }
    # Read MHCS
    $("./span | ./ul") {
      move_to("../..", "bottom")
    }
    # Learn More answer form
    $("./form[@name='openQuestionAnswerForm'][input[@name='method' and @value='answerQuestions']]") {
    }
    $("./form") {
      # There are specific requirements for the buttons in both cases we need to remove
      # the second set of buttons
      $("./div[@class='hold btn-hold'][position() > 1]") {
        remove()
      }
      # Add the divider div
      $("./div[@class='hold btn-hold']") {
        @import button_hold.ts
        $("./button") {
          @import button_rewrite.ts
        }
      }
      # Edit the question list (Both pre-selected CEQ and edit CEQ)
      $("./div[@class='hold']/ul") {
        # Create answer toggler
        $("./li") {
          attribute("data-ur-set", "toggler")
          # The button part of the Show Choices feature
          $("./div[@class='view-choices']") {
            text("")
            attribute("data-ur-toggler-component", "button")
            attribute("data-ur-state", "disabled")
            move_to("../span", "bottom")
          }
          # The content of the Show Choices feature
          $("./div[@id]") {
            add_class("mw_content")
            attribute("data-ur-toggler-component", "content")
            attribute("data-ur-state", "disabled")
            attribute("style", "")
            move_to("../span", "bottom")
          }
        }
      }
      # Change selections buttons are inside some padding
      $("./div[@class='padding']") {
        $("./div[@class='hold btn-hold']") {
          # Move this div after the previous span
          move_to("(preceding-sibling::span[1])[1]")
        }
        $("./p[@align='center'][1]") {
          name("div")
          add_class("mw_hr")
        }
      }
      # Textareas on the send OEQ page
      $("./div[@class='fieldset selected-status _textarea_checkbox_']") {
        $("./ul[@class='textarea-list']") {
          insert_after("div", class: "mw_hr")
          $("./li") {
            inner_wrap("div") {
              $("./span") {
                move_to("../..", "top")
              }
            }
          }
        }
      }
    }
  }
}
