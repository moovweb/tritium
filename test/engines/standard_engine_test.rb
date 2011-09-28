#ENV["SCRIPT"] = "fetch"

require 'minitest/autorun'
require_relative '../../lib/tritium/engines/standard/engine'
require_relative '../../lib/tritium/engine_tests'

class StandardEngineTest < MiniTest::Unit::TestCase
  include Tritium::Engines
  include Tritium::EngineTests
  
  def engine_class
    Standard
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