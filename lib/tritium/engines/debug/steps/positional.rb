class Tritium::Engines::Debug
  class Step::Node
    
    def insert_tag(tag_name)
      inject("<#{tag_name} />")
    end
    
    def inject(html)
      execute_children_on(position_node(node, html).first)
    end
    alias insert inject
  end
end