require_relative "base"
require_relative "function"
module Tritium
  class Spec
    class Scope < Base
      
      def self.defaults
        {:inherit => nil,
         :inherited_by => [],
         :functions => {}
         }
      end
      setup_defaults!
      
      def self.child_klass; Function; end

      def initialize(name, attributes, parent)
        super
        load_children!(attributes)
        #puts self.instance_variables.inspect
        if @inherit
          include_functions_from(parent, @inherit)
          parent.scopes[@inherit].inherited_by << name
        end
        
        if @include
          #puts "including from #{@include}"
          include_functions_from(parent, @include)
        end
        
        @functions.each do |name, func|
          func.scopes << name
        end
      end
      
      def [](function_name)
        functions[function_name]
      end
      
      def include_functions_from(parent, scope_name)
        scope = parent[scope_name]
        if scope && scope.functions
          @functions = scope.functions.merge(functions)
        else
          throw "could not find #{scope_name}"
        end
      end
      
      # Hash backwards compat
      def keys
        functions.keys
      end
    end
  end
end