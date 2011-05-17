$(function() {
  $(".step button").click(function() {
    var self = $(this);
    var step = self.parent();
    var execution_block = $("> .execution_wrapper.closable", step);
    if(self.html() == "Open") {
      execution_block.show()
      self.html("Close")
    } else {
      execution_block.hide()
      self.html("Open")
    }
    
  })
})