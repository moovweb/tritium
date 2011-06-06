class Instruction
  def initialize(filename, line_num)
    @filename, @line_num = filename, line_num
  end
end

class Literal < Instruction
  def initialize(filename, line_num, value)
    super(filename, line_num)
    @value = value
  end
end

class Reference < Instruction
  def initialize(filename, line_num, name)
    super(filename, line_num)
    @name = name.intern
  end
end

class Assignment < Reference
  def initialize(filename, line_num, name, value)
    super(filename, line_num, name)
    @value = value
  end
end

class Invocation < Instruction
  def initialize(filename, line_num, name = nil, pos_args = [], kwd_args = {})
    super(filename, line_num)
    @name, @pos_args, @kwd_args = name.intern, pos_args, kwd_args
  end
end

class InvocationWithBlock < Invocation
  def initialize(filename, line_num,
                 name = nil, pos_args = [], kwd_args = {}, statements = [])
    super(filename, line_num, name, pos_args, kwd_args)
    @statements = statements
  end
end

class InlineBlock < InvocationWithBlock
  def initialize(filename, line_num, statements)
    @filename, @line_num, @statements = filename, line_num, statements
  end
end

require_relative "instruction-mixins/to_s"
