class Tritium::Engines::Debug
  class Step::Node
    
    def insert_tag(tag_name)
      insert("<#{tag_name} />")
    end
    
    def insert(html)
      execute_children_on(position_node(node, html).first)
    end
  end
end