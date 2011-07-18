
require 'minitest/autorun'
require_relative '../../lib/tritium/engines/standard/engine'
#require_relative 'engine_tests'

class StandardEngineTest < MiniTest::Unit::TestCase
  include Tritium::Engines

  def test_no_script
    engine = Standard.new("")
    input = "hi"
    result = engine.run("hi")
    assert_equal input, result
  end
  
  def test_simple_set
    engine = Standard.new("set('hi')")
    result = engine.run("world")
    assert_equal "hi", result
  end
end