require_relative '../../../extensions/matcher'

module Tritium
  module Engines
    module Reference::Scope
      class Base
        attr :logger, true
        attr :export_vars, true
        attr :index, true

        def initialize(thing, root, parent)
          @object ||= thing
          @root ||= root
          @parent ||= parent
          @logger ||= root.logger if root
          @matchers ||= []
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
              (@env[name] || "").clone
            end
          end
        end
        
        def not_matcher(matcher)
          matcher.opposite = true
          return matcher
        end

        def match(value, &block)
          @matchers << {:value => value, :continue => true}
          self.instance_eval(&block) if block
          @matchers.pop
        end
        
        def with(matcher, &block)
          # if we are still running... (remember, they select in series)
          if @matchers.last[:continue]
            # Do I match?
            if matcher.match?(@matchers.last[:value])
              @matchers.last[:continue] = false
              block.call if block
            end
          end
        end
  
        def asset(file_name, type = nil)
          if (@env["#{type}_asset_location"][0..6] == "http://") || (@env["#{type}_asset_location"][0..1] == "//")
            File.join(@env["#{type}_asset_location"].clone, file_name)
          else
            File.join(@env["asset_host"].clone, @env["#{type}_asset_location"].clone, file_name)
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
        
        def dump
          log(@object.to_s)
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
        # @return [String] The first matching element as a string
        def fetch(selector)
          if @object.class == Nokogiri::XML::Element
            @object.search(selector).first.to_s
          elsif !@parent.nil?
            @parent.fetch(selector)
          else
            ""
          end
        end
        
        def index
          if @index
            return @index.to_s
          elsif !@parent.nil?
            @parent.index
          else
            "0"
          end
        end
        
        def concat(*strings)
          strings.join("")
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