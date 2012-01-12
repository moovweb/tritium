# Backup original page
name("corpse")
wrap("body") {
  # Add page specific class
  add_class("mw_message")
  #######################################################
  # Create containers to move elements into
  #######################################################
  insert_top("div", id: "mw_message_top")
  # Add the top header and cancel button
  insert_top("div", class: "mw_header") {
    insert_top("div", "Send Message", class: "mw_page_title")
    insert_top("a", "CANCEL", class: "mw_back_button") {
      # Find the input element that contains the match id
      $("/html/body//input[@type='hidden' and @name='set']") {
        $mw_back_url = fetch("@value")
      }
      # Generate the back button based on the match id
      $mw_back_url {
        prepend("/singles/servlet/user/comm/review?set=")
      }
      attribute("href", $mw_back_url)
    }
  }
  #######################################################
  # First grab each major section from the original page
  #######################################################
  $("./corpse/div/div/div/div") {
    # Main question form
    $("./div/div[@class='mailbox-content-main']/form") {
      move_to("/html/body/div[@id='mw_message_top']")
      $mw_form_type = "normal"
    }
    # eHarmony mail form
    $("./div[contains(@class,'mailbox-content')]/form") {
      $(".//a[contains(@class, 'open-comm-send')]") {
        text("Send")
      }
      move_to("/html/body/div[@id='mw_message_top']")
      $mw_form_type = "ehmail"
    }
    # Check the form type
    match($mw_form_type) {
      # Normal guided comm steps form
      with("normal") {
        # Get form description
        $("./div[contains(@class,'mailbox-content')]/p") {
          move_to("/html/body/div[@id='mw_message_top']", "top")
        }
      }
      # eHarmony mail form
      with("ehmail") {
      }
      # Form submission result
      else() {
        # Get form result
        $("./div/div[contains(@class,'mailbox-content-main')]") {
          move_to("/html/body/div[@id='mw_message_top']", "top")
        }
      }
    }
    # Get form heading
    $("./div/div[@class='sub-header']") {
      move_to("/html/body/div[@id='mw_message_top']", "top")
    }
  }
  #######################################################
  # Trim unwanted content from newly built page
  # and personalize class structure
  #######################################################
  # Add button style to "Send Message" button
  $("./form/div/button") {
    add_class("mw_button")
  }
  # Add button style to the "Return to My Matches" button
  $("./div/div/div[contains(@class, 'btn-hold')]/a") {
    add_class("mw_button")
  }
  # Add button style to the next step button
  $("./div/form/div/a") {
    add_class("mw_button")
  }
  # All other buttons
  $(".//button") {
    add_class("mw_button")
  }
  # Create answer toggler
  $("./div/form/div/ul/li") {
    attribute("data-ur-set", "toggler")
    $("./div[@class='view-choices']") {
      text("")
      attribute("data-ur-toggler-component", "button")
      attribute("data-ur-state", "disabled")
    }
    $("./div[@class='view-choices']/following-sibling::div[1]") {
      add_class("mw_content")
      attribute("data-ur-toggler-component", "content")
      attribute("data-ur-state", "disabled")
      attribute("style", "")
    }
  }
  # eH Mail
  $("/html/body/div[@id='mw_message_top']") {
    $(".//a[contains(.,'Printable')]") {
      remove()
    }
    $(".//a[contains(.,'Expand')]") {
      remove()
    }
    $(".//a[contains(.,'Collapse')]") {
      remove()
    }
    $(".//a[contains(@class, 'btn')]") {
      add_class("mw_button")
    }
    $("./form/div/ul[@class='message-list']") {
      $("./li") {
        attribute("id") {
          $id = fetch("@id")
        }
        $("./table") {
          attribute("data-ur-toggler-component", "button")
          attribute("data-ur-id", $id)
          attribute("data-ur-state", "disabled")
        }
        $("./div") {
          attribute("data-ur-toggler-component", "content")
          attribute("data-ur-id", $id)
          attribute("data-ur-state", "disabled")
          $("./div/div[@class='col2']/span[1]") {
            move_to("./../a")
          }
        }
      }
    }
    # $(".//a[contains(@class, 'subject')]") {
    #   attribute("data-ur-toggler-component", "button")
    # }
  }
}
