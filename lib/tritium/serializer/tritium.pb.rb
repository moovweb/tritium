## Generated from tritium.proto for tritium
require "beefcake"


class Script
  include Beefcake::Message


  class Instruction
    include Beefcake::Message

    module Type
      BLOCK = 0
      INVOCATION = 1
      IMPORT = 2
      STRING = 3
      REGEXP = 4
    end
    module Function
      VAR = 0
      SET = 1
      REMOVE = 2
      SELECT = 3
      CONCAT = 4
      APPEND = 5
      PREPEND = 6
      MATCH = 7
      WITH = 8
      NOT = 9
      MOVE = 10
      DUP = 11
      INDEX = 12
      NODE = 13
      ATTRIBUTE = 14
      VALUE = 15
      NAME = 16
      REPLACE = 17
      CONTENT = 18
      INSERT_AT = 19
      INJECT_AT = 20
      INNER = 21
      TEXT = 22
    end

    optional :name, :string, 1
    repeated :children, Script::Instruction, 2
    repeated :arguments, Script::Instruction, 3
    required :type, Script::Instruction::Type, 4
    optional :line_number, :int32, 5
    optional :filename, :string, 6
    optional :invocation_name, Script::Instruction::Function, 7

  end

  optional :name, :string, 1, :default => "main"
  optional :root, Script::Instruction, 2
  optional :has_imports, :bool, 3

end
