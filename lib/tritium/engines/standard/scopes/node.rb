module Tritium
  module Engines
    class Standard < Base
      module NodeFunctions
        def node_invocation(ins, ctx, pos_args, kwd_args)
          case ins.name
          when :select
            doc = Context[ins, ctx.value.xpath(pos_args.first)]
            run_children(ins, doc)
          else
            throw "Method #{ins.name} not implemented in Node scope"
          end
        end
      end
    end
  end
end