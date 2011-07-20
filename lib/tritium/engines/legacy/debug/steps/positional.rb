class Tritium::Engines::Debug
  class Step::Node
    
    def insert_at(position, tag_name)
      inject_at(position, "<#{tag_name} />")
    end
    
    def inject_at(position, html)
      html = resolve_arg(html)
      nodes = position_node(node, html, position)
      if nodes
        execute_children_on(nodes.first)
      else
        puts html.inspect
      end
    end
  end
end