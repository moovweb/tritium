require 'minitest/autorun'
require_relative '../../lib/tritium/parser/macro_expander'

class MacroTest < MiniTest::Unit::TestCase
  include Tritium::Parser
  
  def setup
    @expander = MacroExpander.new
  end
  
  def test_positionals
    macro = @expander.macros[[:insert_top, 1]]
    assert_equal %|insert_at("top", "hi") {\n}|, macro.expand("hi")
  end
  
  def test_is_macro?
    assert  @expander.is_macro?([:var, 2])
    assert !@expander.is_macro?([:var, 1])
    assert @expander.is_macro?([:insert_top, 2])
  end
end