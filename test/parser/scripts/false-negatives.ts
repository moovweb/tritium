/* Test file. Contains things which should pass, but
   will choke the old parser.
   /* These comments nest properly, */
   /* by the way. */
 */

$x = whatever()

xhtml() {
  $("html") {

    # Space between function name and arglist
    $ ("body") {
      @import /* Intra-line comment! */ import-1.ts

      # Adjacent string concatenation and multi-line arglists
      move_here("some/long/path/to/something"
                "/split/across/multiple/lines"
                "/and/concatenated",
                "top") {

        # Keyword args with hyphens and colons
        wrap("div", data-ur-bleeble:blabble: "bork")

        # import broken across lines, with quoted string arg
        @import
        "import 2.ts"
      }

      attribute("class", fetch(fetch("where/is/this/coming/from?")))
      add_class("something-else")

      # 'not' in xpaths
      copy_here(".//img[not(@alt)]")

      @import ../scripts/import-3.ts
    }
  }
  $("//p[1]") {
    html(read("paragraph.html"))
  }
}