doc("html_fragment") {
  var("stylesheet", "myfile.css")
  var("undefined")
  log(asset($stylesheet, "stylesheet"))
  top {
    insert_tag("link", src: asset($stylesheet, "stylesheet"))
    insert_tag("script", src: asset("jquery.js", "js"))
  }
}

# If any of these lines are failing, its a preparser problem!
#$('comment')
## $('comment')