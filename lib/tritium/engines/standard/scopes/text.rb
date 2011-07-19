module Tritium
  module Engines
    class Standard < Base
      module TextFunctions
        def text_invocation(ins, ctx, args, kwds)
          case ins.name
          when :set
            ctx.set(args.first)
          when :html, :xml, :xhtml, :html_fragment
            doc = Context[ins, Tritium::Engines.xml_parsers[ins.name.to_s].parse(ctx.value)]
            run_children(ins, doc)
            ctx.set(doc.value.send("to_#{ins.name}"))
          when :prepend
            ctx.set(args.first + ctx.value)
          when :append
            ctx.set(ctx.value + args.first)
          else
            throw "Unknown method #{ins.name} in Text scope"
          end
        end
      end
    end
  end
end