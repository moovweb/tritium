## Generated from instruction.proto for tritium
require "beefcake"


class Instruction
  include Beefcake::Message

  module InstructionType
    BLOCK = 0
    FUNCTION_CALL = 1
    IMPORT = 2
    TEXT = 3
    LOCAL_VAR = 4
  end

  required :type, Instruction::InstructionType, 1
  optional :value, :string, 2
  optional :object_id, :int32, 3
  repeated :children, Instruction, 4
  repeated :arguments, Instruction, 5
  optional :function_id, :int32, 6
  optional :line_number, :int32, 7

end
