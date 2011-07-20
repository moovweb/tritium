module Tritium
  module Engines
    class Standard < Base
      class Context
        attr :value, true
        attr :type, true
        
        def self.[](ins, value)
          ctx = Context.new
          ctx.value = value
          ctx.type = ins.opens.name
          ctx
        end
        
        def set(val)
          @value = val
        end
      end
    end
  end
end