require 'minitest/autorun'
require_relative '../../lib/tritium/parser/macro_expander'

class MacroTest < MiniTest::Unit::TestCase
  include Tritium::Parser
  
  def setup
    @expander = MacroExpander.new
    test_returning_macro = Macro.build_macro_from_string("log('a')\nconcat('wor', 'ked') { yield() }", "test", 0)
    @expander.register_macro(test_returning_macro)
  end
  
  def parse_script(script)
    Parser.new(script, 
               :expander => @expander).parse
  end
  
  def test_positionals
    macro = @expander.macros[[:insert_top, 1]]
    assert_equal %|insert_at("top", "hi") {\n  yield()\n}|, macro.expand("hi")
  end
  
  def test_arg_settings
    ins = parse_script("set(test())")
    set = ins.statements.first
    macro = set.pos_args.first
    log, concat = macro.statements
    assert !log.is_arg?
    assert concat.is_arg?
  end
  
  def test_is_macro?
    assert  @expander.is_macro?([:var, 2])
    assert !@expander.is_macro?([:var, 1])
    assert @expander.is_macro?([:insert_top, 2])
  end
end