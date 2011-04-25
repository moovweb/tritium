

module Tritium
  module Engines
    module Reference::Scope
      class Base
        attr :logger, true
        attr :export_vars, true

        def initialize(thing, root, parent)
          @object ||= thing
          @root ||= root
          @parent ||= parent
          @logger ||= root.logger if root
          @env = (@parent ? @parent.env : {})
          @export_vars = (@parent ? @parent.export_vars : [])
        end
        
        def script(&block)
          self.instance_eval(&block)
        end

        def var(name = nil, value = nil, &block)
          if name == nil
            return @env[name]
          elsif(value)
            @env[name] = value
          else
            if(block)
              @env[name] = open_text_scope_with(@env[name], &block)
            else
              @env[name]
            end
          end
        end

        def match(value, matcher, &block)
          if(value =~ Regexp.new(matcher)) 
            self.instance_eval(&block)
          end
        end
  
        def asset(file_name, type = nil)
          if (@env["#{type}_asset_location"][0..6] == "http://") || (@env["#{type}_asset_location"][0..1] == "//")
            File.join(@env["#{type}_asset_location"], file_name)
          else
            File.join(@env["asset_host"], @env["#{type}_asset_location"], file_name)
          end
        end

        def env
          @env
        end

        def debug(arg = nil, &block)
          self.instance_eval(&block)
        end
        
        def log(message, &block)
          if block
            message = open_text_scope_with(message, &block)
          end
          @root.logger.info(message)
        end
        
        # This is how you select an element to pass it to a function.
        # *Note*: that you can select attributes as I have done in the example.
        #
        # @example Setting some divs to have the onclick of their first anchor child.
        # select("div.row") {
        #   attribute("onclick", fetch("href", "a/@href"))
        #   # Now that I've set the onclick, I'll make it work with 'window.location='
        #   attribute("onclick") {
        #     value {
        #       prepend("window.location = '")
        #       append("'")
        #     }
        #   }
        # }
        #
        # @return [Array] An array of elements represented as strings
        def fetch(selector)
          if @object.class == Nokogiri::XML::Element
            @object.search(selector).first.to_s
          else
            @parent.fetch(selector)
          end
        end
        
        def export(key, value)
          @export_vars << [key, value]
        end

      protected

        def open_text_scope_with(text, &block)
          text_scope = Tritium::Engines::Reference::Scope::Text.new(text, @root, self)
          text_scope.instance_eval(&block)
          text_scope.text
        end
      end
      
      require_relative 'scopes/node_scope'
      require_relative 'scopes/attribute_scope'
      require_relative 'scopes/text_scope'
    end
  end
end