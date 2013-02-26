
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
    capture(/^(\w+)/) {
      %user {
        set(%1)
      }
    }
    %user {
      yield()
    }
    # write the value of %user back to userinfo
    match(%user) {
      with("") {
        replace(/^\w+/, "") # user is empty, so remove it (w/colon) from userinfo
      } else() {
        match(this()) {
          replace(/^\w+/, %user)
        }
      }
    }
  }
  %user # return just the user, not the entire userinfo
}

@func URL.password() {
  %password = ""
  userinfo() {
    capture(/\:(\w+)/) {
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
        replace(/\:[\w]+$/, "") # password is empty, so remove it (w/colon) from userinfo
      } else() {
        match(this()) {
          with(/\:[\w]+$/) {
            replace(/\:[\w]+$/, ":"+%password)
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
        replace(/\:[\d]+$/, "") # port is empty, so remove it (w/colon) from host
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
