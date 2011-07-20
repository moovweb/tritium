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
            xml_attribute = attribute.value
            if xml_attribute.value.strip == ""
              xml_attribute.remove
            end
          when :insert_at
            position, node_name = args
            node = Nokogiri::XML::Node.new(node_name, ctx.value.document)
            position_node(ctx.value, node, position)
            run_children(ins, Context[ins, node])
          when :inject_at
            position, content = args
            result = position_node(ctx.value, content, position)
            if result.respond_to?("first")
              result = result.first
            end
            run_children(ins, Context[ins, result])
          when :move_to
            node = ctx.value.xpath(args.first).first
            return if node.nil?
            position_node(node, ctx.value, args.last)
            run_children(ins, Context[ins, node])
          when :move_here
            move(ins, ctx, args.first, ctx.value, args.last)
          when :copy_to
            move(ins, ctx, ctx.value.dup, args.first, args.last)
          when :copy_here
            target = ctx.value.xpath(args.first).first
            if target.nil?
              @logger.debug("Copy failed with #{args.first}")
            else
              move(ins, ctx, target.dup, ctx.value, args.last)
            end
          when :wrap_text_children
            tag_name = args.first
            attributes = kwd_args
            ctx.value.children.each do |child|
              next if not child.text? or child.text.strip.empty?
              wrapper = child.add_previous_sibling("<#{tag_name} />").first
              attributes.each do |key, val|
                key = key.to_s if key.is_a? Symbol
                wrapper[key] = val
              end
              wrapper.add_child(child)
              run_children(ins, Context[ins, child])
            end
          when :cdata
            ctx.value.document.create_cdata(args.first)
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