require 'minitest/autorun'
require_relative '../../lib/tritium/spec/spec'

class SpecTest < MiniTest::Unit::TestCase
  def setup
    @spec = Tritium.spec
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
  
  def test_deprecated
    scope = @spec["Node"]
    bottom = scope["bottom"]
    assert bottom.deprecated.is_a?(String)
  end
end