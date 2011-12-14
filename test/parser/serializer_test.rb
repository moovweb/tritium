require 'minitest/autorun'
require_relative '../../lib/tritium'
require_relative '../../lib/tritium/serializer'
ENV["TEST"] = "true"

class ParserTest < MiniTest::Unit::TestCase
  include Tritium::Parser
  
  def test_run
    assert true
  end
end