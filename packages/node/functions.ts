@func position() {
  position("bottom") }

@func Node.copy_here(Text %xpath) {
  copy_here(%xpath, position()) {
    yield() } }

@func Node.copy_here(Text %xpath, Text %pos) {
  copy_here(%xpath, position(%pos)) {
    yield() } }

@func Node.copy_here(Text %xpath, Position %pos) {
  $(%xpath) {
    dup() {
      move(%pos, node(1), node(3))
      yield() } } }

@func Node.copy_to(Text %xpath) {
  copy_to(@1, position()) {
    yield() } }