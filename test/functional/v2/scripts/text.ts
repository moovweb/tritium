set("failed")
match(text(), "fail") {
  set("REALLY FAILED!!!")
}
match(text(), "failed") {
  set("almost")
}
match(text(), regex("almo")) {
  set("worked")
}