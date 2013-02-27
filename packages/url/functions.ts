
@func URL.scheme() {
  comp("scheme") {
    yield()
  }
}

@func URL.userinfo() {
  comp("userinfo") {
    yield()
  }
}

@func URL.username() {
  %user = ""
  userinfo() {
    capture(/^([^\:]+)/) { # go up to the colon (or end if it doesn't exist)
      %user {
        set(%1)
      }
    }
    %user {
      yield()
    }
    # write the value of %user back to userinfo
    replace(/^[^\:]+/, %user) # replace up to colon (or end)
  }
  %user # return just the user, not the entire userinfo
}

@func URL.password() {
  %password = ""
  userinfo() {
    capture(/\:(\S+)/) {
      %password {
        set(%1)
      }
    }
    %password {
      yield()
    }
    # write the value of %password back to userinfo
    match(%password) {
      with("") {
        replace(/\:[\S]+/, "") # password is empty, so remove it (w/colon) from userinfo
      } else() {
        match(this()) {
          with(/\:[\S]+$/) {
            replace(/\:[\S]+/, ":"+%password)
          } else() {
            append(":"+%password)
          }
        }
      }
    }
  }
  %password # return just the password, not the entire userinfo
}

@func URL.host() {
  comp("host") {
    yield()
  }
}

@func URL.domain() {
  %domain = ""
  host() {
    capture(/^([^\:]+)/) { # go up to colon or end if it doesn't exist
      %domain {
        set(%1)
      }
    }
    %domain {
      yield()
    }
    # write the value of %domain back to host
    match(%domain) {
      with("") {
        replace(/^[^\:]+/, "") # domain is empty, so remove it (w/out colon) from host
      } else() {
        match(this()) {
          with(/\:/) { # if host has a colon, replace everything before it
            replace(/[\S]+\:/, %domain + ":")
          } else() { # no colon, so just set host to domain
            set(%domain)
          }
        }
      }
    }
  }
  %domain # return just the password, not the entire host
}

@func URL.port() {
  %port = ""
  host() {
    capture(/\:([\S]+)/) {
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
        replace(/\:[\S]+/, "") # port is empty, so remove it (w/colon) from host
      } else() {
        match(this()) {
          with(/\:[\S]+/) {
            replace(/\:[\S]+/, ":"+%port)
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

@func URL.userinfo(Text %val) {
  userinfo() {
    set(%val)
    yield()
  }
}

@func URL.username(Text %val) {
  username() {
    set(%val)
    yield()
  }
}

@func URL.password(Text %val) {
  password() {
    set(%val)
    yield()
  }
}

@func URL.domain(Text %val) {
  domain() {
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
