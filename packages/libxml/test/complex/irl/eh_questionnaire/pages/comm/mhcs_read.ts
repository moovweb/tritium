$("./div/div/form") {
  # Move the tables after the button area
  $("./table") {
    move_to("..", "bottom")
    $("./tr/td") {
      attribute("width", "")
    }
  }
  $("./table[1]") {
    insert_after("div", class: "mw_hr")
  }
  # Remove a few BRs to fix formatting
  $("./br") {
    remove()
  }
  $("./p/br[position()=last()]") {
    remove()
  }
  # Cleanup the button area
  $("./div[@class='hold btn-hold']") {
    @import button_hold.ts
    $("./a[1]") {
      # Read the text and add icon
      @import button_rewrite.ts
    }
  }
}
