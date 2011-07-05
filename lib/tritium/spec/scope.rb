require_relative "function"
module Tritium
  class Spec
    class Scope
      attr :functions
      attr :inherits_from
      attr :includes

      def initialize(name, data, parent)
        @name, @parent = name, parent
        
        @functions = {}
        data.each do |function_name, function_data|
          @functions[function_name] = Function.new(function_name, function_data, self)
        end
        
        if data["inherit"]
          include_functions_from(data["inherit"])
          @inherits_from = data.delete("inherit")
        end
        
        if data["include"]
          include_functions_from(data.delete("include"))
        end
      end
      
      def [](function_name)
        functions[function_name]
      end
      
      def include_functions_from(scope_name)
        scope = @parent[scope_name]
        if scope && scope.functions
          @functions = scope.functions.merge(@functions)
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