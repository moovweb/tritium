module Tritium
  module Parser
    class Parser
      class ScriptErrors < StandardError
        def initialize
          @errors = []
        end
        
        def messages
          @errors.collect do |e|
            backtrace = e.backtrace.join("\n")
            "#{e.message}\n#{backtrace}"
          end
        end
          
        def message
          messages.join("\n--------------\n")
        end
        
        def to_s
          message
        end
        
        # Pass through to the error list
        def method_missing(name, *args, &block)
          @errors.send(name, *args, &block)
        end
      end
      
      class LexicalError < StandardError
        def initialize(error_token)
          @error_token = error_token
        end

        def message
          @error_token.to_s
        end
      end

      class SyntaxError < StandardError
        attr_reader :filename, :line_num, :message, :value

        def initialize(filename, line_num, message, value)
          @filename, @line_num = filename, line_num
          @message, @value = message, value
        end

        def message
          return "Syntax error in #{@filename}, line #{@line_num}:\n" \
                 "#{@message}; found unexpected #{@value}\n\n"
        end
      end
    end
  end
end