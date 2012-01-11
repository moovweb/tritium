# If you need to modify the HTML/XML as raw text before its parsed... do it here!
@import robots.ts

# Default to v2 code
$mw_v1_fallback = "false"

# match and set region
# available regions: au, ca, uk, cp, us
match($host) {
  with(/eharmony\.com\.au$/) {
    $region = "au"
  }
  with(/eharmony\.ca$/) {
    $region = "ca"
  }
  with(/eharmony\.co\.uk$/) {
    $region = "uk"
  }
  with(/\.compatiblepartners\.net$/) {
    $region = "cp"
  }
  with(/eharmony\.com$/) {
    $region = "us"
  }
}

# Registration (meta refresh)
# HACK: This page has no body element so the mapping won't pick this up
match($path) {
  with(/^\/singles\/servlet\/registration\/rqintro/) {
    html() {
      $("/html") {
        insert_bottom("body", style: "background: white") {
          add_class("mw_comm")
          inject_top("<div style='display: block;' class='mw_SpinnerOverlay mw_SpinnerOverlayHide' id='addclasstarget51905'><div class='mw_SpinnerOverlaySpinner'></div></div>")
          insert_after("script") {
            attribute("language", "javascript")
            inner("window.addEventListener(\"load\",function(){   var b = document.getElementsByClassName(\"mw_SpinnerOverlay\")[0];   b.style.height = document.body.offsetHeight + \"px\";   var c = b.getElementsByTagName(\"div\")[0]; /* the spinner */   remove_class(b, \"mw_SpinnerOverlayHide\");   c.style.left = (window.innerWidth - c.offsetWidth)/2 + \"px\";     c.style.margin = \"0\";   add_class(b, \"mw_SpinnerOverlayHide\");   window.addEventListener(\"scroll\", function(){     c.style.top = (window.innerHeight - c.offsetHeight)/2 + document.body.scrollTop + \"px\";   }, false); }, false);")
          }
        }
      }
    }
  }
}

match($content_type) {
  with(/xml/) {
    xml() {
      # Replace any *. domains properly to be more secure
      $("//cross-domain-policy") {
        inner() {
          replace(/\*\./, "") 
        }
      }
    }
  }
  with(/html/) {
    html() {
      match($path) {
        with(/singles\/servlet\/subscription/) {
          $mw_v1_fallback = "true"
        }
        with(/singles\/servlet\/questionnaire/) {
          match($region) {
            with(/us|ca|cp/) {
              $mw_v1_fallback = "true"
            }
          }
        }
      }
      
      # All subscription -> select form falls back to v1
      $("//form[@name='SelectSubscriptionForm']") {
        $mw_v1_fallback = "none"
        $mw_special = "sub"
      }
      # All billing and process form goes to v2 by default...
      $("//form[@name='PHOptionalBillingInfoForm'] | //form[@name='ProcessSubscriptionForm']") {
        $mw_v1_fallback = "false"
        $mw_special = ""
        
        # ...and fall back to v1 only when it's the TotalConnect flow
        $("//body[@id='purchase-layout-1024']") {
          $mw_v1_fallback = "none"
          $mw_special = "sub"
        }
      }
      match($mw_v1_fallback, "false") {
        @import html.ts
      }
    }    
  }
}

match($mw_special, "sub") {
  @import v1/subscription_chooseplan.ts
}
match($mw_v1_fallback, "true") {
  @import v1_mappings.ts
}

#match($content_type, /js/) {
#  @import js.ts
#}
