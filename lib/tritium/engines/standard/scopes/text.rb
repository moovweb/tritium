module Tritium
  module Engines
    class Standard < Base
      module TextFunctions
        def text_invocation(ins, ctx, args, kwds)
          case ins.name
          when :set
            ctx.set(args.first.dup)
          when :html, :xml, :html_fragment
            doc = Tritium::Engines.xml_parsers[ins.name.to_s].parse(ctx.value)
            doc_ctx = Context[ins, doc]
            @node_stack.push doc
            run_children(ins, doc_ctx)
            @node_stack.pop
            ctx.set(doc_ctx.value.send("to_#{ins.name}"))
          when :prepend
            ctx.set(args.first + ctx.value)
          when :append
            ctx.set(ctx.value + args.first)
          when :text
            return ctx.value
          when :replace
            if args.first.is_a?(Regexp)
              ctx.value.gsub!(args.first) do |match|
                $~.captures.each_with_index do |arg, index|
                  @env["#{index + 1}"] = arg
                end
                match_ctx = Context[ins, match]
                run_children(ins, match_ctx)
                match_ctx.value.gsub(/[\$\\]([\d])/) do
                  @env[$1]
                end
              end
            else
              ctx.value.gsub!(args.first) do |match|
                match_ctx = Context[ins, match]
                run_children(ins, match_ctx)
                match_ctx.value
              end
            end
          else
            throw "Method #{ins.name} not implemented in Text scope"
          end
        end
      end
    end
  end
end