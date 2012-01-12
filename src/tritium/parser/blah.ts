/* Comment
  /* comment */
*/

@import ../parser/one.ts
@import "two.ts"
@import "three.ts"

"hello"
"goodbye"

foo()

insert("span") {
  set("class", foo("a", "b"), read("text.txt"))
}

insert("table", class: "hoo", id: "ha", data-ur-set: "toggler", src: fetch("..."))

foo($blah = "groo" { roo() })