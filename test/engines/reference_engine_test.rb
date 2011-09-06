

require 'yaml'
require 'minitest/autorun'
require_relative '../../lib/tritium/engines/legacy/reference/engine'
require_relative '../../lib/tritium/engine_tests'

class ReferenceEngineTest < MiniTest::Unit::TestCase
  include Tritium::EngineTests
  
  def engine_class
    Reference
  end
end