html_fragment() {
  $stylesheet = "myfile"
  var("undefined")
  log(sass($stylesheet))
  insert_top("link", src: sass($stylesheet))
  insert_top("script", src: asset("javascript/jquery.js"))
}

# If any of these lines are failing, its a preparser problem!
#$('comment')
## $('comment')
