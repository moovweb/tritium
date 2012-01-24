html_fragment() {
  $stylesheet = "myfile.css"
  var("undefined")
  log(asset($stylesheet, "stylesheet"))
  insert_top("link", src: asset($stylesheet, "stylesheet"))
  insert_top("script", src: asset("jquery.js", "js"))
}

# If any of these lines are failing, its a preparser problem!
#$('comment')
## $('comment')
