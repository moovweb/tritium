->(args) do
  selector, tag, attributes = args
  <<EXPANSION

  $("#{unquote selector}[1]") {
    wrap(#{tag}, #{splice attributes}) {
      move_here("../#{unquote selector}")
    }
  }

  EXPANSION
end