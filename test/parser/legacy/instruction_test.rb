

require 'minitest/autorun'
require 'yaml'
require_relative '../../../lib/tritium/parser/legacy/reader_instruction'

class ReaderInstructionTest < MiniTest::Unit::TestCase
  include Tritium::Parser
  
  def test_parent
    root = ReaderInstruction.root
    doc = root.add("doc", :args => ["html"])
    child = doc.add("select", :args => ["body"])
    grand_child = child.add("attribute", :args => "xml:lang")
    node_matcher = child.add("match", :args => ["hello", "h"])
    attribute_matcher = grand_child.add("match", :args => ["hello", "h"])

    assert_equal nil, root.parent
    assert_equal "Text", root.opens
    assert_equal "XMLNode", doc.opens
    assert_equal 1, doc.children.size
    assert_equal root, doc.parent
    assert_equal doc, child.parent
    assert_equal true, root.root?
    assert_equal false, child.root?
    assert_equal root, child.root
    assert_equal 2, child.children.size
    assert_equal child, grand_child.parent
    assert_equal root, grand_child.root
    
    # If an instruction has no 'opens' specified, then it inherits from its parent
    assert_equal "XMLNode", node_matcher.opens
    assert_equal "Attribute", grand_child.opens
    assert_equal "Attribute", attribute_matcher.opens
  end
  
  def test_bad_method_name
    root = ReaderInstruction.root
    begin
      child = root.add("nomethod")
      assert false
    rescue Tritium::Parser::ReaderInstruction::Invalid
      assert true
    end
  end
end