# Parameters
# $mw_rq_true_false_id
# $mw_rq_true_false_question
#     xpath for text div node
# $mw_rq_true_false_selection
#     xpath for 2 <input type="radio">

insert_bottom("div", "", mw-item-id: $mw_rq_true_false_id, class: "mw_rq_true_false") {
  copy_here($mw_rq_true_false_question) {
    $("self::*") {
      name("div")
      
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
      # class question is preserved for validation javascript
      attribute("class", "mw_rq_question mw_rq_true_false_question question")
    }
    $("self::text()") {
      wrap_text_children("div", class: "mw_rq_question mw_rq_true_false_question question") {
        text() {
          replace(/^\s*|\s*$/)
          replace(":", "")
        }
      }
    }
  }
  
  insert_bottom("div", "", class: "mw_rq_true_false_selection") {
    copy_here($mw_rq_true_false_selection) {
      $mw_rq_true_false_selection_value = fetch("@value")

      wrap("label") {
        insert_bottom("span", $mw_rq_true_false_selection_value)
      }
    }
  }
}