## Generated from package.proto for tritium
require "beefcake"


class Type
  include Beefcake::Message


  optional :name, :string, 1
  optional :implements, :int32, 2

end

class Package
  include Beefcake::Message


  required :name, :string, 1
  repeated :functions, Function, 2
  repeated :types, Type, 3
  repeated :dependent_package_names, :string, 4

end
