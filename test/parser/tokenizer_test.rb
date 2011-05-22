

require 'minitest/autorun'
require_relative '../../lib/parser/tokenizer'

class TokenizerTest < MiniTest::Unit::TestCase
  include Tritium::Parser
  def get_tokenizer(file)
    Tokenizer.new(File.join(File.dirname(__FILE__), "scripts/" + file))
  end
  
  def test_basic_script
    tokenizer = get_tokenizer("basic.ts")
    tokens = tokenizer.to_a
    tokens.each { |token| puts token }
  end
  
  def test_invalid_script
    tokenizer = get_tokenizer("invalid.ts")
    tokens = tokenizer.to_a
    assert_equal tokens[1].class, Error
  end

  def test_false_negatives_script
    tokenizer = get_tokenizer("false-negatives.ts")
    tokens = tokenizer.to_a
    tokens.each { |token| puts token }
  end
end
