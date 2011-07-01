
require 'minitest/autorun'
require 'yaml'
require_relative '../../lib/parser/macro'

class MacroTest < MiniTest::Unit::TestCase
  include Tritium::Parser

  def test_var_2
    macro = Macro.load_file(File.join(File.dirname(__FILE__), "../../lib/parser/macros/var.2.macro"))
    puts macro.inspect
  end
end