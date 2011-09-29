# At the time of writing, this script will replace AAAA with XXXX
# but it will not replace BBBB with YYYY, because the $ sign will
# be replaced with 'var'
match($x, /CD$/) {
  replace("AAAA", "XXXX")
}
match($x, /(CD$|ZZ)/) {
  replace("BBBB", "YYYY")
}