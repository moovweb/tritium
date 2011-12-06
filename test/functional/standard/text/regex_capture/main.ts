// Put quotes around every instance of mary
replace(/(?<mary>Mary)/, concat("'", $mary, "'"))

// For all words (captured as $word), add a y at the end with the whitespace as defined in the $whitespace capture
replace(/(?<word>[^\s\.]+)(?<white_space>\s)/, concat($word, "y", $white_space))
