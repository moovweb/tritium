$("/html") {
  $("./head") {
    $("./*") {
      remove()
    }

    insert_bottom("meta", "", http-equiv: "refresh", content: "0; mymatches")
  }
  $("./body/*") {
    remove()
  }
}
