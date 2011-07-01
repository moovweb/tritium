# ENTERING FILE: false-negatives.ts
#[
@_line_number = 7
@_script = "false-negatives.ts"
@_line = ''
#]#
var("x") {
  set(#[
@_line_number = 7
@_script = "false-negatives.ts"
@_line = ''
#]#
whatever())
}
#[
@_line_number = 39
@_script = "false-negatives.ts"
@_line = ''
#]#
doc() {
  #[
  @_line_number = 38
  @_script = "false-negatives.ts"
  @_line = ''
  #]#
  select("html") {
    #[
    @_line_number = 37
    @_script = "false-negatives.ts"
    @_line = ''
    #]#
    select("body") {
      # ENTERING FILE: import-1.ts
      #[
      @_line_number = 5
      @_script = "MAIN"
      @_line = ''
      #]#
      attribute("data-foo") {
        #[
        @_line_number = 4
        @_script = "MAIN"
        @_line = ''
        #]#
        value() {
          #[
          @_line_number = 3
          @_script = "MAIN"
          @_line = ''
          #]#
          set("in-the-body")
        }
      }
      #[
      @_line_number = 2
      @_script = "import-1.ts"
      @_line = ''
      #]#
      log("blah")
      # LEAVING FILE: import-1.ts
      #[
      @_line_number = 28
      @_script = "false-negatives.ts"
      @_line = ''
      #]#
      move_here("some/long/path/to/something/split/across/multiple/lines/and/concatenated", "top") {
        #[
        @_line_number = 23
        @_script = "false-negatives.ts"
        @_line = ''
        #]#
        wrap("div", :"data-ur-bleeble:blabble" => "bork")
        # ENTERING FILE: import 2.ts
        #[
        @_line_number = 5
        @_script = "import 2.ts"
        @_line = ''
        #]#
        move_here(".//div[@class='something']") {
          #[
          @_line_number = 5
          @_script = "MAIN"
          @_line = ''
          #]#
          attribute("id") {
            #[
            @_line_number = 4
            @_script = "MAIN"
            @_line = ''
            #]#
            value() {
              #[
              @_line_number = 3
              @_script = "MAIN"
              @_line = ''
              #]#
              set("algol")
            }
          }
          # ENTERING FILE: nested-import.ts
          #[
          @_line_number = 3
          @_script = "nested-import.ts"
          @_line = ''
          #]#
          attribute("style") {
            #[
            @_line_number = 2
            @_script = "nested-import.ts"
            @_line = ''
            #]#
            remove()
          }
          # LEAVING FILE: nested-import.ts
          #[
          @_line_number = 4
          @_script = "import 2.ts"
          @_line = ''
          #]#
          wrap("span", :id => "algol-span")
        }
        # LEAVING FILE: import 2.ts
      }
      #[
      @_line_number = 15
      @_script = "MAIN"
      @_line = ''
      #]#
      attribute("class") {
        #[
        @_line_number = 14
        @_script = "MAIN"
        @_line = ''
        #]#
        value() {
          #[
          @_line_number = 13
          @_script = "MAIN"
          @_line = ''
          #]#
          set(#[
@_line_number = 13
@_script = "MAIN"
@_line = ''
#]#
fetch(#[
@_line_number = 13
@_script = "MAIN"
@_line = ''
#]#
fetch("where/is/this/coming/from?")))
        }
      }
      #[
      @_line_number = 6
      @_script = "MAIN"
      @_line = ''
      #]#
      attribute("class") {
        #[
        @_line_number = 5
        @_script = "MAIN"
        @_line = ''
        #]#
        value() {
          #[
          @_line_number = 3
          @_script = "MAIN"
          @_line = ''
          #]#
          append(" ")
          #[
          @_line_number = 4
          @_script = "MAIN"
          @_line = ''
          #]#
          append("something-else")
        }
      }
      #[
      @_line_number = 34
      @_script = "false-negatives.ts"
      @_line = ''
      #]#
      copy_here(".//img[not(@alt)]")
      # ENTERING FILE: ../scripts/import-3.ts
      #[
      @_line_number = 3
      @_script = "../scripts/import-3.ts"
      @_line = ''
      #]#
      bottom() {
        #[
        @_line_number = 2
        @_script = "../scripts/import-3.ts"
        @_line = ''
        #]#
        insert_tag("p", "Getting tired of writing these.")
      }
      # LEAVING FILE: ../scripts/import-3.ts
    }
  }
}
# LEAVING FILE: false-negatives.ts