## Generated from function.proto for tritium
require "beefcake"


class Function
  include Beefcake::Message


  class Argument
    include Beefcake::Message


    optional :type_id, :int32, 1

  end

  optional :name, :string, 1
  optional :type_id, :int32, 2
  optional :return_type_id, :int32, 3
  optional :opens_type_id, :int32, 4
  optional :built_in, :bool, 5
  repeated :args, Function::Argument, 6
  optional :instruction, Instruction, 7

end
