require 'minitest/autorun'
require_relative '../../lib/tritium/config'

class SpecTest < MiniTest::Unit::TestCase
  def setup
    @spec = Tritium.spec("2")
  end

  def test_scope_loaded
    assert @spec.scopes.keys.include?("Base")
    assert @spec.scopes.keys.include?("Attribute")
    assert @spec["Base"].is_a?(Tritium::Spec::Scope)
  end

  def test_inheritence
    node_scope = @spec["Node"]
    xml_scope  = @spec["XMLNode"]
    # XMLNode *should have more*
    assert node_scope.functions.size < xml_scope.functions.size

    # Every node function should also be inside of the child scope
    node_scope.functions.each do |name, function|
      assert_equal xml_scope[name], function
    end
  end
  
  def test_node_scope
    scope = @spec["XMLNode"]
    assert scope.functions.keys.size > 5
    assert scope["select"].is_a?(Tritium::Spec::Function)
  end
  
  def test_insert_function
    scope = @spec["Node"]
    insert = scope["insert"]
    args = insert.arguments
    assert args.is_a?(Hash)
    assert_equal 3, args.size
    assert_equal false, insert.deprecated
  end
  
  def test_positional
    scope = @spec["Node"]
    assert scope["insert_after"]
  end
  
  def test_arg_ranges
    arg_range_assert "Node", "select", 1..1
    arg_range_assert "Base", "concat", 2..2
    arg_range_assert "Node", "attributes", 1..1
    arg_range_assert "Node", "attribute", 1..2
    arg_range_assert "Base", "fetch", 1..1
  end
  
  def arg_range_assert(scope, function_name, range)
    function = @spec[scope][function_name]
    assert_equal function.arg_size_range, range, "Expected #{range} instead of #{function.arg_size_range} for #{scope}.#{function_name}"
  end
end