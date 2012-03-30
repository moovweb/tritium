$use_gloabl_replace_vars = "true"
set("Location: blah")

replace(/^(location\:\s*)([^\r\n]*)/i) {
  $a = $1
  $2 {
    #rewrite("link")
    set("asdf")
  }
  set($a)
  append("$2")
}
