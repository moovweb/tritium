
$xpath = "./div"

html_fragment() {

  # For the following values for $xpath, no logging will take place:

  $("/div") {
    log("shouldn't see this log")
  }
  $("//div") {
    log("shouldn't see this log")
  }
  $("/body/div") {
    log("shouldn't see this log")
  }

  # However, for the following values for $xpath, we will see logs:

  $("./div") {
    log("should see this log")
  }
  $(".//div") {
    log("should see this other log")
  }
  $("div") {
    log("should see this log too")
  }

}
