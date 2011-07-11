module Tritium
  module Parser
    module Instructions
      class Invocation < Base
        attr :statements
        def initialize(filename, line_num,
                       name = nil, pos_args = [], kwd_args = {})
          super(filename, line_num)
          @statements = []
          @name, @pos_args, @kwd_args = name.intern, pos_args, kwd_args
        end
      
        def to_s(depth = 0)
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
      end
    
      class InvocationWithBlock < Invocation
        attr :statements, true
        def initialize(filename, line_num,
                       name = nil, pos_args = [], kwd_args = {}, statements = [])
          super(filename, line_num, name, pos_args, kwd_args)
          @statements = statements
        end
      
        def to_s(depth = 0)
          result = super(depth)
          result << " {\n"
          depth += 1
          @statements.each { |stm| result << stm.to_s(depth) << "\n" }
          depth -= 1
          result << "#{@@tab * depth}}"
          return result
        end
      end
    end
  end
end