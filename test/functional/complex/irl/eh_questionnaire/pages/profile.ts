# Backup original page
name("corpse")
wrap("body") {
    attribute("onload", "setTimeout('updatePhotoIndex()', 1);")
  # Add page specific class
  add_class("mw_profile")
  #######################################################
  # Create containers to move elements into
  #######################################################
  insert_top("div", id: "mw_top_container") {
    insert_top("div", id: "mw_top_info") {
      insert_top("div", id: "mw_topright_info")
      insert_top("div", id: "mw_topleft_info")
    }
  }
  #######################################################
  # First grab each major section from the original page
  #######################################################
  # The back button for the heading
  $("./corpse/div[@id='content-container']") {
    #$("./div/div/a[@href='/singles/servlet/user/mymatches']") {
    #  add_class("mw_back_button")
    #  move_to("/html/body")
    #}
    # Grab the subscription banner
    $("//*[@class='subscribe-benefits']/a") {
      move_to("/html/body/div[@id='mw_top_container']", "top")
      text("")
      insert_top("img", src: asset("images/banner.png"))
      add_class("mw_subscribe_banner")
    }
    # For users that have closed their account
    $(".//div[@class='accountClosedMessage']") {
      move_to("/html/body/div/div[@id='mw_top_info']")
    }
    # Match name and location
    $("./div[@class='doc-header']/h1[@class='user-intro']") {
      move_to("/html/body/div/div[@id='mw_top_info']", "top")
    }
    $("./div[@class='doc-header']/h1[@class='user-intro']/span[@id='user-firstname']") {
      move_to("/html/body/div/div[@id='mw_top_info']", "top")
    }
    # Are we waiting for a response?
    #$(".//*[@class='next-step-button']") {
    #  move_to("/html/body/div/div[@id='mw_topright_info']")
    #  $("./a") {
    #    @import comm/button_rewrite.ts
    #  }
    #}
    $(".//div[@class='comm-actions']/a[1]") {
      move_to("/html/body/div/div/div[@id='mw_topright_info']")
      @import comm/button_rewrite.ts
    }
    # Get the eHarmony mail button
    $(".//div[@class='comm-actions']/a[@class='send-mail']") {
      move_to("/html/body/div/div/div[@id='mw_topright_info']")
      @import comm/button_rewrite.ts
    }
    # Are we waiting for a response?
    $(".//*[@class='next-step-button']") {
      move_to("/html/body/div/div/div[@id='mw_topright_info']")
      $("./a") {
        @import comm/button_rewrite.ts
      }
    }
    # Get the eHarmony mail button
    $(".//*[@class='next-step-links']/li/a[contains(.,'Send an eHarmony Mail')]/..") {
      $("./a") {
        move_to("/html/body/div/div/div[@id='mw_topright_info']")
        @import comm/button_rewrite.ts
      }
    }
    # Archive/close match button
    $("./div/div/div/div[@class='close-match-link']/a") {
      move_to("/html/body/div/div/div[@id='mw_topright_info']")
      attribute("class", "mw_close-archive")
      # TODO: Look into not_matcher for this
      text() {
        match(fetch("text()")) {
          with("Close Match") {
            set("Close")
          }
          else() {
            set("Archive")
          }
        }
      }
    }
    # Photo script
    $("./div[@id='profile-col1']/script") {
      move_to("/html/body")
    }
    # Photo
    $("./div/div/div/div[@id='profile-photo-col']") {
      # Remove formatting from the profile picture
      $(".//img") {
        attribute("style", "")
      }
      # Insert generic female photo if real one is unavailable
      $("./div/div/div/div[(@class='photo-unavailable female') or (@class='photo-nudge female')]") {
        insert_top("img", src: asset("images/female.jpg"), profile: "photo")
        
        $("./a") {
          text("")
          # created outside then move here; because sometimes the anchor tag is not here
          move_here("../img[@profile='photo']") {
            attribute("profile") {
              remove()
            }
          }
          attribute("style", "background: red")
        }
      }
      # Insert generic male photo if real one is unavailable
      $("./div/div/div/div[(@class='photo-unavailable male') or (@class='photo-nudge male')]/a") {
        text("")
        insert_top("img", src: asset("images/male.jpg"))
        attribute("style", "background: blue")
      }
      # Remove spacer
      $("./div/div[@class='clr']") {
        remove()
      }
      move_to("/html/body/div/div/div[@id='mw_topleft_info']")
      # Pagination
      $("./div/div[@class='pagination']") {
        move_to("./..")
        $("./a[@id='profile-next']") {
          add_class("icons-right")
        }
        $("./a[@id='profile-previous']") {
          add_class("icons-left")
        }
      }
      # Pagination status (1/10.. etc)
      $(".//div[@class='pagination'][1]") {
        insert_after("div", id: "mw_photo_index")
      }
      # Smile link
      $("./div/div[@class='send-icebreaker-wrapper']") {
        $("./a") {
          text() {
            set("")
          }
          insert_top("span", class: "icons-smile")
        }
        move_to("/html/body/div/div/div[@id='mw_topright_info']")
      }
    }
    # Basic information
    $("./div/div/div/div/div[@class='content-row two-col first short']") {
      move_to("/html/body")
      add_class("mw_basic_info")
    }
    # Most passionate about
    $("./div/div/div/div/div[@class='content-row first']") {
      move_to("/html/body")
      add_class("mw_most_passionate")
    }
    # What i'm looking for
    $("./div/div/div/div/div[@class='content-row last']") {
      move_to("/html/body")
      add_class("mw_looking_for")
    }
    # Something to talk about
    $("./div[@id='profile-col2']/div[@id='ups_match_results']") {
      move_to("/html/body")
    }
  }
  #######################################################
  # Trim unwanted content from newly built page
  # and personalize class structure
  #######################################################
  # Add the top logo div
  insert_top("div", class: "mw_header") {
    insert_top("div", "Profile", class: "mw_page_title")
    insert_top("a", "BACK", class: "mw_back_button", href: "/singles/servlet/user/mymatches") {
      insert_top("div", class: "mw_triangle")    
    }
  }
  # Back button text change
  #$("./a[contains(@class, 'mw_back_button')]") {
  #  text() {
  #    replace(/(back to my matches)/i, "BACK")
  #    replace(/(return to my matches)/i, "BACK")
  #  }
  #  # Move the back button into the header
  #  move_to("./../div[@class='mw_header']", "top")
  #}
  # Location text change
  $("./div/div[@id='mw_top_info']/h1[@class='user-intro']") {
    $("./div[@id='last-active']") {
      remove()
    }
  }
  # Reformat basic information table
  $("./div/div[@class='inner50 last']/table/tr") {
    move_to("../../../div[@class='inner50 first']/table")
  }
  $("./div/div[@class='inner50 last']") {
    remove()
  }
  # Remove pagination if it's empty (For some reason this is removing even
  # if it's not empty)
  #$("//div[@class='pagination' and not(normalize-space(node()))]") {
  #  remove()
  #}
  # Remove Flex Match info from basic table
  $("./div/div[@class='inner50 first']/table/tr/td[@class='header']/div[@class='flex-help-link']/..") {
    remove()
  }
  # Section text change
  $("./div/span[@class='title']") {
    text() {
      match(fetch("text()")) {
        # Match long section descriptions and convert to short ones
        with("The one thing I am most passionate about:") {
          set("What I'm Passionate About")
        }
        with("The most important thing I am looking for in a person is:") {
          set("What I'm Looking For")
        }
        # Warn the developer that the page changed; making the above code is obsolete or
        # just needs changed
        else() {
          log("WARNING!!! The page (profile.ts) has changed please verify the section heading names.")
        }
      }
    }
  }
}
