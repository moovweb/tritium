
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

@func URL.path() {
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

@func URL.path(Text %val) {
  path() {
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
