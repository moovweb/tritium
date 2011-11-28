module Tritium
  class Spec
    class Base
      attr :name
      attr :parent
      attr :children
      attr :api_version
      
      # OVERRIDE
      def self.child_klass
        nil
      end
      
      def self.defaults
        {}
      end
      
      def self.setup_defaults!
        defaults.each do |name, value|
          attr name.intern
        end
      end

      # Instance methods

      def initialize(name, attributes, parent)
        @name, attributes = name, attributes
        @api_version = parent.api_version
        if attributes["positional"]

          %w(top bottom after before).each do |position|
            child_attributes = Marshal::load(Marshal.dump(attributes))
            child_attributes.delete("positional")
            positional_name = "#{name}_#{position}"
            parent.children[positional_name] = self.class.new(positional_name, child_attributes, parent)
          end
          
          
          # Define insert_at/inject_at-like methods
          at_name = "#{name}_at"
          at_attributes = Marshal::load(Marshal.dump(attributes))
          at_attributes.delete("positional")
          at_attributes["arguments"] = [{"name" => "Position", "doc" => "top/bottom/etc", "type" => "Position"}] + at_attributes["arguments"]
          parent.children[at_name] = self.class.new(at_name, at_attributes, parent)
        end
        self.class.defaults.each do |name, value|
          name = name.to_s
          instance_variable_set("@#{name}", attributes.delete(name) || value)
        end
      end
      
      def self.var_name
        self.child_klass.to_s.split("::").last.downcase + "s"
      end
      
      def children
        instance_variable_get("@#{self.class.var_name}")
      end
      
      def [](key)
        eval("@#{key}") || children[key]
      end
      
      def load_children!(list)
        variable_name = 
        children = instance_variable_set("@#{self.class.var_name}", {})
        list.each do |name, value|
          if value.nil?
            value = name
            #puts "swapping #{value}"
            name = value.delete("name")
          end
          if value.is_a?(Array) || value.is_a?(Hash)
            children[name] = self.class.child_klass.new(name, value, self)
          else
            #puts "#{name} is an attribute"
            instance_variable_set("@#{name}", value)
          end
        end
      end

    end
  end
end