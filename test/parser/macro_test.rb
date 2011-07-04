
require 'minitest/autorun'
require_relative '../../lib/tritium/parser/macro'

class MacroTest < MiniTest::Unit::TestCase
  include Tritium::Parser
  
  def load_macro(named)
    Macro.load_file(File.join(Macro.location, "#{named}"))
  end

  def test_simple_macro
    macro = load_macro("var.2.macro")
    result = macro.expand("hi", "mom")
    assert_equal "var(\"hi\") {\n  set(\"mom\")\n}", result
  end
  
  def test_complex_macro
    macro = load_macro("wrap_together.2.macro")
    result = macro.expand(["./home", "./me"])
    assert_equal "$(\"./home[1]\") {\n  wrap(\"./me\") {\n    move_here(\".././home\")\n  }\n}", result
  end
  
  def test_macro_with_keywords
    macro = load_macro("wrap_together.3.macro")
    result = macro.expand(["./home", "./me", {:color => "red"}])
    expected = "$(\"./home[1]\") {\n  wrap(\"./me\", color: \"red\") {\n    move_here(\".././home\")\n  }\n}"
    assert_equal expected, result
  end
  
  def test_piglatin
    macro = load_macro("piglatin.1.rb")
    result = macro.expand(["Hampton Catlin"])
    assert_equal "\"ampton Hay atlin Cay\"", result
  end
end