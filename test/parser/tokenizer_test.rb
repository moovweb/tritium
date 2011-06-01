

require 'minitest/autorun'
require_relative '../../lib/parser/tokenizer'

class TokenizerTest < MiniTest::Unit::TestCase
  include Tritium::Parser

  def get_tokenizer(filename)
    fullname = File.join(File.dirname(__FILE__), "scripts/" + filename)
    script_string = IO.read(fullname)
    Tokenizer.new(script_string, :filename => filename)
  end
  
  def test_basic_script
    tokenizer = get_tokenizer("basic.ts")
    tokens = tokenizer.to_a
    # tokens.each { |token| puts token }
  end
  
  def test_invalid_script
    tokenizer = get_tokenizer("invalid.ts")
    tokens = tokenizer.to_a
    assert(tokens[1] === nil)
    # tokens.each { |token| puts token }
  end

  def test_false_negatives_script
    tokenizer = get_tokenizer("false-negatives.ts")
    tokens = tokenizer.to_a
    # tokens.each { |token| puts token }
  end
end
