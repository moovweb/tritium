->(selector, tag, attributes) do
  <<EXPANSION

  $("#{unquote selector}[1]") {
    wrap(#{tag}, #{splice attributes}) {
      move_here("../#{unquote selector}")
    }
  }

  EXPANSION
end