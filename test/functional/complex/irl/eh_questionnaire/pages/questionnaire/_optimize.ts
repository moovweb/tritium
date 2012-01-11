$("/html/body/div/form[@id='rq_form']") {
  # Kill any existing script and hidden field to avoid duplicates
  $(".//script | .//input[@type='hidden']") {
    remove()
  }
  
  move_here("/html/body/corpse//form[@id='rq_form']//input[@type='hidden']")
  move_here("/html/body/corpse//form[@id='rq_form']//script")
}
$("/html/body/div/form[not(@id)]") {
  # Kill any existing script and hidden field to avoid duplicates
  $(".//script | .//input[@type='hidden']") {
    remove()
  }
  
  move_here("/html/body/corpse//form[not(@id)]//input[@type='hidden']")
  move_here("/html/body/corpse//form[not(@id)]//script")
}
$("/html/body") {
  move_here("/html/body/corpse//script")
}
$("/html/body/corpse") {
  remove()
}