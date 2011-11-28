
$("./div[@id = 'sectionlanding']") {
  log("Section landing page")
}

log("looking for dept banner")

# Can be one level deep or 2
$(".//div[starts-with(@id, 'dept_banner')]") {
#  remove()
  add_class("mw_testing")
}
