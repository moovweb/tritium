

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
    output = @reader.read("")
    assert_equal 0, output.children.size
    assert_equal nil, output.parent
  end
  
  def test_single_instruction
    root = @reader.read("doc { select('hi') }")
    output = root.children.first

    assert_equal 1, output.children.size
    assert_equal true, root.root?
    assert_equal false, output.root?
    assert_equal 'select', output.children.first.name
    assert_equal 0, output.children.first.children.size
  end
  
  def test_one_scope
    root = @reader.read("doc { select('./shit') { html('hello') { remove }; remove } }")
    output = root.children.first
    
    assert_equal 1, output.children.size
    assert_equal 'select', output.children.first.name
    
    select = output.children.first
    
    assert_equal "XMLNode", select.scope
    assert_equal 2, select.children.size
    assert_equal 1, select.args.size
    assert_equal './shit', select.args.first
    
    html = select.children.first
    
    assert_equal 1, html.children.size
    assert_equal 'html', html.name
    assert_equal ['hello'], html.args
    assert_equal "Text", html.scope
    
    # Remove should inherit the parent's scope
    html_remove = html.children.last
    assert_equal html.scope, html_remove.scope
    assert_equal 'remove', html_remove.name
    
    remove = select.children.last
    
    assert_equal 'remove', remove.name
    assert_equal [], remove.args
    assert_equal [], remove.children
    assert_equal remove.root, root
    assert_equal "XMLNode", remove.scope
  end
  
  def test_debug_lines
    script = preprocess("\n\ndoc('html') { \n$('./shit') { \nhtml($hi)\n } }")
    output = @reader.read(script)
    doc = output.children.first
    select = doc.children.first
    assert_equal 4, select.line_number
    assert_equal "main.ts", select.script_name
    assert_equal "select", select.name
    assert_equal "$('./shit') {", select.line.strip
    assert_equal "select('./shit') {", select.processed_line.strip
    
    html = select.children.last
    assert_equal 'html', html.name
    assert_equal "html($hi)", html.line.strip
    assert_equal "html(var('hi'))", html.processed_line.strip
  end
  
  def test_match_debug
    script = preprocess("match($first, /o/)")
    output = @reader.read(script)
    match = output.children.first
    assert_equal "match(var('first'), /o/)", match.processed_line.strip
  end
  
  def test_import_folders
    script = preprocess("\n\ndoc('html') { \n$('./shit') { \n@import scripts/import.ts } }")
    assert script.include?("move_to")
  end
  
  def test_comment_lines
    script = preprocess("   \#$('comment')")
    assert !script.include?("select")
    eval(script)
  end
  
  def test_repeated_match_failure
    script = Preprocess.run(File.read(File.join(File.dirname(__FILE__), "../../functional/v1/scripts/variables.ts")), "", "main.ts")
    output = @reader.read("#{script}").children.first
    match = output.children.last
    assert_equal "match($first, \"worked\") {", match.line.strip
    assert_equal "match(var('first'), \"worked\") {", match.processed_line.strip
  end
  
  def test_to_script_args
    root = @reader.read("doc('html') { select(fetch('a')) }")
    assert_equal "script() {  \n  doc(\"html\") {  \n    select(fetch(\"a\"))\n  }\n}\n", root.to_script
  end
  
  def preprocess(line)
    Preprocess.run(line, File.join(File.dirname(__FILE__), "../../functional/v1"), "main.ts")
  end
  
end
