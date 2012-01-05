## Generated from function.proto for tritium
require "beefcake"


class Function
  include Beefcake::Message


  class Argument
    include Beefcake::Message


    optional :type_id, :int32, 1
    optional :type_string, :string, 2
    optional :name, :string, 3

  end

  optional :name, :string, 1
  optional :scope_type_id, :int32, 2
  optional :scope_type, :string, 8
  optional :return_type_id, :int32, 3
  optional :opens_type_id, :int32, 4
  optional :built_in, :bool, 5
  repeated :args, Function::Argument, 6
  optional :instruction, Instruction, 7

end

class FunctionArray
  include Beefcake::Message


  repeated :functions, Function, 1

end
