module Tritium
  module Engines
    class Standard < Base
      module NodeFunctions
        def node_invocation(ins, ctx, pos_args, kwd_args)
          #case ins.name
          #else
            throw "Method #{ins.name} not implemented in Node scope"
          #end
        end
      end
    end
  end
end