require 'minitest/autorun'
require_relative '../../lib/tritium/parser/macro_expander'

class MacroTest < MiniTest::Unit::TestCase
  include Tritium::Parser
  
  def setup
    @expander = MacroExpander.new
    test_returning_macro = Macro.build_macro_from_string("concat('wor', @1) { yield() }", "test", 1)
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
    ins = parse_script("log(test(test('d')))")
    log = ins.statements.first
    assert_equal :log, log.name
    first_macro = log.pos_args.first
    assert_equal = Instructions::ExpansionInlineBlock, first_macro.class
    concat_first = first_macro.statements.first
    assert_equal true,  concat_first.is_arg?
    
    concat_second = concat_first.args.last
    assert_equal Instructions::NestedInvocation, concat_first.class
    assert_equal true, concat_second.is_arg?
  end
  
  def test_is_macro?
    assert  @expander.is_macro?([:var, 2])
    assert !@expander.is_macro?([:var, 1])
    assert @expander.is_macro?([:insert_top, 2])
  end
end