module Tritium
  module Engine
    class Standard < Base
      module NodeFunctions
        def node_invocation(ins, ctx, args, kwd_args)
          case ins.name
          when :select
            nodeset = ctx.value.xpath(args.first)
            nodeset.each_with_index do |node, index|
              ctx.index = index + 1
              @node_stack.push(node)
              doc = Context[ins, node]
              run_children(ins, doc)
              @node_stack.pop
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
            if args.size == 0
              ctx.value.remove()
            elsif args.size == 1
              nodeset = ctx.value.xpath(args.first)
              nodeset.each do |node|
                node.remove
              end
            end
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
            xml_attribute = attribute.value
            if xml_attribute.value == ""
              xml_attribute.remove
            end
          when :insert_at
            position, node_name = args
            node = Nokogiri::XML::Node.new(node_name, ctx.value.document)
            @node_stack.push(node)
            position_node(ctx.value, node, position)
            run_children(ins, Context[ins, node])
            @node_stack.pop
          when :inject_at
            position, content = args
            result = position_node(ctx.value, content, position)
            if result.respond_to?("first")
              result = result.first
            end
            @node_stack.push(result)
            run_children(ins, Context[ins, result])
            @node_stack.pop
          when :move
            position_node(args[2], args[1], args[0])
          when :wrap_text_children
            tag_name = args.first
            ctx.value.search("./text()").wrap("<#{tag_name} />").each do |child|
              wrapper = child.parent
              @node_stack.push(wrapper)
              run_children(ins, Context[ins, wrapper])
              @node_stack.pop
            end
          when :cdata
            node = ctx.value
            node.content = ""
            cdata_node = node.document.create_cdata(args.first)
            node.children.first.replace(cdata_node)
          when :dup
            node = ctx.value.dup
            if ctx.value.class != Nokogiri::XML::Text
              ctx.value.add_next_sibling(node)
            end
            ctx = Context[ins, node]
            @node_stack.push(node)
            run_children(ins, ctx)
            @node_stack.pop
            return ctx.value
          else
            throw "Method #{ins.name} not implemented in Node scope"
          end
        #rescue
        # throw "Error with #{ins}"
        end
        
        def position_node(target, node, position)
          position = position.intern
          if node.is_a?(String)
            node = target.document.fragment(node)
          end

          case position
          when :top
            if target.children.size > 0
              target.children.first.add_previous_sibling(node)
            else
              target.add_child(node)
            end
          when :after
            target.add_next_sibling(node)
          when :before
            target.add_previous_sibling(node)
          else
            target.add_child(node)
          end
        end

        def move(ins, ctx, what, to, position)
          if what.is_a?(String)
            what = ctx.value.xpath(what)
          end

          if to.is_a?(String)
            to = ctx.value.xpath(to)
          end

          to = [to].flatten
          what = [what].flatten

          to.each do |to_target|
            what.each do |what_target|
              node = position_node(to_target, what_target, position)
              run_children(ins, Context[ins, node])
            end
          end
        end
      end
    end
  end
end
