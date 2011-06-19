require 'minitest/autorun'
require_relative '../../lib/parser/parser'

class ParserTest < MiniTest::Unit::TestCase
  include Tritium::Parser

  def test_parser
    path, name = File.join(File.dirname(__FILE__), "scripts"), "false-negatives.ts"
    script_string = File.read(File.join(path, name))
    parser = Parser.new(script_string, filename: name, path: path)
    output = parser.parse().to_s
    ref = File.read(File.join(path, "/reference-output.ts"))
    puts output
    assert(output == ref)
  end
end
