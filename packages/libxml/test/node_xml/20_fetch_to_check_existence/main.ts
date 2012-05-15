# Aaron uses this patten in some projects.

html() {
  $found = fetch("//span")
  
  match($found) {
    with("") {
      log("span not found")
    } 
    else() {
      log("span found")      
    }
  }

  $found = fetch("//a")
  
  match($found) {
    with("") {
      log("a not found")      
    } 
    else() {
      log("span found")      
    }
  }


  
}