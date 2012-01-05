# Moving the JS to the bottom of the body.

# This way it paints the body then loads the JS. 
# The user thus sees the page faster. 
# It shouldn't break anything since it is loaded in the same order, 
# so dependencies shouldn't cause any issues. 
# The one exception may be if some JS is called before it is 
# loaded as may be the case when invoked at DOM readiness instead of window.onload
# html() {
#   match($late_load_js, "true") {
#     $("//script[not(@id='dont_move') and @src]") {
#       move_to("/html/body", "bottom")
#       add_class("mw_moved_js")
#     }
#   }
# }
