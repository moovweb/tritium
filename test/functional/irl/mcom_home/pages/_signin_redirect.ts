
# ----- RawHTMLBlocks ----
#
#Content::Raw::PassthroughHostFromCapture
#[["regex", "<input.*?id=\"MACYS_secureHostName\".*?value=\".*?\\.(macys.com)\".*?>"]]
replace(/<input.*?id=\"MACYS_secureHostName\".*?value=\".*?\.(macys.com)\".*?>/) {
  # check that there was a first capture
  match(/./, $1) {
    replace($1, $source_host)
  }
}


#
#Content::Raw::PassthroughHostFromCapture
#[["regex", "<input.*?id=\"MACYS_baseHostName\".*?value=\".*?\\.(macys.com)\".*?>"]]
replace(/<input.*?id=\"MACYS_baseHostName\".*?value=\".*?\.(macys.com)\".*?>/) {
  # check that there was a first capture
  match(/./, $1) {
    replace($1, $source_host)
  }
}


#
#Content::Raw::PassthroughHostFromCapture
#[["regex", "<input.*?id=\"MACYS_assetsHostName\".*?value=\".*?\\.(macys.com)\".*?>"]]
replace(/<input.*?id=\"MACYS_assetsHostName\".*?value=\".*?\.(macys.com)\".*?>/) {
  # check that there was a first capture
  match(/./, $1) {
    replace($1, $source_host)
  }
}


#
#Content::Raw::PassthroughURLFromCapture
#[["regex", "onload=\".*?replace\\(['\"](.*?)['\"]"], ["multiline", ""]]
replace(/onload=\".*?replace\(['\"](.*?)['\"]/) {
  rewrite("link")
}


#
#Content::Raw::PassthroughURLFromCapture
#[["regex", "meta\\s*?http-equiv=['\"]refresh['\"]\\s*?content=['\"]\\S*?[uU][rR][lL]=(.*?)['\"]"], ["multiline", ""]]
replace(/meta\s*?http-equiv=['\"]refresh['\"]\s*?content=['\"]\S*?[uU][rR][lL]=(.*?)['\"]/) {
  rewrite("link")
}
