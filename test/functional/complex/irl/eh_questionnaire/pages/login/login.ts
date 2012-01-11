# Backup original page
name("corpse")
wrap("body") {
  # Add page specific class
  add_class("mw_login")
  #######################################################
  # First grab each major section from the original page
  #######################################################
  # Copy the form itself
  copy_here("//corpse//form[@name='loginForm']")
  
  $("./form[@name='loginForm']") {
    text("")
    
    copy_here("//corpse//form[@name='loginForm']//input[@type='hidden']")
    
    # Copy the error message
    # match div block with style color set to red
    copy_here("//corpse//div[contains(@style, 'red') or contains(@style, '#f00') or contains(@style, '#a6180d')]") {
      add_class("mw_error")
      attribute("style") {
        remove()
      }
    }
    
    # Get the required fields
    insert_bottom("dl") {
      insert_bottom("dt") {
        inject_bottom("Email Address:")
      }
      insert_bottom("dd") {
        move_here("//corpse//form//input[@name='j_username']")
      }
      insert_bottom("dt") {
        inject_bottom("Password:")
      }
      insert_bottom("dd") {
        move_here("//corpse//form//input[@type='password']")
      }
    }
    
    # Copy the forgot my password link
    copy_here("//corpse//a[contains(@href, 'password')]") {
      text("Forgot Password")
      add_class("forgot_password")
    }
    
    # Copy all hidden fields over
    move_here("//corpse//form//input[@type='hidden']")
    
    move_here("//corpse//input[@name='submit']") {
      attribute("type", "submit")
      attribute("src") {
        remove()
      }
      
      add_class("mw_button")
    }
    
    move_here("//corpse//a[contains(@href, '/home') and contains(@class, 'text_12red')] | //corpse//a[contains(@href, '/register')]") {
      add_class("mw_button")
      add_class("mw_login_center_button")
    }
  }
  
  #######################################################
  # Trim unwanted content from newly built page
  # and personalize class structure
  #######################################################
  # Add the top logo and page title
  insert_top("div", class: "mw_header") {
    insert_top("div", "Login", class: "mw_page_title")
    insert_top("div", class: "icons-logo")
  }
  $("./form[@name='loginForm']") {
    # Fix hard link
    attribute("action", "/singles/servlet/login/submit")

    $(".//input[@type='text']") {
      attribute("type", "email")
    }
  }

}
