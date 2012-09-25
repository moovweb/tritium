html_fragment() {
  $$(".insert") {
    insert("a", "polar")
  }
  $$(".insert_at") {
    insert_at("top", "a", "grizzly")
  }
  $$(".insert_bottom") {
    insert_bottom("a", "sun")
  }
  $$(".insert_top") {
    insert_top("a", "koala")
  }
  $$(".insert_before_span span") {
    insert_before("a", "panda")
  }
  $$(".insert_after_span span") {
    insert_after("a", "kermode")
  }
}