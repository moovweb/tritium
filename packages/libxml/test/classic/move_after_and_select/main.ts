# This script makes the debug engine hang, so I have commented out
# a piece so that the other rake tests can run. But this needs to
# be fixed.
xml()  {
  $("/parent/child") {
    move_here("../../parent", "after")
    # this line will cause it to freeze
    #$("./parent")
  }
}
