$use_global_replace_vars = "true"

// Put quotes around every instance of mary
replace(/(?<mary>Mary)/) {
  set(concat("'", concat($mary, "'")))
}

#$use_global_replace_vars = "false"

// For all words (captured as $word), add a y at the end with the whitespace as defined in the $whitespace capture
replace(/(?<word>[^\s\.]+)(?<white_space>\s)/) {
  set(concat($word, concat("y", $white_space)))
}
