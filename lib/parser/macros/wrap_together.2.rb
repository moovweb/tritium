->(selector, tag) do
  <<EXPANSION

  $("#{unquote selector}[1]") {
    wrap(#{tag}) {
      move_here("../#{unquote selector}")
    }
  }

  EXPANSION
end