match($status) {
  ##############
  # Status Good
  ##############
  with("200") {
    match($path) {
      #################
      # Redirect Pages
      #################
      with(/^\/$/) {
        # Redirect logins to "Main Login"
        # must use / to kill any other redirects
        $("/") {
          inner("<script>window.location='/login';</script>")
        }
      }
      # Login dispatcher
      with(/^\/singles\/servlet\/logindispatcher.*/i) {
        # Redirect logins to old "My Matches"
        # $("script") {
        #   text() {
        #     $mod_host = $host
        #     
        #     var("mod_host") {
        #       replace("^(m[a-z]+\.).+$", "\1")
        #       append("www.")
        #     }
        #     
        #     log("******")
        #     log($mod_host)
        #     
        #     # replace(/www\./, $mod_host)
        #   }
        # }
        #$("/") {
        #  inner("<script>window.location='singles/servlet/user/mymatches';</script>")
        #}
      }
      # Logout dispatcher
      with("/singles/servlet/user/logout") {
        # Redirect logins to "Main Login"
        $("/") {
          inner("<script>window.location='/login';</script>")
        }
      }
      # aboutme
      with(/\/singles\/servlet\/user\/aboutme/) {
        @import pages/aboutme.ts
      }
      # Shouldn't hit this unless logindispatcher fails to redirect
      with("/singles/servlet/user/myhomeredesign") {
        # Redirect logins to "My Matches"
        # must use / to kill any other redirects
        $("/") {
          inner("<script>window.location='/singles/servlet/user/mymatches';</script>")
        }
      }
      ################
      # Partial Pages
      ################
      with(/singles\/servlet\/user\/comm\/review\/ajax/) {
        @import pages/comm/comm_partial.ts
      }
      ###############
      # Normal Pages
      ###############
      with("/singles/servlet/user/comm/error") {
        @import pages/error.ts
      }
      with("/singles/servlet/login/submit") {
        # This is the page that displays errors and handles user login
        @import pages/login/login.ts
        @import pages/login/_optimize.ts
      }
      with("/singles/servlet/aboutme/rq/photos/upload") {
        @import pages/questionnaire/completed.ts
      }
      with("/login") {
        # This is the secondary login page
        @import pages/login/login.ts
        @import pages/login/_optimize.ts
      }
      # Register form handler
      # Match this before /home to avoid conflict
      with(/singles\/servlet\/homeRegS/) {
        @import pages/register_table.ts
      }
      with(/\/(home|register)/) {
        $("/html/body//form//table | /html/body//form//div[contains(@class, 'formLeft')]") {
          $mw_table_register = "true"
        }
        
        match($mw_table_register) {
          with("true") {
            @import pages/register_table.ts
          }
          else() {
            @import pages/register.ts
          }
        }
      }
      # Home page (new) for this site
      with(/singles\/servlet\/user\/matchresults/) {
        @import pages/home/homenew.ts
        @import pages/home/_homenew_opt.ts
      }
      # Home page for this site
      # http://mlocal.eharmony.com/singles/servlet/user/mymatches
      with(/singles\/servlet\/user\/mymatches/) {
        @import pages/home/home.ts
        @import pages/home/_optimize.ts
      }
      with(/singles\/servlet\/user\/comm\/archivematch/) {
        @import pages/home/home.ts
        @import pages/home/_optimize.ts
      }
      # Profile view page
      # http://mlocal.eharmony.com/singles/servlet/user/comm/review?set=3115346679
      with(/singles\/servlet\/user\/comm\/review/) {
        @import pages/profile.ts
        @import pages/_profile-optimize.ts
      }
      # RQ pages
      # http://mlocal.r7.eharmony.co.uk/singles/servlet/questionnaire/relationship/1
      with(/singles\/servlet\/questionnaire(\/submit)?\/relationship\/\d{1,2}$/) {
        @import pages/questionnaire/questionnaire.ts
      }
      # Lost password
      # http://mlocal.r7.eharmony.com/singles/servlet/support/lostpassword
      # with(/singles\/servlet\/support\/lostpassword/) {
      #   @import pages/login/lostpassword.ts
      # }
      # Subscription
      with(/singles\/servlet\/subscription/) {
        @import pages/subscription/subscription.ts
      }
      # Profile message page
      # http://www.eharmony.com/singles/servlet/user/comm?set=3115346679#profile-tabs
      with(/singles\/servlet\/user\/comm/) {
        $mw_handled = "false"
        $("//form[@name='ReadClosedQuestionForm']") {
          log("=========> CEQ: Read")
          $("//body") {
            add_class("mw_ceq_read")
          }
        }
        $("//form[@name='openCommPrimerForm']") {
          log("=========> eH Mail: Skip to eH Mail")
          $("//body") {
            add_class("mw_skip_to_ehmail")
          }
        }
        $("//form[@name='viewMhcsForm']/input[@name='method' and @value='viewOtherMhcs']") {
          log("=========> MHCS: Read")
          $("//body") {
            add_class("mw_mhcs_read")
            @import pages/comm/comm.ts
            @import pages/comm/mhcs_read.ts
          }
          $mw_handled = "true"
        }
        match($mw_handled, "false") {
          @import pages/comm/comm.ts
          @import pages/comm/comm_partial.ts
        }
      }
      # Unhandled path
      else() {
        $mw_pass_through = "true"
        
        log($path)
        #@import pages/notfound.ts
      }
    }
  }
  ########################
  # Status error handlers
  ########################
  with(/401|403/) {
    # This is the login page that happens when you haven't logged in
    # and try to access a url that is only valid for logged in users
    @import pages/login/login.ts
    @import pages/login/_optimize.ts
  }
  # Page not found
  with("404") {
    @import pages/notfound.ts
  }
  with("500") {
    @import pages/error_500.ts
  }
}
@import pages/_base_optimization.ts
