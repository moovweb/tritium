require 'minitest/autorun'
require_relative '../lib/tritium/config'
require_relative '../lib/tritium/serializer'
require 'tempfile'

class ScriptToObjectTest < MiniTest::Unit::TestCase
  
  def test_simple_var_script
    obj = compile_script("var('a')")
    #puts obj.inspect
    assert obj.name.size > 0, :message => "Must have a filename set"
    assert_equal ::Instruction, obj.root.class
    root = obj.root
    assert_equal ::Instruction::InstructionType::BLOCK, root.type
    assert_equal nil, root.value
    assert_equal 1, root.children.size
    var_call = root.children.first
    assert_equal ::Instruction::InstructionType::FUNCTION_CALL, var_call.type
    assert_equal "var", var_call.value
    assert_equal nil, var_call.children
    
    literal = var_call.arguments.first
    assert_equal ::Instruction::InstructionType::TEXT, literal.type
    assert_equal "a", literal.value

  end
  
  # ============ Helper methods ===============
  
  def bin
    File.absolute_path(File.join(File.dirname(__FILE__), "../bin/ts2to"))
  end
  
  # Creates a tmp folder and actually compiles the ts file into a marshalled
  # stream that comes back
  def compile_script_to_io(script_string, filename = "main")
    script = Tempfile.new([filename, ".ts"])
    output = Tempfile.new("output_#{filename}")
    File.open(script.path, "w") { |f| f.write(script_string) }
    cmd = "#{bin} #{script.path} #{output.path}"
    #puts cmd.inspect
    `#{cmd}`
    open(output.path).read
  end
  
  def compile_script(script_string, filename = "main")
    obj_stream = compile_script_to_io(script_string, filename)
    ::ScriptObject.decode(obj_stream)
  end
end