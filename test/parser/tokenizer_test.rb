

require 'minitest/autorun'
require_relative '../../lib/parser/tokenizer'

class TokenizerTest < MiniTest::Unit::TestCase
  include Tritium::Parser
  def test_basic_script
    tokenizer = Tokenizer.new(File.join(File.dirname(__FILE__), "scripts/basic.ts"))
  end
end