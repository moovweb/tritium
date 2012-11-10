html_fragment() {
  $$(".insert") {
    insert("a", "one")
  }
  $$(".insert_at") {
    insert_at("top", "a", "two")
  }
  $$(".insert_bottom") {
    insert_bottom("a", "three")
  }
  $$(".insert_top") {
    insert_top("a", "four")
  }
  $$(".insert_before_span span") {
    insert_before("a", "five")
  }
  $$(".insert_after_span span") {
    insert_after("a", "six")
  }
}