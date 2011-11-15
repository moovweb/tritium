$("/html") {
  $(".//link[@mw_keep]") {
    remove()
  }
  $("./body") {
    add_class("mw_featured_shop")
    add_class("mw_levis")
    $("./div[@id='page_wrapper']/div[@id='page']") {
      $("./div[@id='head' or @id='header']") {
        $(".//div[@class='nav']") {
          remove()
        }
        $(".//div[@id='promo']") {
          remove()
        }
      }
      #$("./div[@id='main']") {
      #  $("./div[@id='content']") {
      #    $("./div[@id='lbs']") {
      #      $("./div[@id='holdMe']") {
      #        $("./div[@id='topBar']") {
      #          remove()
      #        }
      #        $("./div[@id='bottomBar']") {
      #          remove()
      #        }
      #        $("./div[@id='wrapThis']") {
      #          $("./div[@id='mainNav']") {
      #            
      #          }
      #          $("./div[@id='mainContent']") {
      #            remove()
      #          }
      #        }
      #      }
      #    }
      #  }
      #}
      
      $("./div[@id='main']") {
        $("./div[@id='content']") {
          $(".//div[@id='wrapThis']") {
            $(".//img") {
              remove()
            }
            $("./div[@id='mainNav']") {
              $("./ul") {
                $("./li[1]") {
                  add_class("mw_hide")
                }
                $("./li[2]") {
                  $("./a") {
                    inner("Women")
                  }
                }
                $("./li[3]") {
                  $("./a") {
                    inner("Men")
                  }
                }
                $("./li[4]") {
                  $("./a") {
                    inner("Juniors")
                  }              
                }
                $("./li[5]") {
                  $("./a") {
                    inner("Boys")
                  }
                }
                $("./li[6]") {
                  $("./a") {
                    inner("Girls")
                  }
                }
                $("./li[7]") {
                  $("./a") {
                    inner("Levi's&reg; Curve ID")
                  }
                }
                $("./li[8]") {
                  $("./a") {
                    inner("Extended Sizes")
                  }
                } 
              }
              $("./ul") {
                $("./li") {
                  $("./a") {
                    insert_bottom("div", class: "icons-subnav_arrow_right")
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  
}
