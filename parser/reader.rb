require_relative 'instruction'

# The Parser::Reader is what actually evals the script
# and returns a tree of Instruction objects.
#
# Currently, the parser does *NO* validation.
#
# You must pass in an pre-processed script.

module Tritium::Parser
  class Reader
    # This is the method that actually runs the 
    # parsing. The ruby interpreter runs the string
    # and keeps hitting the method_missing method below
    # for every instruction that goes through.
    # 
    # This actually returns an Instruction object that is
    # the fully built parse tree.
    #
    # ONLY accepts a pre-processed Tritium script
    def read(script_string)
      @root_instruction = Instruction.root
      @stack = [@root_instruction]

      eval(script_string)

      @root_instruction
    end
   
    # This is where the parsing magic happens.
    # We hijack the ruby interpreter to do our parsing
    # and take note of the stack with each block that
    # gets called.
    def method_missing(name, *args, &block)
      ins = @stack.last.add(name.to_s, :args => args, :processed_line => @_processed_line, :line => @_line, :line_number => @_line_number)
      if block
        @stack.push(ins)
        block.call(self)
        @stack.pop
      end
    end
    
    ########### EXPANSIONS ######################
    
    
    # For some reasons, select is defined on Object. Bastards.
    def select(*args, &block)
      method_missing('select', *args, &block)
    end
    
    def set_position(set_to, &block)
      # Set the position value the standard way and move on
      eval("var('position', #{set_to.inspect})")
      method_missing('position', &block)
    end
    def bottom(&block); set_position("bottom", &block); end
    def top(&block);    set_position("top",    &block); end
    def after(&block);  set_position("after",  &block); end
    def before(&block); set_position("before", &block); end
    
    def value(set_value = nil, &block)
      if set_value
         method_missing('value', &(Proc.new { |this|
           this.method_missing('set', set_value)
           block.call(this) if block
         }))
      else
        method_missing('value', &block)
      end
    end
    
    def attribute(name, set_value = nil, &block)
      if set_value
        method_missing('attribute', *[name], &(Proc.new { |this|
          this.value(set_value)
          block.call(this) if block
        }))
      else
        method_missing('attribute', *[name], &block)
      end
    end
  end
end