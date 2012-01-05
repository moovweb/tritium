$("/html/body[not (contains(@class, 'mw_redesign'))]") {
  attribute("id", "mw_home")
  
  $(".//div[@id='content']") {
    remove()
  }
  
  # move the promo section after the search bar
  $(".//ul[@id='main_nav']") {
    $("./li/a") {
      inner() {
        prepend("<div class='mw_promo_section_text'>")
        append("</div>") 
      }
    }
    move_to("//div[@id='promo']", "after") {
      $("./img") {
        remove()
      }
      $("./div[@id='gel1']") {
        remove()
      }
        #insert_tag("img", src: asset("image/promo_temp2.png"))
        #insert_tag("img", src: "http://dl.dropbox.com/u/10250170/hawt.jpg")
        #insert_tag("img", src: "http://dl.dropbox.com/u/10250170/placholder.gif")
      insert_top("img", src: asset("image/placeholder.gif"))
    }
  }
}

$("/html/body[contains(@class, 'mw_redesign')]") {
  attribute("id", "mw_home")
  $(".//iframe[@class='emailIframe']") {
    attribute("src") {
      value() {
        rewrite("link") 
      }
    }
    attribute("width", "100%")
    attribute("height", "")
    attribute("scrolling", "no")
    $("/html/body") {
      # remove the id that was added so that we don't make an ajax request for the banner
      attribute("id", "")
      # inject script to resize iframe based on iframe's body height
      # retrieved via message event listener for cross-domain communication
      inject_bottom("<script type='text/javascript'>window.addEventListener('message', function(e) { console.log(e.data + ' - origin: ' + e.origin); mw_set_iframe_height(e.data); }, false); function mw_set_iframe_height(val) { console.log(val); var b = document.getElementsByClassName('emailIframe')[0]; b.style.height = val + 'px'; }</script>")
    }
  }
  $("./div[@id='page_wrapper' or @id='wrapper']") {
    $("./div[@id='page']") {
      $("./div[@id='main']/div[@id='content']/div[@id='hero']") {
        remove()
      }
      $("./div[@id='header']//div[@class='masthead']") {
        insert_after("div", id: "mw_hero")
      }
    }
  }
}

