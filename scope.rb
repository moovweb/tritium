module Tritium
  module Scope
    class Base
      def initialize(thing, root, parent)
        @root ||= root
        @parent ||= parent
        @env = (@parent ? @parent.env.clone : {})
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

      def match(key, matcher, &block)
        if matcher.is_a? Regexp
          if(@env[key] =~ Regexp.new(matcher)) 
            self.instance_eval(&block)
          end
        else
          if(@env[key] == matcher) 
            self.instance_eval(&block)
          end
        end
      end
    
    
      def asset(path, type = "default")
        if type == "stylesheet"
          location = "/assets/stylesheets/.css/"
        else
          location = "/assets/"
        end
        File.join(location, path)
      end
    
      def filter_url(link)
        link.gsub(env["rewrite_link_matcher"], env["rewrite_link_to"] + env["proxy_domain"])
      end
    
      def env
        @env
      end

    protected
  
      def open_text_scope_with(text, &block)
        text_scope = Scope::Text.new(text, @root, self)
        text_scope.instance_eval(&block)
        text_scope.text
      end
    end
  end
end