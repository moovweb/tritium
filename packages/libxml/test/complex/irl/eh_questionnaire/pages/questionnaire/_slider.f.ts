# Parameters
# $mw_rq_slider_id
# $mw_rq_slider_question
#     xpath for the question div node
# $mw_rq_slider_selection
#     xpath for an array of <input type="radio"> or one <input type="hidden">
# $mw_rq_slider_lower_label
#     xpath for text node
# $mw_rq_slider_middle_label
#     xpath for text node
# $mw_rq_slider_upper_label
#     xpath for text node
# $mw_rq_slider_error

insert_bottom("div", "", mw-item-id: $mw_rq_slider_id, class: "mw_rq_slider") {
  copy_here($mw_rq_slider_question) {
    # I'm a node!
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
        replace(/^\d+\.\s+/, "")
      }
      # class question is preserved for validation javascript
      attribute("class", "mw_rq_question mw_rq_slider_question question")
    }
    # I'm a text node!
    $("self::text()") {
      wrap("div", class: "mw_rq_question mw_rq_slider_question question") {
        text() {
          replace(/^\s*|\s*$/)
          replace(/^\s*\d+\.\s*/, "")
        }
      }
    }
  }
  insert_bottom("div", "", class: "mw_rq_slider_selection") {
    copy_here($mw_rq_slider_selection) {
      text("")
    }
    # handle the js slider case
    $("./input[@type='hidden']") {
      $mw_rq_slider_field_name = fetch("@name")
      $mw_rq_slider_field_class = fetch("@class")
      
      insert_after("input", "", name: $mw_rq_slider_field_name, value: "1", class: $mw_rq_slider_field_class, type: "radio")
      insert_after("input", "", name: $mw_rq_slider_field_name, value: "2", class: $mw_rq_slider_field_class, type: "radio")
      insert_after("input", "", name: $mw_rq_slider_field_name, value: "3", class: $mw_rq_slider_field_class, type: "radio")
      insert_after("input", "", name: $mw_rq_slider_field_name, value: "4", class: $mw_rq_slider_field_class, type: "radio")
      insert_after("input", "", name: $mw_rq_slider_field_name, value: "5", class: $mw_rq_slider_field_class, type: "radio")
      insert_after("input", "", name: $mw_rq_slider_field_name, value: "6", class: $mw_rq_slider_field_class, type: "radio")
      insert_after("input", "", name: $mw_rq_slider_field_name, value: "7", class: $mw_rq_slider_field_class, type: "radio")
      
      remove()
    }
    $("./input[@type='radio']") {
      wrap("label")
    }
  }
  insert_bottom("div", "", class: "mw_rq_slider_label") {
    insert_bottom("div", fetch($mw_rq_slider_lower_label))
    insert_bottom("div", fetch($mw_rq_slider_middle_label))
    insert_bottom("div", fetch($mw_rq_slider_upper_label))
  }
  $("./*[not(child::*)]") {
    match(fetch("text()"), /\A[\s\u00a0]*\z/) {
      remove()
    }
  }
}
