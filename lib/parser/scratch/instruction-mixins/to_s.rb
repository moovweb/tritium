class Instruction
  @@tab = "  "
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
    result = super(depth)
    result[-1,0] = ", #{@value}"
    return result
  end
end

class Invocation
  def to_s(depth = 0)
    result = "#{@@tab * depth}#{@name}("
    @pos_args.each { |arg| result << "#{arg}, " }
    @kwd_args.each { |kwd, arg| result << "#{kwd}: #{arg}, " }
    result[-2,2] = "" if result[-2,2] == ", "
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
    result << "#{@@tab * depth}}\n"
    return result
  end
end

class InlineBlock
  def to_s(depth = 0)
    result = "#{@@tab * depth}# ENTERING FILE: #{@filename}\n"
    @statements.each { |stmt| result << stmt.to_s(depth) << "\n" }
    result << "#{@@tab * depth}# LEAVING FILE: #{@filename}\n"
    return result
  end
end
