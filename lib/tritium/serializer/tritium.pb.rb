## Generated from tritium.proto for tritium
require "beefcake"


class Executable
  include Beefcake::Message


  repeated :objects, Object, 1
  required :pkg, Package, 2

end

class BlitzSlug
  include Beefcake::Message


  repeated :transformers, Executable, 1

end
