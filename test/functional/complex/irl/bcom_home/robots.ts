# Disable indexing on this site to avoid reducing the page ranking of the desktop site
match($path, /robots\.txt/) {
  set("User-agent: *\nDisallow: /")
  export("Content-Type", "text/plain")
  export("Cache-Time", "3600")
}
