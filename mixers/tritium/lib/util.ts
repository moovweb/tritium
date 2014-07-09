@func XMLNode.tag_count(Text %tag) {
  %num = ""
  $("//"+%tag) {
    %num {
      append("1")
    }
  }
  %num {
    set(length(%num))
  }
  %num
}

@func XMLNode.proxied_tag_count(Text %tag) {
  %num = ""
  $("//"+%tag) {
    match(fetch("@src"), /^\/[^\/]/) {
      match_not(fetch("@src"), /moovweb\_local\_asset/) {
        %num {
          append("1")
        }
      }
    }
  }
  %num {
    set(length(%num))
  }
  %num
}

@func XMLNode.print_asset_count() {
  %imgs_count = tag_count("img")
  %scripts_count = tag_count("script[@src]")

  %proxied_imgs_count = proxied_tag_count("img")
  %proxied_scripts_count = proxied_tag_count("script[@src]")

  match_not(%proxied_imgs_count, "0") {
    %proxied_imgs_count {
      append(". Use absolute URLs so images are not proxied.")
    }
  }

  log("### Asset Count ###")
  log("Total Number of Images: "+%imgs_count)
  log("Total Number of Scripts: "+%scripts_count)
  log("Number of Proxied Images: "+%proxied_imgs_count)
  log("Number of Proxied Scripts: "+%proxied_scripts_count)
}