

module Tritium
  module Engines
    module Reference::Scope
      class Base
        def initialize(thing, root, parent)
          @object ||= thing
          @root ||= root
          @parent ||= parent
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
          if matcher.is_a? Regexp
            if(value =~ Regexp.new(matcher)) 
              self.instance_eval(&block)
            end
          else
            if(value == matcher) 
              self.instance_eval(&block)
            end
          end
        end
  
        def asset(path, type = "default")
          if type == "stylesheet"
            location = "/assets/stylesheets/.css/"
          elsif type == "image"
            location = "/assets/images/"
          else
            location = "/assets/"
          end
          File.join(location, path)
        end

        def env
          @env
        end

        def debug
          puts @object.inspect
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