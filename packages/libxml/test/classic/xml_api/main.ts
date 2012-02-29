html() {
  $("html") {
    $(".//div[@id='header']") {
      var("name", fetch("./div[@class = 'name']/text()"))
      var("address", fetch("./div[@class = 'address']"))
    }
    $(".//div[@class='shopping_cart']") {
      inner() {
        replace(" items", "")
      }
      var("cart_items", fetch("./text()"))
    }
  }
}
set("<cache/>")
xml() {
  $("cache") {
    insert("item", key: "name") {
      inner() {
        set($name)
      }
    }
    insert("item", $cart_items) {
      set("key", "cart_items")
    }
    insert("item", key: "address_html") {
      text() {
        set($address)
        prepend("<![CDATA[")
        append("]]>")
      }
      
    }
  }
}
