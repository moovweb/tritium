module Tritium
  module Scope
    module NodesetModules 
      module ActionMethods
        def insert_tag(tag_name, contents = "", attributes = {}, &block)
          if contents.is_a? Hash
            attributes = contents
            contents = ""
          end

          @nodeset.each do |node|
            new_node = position_node(node, "<#{tag_name} />")
            new_node.first.inner_html = contents
        
            # Merge doesn't work here, so we have to iterate... bullshit!
            attributes.each do |key, value|
              new_node.first.set_attribute(key.to_s, value.to_s) 
            end

            if block
              Scope::Nodeset.new(new_node, @root, self).instance_eval(&block)
            end
          end
        end
    
        def insert(html)
          @nodeset.each do |node|
            position_node(node, html)
          end
        end
    
        def name(new_name = nil, &block)
          @nodeset.each do |node|
            if new_name
              node.name = new_name
            end
            if block
              node.name = open_text_scope_with(node.name, &block)
            end
          end
        end

        def remove
          @nodeset.remove
        end

        # TODO: HC implement 'map'
        def move_here(selector, options = {}, &block)
          #map = options[:map] || options["map"] || false

          move_position = @root.search(selector).first

          return nil if move_position.nil?

          @nodeset.each do |node|
            position_node(move_position, node)

            if block
              Scope::Nodeset.new(node.search("."), @root, self).instance_eval(&block)
            end
          end
        end
      end
    end
  end
end
