
$xpath = "./div"

# This will convert the bytes that represent the copyright symbol in ISO to
# the correct bytes for UTF8

html_fragment("ISO-8859-1", "UTF-8") {

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
