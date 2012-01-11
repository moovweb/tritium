add_class("mw_comm")
add_class(concat("mw_region_", $region))

match($region) {
  with(/us|ca/) {
    # Check for eH mail list
    $("//form[@name='writeMessageForm']") {
      $("self::form[input[@name='method' and @value='readAllMessages']]") {
        $("/html/body") {
          @import message.ts
        }
      }
      # $("./div/div[contains(@class, 'btn-hold')]/following-sibling::p") {
      #   remove()
      # }
    }
    # Not eH mail list
    $("./*[not (//form[@name='writeMessageForm'][input[@name='method' and @value='readAllMessages']])][1]") {
      $("/html/body") {
        name("corpse")
        wrap("body") {
          attribute("class", fetch("/html/body/corpse/@class"))

          # Add the top header and cancel button
          insert_bottom("div", class: "mw_header") {
            insert_top("div", "Send a Message", class: "mw_page_title")
            # Add the cancel button
            insert_top("a", "CANCEL", class: "mw_back_button") {
              attribute("href", "#")
              attribute("onclick", "mw_find_back_nav();")
            }
          }
          move_here("/html/body/corpse//div[contains(@class, 'mailbox-content')]") {
            $(".//div[@id='guided-comm-tabs'] | .//a[contains(@class, 'learnmorelink') or contains(@class, 'link-back')]") {
              remove()
            }
            $(".//div[@style]") {
              attribute("style") {
                remove()
              }
            }
          }
          $("./div[contains(@class, 'mailbox-content')]//div[contains(@class, 'sub-header')]") {
            move_here("following::div[contains(@class, 'mailbox-content')]", "after") {
              $(".//ul/li") {
                $li_index = index()

                attributes(data-ur-set: "toggler", data-ur-id: concat("question_", $li_index))

                $("./div[contains(@class, 'view-choices')]") {
                  move_here("./a[contains(@class, 'view-choices')]", "after") {
                    attributes(data-ur-toggler-component: "button")

                    attribute("rel") {
                      remove()
                    }
                    attribute("href") {
                      remove()
                    }
                  }
                  remove()
                }
                $("./div[contains(@id, '-choices-tooltip')]") {
                  attributes(data-ur-toggler-component: "content")
                  
                  attribute("style") {
                    remove()
                  }
                  
                  # If ./strong exist, then we're in select question choices
                  # So we'll want to normalize it
                  $("self::div[./strong]") {
                    insert_bottom("ul") {
                      move_here("preceding-sibling::text()") {
                        match(text()) {
                          with(/\A\s+\Z/) {
                            remove()
                          }
                          else() {
                            wrap("li")
                          }
                        }
                      }
                      $("preceding-sibling::*") {
                        remove()
                      }
                    }
                  }
                  
                }
                $("./em[preceding-sibling::div[./input[@type='checkbox']]]") {
                  remove()
                }
              }
              $(".//textarea[contains(@name, 'customQuestion')]") {
                wrap("div") {
                  move_here("following-sibling::div[contains(@class, 'countdown-status')]")
                }
              }
              
              # Remove the bottom button
              $("./form/div[contains(@class, 'btn-hold')][2]") {
                remove()
              }
              $("./form/p[contains(text(), 'word document')]") {
                remove()
              }
              # Remove 'upload a photo' paragraph in open-ended question sent
              $(".//a") {
                match(text(), /upload(ing)? a photo/) {
                  $(". | preceding-sibling::text()[1] | following-sibling::text()[1]") {
                    remove()
                  }
                }
              }
            }
            move_here("following-sibling::p", "after")
            # $("following-sibling::div//button[contains(@class, 'btn')] | following-sibling::div//a[contains(@class, 'btn')]/span") {
            $("following::*[contains(@class, 'btn')]/*") {
              @import button_rewrite.ts
            }
          }
        }
      }
      $("/html/body/corpse") {
        remove()
      }
    }
  }
  else() {
    # Check for eH mail list
    $("//form[@name='writeMessageForm'][input[@name='method' and @value='readAllMessages']]") {
      $("/html/body") {
        @import message.ts
      }
    }
    # Not eH mail list
    $("./*[not (//form[@name='writeMessageForm'][input[@name='method' and @value='readAllMessages']])][1]") {
      $("/html/body") {
        # Main page structuring
        move_here("/html//div[contains(@class, ' mailbox-content')]")
        # Clean the rest of the body leaving only the dynamic content
        $("./*[not (contains (@class, ' mailbox-content'))]") {
          remove()
        }
        # Add the top header and cancel button
        insert_top("div", class: "mw_header") {
          insert_top("div", "Send a Message", class: "mw_page_title")
          # Add the cancel button
          insert_top("a", "CANCEL", class: "mw_back_button") {
            attribute("href", "#")
            attribute("onclick", "mw_find_back_nav();")
          }
        }
      }
    }
    $("./div[contains(@class, ' mailbox-content')]") {
      $("./div[@id='guided-comm-steps']") {
        $("./div[@class='header']") {
          # If this div is empty we're in eHarmony mail mode
          $("./div[@class='primary' and not(normalize-space(.))]") {
            insert_top("span", "eHarmony Mail", class: "title")
          }
          # Remove the "Learn about Communication on eHarmony" link
          $("./a") {
            remove()
          }
        }
      }
    }
  }
}
