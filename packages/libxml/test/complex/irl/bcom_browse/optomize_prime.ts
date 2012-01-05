# intentionally left blank


log("")
log("")
log(":: optomization on ::")
log("")
log("")

$("head"){
  $("script"){
    log("removed")
    remove()
  }
}

$("body"){
  $("script"){
    remove()
  }
}