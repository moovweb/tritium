

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
    tokens.each do |token|
      assert token.lexeme != :ERROR, token.to_s
    end
    # tokens.each { |token| puts token }
  end
  
  def test_invalid_script
    tokenizer = get_tokenizer("invalid.ts")
    tokens = tokenizer.to_a
    assert(tokens[1].lexeme == :ERROR)
    # tokens.each { |token| puts token }
  end
  
  Dir.glob(File.join(File.dirname(__FILE__), "../functional/scripts/*.ts")).each do |script_file|
    name = script_file.split("/").last.split(".").first
    eval "def test_tokenizing_#{name}_script; run_script_tests('#{script_file}'); end"
  end
  
  def run_script_tests(script_file)
    script_string = File.open(script_file).read
    tokenizer = Tokenizer.new(script_string, :filename => script_file)
    tokens = tokenizer.to_a
    tokens.each do |token|
      assert token.lexeme != :ERROR, token.to_s
    end
  end

  def test_false_negatives_script
    tokenizer = get_tokenizer("false-negatives.ts")
    tokens = tokenizer.to_a
    tokens.each do |token|
      assert token.lexeme != :ERROR, token.to_s
    end
    # tokens.each { |token| puts token }
  end
end
