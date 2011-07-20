

require 'yaml'
require 'minitest/autorun'
require_relative '../../lib/tritium/engines/legacy/reference/engine'
require_relative 'engine_tests'

class ReferenceEngineTest < MiniTest::Unit::TestCase
  include EngineTests
  
  def engine_class
    Reference
  end
end