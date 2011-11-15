$(".//div[@id='search_results']") {
  $("./div[@class='paging']") {
    $("./ul") {
      $("./li[@class='last']/a") {
        text() {
          set("")
        }
        inject_bottom("<div class='icons-white_nav_arrow_left'></div>")
      }
      $("./li[@class='next']/a") {
        text() {
          set("")
        }
        inject_bottom("<div class='icons-white_nav_arrow_right'></div>")
      }
    }
  }
}

$(".//div[@id='results']") {
  $("./ul") {
    $("./li[position()=1]") {
      remove()
    }
    $("./li") {
      attribute("touch-link", fetch("./ul/li[1]/a/@href"))
      inject_bottom("<div class='icons-subnav_arrow_right'></div>")
      $("./ul") {
        $("./li[1]/a") {
          name("div")
        }
        $("./li[@class='day']") {
          text() {
            append(", ")
          }
        }
      }
    }
  }
}

$(".//h5[@id='search_again']") {
  wrap("div", id: "mw_search_again") {
    attribute("data-ur-set", "toggler")
    $("./h5") {
      attribute("data-ur-toggler-component", "button")
      inject_bottom("<div class='icons-nav_arrow_dn'></div>")
      inject_bottom("<div class='icons-nav_arrow_up'></div>")
    }
    move_here("../form[@name='form_find_bridal_registry']", "bottom") {
      attribute("data-ur-toggler-component", "content")
    }
    $(".//li[@class='l3']") {
      move_here("../li[@class='l4']/select", "bottom")
    }
  }
}
