module Tritium::Scope
  module NodesetModules
    module PositioningMethods
      
      def bottom(&block); var("position", "bottom"); self.instance_eval(&block); end
      def top(&block); var("position",    "top"); self.instance_eval(&block); end
      def after(&block); var("position",  "after"); self.instance_eval(&block); end
      def before(&block); var("position", "before"); self.instance_eval(&block); end
    
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
    end
  end
end