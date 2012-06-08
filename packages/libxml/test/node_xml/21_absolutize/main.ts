$source_host = "www.mydomain.com"

html() {
  $("html") {
  
    $("head") {
      absolutize(".//script[contains(@src,'bar')]")
    }
    $("body") {
      absolutize()
      absolutize(".//a", "href")
    }
 
  } 
}