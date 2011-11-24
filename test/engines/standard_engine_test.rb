#ENV["SCRIPT"] = "fetch"

require 'minitest/autorun'
require_relative '../../lib/tritium/engine/standard/engine'
require_relative '../../lib/tritium/engine/test'

class StandardEngineTest < MiniTest::Unit::TestCase
  include Tritium::Engine
  include Tritium::Engine::Test::Gauntlet
  
  def engine_class
    Tritium::Engine::Standard
  end

  if ENV["SCRIPT"].nil?
    def test_no_script
      engine = Standard.new("")
      input = "hi"
      result, export_vars = engine.run("hi")
      assert_equal input, result
    end
  
    def test_simple_set
      engine = Standard.new("set('hi')")
      result, export_vars = engine.run("world")
      assert_equal "hi", result
    end
  
    def test_html_parsing
      engine = Standard.new("html()")
      result, export_vars = engine.run("")
      expected = "<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\" \"http://www.w3.org/TR/REC-html40/loose.dtd\">\n\n"
      assert_equal expected, result
    end
  end
end