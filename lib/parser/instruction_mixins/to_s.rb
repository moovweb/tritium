module Tritium::Parser

  class Instruction
    @@tab = "  "
    
    def ruby_debug_line(depth = 0)
      ["#{@@tab * depth}#[",
        "@_line_number = #{@line_num.inspect}",
        "@_script = #{@filename.inspect}",
        "@_line = ''",
        "#]#\n"].join("\n#{@@tab * depth}")
    end
  end

  class Literal
    def to_s(depth = 0)
      "#{@@tab * depth}#{@value.inspect}"
    end
  end

  class Reference
    def to_s(depth = 0)
      "#{@@tab * depth}var(#{@name.to_s.inspect})"
    end
  end

  class Assignment
    def to_s(depth = 0)
      
      result = ruby_debug_line(depth) + super(depth)
      new_depth = depth + 1
      result[-1,0] = ") {\n#{@@tab * new_depth}set(#{@value})\n#{@@tab * depth}}"
      return result[0..-2]
    end
  end

  class Invocation
    def to_s(depth = 0)
      name = @name.to_s.gsub(/\$/, "select")
      result = ruby_debug_line(depth) + "#{@@tab * depth}#{name}("
      @pos_args.each { |arg| result << "#{arg}, " }
      @kwd_args.each { |kwd, arg| result << "#{kwd.inspect} => #{arg}, " }
      result[-2,2] = "" if result.end_with? ", "
      result << ")"
      return result
    end
  end

  class InvocationWithBlock
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

  class InlineBlock
    def to_s(depth = 0)
      result = "#{@@tab * depth}# ENTERING FILE: #{@filename}\n"
      @statements.each { |stmt| result << stmt.to_s(depth) << "\n" }
      result << "#{@@tab * depth}# LEAVING FILE: #{@filename}"
      return result
    end
  end

end
