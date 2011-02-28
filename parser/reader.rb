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
    
    def position(set_to, &block)
      # Set the position value the standard way and move on
      eval("var('position', #{set_to.inspect})")
      method_missing('position', &block)
    end
    def bottom(&block); position("bottom", &block); end
    def top(&block);    position("top",    &block); end
    def after(&block);  position("after",  &block); end
    def before(&block); position("before", &block); end
    
    def attribute(name, value, &block)
      method_missing('attribute', *[name], Proc.new { |this|
        this.method_missing('set')
        block.call(this)
      })
      
    end
  end
end