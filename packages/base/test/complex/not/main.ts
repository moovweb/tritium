match("hi") {
  with("hi") {
    set("wo")
  }
}
match("hi") {
  not("hi") {
    append("failed")
  }
}
match("ho") {
  not("h") {
    append("rked")
  }
}