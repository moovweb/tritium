module Tritium
  module Engines
    class Standard < Base
      module BaseFunctions
        def base_invocation(ins, args, kwds)
          case ins.name
          when :var
            @env[args.first]
          else
            throw "Method #{ins.name} not implemented in Base scope"
          end
        end
      end
    end
  end
end