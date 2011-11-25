$("/html/body") {
  add_class("mw_featured_shop")
  add_class("mw_breast_cancer_awareness")
  
  # remove navigation bar
  $(".//div[@class='nav']") {
    remove()
  }
  
  $(".//div[@class='bcLanding']") {
    # add_class("mw_breast_cancer_awareness")
    
    # remove background image, image map, video, ribbon
    $("./img | ./map | ./div[@class='video'] | ./div[@class='ribbon']") {
      remove()
    }
    
    $("./div[@class='bcaNav']") {
      name("ul")
      $("a") {
        wrap("li")
        
        text(fetch("@alt"))
        
        insert_bottom("div") {
          attribute("class", "icons-subnav_arrow_right")
        }
      }
    }
  }
}