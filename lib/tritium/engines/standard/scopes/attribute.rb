module Tritium
  module Engines
    class Standard < Base
      module AttributeFunctions
        def attribute_invocation(ins, ctx, pos_args, kwd_args)
          #case ins.name
          #else
            throw "Method #{ins.name} not implemented in Attribute scope"
          #end
        end
      end
    end
  end
end