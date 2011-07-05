# This completely removes the comment tags. Aggressively!
replace(/<!--.*-->/im, '')

# At this point, the doc shouln't have any of the <html> comment tag stuff.
html_fragment() {
  select("./div") {
    attribute("sweet_comment", "true")
  }
}
