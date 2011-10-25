replace(/([a-zA-Z\-]*): (.*)$/) {
  $1 = downcase($1)
  $2 = upcase($2)
  set("$1: $2")
}