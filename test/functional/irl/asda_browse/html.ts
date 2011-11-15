# adding a HEAD tag for the shelf page

match($path, /(\/sectionpagecontainer)|(\/productpagecontainer)|(products\/products)|(intermediatetrolley)\.jsp/) {
  $("/html") {
    insert_top("head")
  }
}
# This URL is for the trolley page in Shopping By List
# it has its own seperate scope because i need to add an id to the body 
# of the page so it can go under PopUp Trolley category
match($path, /\/shoppingbasket.jsp/) {
  $("/html") {
    insert_top("head")
    $("./body") {
      attribute("id","basketframe")
    }
  }
}

# PageType: Special Offers
# URL: emerchandising\_range)\.jsp/ 

# PageType: Multi Save Page
# URL: linksavepage)\.jsp/
match($path, /(asda-estore\/catalog\/trolley\-deliveryslot)|(linksavepage)|(emerchandising\_range)\.jsp/){
  $("/html[2]") {
    inner_wrap("div"){
      move_to("../html[1]")
    }
    remove()
  }
}

$("html") {
  # Strip out comments, meta, and links
  # TD: keep links and style while checking passthrough (.//link|.//style)
  $("./head/link | ./head/style") {
    remove()
  }
  $(".//comment()") {
    remove()
  }
  $("./head") {
    # H: As I am styling the header-layout... I want all the other pages to retain their initial stylings. 
    # So, I'm matching here.
    # TODO: Remove the matcher and just remove it all when we get a proper designer on board.
    
    # JDP: Removing their analytics code (doing it here because it gets replaced right below)
    $("..//script[contains(@src, 's_code.js')]") {
      log("--> Removing their s_code.js")
      remove()
    }

    # Remove the 'you might like' script, which we don't use
    $("..//script[contains(@src, 'youmightlike.js')]") {
      remove()
    }
    
    log("++ Adding Style Sheet")
    # TODO: Set up logic to make sure that javascripts aren't getting added multiple times due to frames
    insert_top("link", rel: "stylesheet", type: "text/css", href: asset("main.css", "stylesheet"))
      # asset($device_stylesheet, "stylesheet") - Removing this to temporarly fix the multiple url issue.
    insert_bottom("meta", http-equiv: "Content-Type", content: "text/html")
    insert_bottom("meta", name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0")
    insert_bottom("link", rel: "shortcut icon", href: asset("favicon.ico", "image"))
    insert_bottom("link", rel: "apple-touch-icon", href: asset("apple-touch-icon.png", "image"))
    
    # Used when adding a link to the home screen
    # TODO: Create an appropriate icon
    # insert_bottom("link", rel: "apple-touch-icon-precomposed", href: asset("icon_calendar.png", "image"))

    # Now being bundled
    # insert_bottom("script", src: asset("uranium-pretty.js", "js"))

    # # Bundle file
    # Bundling in the s_code file
    # insert_bottom("script", src: asset("main.js", "js"))

    # Now being bundled
    # insert_bottom("script", src: asset("util.js", "js"))

    # Deprecated ####
    # insert_tag("script" , src: asset("mw_trolley_value.js", "js"))
    # insert_tag("script", src: asset("mw_asda_estore.js", "js"))
    # End Deprecation ####

    # Now being bundled
    # insert_bottom("script", src: asset("mw_update_num_in_trolley.js", "js"))
  }
  

  # JDP: need to include this main.js file in all frames, because otherwise, the files will not properly 
  # be able to access Uranium --> This could cause an issue with some of the bundling 


  # Need to distinguish between the qa and prod environments in order to insert the right analytics code
  # Extra body matcher present to make sure we don't add the file multiple times in the frame of the page
  match($source_host) {
    # Match QA Envs
    with(/groceries\-qa/) {
      log("++ Adding s_code.js to qa env")
      $("./head") {
        # Bundle file
        insert_bottom("script", src: asset("mw_main_qa.js", "js")) 
      }
      # }
    }
    # Match Prod Envs
    with(/groceries\.asda/) {
      log("++ Adding s_code.js to prod env")
      $("./head") {
        # Bundle file
        insert_bottom("script", src: asset("mw_main_prod.js", "js"))
      }
    }
  }
  
  $("./body") {
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
  }
  @import container.ts
  @import mappings.ts
}
