

require 'minitest/autorun'
require 'yaml'
require_relative '../../../lib/tritium/parser/legacy/expansion_reader'
require_relative '../../../lib/tritium/parser/legacy/preprocess'

class ExpansionReaderTest < MiniTest::Unit::TestCase
  include Tritium::Parser

  def setup
    @reader = ExpansionReader.new(Logger.new(nil))
  end

  def test_non_returning_arg
    output = read('text(select("html"))')
    assert(false)
  rescue ReaderInstruction::Invalid
    assert(true)
  end

 private
  def match_expansions(expected, input)
    output = read(input)
    expansion = read(expected)
    assert_equal expansion.to_script, output.to_script
  end
  
  def read(input)
    @reader._read("doc { #{input} }").children.first
  end
end