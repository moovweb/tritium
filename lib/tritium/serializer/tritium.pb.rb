## Generated from tritium.proto for tritium
require "beefcake"


class Transform
  include Beefcake::Message


  repeated :objects, ScriptObject, 1
  required :pkg, Package, 2

end

class Slug
  include Beefcake::Message


  repeated :transformers, Transform, 1

end
