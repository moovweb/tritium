require_relative 'engine'
require_relative '../../parser/instruction'

module Tritium::Engines
  class Debug::Step
    attr :instruction
    attr :children
    attr :debug
    attr :object
    
    require_relative 'steps/node'
    require_relative 'steps/attribute'
    require_relative 'steps/text'
    require_relative 'steps/positional'
    
    def initialize(instruction)
      @instruction = instruction
      
      @child_type = eval(instruction.opens)
      @children = []
      @debug = []
    end
    
    def execute(obj, env = {})
      @object = obj
      @env = env
      mark!
      args = (instruction.args || []).collect do |arg|
        if arg.is_a?(Tritium::Parser::Instruction) && arg.name == "var"
          puts arg.inspect
          puts "~~" + @env[arg.args.first]
          @env[arg.args.first]
        else
          arg
        end
      end
      self.send(instruction.name, *(args))

      return @object
    end
    
    def execute_children_on(obj)
      children << instruction.children.collect do |child|
        step = @child_type.new(child)
        obj = step.execute(obj, @env)
        @debug << step.debug
        step
      end
      obj
    end
    
    def log(message)
      @debug << {:message => message, :instruction => instruction}
    end
    
    def mark!
      @debug << {:object => object, :env => @env}
    end
    
    
   # Actual Tritium methods
   
    def var(named)
      @env[named] ||= ""
      log("Looking up var #{named}")
      @env[named] = execute_children_on(@env[named])
    end
    
    def match(matcher, value)
      if matcher.is_a? Regexp
        log("")
        if(value =~ Regexp.new(matcher)) 
          execute_children_on(object)
        end
      else
        if(value == matcher) 
          execute_children_on(object)
        end
      end
    end
    
    private
    
     def position_node(target, node)
       
       case @env["position"]
       when "bottom"
         target.add_child(node)
       when "top"
         puts target.inspect
         puts node.inspect
         if target.children.size > 0
           target.children.first.add_previous_sibling(node)
         else
           target.add_child(node)
         end
       when "after"
         target.add_next_sibling(node)
       when "before"
         target.add_previous_sibling(node)
       end
     end
  end
end