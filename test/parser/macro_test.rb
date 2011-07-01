
require 'minitest/autorun'
require 'yaml'
require_relative '../../lib/parser/macro'

class MacroTest < MiniTest::Unit::TestCase
  include Tritium::Parser
  
  def load_macro(named)
    Macro.load_file(File.join(File.dirname(__FILE__), "../../lib/parser/macros/#{named}"))
  end

  def test_simple_macro
    macro = load_macro("var.2.macro")
    result = macro.expand("hi", "mom")
    assert_equal "var(\"hi\") {\n  set(\"mom\")\n}", result
  end
  
  def test_rb_macro
    macro = load_macro("wrap_together.2.rb")
    result = macro.expand(["./home", "./me"])
    puts result
  end
end