log("*****")
log("quick edit ajaxContent")
log("*****")

# this is actually used by the quick edit in the cart as well
# not just the wishlist as the file name suggests

# Rewrite links
$(".//a") {
  attribute("href") {
    value() {
      rewrite("link")
    }
  }
}
# Rewrite form actions
$(".//form") {
  attribute("action") {
    value() {
      rewrite("link")
    }
  }
}

$("form[@id='form_product_detail']") {
  $("./div[@id='quick_view']") {
    $("./div[@class='prod_bd']") {
      $("./div[@class='details']") {
        $("./div[@class='sel_options']") {
          $("./div[@id='div_size_qv']") {
            $("./br") {
              remove()
            }
            $("./font") {
              remove()
            }
          }
          $("./div[@id='div_color_qv']") {
            $("./br") {
              remove()
            }
            $("./font") {
              remove()
            }
          }
          $("./div[@class='quantity']") {
            $("./div[@class='control']") {
              $("./font") {
                remove()
              }
            }
          }
        }
      }
    }
  }
}

