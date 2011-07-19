module Tritium
  module Engines
    class Standard < Base
      module AttributeFunctions
        def attribute_invocation(ins, ctx, pos_args, kwd_args)
          case ins.name
          when :value
            val = Context[ins, ctx.value.value]
            run_children(ins, val)
            ctx.value.value = val.value
          when :name
            val = Context[ins, ctx.value.name]
            run_children(ins, val)
            ctx.value.name = val.value
          when :remove
            ctx.value.remove
          else
            throw "Method #{ins.name} not implemented in Attribute scope"
          end
        end
      end
    end
  end
end