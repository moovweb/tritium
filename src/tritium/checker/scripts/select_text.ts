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
  move_here("text()") //warn  
  move_to("text()") //warn  
  move("text()", "a", "top") //warn  
  move("a", "text()", "bottom") //warn  
  
  var("text()") 
  $("//script[contains(text())]")
  var("comment()") 
  $("./span[@class='locatorSubhead'][contains(comment(), 'Events')]")
  $("./span[@class='locatorSubhead'][contains(text(), 'Events')]")
  $("//script[contains(comment())]")

  # A slew of examples from ross-simons that should pass

  $("p[text()='Stone' or text()='Metal']")  
  $("p[text()='Categories' or text()='Gifts by Occasion' or text()='Themes and Motifs' or text()='Brand']")  
  $("p[text()='Brand' or text()='Recipient']")  
  $("p[text()='Categories' or text()='Style']")  
  $("span[@typeof='v:Breadcrumb'][1]/a[text()='Jewelry' or text()='Gifts' or text()='Collectibles' or text()='Home']")  
  $("span[@typeof='v:Breadcrumb']/a[text()='Jewelry' or text()='Watches' or text()='Gifts' or text()='Collectibles' or text()='Home']") 
  $("p[text()='Stone' or text()='Metal']")  
  $("p[text()='Categories' or text()='Gifts by Occasion' or text()='Themes and Motifs' or text()='Brand']")  
  $("p[text()='Brand' or text()='Recipient']")  
  $("p[text()='Categories' or text()='Style']")

}