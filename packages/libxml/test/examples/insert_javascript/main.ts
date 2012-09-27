html_fragment() {
  $$(".insert") {
    insert_javascript("alert('Boo')")
  }
  $$(".insert_at") {
    insert_javascript_at(position("top"), "alert('Boo')")
  }
  $$(".insert_bottom") {
    insert_javascript_bottom("alert('Boo')")
  }
  $$(".insert_top") {
    insert_javascript_top("alert('Boo')")
  }
  $$(".insert_before_span span") {
    insert_javascript_before("alert('Boo')")
  }
  $$(".insert_after_span span") {
    insert_javascript_after("alert('Boo')")
  }
}