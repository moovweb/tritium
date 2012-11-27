html_fragment() {
  $$("#my_div") {
    text() {
      convert_encoding("gbk", "utf-8")
      log("This will convert the text from gbk to utf-8.")
      log("If you want a list of encodings, you can run iconv -l on your command line.")
    }
  }
}