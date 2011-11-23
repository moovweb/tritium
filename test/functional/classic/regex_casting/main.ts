set("abc")
replace(".", "?")
// Should be the same the "." should NOT be treated as a regex
replace("a", "Aa")
// Should be Aabc now
$var = ".$"
replace(regexp($var), "Cc") 
// Should be AabCc
replace(regexp("b"), "Bb")
// Should be AaBbCc