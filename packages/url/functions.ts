
@func URL.scheme() {
  comp("scheme") {
    yield()
  }
}

@func URL.host() {
  comp("host") {
    yield()
  }
}

@func URL.port() {
  %port = ""
  host() {
    capture(/\:([\d]+)$/) {
      %port {
        set(%1)
      }
    }
    %port {
      yield()
    }
    # write the value of %port back to the host
    match(%port) {
      with("") {
        replace(/\:[\d]+$/, "") # port is empty, so remove it (w/colon) from h
      } else() {
        match(this()) {
          with(/\:[\d]+$/) {
            replace(/\:[\d]+$/, ":"+%port)
          } else() {
            append(":"+%port)
          }
        }
      }
    }
  }
  %port # return just the port, not the entire host
}

@func URL.pat() {
  comp("path") {
    yield()
  }
}

@func URL.fragment() {
  comp("fragment") {
    yield()
  }
}

@func URL.scheme(Text %val) {
  scheme() {
    set(%val)
    yield()
  }
}

@func URL.host(Text %val) {
  host() {
    set(%val)
    yield()
  }
}

@func URL.port(Text %val) {
  port() {
    set(%val)
    yield()
  }
}

@func URL.pat(Text %val) {
  pat() {
    set(%val)
    yield()
  }
}

@func URL.fragment(Text %val) {
  fragment() {
    set(%val)
    yield()
  }
}

@func URL.param(Text %key, Text %val) {
  param(%key) {
    set(%val)
    yield()
  }
}
