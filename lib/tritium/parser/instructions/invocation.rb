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
          with_not_fix!
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
        
        def with_not_fix!
          if @name == :with
            arg = pos_args.first
            if arg.is_a?(Invocation) && arg.name == :not
              @name = :not
              @pos_args[0] = pos_args.first.pos_args.first
            end
          end
        end
        
        def spec
          spec = scope[@name.to_s]
          if spec.nil?
            throw "Invalid #{@name.to_s} in #{scope.name} scope"
          end
          spec
        end
        
        def valid?
          unless spec.arg_size_range === self.args.size
            raise "Wrong number of arguments in #{debug_info}"
          end
        end
        
        def debug_info
          "#{@name} on #{super}"
        end
        
        def base?
          @base ||= spec.base?
        end
        
        def opens
          @opens ||= spec.opens || scope
        end
        
        def stub(depth = 0)
          result = "#{@@tab * depth}#{name}("
          @pos_args.each { |arg| result << "#{arg.to_script}, " }
          @kwd_args.each { |kwd, arg| result << "#{kwd.inspect} => #{arg.to_script}, " }
          result[-2,2] = "" if result.end_with? ", "
          result << ")"
          return result
        end

        
        def to_script(depth = 0)
          result = stub(depth)
          if @statements.any?
            result << " {\n"
            depth += 1
            @statements.each { |stm| result << stm.to_script(depth) << "\n" }
            depth -= 1
            result << "#{@@tab * depth}}"
          end
          return result
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