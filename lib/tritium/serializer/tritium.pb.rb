## Generated from tritium.proto for tritium
require "beefcake"


class Object
  include Beefcake::Message


  optional :name, :string, 1, :default => "main"
  optional :root, Instruction, 2
  optional :scope_type_id, :int32, 3

end

class Executable
  include Beefcake::Message


  repeated :objects, Object, 1
  required :pkg, Package, 2

end

class BlitzSlug
  include Beefcake::Message


  repeated :transformers, Executable, 1

end
