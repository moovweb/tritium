set("hello")

replace(/(e)(l)/) {
  log(%1)
  log(%2)
  %2 = "rr"
  set("guppy")
  replace(/(.*)/, "")
  set(concat(%1, %2))
}

// We can assign %1 a value, and use it in the replacement string
replace(/l/) {
  %1 = "a"
  set("\\1")
}
