var("rewrite_link_matcher", "(^|\/\/|\"|\')(?!mlocal\.)(www1?\.)?((reviews\-cdn\.|reviews\.|community\.|assets\.)?[a-z0-9]*)macys\.(fds\.)?com")
var("rewrite_link_replacement", "$1mlocal.$3macys.$5com")

html() {

//      log(concat("LINK REWRITER : Matcher : ", $rewrite_link_matcher))
//      log(concat("LINK REWRITER : Replacement : ", $rewrite_link_replacement))


$("//script[contains(.,'window.location')]") {
    inner() {
      rewrite("link")
    }
  }


}