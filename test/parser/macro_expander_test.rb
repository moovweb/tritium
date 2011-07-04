require 'minitest/autorun'
require_relative '../../lib/tritium/parser/macro_expander'

class MacroTest < MiniTest::Unit::TestCase
  include Tritium::Parser
  
  def setup
    @expander = MacroExpander.new
  end
  
  def test_is_macro?
    assert  @expander.is_macro?([:var, 2])
    assert !@expander.is_macro?([:var, 1])
  end
end