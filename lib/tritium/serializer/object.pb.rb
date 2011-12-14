## Generated from object.proto for tritium
require "beefcake"


class Object
  include Beefcake::Message


  optional :name, :string, 1, :default => "main"
  optional :root, Instruction, 2
  optional :scope_type_id, :int32, 3

end
