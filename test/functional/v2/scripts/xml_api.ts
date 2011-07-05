html() {
  $("html") {
    $(".//div[@id='header']") {
      var("name", fetch("div[@class = 'name']/text()"))
      var("address", fetch("div[@class = 'address']"))
    }
    $(".//div[@class='shopping_cart']") {
      inner_xml() {
        replace(" items", "")
      }
      var("cart_items", fetch("./text()"))
    }
  }
}
set("<cache/>")
xml() {
  $("cache") {
    bottom() {
      insert("item", key: "name") {
        inner_xml() {
          set($name)
        }
      }
      insert("item", key: "cart_items") {
        inner_xml() {
          set($cart_items)
        }
      }
      insert("item", key: "address_html") {
        inner_xml() {
          set($address)
          prepend("<![CDATA[")
          append("]]>")
        }
      }
    }
  }
}
