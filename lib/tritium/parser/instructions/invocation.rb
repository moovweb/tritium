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
          process_args!
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
        
        def process_args!
          @pos_args.each do |arg|
            if arg.is_a?(Instruction)
              arg.parent = self
              arg.is_arg = true
            end
          end
          @kwd_args.each do |key, value|
            if value.is_a?(Instruction)
              value.parent = self
              value.is_arg = true
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
        
        def base?
          @base ||= spec.base?
        end
        
        def opens
          @opens ||= spec.opens || scope
        end

        def stub(depth = 0)
          name = @name.to_s.gsub(/\$/, "select")
          if name == "else" 
            name = "else_do"
          end
          if name == "not"
            name = "not_matcher"
          end
          result = ruby_debug_line(depth) + "#{@@tab * depth}#{name}("
          @pos_args.each { |arg| result << "#{arg}, " }
          @kwd_args.each { |kwd, arg| result << "#{kwd.inspect} => #{arg}, " }
          result[-2,2] = "" if result.end_with? ", "
          result << ")"
          return result
        end
        
        def to_s(depth = 0)
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
      end
    end
  end
end