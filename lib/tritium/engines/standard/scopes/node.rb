module Tritium
  module Engines
    class Standard < Base
      module NodeFunctions
        def node_invocation(ins, ctx, args, kwd_args)
          case ins.name
          when :select
            nodeset = ctx.value.xpath(args.first)
            nodeset.each do |node|
              doc = Context[ins, node]
              run_children(ins, doc)
            end
          when :inner
            inner = Context[ins, ctx.value.inner_html]
            run_children(ins, inner)
            ctx.value.inner_html = inner.value
          when :text
            text = Context[ins, ctx.value.content]
            run_children(ins, text)
            ctx.value.content = text.value
          when :remove
            ctx.value.remove()
          when :name
            name = Context[ins, ctx.value.name]
            run_children(ins, name)
            ctx.value.name = name.value
          when :attribute
            name = args.first
            xml_attribute = ctx.value.attribute(name)
            if xml_attribute.nil?
              ctx.value[name] = ""
              xml_attribute = ctx.value.attribute(name)
            end
            attribute = Context[ins, xml_attribute]
            run_children(ins, attribute)
          when :insert_at
            position, node_name = args
            node = Nokogiri::XML::Node.new(node_name, ctx.value.document)
            position_node(ctx.value, node, position)
            run_children(ins, Context[ins, node])
          when :inject_at
            position, content = args
            nodes = position_node(ctx.value, content, position)
            node = nodes.children.last
            run_children(ins, Context[ins, node])
          else
            throw "Method #{ins.name} not implemented in Node scope"
          end
        end
        
        def position_node(target, node, position)
          if node.is_a?(String)
            node = target.document.fragment(node)
          end

          case position
          when "top"
            if target.children.size > 0
              target.children.first.add_previous_sibling(node)
            else
              target.add_child(node)
            end
          when "after"
            target.add_next_sibling(node)
          when "before"
            target.add_previous_sibling(node)
          else
            target.add_child(node)
          end
          
          return node
        end
      end
    end
  end
end