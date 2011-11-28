module Tritium
  module Engine
    class Standard < Base
      class Context
        attr :index, true
        attr :value, true
        attr :type, true
        
        def self.[](ins, value)
          ctx = Context.new
          ctx.value = value
          ctx.type = ins.opens.name
          ctx.index = nil
          ctx
        end
        
        def set(val)
          @value = val
        end
      end
    end
  end
end