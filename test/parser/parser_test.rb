require 'minitest/autorun'
require_relative '../../lib/tritium/parser/parser'

class ParserTest < MiniTest::Unit::TestCase
  include Tritium::Parser
  
  # ============== HELPER METHODS =================
  def path
    File.join(File.dirname(__FILE__), "scripts")
  end
  
  def script_path(script_name)
    File.join(path, script_name)
  end
  
  def read_script(script_name)
    File.read(script_path(script_name))
  end
  
  def build_parser(script_name)
    script_string = read_script(script_name)
    parser = Parser.new(script_string, filename: script_name, path: path)
    [script_string, parser, parser.parse]
  end
  
  # ============== TESTS!!!!!!!!! ====================

  def test_parser
    script_string, parser, output = build_parser("false-negatives.ts")
    assert_equal read_script("reference-output.ts"), output.to_s
  end
  
  def test_var_expansion
    script_string, parser, output = build_parser("var.ts")
    assert_equal read_script("var_output.ts"), output.to_s
  end
  
  def test_add_class_expansion
    script_string, parser, output = build_parser("add_class.ts")
    assert_equal read_script("add_class_output.ts"), output.to_s
  end
  
  def test_error_handling
    build_parser("invalid.ts")
    assert false, "Should have failed"
  rescue Exception => e
    assert e.any?
    assert e.size > 2
  end
end
