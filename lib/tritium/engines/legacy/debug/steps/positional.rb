class Tritium::Engines::Debug
  class Step::Node
    
    def insert_tag(tag_name)
      inject("<#{tag_name} />")
    end
    
    def inject(html)
      html = resolve_arg(html)
      if html.is_a?(Node)
        puts html.inspect
      end
      nodes = position_node(node, html)
      #puts nodes.inspect
      if nodes
        execute_children_on(nodes.first)
      else
        puts html.inspect
      end
    end
    
    def insert(*args)
      if args.size > 1 || (args.first.is_a?(String) && args.first.include?("<"))
        insert_tag(*args)
      else
        inject(*args)
      end
    end
  end
end