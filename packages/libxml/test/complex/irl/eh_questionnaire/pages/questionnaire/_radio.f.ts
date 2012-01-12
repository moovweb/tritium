# Parameters
# $mw_rq_radio_id
# $mw_rq_radio_question
#     xpath for text div node
# $mw_rq_radio_selection
#     xpath for an array of <label><input type="radio"></label>

insert_bottom("div", "", mw-item-id: $mw_rq_radio_id, class: "mw_rq_radio") {
  copy_here($mw_rq_radio_question) {
    $("self::*") {
      $("./*") {
        remove()
      }
      attribute("*") {
        remove()
      }
      text() {
        replace(/^\s*|\s*$/)
        replace(":", "")
        replace(/^\s*\d+\.\s*/, "")
      }
      
      name("div")
      # class question is preserved for validation javascript
      attribute("class", "mw_rq_question mw_rq_radio_question question")
      
    }
    $("self::text()") {
      $("..") {
        wrap_text_children("div", class: "mw_rq_question mw_rq_radio_question question") {
          text() {
            replace(/^\s*|\s*$/)
            replace(":", "")
            replace(/^\s*\d+\.\s*/, "")
          }
        }
      }
    }
  }
  
  copy_here($mw_rq_radio_selection) {
    $("./input[@type='radio'] | self::input[@type='radio']") {
      wrap("label") {
        $mw_rq_radio_selection_labeled = "false"
        
        move_here("following-sibling::text()[1]") {
          $mw_rq_radio_selection_labeled = "true"
        }
        
        $("following-sibling::br[1]") {
          remove()
        }
        
        wrap_text_children("span") {
          text() {
            replace(/^\s*|\s*$/, "")
          }
        }
      }
    }
  }
  
  match($mw_rq_radio_selection_labeled, "false") {
    wrap_text_children("span", class: "mw_rq_radio_selection_label") {
      text() {
        replace(/^\s*|\s*$/, "")
      }
    }
    $("./label") {
      move_here("following-sibling::span[@class='mw_rq_radio_selection_label'][1]")
    }
  }
  
}