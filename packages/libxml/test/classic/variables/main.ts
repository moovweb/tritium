xml()  {
  $first = "worked"
  var("second") {
    set("worked")
  }
  var("third", "failed")

  var("third") {
    replace("failed", "worked") # Full text manipulation should be available
  }

  var("fourth", "failed")
  match($first, /o/) { # Should match the string "worked"
    var("fourth", "worked")
  }

  var("fifth", "worked")
  match(var("first"), "^o$") {
    var("fifth", "failed");
  }

  select("//*") {
    # and to prove we have access to the parents variable set
    match($first, /worked/) {
      attribute("win") {
        value() {
          set("creating attribtues works")
        }
      }
    }
  }

  match($first, "worked") {
    match($second, "worked") {
      match($third, "worked") {
        match($fourth, "worked") {
          match($fifth, "worked") {
            select("//*") {
              inner() {
                set("Worked!")
              }
            }
          }
        }
      }
    }
  }
}
