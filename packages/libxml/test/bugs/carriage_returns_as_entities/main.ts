# What happens here is we extract the inner text from an element and assign it to an attribute.
# Instead of escaping the carriage return as an HTML entity, we should probably trim any attributes of whitespace characters

html() {
  $("html/body/div"){  
    $value = fetch("text()")

    #log("VALUE:" + $value)
    
    attribute("href", $value) {
      value() {
        replace(/\s+/, "")
        prepend("tel:")
      }
    }
  } 
}