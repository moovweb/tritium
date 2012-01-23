/* Comment
  /* comment */
*/

@import ../parser/one.ts
@import "two.ts"
@import "three.ts"

"hello"
"goodbye"

foo()

$x = "a" + "b"
$y = "c" + $x { append("d") } + "e"

insert("span") {
  set("class", foo("a", "b"), read("text.txt"))
  Text(fetch("blah")) {
    append("bloo")
  }
}

insert("table", class: "hoo", id: "ha", data-ur-set: "toggler", src: fetch("..."))

foo($blah = "groo" { roo() })

match("a", "a") {
}

