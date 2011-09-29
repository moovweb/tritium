xml()  {
  # Test that dollar signs work as an end-of-string marker inside a regex
  # Hopefully it is not interpretted as the beginning of a tritium variable
  match($path, /baby$/) {
    $(".//span[@id='b']") {
      remove()
    }
  }
}
