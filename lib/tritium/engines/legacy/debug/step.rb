require_relative 'engine'

module Tritium::Engines
  class Debug::Step
    attr :instruction
    attr :children
    attr :debug
    attr :object
    attr :sid
    attr :return
    attr :logger, true
    attr :continue, true
    
    require_relative 'steps/node'
    require_relative 'steps/attribute'
    require_relative 'steps/text'
    require_relative 'steps/positional'
    
    def initialize(instruction, parent = nil)
      @instruction = instruction
      @logger ||= parent.logger if parent
      
      @continue = true
      
      @parent = parent

      #if parent
      #  @sid = parent.sid.clone
      #  @sid << parent.children.size
      #else
      #  @sid = [0]
      #end

      iid = instruction.iid.split("_")
      if parent
        @sid = parent.sid.clone
        @sid << iid[-1]+":"+parent.children.size.to_s
      else
        @sid = [iid[-1]+":0"]
      end

      @child_type = eval(instruction.opens)
      @children = []
      @debug = instruction.to_hash.merge({:step_id => @sid.join("->"), :log => []})
    end
    
    def execute(obj, env, global_debug, export_vars)
      @object = obj
      @env = env
      @export_vars = export_vars
      @global_debug = global_debug
      
      if debug?
        @debug[:start_env] = @env.clone
        @child_time = 0
        start = Time.now
        @debug[:start_object] = @object.clone
      end

      args = (instruction.args || []).collect do |arg|
        resolve_arg(arg, @parent)
      end

      @return = self.send(instruction.name, *args)

      if debug?
        @debug[:total_time_cs] = ((Time.now - start) * 10000).to_i

        (@debug[:args] = args) if args.size > 0
        @debug[:child_time_cs] = @child_time
        @debug[:time_cs] = @debug[:total_time_cs] - @child_time
        # Save the last_env if anything changed
        (@debug[:last_env] = @env.clone) if @env.values != @debug[:start_env].values
        
        #(@debug[:last_object] = @object.clone) if @object != @debug[:start_object]
        if (@env["debug_depth"].to_i == @sid.size) && @env["debug"] != ""
          global_debug[@env["debug"]] ||= []
          global_debug[@env["debug"]] << self
        end
      end

      return @object
    end
    
    def execute_instructions(instructions, obj)
      return obj if (instructions.size == 0)
      timer = Time.now
      @children << instructions.collect do |child|
        step = execute_instruction(child, obj)
        obj = step.object
        step
      end
      if @child_time
        @child_time += ((Time.now - timer) * 10000).to_i
      end
      obj
    end
    
    def resolve_arg(arg, scope = self)
      if arg.is_a?(Tritium::Parser::ReaderInstruction)
        if arg.name == "var"
          arg = @env[arg.args.first]
        else
          args = arg.args.collect {|a| resolve_arg(a) }
          arg = scope.send(arg.name, *args)
        end
      end
      arg
    end
    
    def execute_instruction(ins, obj, parent = self)
      step = @child_type.new(ins, parent)
      step.execute(obj, @env, @global_debug, @export_vars)
      (step.debug[:group_name] = @name) if debug?
      step
    end
    
    def each(&block)
      block.call(self)
      @children.each do |execution_block|
        execution_block.each do |child_step|
          child_step.each(&block)
        end
      end
    end

    def execute_children_on(obj)
      execute_instructions(instruction.children, obj)
    end
    
    def debug?
      if @run_debug.nil?
        @run_debug = ((@env["debug"] != nil) && (@env["debug"] != ""))
      else
        @run_debug
      end
    end
    
    def debug_log(message)
      if debug?
        @debug[:log] << message.to_s
      end
    end
    
   # Actual Tritium methods
   
    def script
      @object = execute_children_on(@object)
    end
   
    def var(named)
      @env[named] ||= ""
      debug_log("Looking up var #{named} and found #{@env[named].inspect}")
      @env[named] = execute_children_on(@env[named])
    end
    
    def match(value)
      @object = execute_children_on(object)
    end
    
    def with(matcher)
      if @parent.continue
        match_val = resolve_arg(@parent.instruction.args.first)
        if matcher.match?(match_val)
          @object = execute_children_on(object)
          @parent.continue = false
          debug_log "Matched #{matcher.to_script} with #{match_val.inspect}"
        else 
          debug_log "Did not match #{matcher.to_script} with #{match_val.inspect}"
        end
      end
    end
    
    def fetch(selector)
      return "" if node.nil?
      result = node.search(selector).first
      if result.is_a?(Nokogiri::XML::Attr)
        result = result.value
      end
      result
    end
    
    def export(key, value)
      @export_vars << [key, value]
    end
    
    # If I'm a NodeStep, this should return @object
    # Otherwise, go up until I find a node. This is
    # mostly useful for fetch()
    def node
      if self.is_a?(Node)
        return @object
      elsif @parent
        @parent.node
      else
        nil
      end
    end
    
    def dump
      log(@object.to_s)
    end
    
    def log(message)
      message = execute_children_on(message)
      @logger.info(message)
    end
    
    def concat(*strings)
      strings.join("")
    end
    
    def regex(string)
      Regexp.new(string)
    end
    
    private
     def position_node(target, node, position = nil)
       if node.is_a?(String)
         node = target.document.fragment(node)
       end
       
       case (position || @env["position"] || "bottom")
       when "top"
         if target.children.size > 0
           target.children.first.add_previous_sibling(node)
         else
           target.add_child(node)
         end
       when "after", "below"
         target.add_next_sibling(node)
       when "before", "above"
         target.add_previous_sibling(node)
       else
         target.add_child(node)
       end
     end
  end
end
