module Matcher
  attr :opposite, true
  
  def match?(value)
    if @opposite == true
      !positive_match(value)
    else
      !!positive_match(value)
    end
  end
  
  def to_script
    if @opposite
      "not_matcher(#{self.inspect})"
    else
      self.inspect
    end
  end
end

class Regexp
  include Matcher
  
  def positive_match(v)
    self =~ v
  end
end

class String
  include Matcher
  
  def positive_match(v)
    self == v.to_s
  end
end