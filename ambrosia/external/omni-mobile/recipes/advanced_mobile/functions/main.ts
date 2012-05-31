####################
### Site Functions
####################

# BTN DELEGATE
@func XMLNode.btn_delegate() {
  # make sure the input has an 'id' attribute and either an 'alt' or 'value' attribute
  var("btn_alt", fetch("@alt"))
  match($btn_alt, "") {
    var("btn_alt", fetch("@value"))
  }
  var("btn_id", fetch("@id"))
  var("btn_class", concat("mw_", fetch("@data-stylename")))
  attributes(src: "", style: "position: absolute; visibility:hidden; margin-top:-10000px;")
  insert_before("div", $btn_alt, id: concat("mw_", $btn_id), class: $btn_class, onclick: concat("e = document.createEvent('MouseEvents'); e.initMouseEvent('click', true, true, window, 0, 0, 0); document.getElementById('", $btn_id, "').dispatchEvent(e);"))
  
  #  Usage Example
  # $(".//input[contains(@src, 'btn_save')]") {
  #   attributes(id: "saveBtn", alt: "Save", data-stylename: "btn1")
  #   btnDelegate()
  # }
}

# Dump a table
@func XMLNode.table_dump(Text %xpath){
  $(%xpath) {
    name("div")
    add_class("mw_was_table")

    $(".//table | .//tr | .//td | .//th | .//thead | .//tfoot | .//tbody | .//col | .//colgroup | .//caption") {
      %i = index()
      %n = name()
      name("div")
      attributes(data-mw-id: concat("mw_dump_", %n, %i))
      add_class(concat("mw_was_", %n))
    }

    yield()
  }
}


# Remove Styles Functions
@func XMLNode.remove_external_styles() {
  remove(".//link[@rel='stylesheet']")
}
@func XMLNode.remove_internal_styles() {
  remove(".//style")
}
@func XMLNode.remove_all_styles() {
  remove(".//link[@rel='stylesheet']|.//style")
}

# Remove Scripts
@func XMLNode.remove_external_scripts() {
  remove(".//script[@src]")
}
@func XMLNode.remove_internal_scripts() {
  remove(".//script[not(@src)]")
}
@func XMLNode.remove_scripts() {
  remove(".//script")
}
@func XMLNode.remove_desktop_js() {
  remove("//script[@src and (not(@data-mw_keep) or @data-mw_keep='false')]")
}

# Remove HTML Comment Tags
@func XMLNode.remove_html_comments() {
  remove(".//comment()")
}

# Clean Meta Tags
@func XMLNode.meta_tags() {
  # Remove only existing meta tags for which we will add our own
  remove(".//meta[@name='viewport']|.//meta[@name='format-detection']")

  # Add our meta tags
  $("./head") {
    insert("meta", http-equiv: "Content-Type", content: "text/html")
    insert("meta", name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0")
    insert("meta", name: "format-detection", content: "telephone=no")
  }
}

# Add in our Assets
@func XMLNode.add_assets() {
  $("./head") {
    insert("link", rel: "stylesheet", type: "text/css", href: sass($device_stylesheet))
    insert("script", data-mw_keep: "true", type: "text/javascript", src: asset("javascript/main.js"))
    insert("link", rel: "shortcut icon", href: asset("images/favicon.ico"))
    insert("link", rel: "apple-touch-icon", href: asset("images/apple-touch-icon.png"))
    # Add AJAX rewrite config
    
    insert("meta", "top") {
      attribute("id", "mw_link_passthrough_config")
      attribute("rewrite_link_matcher", $rewrite_link_matcher)
      attribute("rewrite_link_replacement", $rewrite_link_replacement)
    }    
  }
}

# Rewrite items
@func XMLNode.rewrite_links() {
  $rewriter_url = "false"
  $("./body") {
    # Rewrite links
    $(".//a") {
      attribute("href") {
        value() {
          rewrite("link")
        }
      }
    }
    $("/html/head/base") {
      attribute("href") {
        value() {
          rewrite("link")
        }
      }
      $rewriter_url = fetch("./@href")
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
}

# Absolutize Items 
@func XMLNode.absolutize_srcs() {
  # Absolutize IMG and SCRIPT SRCs
  var("slash_path") {
    # the 'slash_path' is the path of this page without anything following it's last slash
    set($path)
    replace(/[^\/]+$/, "")
    # turn empty string into a single slash because this is the only thing separating the host from the path relative path
    replace(/^$/, "/")
  }
  # Find images and scripts that link to an external host
  $(".//img|.//script[@src]") {
    # GOTCHAS :: Watch out for captcha images, they most likely should
    # not be absolutized
    $src = fetch("./@src")
    match($rewriter_url) {
      not(/false/) {
        # Do nothing :: Use base tag value
      }
      else() {
        $rewriter_url = $source_host
      }
    }
    # skip URLs which: are empty, have a host (//www.example.com), or have a protocol (http:// or mailto:)
    match($src, /^(?![a-z]+\:)(?!\/\/)(?!$)/) {
      attribute("src") {
        value() {
          match($src) {
            with(/^\//) {
              # host-relative URL: just add the host
              prepend(concat("//", $rewriter_url))
            }
            else() {
              # path-relative URL: add the host and the path
              prepend(concat("//", $rewriter_url, $slash_path))
            }
          }
        }
      }
    }
  }
}

@func XMLNode.relocate_scripts() {
  $("/html/body/script") {
    move_to("/html/body", "bottom")
  }
}

######################
### Uranium Functions
######################

@func XMLNode.ur_attribute(Text %attr_modifier, Text %value) {
  attribute(concat("data-ur-", %attr_modifier), %value)
}

@func XMLNode.ur_set(Text %type) {
  ur_attribute("set", %type)
}


@func XMLNode.ur_component(Text %widget_type, Text %component_type) {
  ur_attribute(concat(%widget_type, "-component"), %component_type)
}

@func XMLNode.ur_toggler(Text %button, Text %content) {
  ur_set("toggler")
  $(%button) {
    ur_component("toggler", "button")
    ur_attribute("state", "disabled")
  }
  $(%content) {
    ur_component("toggler", "content")
    ur_attribute("state", "disabled")
  }
}


@func XMLNode.ur_carousel(Text %items) {
  ur_set("carousel")
  ur_component("carousel", "view_container")
  ur_attribute("autoscroll", "true")
  ur_attribute("touch", "disabled")
  ur_attribute("data-ur-autoscroll-delay", "2")
  insert_bottom("div") {
    ur_component("carousel", "scroll_container")
    copy_here(%items, "bottom") {
      ur_component("carousel", "item")
    }
  }
  insert_bottom("div", "Prev") {
    ur_component("carousel", "button")
    ur_attribute("carousel-button-type", "prev")
  }
  insert_bottom("div", "Next") {
    ur_component("carousel", "button")
    ur_attribute("carousel-button-type", "next")
  }
  insert_bottom("div", "-- count --") {
    ur_component("carousel","count")
  }
  insert_bottom("div", class: "mw_dots") {
    ur_component("carousel", "dots")
  }
}

