doc("html_fragment") {
  top {
    insert_tag("link", src: asset("myfile.css", "stylesheet"))
    insert_tag("script", src: asset("jquery.js", "js"))
  }
}

# If any of these lines are failing, its a preparser problem!
#$('comment')
## $('comment')