module Tritium
  module Engines
    class Standard < Base
      module NodeFunctions
        def node_invocation(ins, ctx, pos_args, kwd_args)
          case ins.name
          when :select
            nodeset = ctx.value.xpath(pos_args.first)
            nodeset.each do |node|
              doc = Context[ins, node]
              run_children(ins, doc)
            end
          when :inner
            inner = Context[ins, ctx.value.inner_html]
            run_children(ins, inner)
            ctx.value.inner_html = inner.value
          when :text
            text = Context[ins, ctx.value.text]
            run_children(ins, text)
            ctx.value.text = text.value
          when :remove
            ctx.value.remove()
          when :name
            name = Context[ins, ctx.value.name]
            run_children(ins, name)
            ctx.value.name = name.value
          when :attribute
            name = pos_args.first
            xml_attribute = ctx.value.attribute(name)
            if xml_attribute.nil?
              ctx.value[name] = ""
              xml_attribute = ctx.value.attribute(name)
            end
            attribute = Context[ins, xml_attribute]
            run_children(ins, attribute)
          else
            throw "Method #{ins.name} not implemented in Node scope"
          end
        end
      end
    end
  end
end