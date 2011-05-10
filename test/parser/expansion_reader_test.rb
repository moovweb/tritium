

require 'minitest/autorun'
require 'yaml'
require_relative '../../../lib/tritium/parser/expansion_reader'
require_relative '../../../lib/tritium/parser/preprocess'

class ExpansionReaderTest < MiniTest::Unit::TestCase
  include Tritium::Parser

  def setup
    @reader = ExpansionReader.new
  end
  
  def test_positions
    output = read("bottom { insert('hi') }")
    assert_equal 'var', output.children.first.name
    assert_equal 'position', output.children.first.args.first
    assert_equal 'position', output.children[1].name
    position_block =  output.children[1]
    assert_equal 'insert', position_block.children.first.name
    
    expected_expansion = read("var('position') { set('bottom') }; position { insert('hi') };")
    assert_equal expected_expansion.to_script, output.to_script
  end
  
  def test_html_expansion
    match_expansions("html('inner')", "html() { set('inner'); }")
  end

  def test_attribute_value_setter
    output = read("attribute('href', '.')")
    unexpected_output = read("attribute('href', 'a')")
    expected_output = read("attribute('href') { value { set('.') } }")
    assert_equal expected_output.to_script, output.to_script
    assert unexpected_output.to_script != output.to_script
    assert_equal expected_output.to_script, output.to_script
  end
  
  def test_name_setter
    match_expansions("name { set('div') }", "name('div')")
  end
  
  def test_insert_tag
    output = read("bottom { insert_tag('a', 'link', href: '/') }")
    expected_output = read("bottom { insert_tag('a') { html { set('link') }; attribute('href') { value { set('/') } } } }")
    assert_equal expected_output.to_script, output.to_script
  end
  
  def insert_tag_no_contents
    output = read("bottom { insert_tag('a', href: '/') { remove } }")
    expected_output = read("bottom { insert_tag('a') { attribute('href') { value { set('/') } }; remove } }")
    assert_equal expected_output.to_script, output.to_script
  end
  
 private
  def match_expansions(expected, input)
    output = read(input)
    expansion = read(expected)
    assert_equal expansion.to_script, output.to_script
  end
  
  def read(input)
    @reader.read("doc { #{input} }").children.first
  end
end