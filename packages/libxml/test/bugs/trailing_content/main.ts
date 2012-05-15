# HTML Transformations go here
html(){
  
$("/html") {

  $("head") {

    insert("script", type: "text/javascript", src: asset("javascript/main.js"))

  }

}

}