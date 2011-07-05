doc("html") {
  $("html") {
    $(".//div[@id='header']") {
      var("name", fetch("div[@class = 'name']/text()"))
      var("address", fetch("div[@class = 'address']"))
    }
    $(".//div[@class='shopping_cart']") {
      html() {
        replace(" items", "")
      }
      var("cart_items", fetch("./text()"))
    }
  }
}
set("<cache/>")
doc("xml") {
  $("cache") {
    bottom() {
      insert_tag("item", key: "name") {
        html() {
          set($name)
        }
      }
      insert_tag("item", key: "cart_items") {
        html() {
          set($cart_items)
        }
      }
      insert_tag("item", key: "address_html") {
        html() {
          set($address)
          prepend("<![CDATA[")
          append("]]>")
        }
      }
    }
  }
}
