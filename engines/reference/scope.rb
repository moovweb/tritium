

module Tritium
  module Engines
    module Reference::Scope
      class Base
        attr :logger, true

        def initialize(thing, root, parent)
          @object ||= thing
          @root ||= root
          @parent ||= parent
          @logger ||= root.logger if root
          @env = (@parent ? @parent.env : {})
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