$use_global_replace_vars = "true"
#       !!! WARNING THIS FILE IS GENERATED AND PROJECT SPECIFIC !!!
#
# This script inspects the response header for relevant headers. The resulting
# exports from the request.ts script should be present in this scripts
# enviroment.
#
# Inputs:
#  * The raw http response header (without the \r\n\r\n separator)
#  * The result from request.ts
# Exports:
#   Passthrough:
#     * asset_host
#     * path
#     * host
#     * source_host
#     * user_agent
#     * secure
#     * cookie
#   Headers:
#     * content_encoding - The compression method used on the body
#     * content_type - The type of content in the body
#     * location - Redirect destination
#   Other:
#     * status - The http response status code (200, 304, etc)

# Export passthrough variables
export("asset_host", $asset_host)
export("path", $path)
export("host", $host)
export("source_host", $source_host)
export("user_agent", $user_agent)
export("secure", $secure)
export("cookie", $cookie)

# Get the HTTP response status code
replace(/\A[^\r\n]+\s+(\d{3})/) {
    export("status", $1)
}

# Get the compression method
replace(/^content\-encoding\:\s+([^\r\n]*)/i) {
    export("content_encoding", $1)
}

# Get the body content type
replace(/^content\-type\:\s+([^\r\n]*)/i) {
    export("content_type", $1)
}

# Get the redirect location header
replace(/^location\:\s+([^\r\n]*)/i) {
    export("Location", $1)
}

replace(/([a-zA-Z0-9\-]*): ([^\r\n]*)/) {
    $key = downcase($1)
    $key {
        replace("-", "_")
    }
    $value = $2

    export($key, $value)
}
