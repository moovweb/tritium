module Tritium
  class Spec
    class Scope
      attr :data
      attr :inherits_from
      attr :includes

      def initialize(name, data, parent)
        @name, @data, @parent = name, data, parent
        if data["inherit"]
          include_functions_from(data["inherit"])
          @inherits_from = data["inherit"]
        end
        
        if data["include"]
          include_functions_from(data["include"])
        end
      end
      
      def [](function_name)
        @data[function_name]
      end
      
      def include_functions_from(scope_name)
        scope = @parent[scope_name]
        if scope
          @data = scope.data.merge(@data)
        else
          throw "could not find #{scope_name}"
        end
      end
      
      # Hash backwards compat
      def keys
        @data.keys
      end
    end
  end
end