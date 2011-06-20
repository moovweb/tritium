module Tritium::Parser
  def unquote(node)
    if Literal === node then
      val = eval(node.to_s)
      return Regexp === val ? val.inspect : val
    else
      return node.to_s
    end
  end

  def splice(hash)
    result = ""
    node.each { |k,v| result << ", #{k}: #{v}" }
    result[0,2] = ""
    return result
  end

  class MacroExpander

    @@macros[[:value, 1]] = ->(val) {
<<EXPANSION

value() {
  set(#{val})
}

EXPANSION
    }

    @@macros[[:attribute, 2]] = ->(name, val) {
<<EXPANSION

attribute(#{name}) {
  value() {
    set(#{val})
  }
}

EXPANSION
    }

    @@macros[[:var, 2]] = ->(name, val) {
<<EXPANSION

var(#{name}) {
  set(#{val})
}

EXPANSION
    }
    
    @@macros[[:wrap_together, 2]] = ->(selector, tag, attributes) {
<<EXPANSION

$("#{unquote selector}[1]") {
  wrap(#{tag}, #{splice attributes}) {
    move_here("../#{unquote tag}")
  }
}

EXPANSION
    }

    @@macros[[:unwrap, 1]] = ->(selector) {
      <<EXPANSION

$(#{selector}) {
  move_here("*", "before")
}

EXPANSION
    }

    
