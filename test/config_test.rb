require 'minitest/autorun'
require_relative '../lib/tritium/config'

class ConfigTest < MiniTest::Unit::TestCase

  def test_functional_location
    assert File.exists?(Tritium.functional_test_location), "can't find functional tests"
  end
end