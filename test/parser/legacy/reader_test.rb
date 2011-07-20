

require 'minitest/autorun'
require 'yaml'
require_relative '../../../lib/tritium/parser/legacy/reader'
require_relative '../../../lib/tritium/parser/legacy/preprocess'

class ReaderTest < MiniTest::Unit::TestCase
  include Tritium::Parser
  
  def setup
    @reader = Reader.new
  end
  
  def test_blank_script
    output = @reader._read("")
    assert_equal 0, output.children.size
    assert_equal nil, output.parent
  end
  
  def test_single_instruction
    root = @reader._read("html() { select('hi') }")
    output = root.children.first

    assert_equal 1, output.children.size
    assert_equal true, root.root?
    assert_equal false, output.root?
    assert_equal 'select', output.children.first.name
    assert_equal 0, output.children.first.children.size
  end
  
  def test_one_scope
    root = @reader._read("html() { select('./shit') { inner('hello') { clear() }; remove() } }")
    output = root.children.first
    
    assert_equal 1, output.children.size
    assert_equal 'select', output.children.first.name
    
    select = output.children.first
    
    assert_equal "XMLNode", select.scope.name
    assert_equal 2, select.children.size
    assert_equal 1, select.args.size
    assert_equal './shit', select.args.first
    
    html = select.children.first
    
    assert_equal 1, html.children.size
    assert_equal 'inner', html.name
    assert_equal ['hello'], html.args
    assert_equal "Text", html.scope.name
    
    # Remove should inherit the parent's scope
    html_remove = html.children.last
    assert_equal html.scope, html_remove.scope
    assert_equal 'clear', html_remove.name
    
    remove = select.children.last
    
    assert_equal 'remove', remove.name
    assert_equal [], remove.args
    assert_equal [], remove.children
    assert_equal remove.root, root
    assert_equal "XMLNode", remove.scope.name
  end
  
  def test_debug_lines
    script = preprocess("\n\nhtml() { \n$('./shit') { \inner($hi)\n } }")
    output = @reader._read(script)
    doc = output.children.first
    select = doc.children.first
    #assert_equal 4, select.line_number
    #assert_equal "main.ts", select.script_name
    assert_equal "select", select.name
    #assert_equal "$('./shit') {", select.line.strip
    #assert_equal "select('./shit') {", select.processed_line.strip
    
    html = select.children.last
    assert_equal 'inner', html.name
    #assert_equal "inner($hi)", html.line.strip
    #assert_equal "inner(var('hi'))", html.processed_line.strip
  end
  
  def test_import_folders
    script = preprocess("\n\nhtml() { \n$('./shit') { \n@import scripts/import.ts } }")
    assert script.include?("move_to")
  end
  
  def test_comment_lines
    script = preprocess("   \#$('comment')")
    assert !script.include?("select")
    eval(script)
  end
  
  
  def test_to_script_args
    root = @reader._read("html() { select(fetch('a')) }")
    assert_equal "script() {  \n  html() {  \n    select(fetch(\"a\"))\n  }\n}\n", root.to_script
  end
  
  def preprocess(line)
    Parser.new(line, :path => File.join(File.dirname(__FILE__), "../../functional/v2"), :filename => "main.ts").parse.to_s
  end
  
end
