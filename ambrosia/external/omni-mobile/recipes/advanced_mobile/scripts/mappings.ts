
/*
  Mappings

  Mappings are matchers that we use to determine if we should execute a
  bit of Tritium during an execution. Aka, run something when we are
  are on a certain page.

  Example starting code:
*/

match($status) {

  with(/302/) {
    log("--> STATUS: 302")
    # redirect: just let it go through
  }

  with(/200/) {
    log("--> STATUS: 200")

    match($path) {
      with(/home/i) {
        // Include a log with every import to make it simple to know what scripts are running
        log("--> Importing pages/homes.ts in mappings.ts")
        @import pages/home.ts
        
          # Uncomment the line below to set the variable that is used
          # in the mw_analytics.ts file and embed a custom tag for this page
          # $mw_analytics = "project_name_home"
        
      }
      else() {
        log("--> Importing pages/not_homes.ts in mappings.ts")
        //@import pages/not_home.ts
      }
    } # $path
  } # 200

  else() {
    # not 200 or 302 response status
    @import pages/error.ts
  }

} //$status

