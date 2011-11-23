# ENTERING FILE: main.ts
match(var("content_type")) {
  with(/html/) {
    html() {
      # ENTERING FILE: html.ts
      select("/html") {
        # ENTERING FILE: header.ts
        log("Header")
        # LEAVING FILE: header.ts
        # ENTERING FILE: footer.ts
        log("Footer")
        # LEAVING FILE: footer.ts
        # ENTERING FILE: mappings.ts
        match(var("status")) {
          with(/302/) {
            log("STATUS: 302")
          }
          with(/200/) {
            log("STATUS: 200")
            match(var("path")) {
              with(/login/) {
                # ENTERING FILE: login.ts

                # LEAVING FILE: login.ts
              }
              with(/home/) {
                # ENTERING FILE: home.ts
                log("Home")
                # LEAVING FILE: home.ts
              }
              with(/browse/) {
                # ENTERING FILE: browse.ts

                # LEAVING FILE: browse.ts
              }
            }
          }
        }
        # LEAVING FILE: mappings.ts
      }
      # LEAVING FILE: html.ts
    }
  }
}
# LEAVING FILE: main.ts