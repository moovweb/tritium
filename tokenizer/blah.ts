/* Comment
  /* comment */
*/

@import ../parser/one.ts
@import "two.ts"

foo()

log("blah" + "blee" + "bloo")

select("div") {
  insert("span", class: "foo", read("text.txt"))
  /^\/home\/blah\.html/i
  `^/home/(blah|blee)\.html`i
}