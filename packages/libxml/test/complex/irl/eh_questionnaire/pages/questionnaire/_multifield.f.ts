# Parameters
# $mw_rq_multifield_id
# $mw_rq_multifield_question
#     xpath for text div node
# $mw_rq_multifield_answer_fields
#     xpath for an array of <input type="text"> or <input type="number">

insert_bottom("div", "", mw-item-id: $mw_rq_multifield_id, class: "mw_rq_multifield") {
  copy_here($mw_rq_multifield_question) {
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
      attribute("class", "mw_rq_question mw_rq_multifield_question question")
    }
    $("self::text()") {
      $("..") {
        wrap_text_children("div", class: "mw_rq_question mw_rq_multifield_question question") {
          text() {
            replace(/^\s*|\s*$/, "")
          }
        }
      }
    }
  }
  
  insert_bottom("div") {
    copy_here($mw_rq_multifield_answer_fields) {
      wrap_text_children("span") {
        text() {
          replace(/^\s*|\s*$/, "")
        }
      }
    }
  }
}