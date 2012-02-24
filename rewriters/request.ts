$use_global_replace_vars = "true"
#       !!! WARNING THIS FILE IS GENERATED AND PROJECT SPECIFIC !!!
#
# Transform the request from a downstream client so it is ready to issue to the
# upstream host. This script exports variables relevent to processing the
# request. These files are generated and project specific.
#
# Inputs:
#  * The raw http request header (without the \r\n\r\n separator)
#  * This script listens to the X-Moov-Secure header to determine if the request
#    should be issued via SSL.
#  * Optionally the accept_encoding variable can be specified to set the
#    supported compression methods such as "gzip,deflate"
#  * This script does not currently require any enviroment variables be passed
#    in.
# Exports:
#   Passthrough:
#     * asset_host
#   Headers:
#     * via - Used to check if the proxy is making a request to itself
#     * host - Used to make sure the host was rewritten
#     * user_agent - The device used to make the request OR the fixed value
#     * cookie - The cookie header of the incoming request
#   Other:
#     * method - The http request method (Usually GET or POST).
#     * path - The path to the resource (Full URL in the case of proxy requests)
#     * secure - True if the request should be made via SSL.
#     * source_host - The upstream host to issue the request to.
# Special
#  * Adds the Via and Connection headers if they don't exist.

# Export passthrough variables
{{if .Asset_Host}}
export("asset_host", "{{.Asset_Host}}")
{{else}}
export("asset_host", $asset_host)
{{end}}

{{if .Http11}}
log("Leaving HTTP version alone")
{{else}}
# Set request header to HTTP 1.0
replace(/HTTP\/1\.1/i, "HTTP/1.0")
{{end}}

# Get method and path
replace(/\A(\w{3,})\s+(.+)\s+(HTTP\/\d\.\d)/) {
  export("method", $1)
  export("path", $2)
}

# Get downstream ssl header
$secure = "false"
replace(/\s+^x\-moov\-secure[^\r\n]*/i) {
  $secure = "true"
}
export("secure", $secure)
{{if .User_Agent }}
# Rewrite the user agent
replace(/^(user-agent\:\s*)([^\r\n]*)/i) {
  set("$1")
  append("{{.User_Agent}}")
  # Reset the export (Not sure if this is what we want)
  export("user_agent", "{{.User_Agent}}")
}
{{else}}
# Get the user-agent header
replace(/^user-agent\:\s*([^\r\n]*)/i) {
  export("user_agent", $1)
}
{{end}}

# Fix the connection header so it is always connection: close,
# regardless of whether or not a connection header existed
$found = "false"
replace(/^(connection\:\s*)[^\r\n]*/i) {
  $found = "true"
  set("$1close")
}
match($found, "false") {
  append("\r\nConnection: close")
}

# Get via header (Before we add it)
replace(/^via\:\s*([^\r\n]*)/i) {
  export("via", $1)
}

# Get the cookie header
replace(/^cookie\:\s*([^\r\n]*)/i) {
  export("cookie", $1)
}

# Add or fix the via header as specified in the spec:
# http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.45
$fixed_via = "false"
replace(/^(via\:[^\r\n]*)/i) {
  $fixed_via = "true"
  # this block is the equivalent of ruby's 'strip' method
  $1 {
    replace(/^\s+/, "")
    replace(/\s+$/, "")
  }
  set("$1")
  append(", 1.0 moovweb")
}
match($fixed_via, "false") {
  append("\r\nVia: 1.0 moovweb")
}

# Get the host name before and after the rewrite
replace(/^((host)\:\s*)([^\r\n]*)/i) {
  $header = $1
  $value = $3

  # Export the downstream request host
  export("host", $3)

  # Rewrite the request host
  $value { {{range .Rewriter.Host}} {{if .Replacement}}
    $replacement = "{{.Replacement}}"
    $replacement {
      replace("$secure", $secure)
    }
    replace(regexp("{{.Matcher}}"), $replacement)
    {{else}}
    replace(regexp("{{.Matcher}}"), "{{.Replacement}}"){{end}}{{end}}
  }
  set(concat($header, $value))

  # Export the upstream request host
  export("source_host", $value)
}

# Rewrite the origin and referrer hosts
replace(/^((origin|referer)\:\s*)([^\r\n]*)/i) {
  $header = $1
  $value = $3

  # Rewrite the request host
  $value { {{range .Rewriter.Host}} {{if .Replacement}}
    $replacement = "{{.Replacement}}"
    $replacement {
      replace("$secure", $secure)
    }
    replace(regexp("{{.Matcher}}"), $replacement)
    {{else}}
    replace(regexp("{{.Matcher}}"), "{{.Replacement}}"){{end}}{{end}}
  }
  set(concat($header, $value))
}

match($accept_encoding, "") {
  $accept_encoding = "none"
}

# Only allow gzip and deflate compression
replace(/^(accept-encoding\:\s*)[^\r\n]*/i, concat("\\1", $accept_encoding))

# Remove any request header that begins with 'X-Moov-'
replace(/\s+^x\-moov\-[^\r\n]*/i, "")

# Remove the X-Varnish request header
replace(/\s+^x\-varnish[^\r\n]*/i, "")

# Remove any 'X-Moov-' query parameters
replace(/(\?|&)?x\-moov\-[^\s\r\n\&]+(\&)?/i) {
  match($2) {
    with("") {
      set("")
    }
    else() {
      set($1)
    }
  }
}
