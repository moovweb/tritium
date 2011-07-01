# ENTERING FILE: add_class.ts
#[
@_line_number = 1
@_script = "add_class.ts"
@_line = ''
#]#
var("hi") {
  set("hello")
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
    append(#[
@_line_number = 4
@_script = "MAIN"
@_line = ''
#]#
var("hi"))
  }
  #[
  @_line_number = 3
  @_script = "add_class.ts"
  @_line = ''
  #]#
  replace("h", "H")
}
# LEAVING FILE: add_class.ts