## Generated from object.proto for tritium
require "beefcake"


class ScriptObject
  include Beefcake::Message


  optional :name, :string, 1, :default => "main"
  optional :root, Instruction, 2
  repeated :functions, Function, 3
  optional :scope_type_id, :int32, 4
  optional :linked, :bool, 5

end
