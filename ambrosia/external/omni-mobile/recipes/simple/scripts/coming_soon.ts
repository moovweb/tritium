# This file is meant to block out the site while underconstruction
# Make this active when first pushing to production to ensure 
# its not world visible.
$("/html") {
  $("./head") {
    $("./*") {
      remove()
    }
    insert("script", data-mw_keep: "true", type: "text/javascript", src: asset("javascript/main.js"))
    insert_bottom("style", "body {background-color: #eee;} div {padding:10px;} #coming-soon {font-size: 30px;} #explanation {font-size: 15px;} #mw_desktop_link {text-align:center;display:block;}")
  }
  $("./body") {
    $("./*") {
      remove()
    }
    insert_bottom("div", concat("Mobile ", $source_host, " Coming Soon!"), id: "coming-soon")
    insert_bottom("div", "We're currently in the process of building an <b>amazing</b> mobile experience. Please check back soon.", id: "explanation")
    $cookie_domain = concat($source_host, "")
    $cookie_domain {
      replace(/^(w+\d+\.)?/, ".")
    }
    # desktop link
     insert_bottom("div", class: "mw_footer_link_box", id: "mw_desktop_link_config"){
       attribute("matcher", $rewrite_incoming_matcher)
       attribute("replacement", $rewrite_incoming_replacement)
       attribute("cookie_hours", "0")
       attribute("cookie_domain", $cookie_domain)
       attribute("rewriter_json", $rewrite_incoming_json)
       # adding desktop site link
       insert_top("a", class: "mw_desktop_link", id: "mw_desktop_link"){
         attribute("href", $source_host)
         text("Visit our Desktop Site")
       }
     }
  }
}