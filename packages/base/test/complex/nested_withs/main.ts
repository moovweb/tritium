$value = "this that and the other thing"

append("yo")

match($value) {
  with(/th/) {
    append("yo")

    with(/this/) {
      append("yo")

      with(/that/) {
        append("yo")

        with("this that and the other thing") {
          append("yo")

          with(/other/) {
            append("yo")

            with(/thing/) {
              append(" ... we certainly can nest " + $value)
            }          
          }        
        } 
      }
    }
  }
else() {
    append("NOPE")
  }


}
