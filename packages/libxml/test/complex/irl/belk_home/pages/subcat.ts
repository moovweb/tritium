attribute("id", "mw_subcat")

$("/html/body[contains(@class, 'mw_redesign')]") {
  $("./div[@id='page_wrapper']/div[@id='page']") {
    $("./div[@id='header']/div[@class='loggedOut' or @class='loggedIn']") {
      $("./div[@class='nav']") {
        remove()
      }
    }
    $("./div[@id='article']") {
      $("./div[@id='aside']") {
        remove()
      }
      $("./div[@id='content']") {
        $("./div[@id='hero']") {
          $("./table") {
            remove()
          }
          $("./map") {
            remove()
          }
          $("./div[div/iframe[contains(@title, 'YouTube')]]") {
            remove()
          }
        }
      }
    }
  }
}

# removing slider for functional rel. #1
$(".//div[@id='slider-container']") {
  remove()
}

$(".//div[@id='hero']") {
  $("./img[position()=1]") {
    remove()
  }
  $("./a[position()=1]/img") {
    remove()
  }
}

$(".//div[@id='content']") {
  move_to("../div[@id='subnav']", "before")
  $("./img") {
    remove()
  }
}

@import _subcat_product_list.ts

## Product result list... its a <ul> that has all of the products in it
$(".//ul[@class='product_results']") {
  $("./li") {
    $("./div[@class='image']") {
      attribute("style", "")
    }
  }
}


### Subnav at the bottom of the page - it is different for category and boutique (featured shops) ###
#for the category sub nav
#$("../body[contains(@class, 'category')]"){
$(".//div[@id='subnav']/ul") {
  attribute("class") {
    value() {
      append(" mw_category_subnav")
    }
  }
  $("./li") {
    attribute("toggle-button", ".mw_cat_heading")
    attribute("toggle-selector", "ul")
    inner() {
      prepend("<div class='mw_cat_heading'><div>")
      append("</div></div>")
    }
      
    $("./div[@class='mw_cat_heading']") {
      $("./div") {
        $("./ul") {
          move_to("../../.", "after")
        }
      }
        #var("subnavHeading"){
        #  set(fetch("./div/text()"))
        #}
        #log($subnavHeading)
      $("./div[contains(.,'Shop by Category')]") {
        $("../../.") {
          attribute("class") {
            value() {
              append(" mw_keep")
            }
          }
        }
      }
    }
      
    $("./ul[@class='more_brands']") {
      $("./following-sibling::ul/li") {
        move_to("../../ul[1]", "top")
      }
    }
      
    $("./ul") {
      add_class("closed")
    }
  }
}
  
#}

#for the boutique sub nav
#$("../body[contains(@class, 'boutique')]"){
#  $(".//div[@id='subnav']"){
#    attribute("class"){
#      value(){
#        append(" mw_boutique_subnav")
#      }
#    }
#    $("./ul/li/ul"){
#      #move_here("../../li[position()=last()]", "bottom")
#      $("./li"){ 
#        $("./ul"){ #if there is a ul, there is a sub nav
#          attribute("class"){
#            value{
#              append("closed")
#            }
#          }
#          $("../."){ #add class to parent
#            attribute("class"){
#              value{
#                append("mw_has_subnav")
#              }
#            }
#            attribute("toggle-button", "a:first-child")
#            attribute("toggle-selector", "ul")
#            $("./a"){
#              attribute("href","javascript:void(0)")
#            }
#          }
#          $("./li"){
#            $("/a/html()"){
#              prepend("<div>")
#              append("</div>")
#            }
#            $("./ul/li"){
#              $("./ul"){
#                $("../."){
#                  attribute("class"){
#                    value{
#                      append("mw_subsubnav")
#                    }
#                  }
#                }
#                $("./li"){
#                  $("./ul"){
#                    $("../."){
#                      attribute("class"){
#                        value{
#                          append("mw_subsubsubnav")
#                        }
#                      }
#                    }
#                  }
#                }
#              }
#            }
#          }
#        }
#      }
#      move_to("../../../.", "top")
#    }
#    $("./ul[position()=last()]"){
#      remove()
#    }
#  }
#}

