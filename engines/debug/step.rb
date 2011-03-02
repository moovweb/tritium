require_relative 'engine'

module Tritium::Engines
  class Debug::Step
    attr :instruction
    
    require_relative 'steps/node'
    require_relative 'steps/attribute'
    require_relative 'steps/text'
    
    def initialize(instruction)
      @instruction = instruction
      
      child_type = eval(instruction.opens)
      
      if child_type
        # Populate my children steps
        @children = instruction.children.collect do |child|
           puts child_type
        end
      else
        @children = []
      end
    end
  end
end