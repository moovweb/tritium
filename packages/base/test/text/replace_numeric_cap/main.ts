$use_global_replace_vars = "true"

set("hello hal")

replace(/h(.)/) {
  log($1)
}
set("")