/* Comment
  /* comment */
*/

@import ../parser/one.ts
@import /* comment */ 'two.ts'

$("./div") {
  insert_top("h1", class: "mw_title", data-ur-set: "superhero")
  insert_at(bottom, "span", read("text.txt"))
  $global = 'global'
  %local = "local"
  
  match($path, /\/home\/index\.html/i) {
    foo()
  }
  
}

@func Text.blah(Text x) {
  log(x)
}

# END OF BLAH.TS