module Tritium
  module Parser
    module Instructions
      require_relative "block"

      class Invocation < Block
        attr :kwd_args
        attr :pos_args
        attr :name
        def initialize(filename, line_num,
                       name = nil, pos_args = [], kwd_args = {}, statements = [])
          super(filename, line_num, statements)
          @name, @pos_args, @kwd_args = name.intern, pos_args, kwd_args
        end
        
        def signature
          @signature ||= [@name, args.size]
        end
        
        def args
          if @kwd_args.any?
            @pos_args + [@kwd_args]
          else
            @pos_args
          end
        end
        
        def each(&block)
          @pos_args.each do |pos_arg|
            block.call(pos_arg)
            if pos_arg.respond_to?("each")
              pos_arg.each(&block)
            end
          end
          super
        end
        
        def post_process!
          super
          process_args!
        end
        
        def process_args!
          args = @pos_args + @kwd_args.keys + @kwd_args.values
          args.collect do |arg|
            if arg.is_a?(Instruction)
              arg.parent = self
              arg.is_arg = true
            else
              return nil
            end
            arg
          end
          assign_ids(args.compact)
        end
        
        def spec
          spec = scope[@name.to_s]
          if spec.nil?
            throw "Invalid #{@name.to_s} in #{scope.name} scope"
          end
          spec
        end
        
        def base?
          @base ||= spec.base?
        end
        
        def opens
          @opens ||= spec.opens || scope
        end
        
        def legacy_stub(legacy = false, depth = 0)
          if legacy
            name = @name.to_s.gsub(/\$/, "select")
            if name == "else" 
              name = "else_do"
            end
            if name == "not"
              name = "not_matcher"
            end
          else
            name = @name.to_s
          end

          result = ruby_debug_line(depth) + "#{@@tab * depth}#{name}("
          @pos_args.each { |arg| result << "#{arg}, " }
          @kwd_args.each { |kwd, arg| result << "#{kwd.inspect} => #{arg}, " }
          result[-2,2] = "" if result.end_with? ", "
          result << ")"
          return result
        end

        def stub(depth = 0)
          legacy_stub(false, depth)
        end
        
        def to_legacy_script(depth = 0)
          result = legacy_stub(true, depth)
          if @statements.any?
            result << " {\n"
            depth += 1
            @statements.each { |stm| result << stm.to_s(depth) << "\n" }
            depth -= 1
            result << "#{@@tab * depth}}"
          end
          return result
        end
        
        def to_script(depth = 0)
          result = stub(depth)
          if @statements.any?
            result << " {\n"
            depth += 1
            @statements.each { |stm| result << stm.to_s(depth) << "\n" }
            depth -= 1
            result << "#{@@tab * depth}}"
          end
          return result
        end
        
        #DEPRECATED
        def to_s(depth = 0)
          #WARN
          to_legacy_script(depth)
        end
      end
      
      class Reference < Invocation
        def initialize(filename, line_num, var_name)
          # Make sure we turn ourselves into a proper invocation
          var_name_literal = Literal.new(filename, line_num, var_name)
          super(filename, line_num, "var", [var_name_literal])
        end
      end
      
      class NestedInvocation < Invocation
        def initialize(filename, line_num,
                       name = nil, pos_args = [], kwd_args = {}, statements = [])
          if pos_args.size > 2 && name == :concat
            arg_call = NestedInvocation.new(filename, line_num, name, pos_args[1..-1])
            pos_args = [pos_args.first, arg_call]
          elsif name != :concat && pos_args.size > 1
            arg_call = NestedInvocation.new(filename, line_num, :concat, pos_args)
            pos_args = [arg_call]
          end
          super
        end
      end
    end
  end
end