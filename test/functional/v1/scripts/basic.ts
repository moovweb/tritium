doc("html") {
  select(".//html") {
    
    select(".//div") {
      remove()
    }
  }
}
