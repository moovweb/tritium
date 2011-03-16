require_relative 'engine'
require_relative '../../parser/instruction'

module Tritium::Engines
  class Debug::Step
    attr :instruction
    attr :children
    attr :debug
    attr :object
    attr :sid
    
    require_relative 'steps/node'
    require_relative 'steps/attribute'
    require_relative 'steps/text'
    require_relative 'steps/positional'
    
    def initialize(instruction, parent = nil)
      @instruction = instruction
      
      @parent = parent

      if parent
        @sid = parent.sid.clone
        @sid << parent.children.size
      else
        @sid = [0]
      end

      @child_type = eval(instruction.opens)
      @children = []
      @debug = instruction.to_hash.merge({:step_id => @sid, :objects => [], :children => [], :log => []})
    end
    
    def execute(obj, env = {})
      @object = obj
      @env = env
      @debug[:env] = @env.clone
      args = (instruction.args || []).collect do |arg|
        if arg.is_a?(Tritium::Parser::Instruction)
          if arg.name == "var"
            arg = @env[arg.args.first]
          else
            arg = @parent.send(arg.name, *arg.args).to_s
          end
        end
        arg
      end
      self.send(instruction.name, *(args))

      return @object
    end

    def execute_children_on(obj)
      return obj if (instruction.children.size == 0)
      
      children_debug = []
      children << instruction.children.collect do |child|
        step = @child_type.new(child, self)
        obj = step.execute(obj, @env)
        children_debug << step.debug
        step
      end
      @debug[:children] << children_debug
      obj
    end
    
    def log(message)
      @debug[:log] << message.to_s
    end
    
    def mark!(obj = nil)
      @debug[:objects] << (obj || @object)
    end
    
   # Actual Tritium methods
   
    def script
      @object = execute_children_on(@object)
    end
   
    def var(named)
      @env[named] ||= ""
      log("Looking up var #{named}")
      @env[named] = execute_children_on(@env[named])
    end
    
    def match(value, matcher)
      if matcher.is_a? Regexp
        log "matching #{value} against #{matcher}"
        if(value =~ Regexp.new(matcher)) 
          log "Match successful!"
          execute_children_on(object)
        else
          log "Failed match."
        end
      else
        if(value == matcher) 
          execute_children_on(object)
        end
      end
    end
    
    def fetch(selector)
      node.search(selector).first
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
    
    # If I'm a NodeStep, this should return @object
    # Otherwise, go up until I find a node. This is
    # mostly useful for fetch()
    def node
      if self.is_a?(Node) || self.is_a?(Positional)
        return @object
      else
        @parent.node
      end
    end
    
    private
     def position_node(target, node)
       case @env["position"]
       when "bottom"
         target.add_child(node)
       when "top"
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