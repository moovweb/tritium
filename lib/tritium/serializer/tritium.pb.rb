## Generated from tritium.proto for tb
require "beefcake"


class Transform
  include Beefcake::Message

  module Scope
    TEXT_SCOPE = 0
    NODE_SCOPE = 1
    ATTRIBUTE_SCOPE = 2
    XMLNODE_SCOPE = 3
  end
  module InstructionType
    BLOCK = 0
    FUNCTION_CALL = 1
    IMPORT = 2
    TEXT = 3
    REGEXP = 4
  end
  module Function
    VAR_FUNC = 1
    SET_FUNC = 2
    SELECT_FUNC = 3
    CONCAT_FUNC = 4
    APPEND_FUNC = 5
    PREPEND_FUNC = 6
    MATCH_FUNC = 7
    WITH_FUNC = 8
    NOT_FUNC = 9
    MOVE_FUNC = 10
    DUP_FUNC = 11
    INDEX_FUNC = 12
    NODE_FUNC = 13
    ATTRIBUTE_FUNC = 14
    VALUE_FUNC = 15
    NAME_FUNC = 16
    INSERT_AT_FUNC = 18
    INJECT_AT_FUNC = 19
    CLEAR_FUNC = 20
    REMOVE_FUNC = 21
    XML_FUNC = 22
    HTML_FUNC = 23
    HTML_FRAGMENT_FUNC = 24
    LOG_FUNC = 25
    DEBUG_FUNC = 26
    EXPORT_FUNC = 27
    REGEXP_FUNC = 28
    FETCH_FUNC = 29
    INNER_FUNC = 30
    TEXT_FUNC = 31
    CDATA_FUNC = 32
    WRAP_TEXT_CHILDREN_FUNC = 33
    REPLACE_REGEXP_FUNC = 17
    REPLACE_TEXT_FUNC = 34
  end
  module Position
    BEFORE = 0
    AFTER = 1
    TOP = 2
    BOTTOM = 3
  end

  class Script
    include Beefcake::Message


    class Instruction
      include Beefcake::Message


      required :type, Transform::InstructionType, 1
      optional :value, :string, 2
      optional :import_index, :int32, 3
      repeated :children, Transform::Script::Instruction, 4
      repeated :arguments, Transform::Script::Instruction, 5
      optional :function, Transform::Function, 6
      optional :position, Transform::Position, 7

    end

    optional :name, :string, 1, :default => "main"
    optional :root, Transform::Script::Instruction, 2
    optional :scope, Transform::Scope, 3

  end

  repeated :scripts, Transform::Script, 1

end
