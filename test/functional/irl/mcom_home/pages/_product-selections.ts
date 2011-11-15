# turn color swatches and sizes into accordions if they're too large
# EXPLICIT: div[@class='colors']/ul[starts-with(@id, 'colorList')]
$("div[@class='colors']/ul | div[@class='colorSelection']/div/ul") {
  attribute("data-ur-set", "toggler")
  $("img") {
    attribute("src", "")
    var("swatch_amt", index())
  }
  $("li[@class='morebtn']") {
    remove()
  }
  $("li/img") {
    attribute("style") {
      value() {
        replace(/19,19/, "38,38")
        replace(/size=.*?,19/, "size=0,38")
        replace(/hei=19/, "hei=38")
        append(";visibility: hidden")
      }
    }
  }
  insert("div", data-ur-toggler-component: "content", data-ur-state: "disabled") {
    move_here("../img[position() > 6] | ../li[position() > 6]")
  }
  $("self::*[div/li]") {
    insert("div", concat("Available Colors (", $swatch_amt, ")"), class: "mw_swatch_amt")
    insert("div", "more colors", class: "mw_color_acc_btn mvDarkBtn", data-ur-toggler-component: "button", data-ur-state: "disabled")
  }
}
$("div[@class='sizes']/div/ul | div[@class='sizeSelection']/div/div/ul") {
  attribute("data-ur-set", "toggler")
  $("li[@class='morebtn']") {
    remove()
  }
  $("li") {
    var("size_amt", index())
  }
  wrap_together("li[position() > 5]", "div", data-ur-toggler-component: "content", data-ur-state: "disabled")
  $("self::*[div/li]") {
    insert("div", concat("Available Sizes (", $size_amt, ")"), class: "mw_size_amt")
    insert("div", "more sizes", class: "mw_size_acc_btn mvDarkBtn", data-ur-toggler-component: "button", data-ur-state: "disabled")
  }
}
