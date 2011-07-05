require 'minitest/autorun'
require_relative '../../lib/tritium/spec/spec'

class SpecTest < MiniTest::Unit::TestCase
  def setup
    @spec = Tritium.spec
  end

  def test_load
    @spec.scopes
  end
end