#[ Open this file with
   a multi-line
   #[ nested ]#
   comment.
   But seriously, this file contains Tritium code which
   ought to be valid, but chokes the current reader. ]#


## space between func name and arg list
$path = magic ("whatever")

match ( $path, /.*whatsaaroneating.com\/.*/i ) {

  ## "not" in xpath, import not on its own line
  $("/html/body/div[not(@ignore-me)]") { @import
                                         import-1.ts }

  ## adjacent string concatenation
  $("/html/body/div[@id='content']/div[@class='daily-entry']"
    "/p[@class='i\'m-getting-tired-of-this-example-xpath-string']") {

    ## keyword arg with hyphens
    wrap("span", long-example: "true", with:colons: "blah") {

      ## multi-line arglist
      move_here("//bah//who//knows//where//these//are//coming//from",
                "after") {
        remove ()
      }
    }
    @import "import 2.ts"  #[ yet another comment! ]#
  }
  blah("whatever" ' CONCAT ' 'and so forth',
       fetch("bloo")) {
    blee()
  }
  @import ../scripts/import-3.ts
}

## End of sample.