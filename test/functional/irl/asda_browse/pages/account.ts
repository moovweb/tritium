$("./body") {
  add_class("mw_account")
  $("./div[@id='mw_mainWrapper']") {
    $("./div[@id='header'] | ./div[@id='footer'] | ./link | ./ul[contains(@class, 'hideoffscreen')] | ./div/div[@id='breadcrumb']") {
      remove()
    }
#     $("./div/div[@id='breadcrumb']") {
#       $("./ul/li[position() < last()]") {
#         bottom(){
#           insert("<span class='mw_breadcrumbSep'> > </span>")
#         }
#       }
#     }
    $(".//div[@id='order']") {
#       move_here("./div[@class='accountfeatures']/div[@class='featureslast' and position()=10]", position = "top")
      move_here("./div[@class='accountfeatures']/div[@class='features' and position()=11]", position: "top")
      move_here("./div[@class='accountfeatures']/div[@class='features' and position()=1]", position: "top")
      $("./div[@class='accountfeatures']") {
#         add_class("mw_testing")
        remove()
      }
    }
  }
}
