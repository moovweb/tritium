// warn 14 times
html() {
  $("div/text()") //warn
  select("div/text()") //warn
  $("text()") //warn
  $("text()|script()") //warn
  $("./a | ./text() | script()") //warn
  $("script() | text()") //warn
  $("./br|./text()") //warn
  $("div/comment()") //warn
  select("div/comment()") //warn
  $("comment()") //warn
  $("comment()|script()") //warn
  $("./a | ./comment() | script()") //warn
  $("script() | comment()") //warn
  $("./br|./comment()") //warn
  
  
  var("text()") 
  $("//script[contains(text())]")
  var("comment()") 
  $("./span[@class='locatorSubhead'][contains(comment(), 'Events')]")
  $("./span[@class='locatorSubhead'][contains(text(), 'Events')]")
  $("//script[contains(comment())]")
}