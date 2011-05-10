

require 'yaml'
require 'minitest/unit'
require_relative '../../../lib/tritium/engines/reference/engine'
require_relative 'engine_tests'

class ReferenceEngineTest < MiniTest::Unit::TestCase
  include EngineTests
  
  def engine_class
    Reference
  end
end