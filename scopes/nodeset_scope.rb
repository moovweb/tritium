require_relative '../scope'

module Tritium
  module Scope
    class Nodeset < Base
      def initialize(nodeset, root = nil, parent = nil)
        @nodeset = nodeset
        @root = root || nodeset
        super
      end
  
      ##########  NEW SCOPE OPENING METHODS #################

      def select(selector, &block)
        child_nodeset = @nodeset.search(selector)
        #child_nodeset.each do |node|
        #  puts "Selector #{selector} matched #{node.path()}"
        #end
        if child_nodeset.size > 0
          child_scope = Scope::Nodeset.new(child_nodeset, @root, self)
          child_scope.instance_eval(&block)
        end
      end
  
      def attribute(name, value = nil, &block)
        if name.is_a?(String)
          @nodeset.each do |node|
            if value
              node[name] = value.to_s
            end

            attribute_node = node.attributes[name]

            # If we don't have an attribute, make one!
            if attribute_node.nil?
              node[name] = ""
              attribute_node = node.attributes[name]
            end

            if block
              attribute_scope = Scope::Attribute.new(attribute_node, @root, self)
              attribute_scope.instance_eval(&block)
            end
          end
        end
      end

      def html(&block)
        @nodeset.each do |node|
          node.inner_html = open_text_scope_with(node.inner_html, &block)
        end
      end
      alias inner html
  
      ##########  ACTION METHODS #################

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
      def move_to(selector, options = {}, &block)
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
    
     private
      def position_node(target, node)
        throw("this can only be called with a bottom, after, or before block") if var("position").nil?
    
        case var("position")
        when "bottom"
          target.add_child(node)
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
        end
      end
     public
    
      ########### POSITIONING METHODS ###############
    
      def bottom(&block); var("position", "bottom"); self.instance_eval(&block); end
      def top(&block); var("position",    "top"); self.instance_eval(&block); end
      def after(&block); var("position",  "after"); self.instance_eval(&block); end
      def before(&block); var("position", "before"); self.instance_eval(&block); end
    end
  end
end