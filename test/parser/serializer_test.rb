require 'minitest/autorun'
require_relative '../../lib/tritium'
require_relative '../../lib/tritium/serializer'
ENV["TEST"] = "true"

class ParserTest < MiniTest::Unit::TestCase
  include Tritium::Serializer
  
  def test_object_serializer
    # Make sure this doesn't raise
    Tritium::Serializer.script(File.join(File.dirname(__FILE__), "scripts/simple.ts"))
  end
end