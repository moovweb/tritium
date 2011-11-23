## Generated from tritium.proto for tritium
require "beefcake"


class Transform
  include Beefcake::Message


  class Script
    include Beefcake::Message


    class Instruction
      include Beefcake::Message

      module Type
        BLOCK = 0
        FUNCTION_CALL = 1
        IMPORT = 2
        STRING = 3
        REGEXP = 4
      end
      module Function
        VAR = 1
        SET = 2
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
        INSERT_AT = 18
        INJECT_AT = 19
        CLEAR = 20
        REMOVE = 21
        XML = 22
        HTML = 23
        HTML_FRAGMENT = 24
        LOG = 25
        DEBUG = 26
        EXPORT = 27
        REGEX = 28
        FETCH = 29
        INNER = 30
        TEXT = 31
        CDATA = 32
        WRAP_TEXT_CHILDREN = 33
      end
      module Position
        BEFORE = 0
        AFTER = 1
        TOP = 2
        BOTTOM = 3
      end

      required :type, Transform::Script::Instruction::Type, 1
      optional :value, :string, 2
      optional :import_index, :int32, 3
      repeated :children, Transform::Script::Instruction, 4
      repeated :arguments, Transform::Script::Instruction, 5
      optional :function, Transform::Script::Instruction::Function, 6
      optional :position, Transform::Script::Instruction::Position, 7

    end

    optional :name, :string, 1, :default => "main"
    optional :root, Transform::Script::Instruction, 2

  end

  repeated :scripts, Transform::Script, 1

end
