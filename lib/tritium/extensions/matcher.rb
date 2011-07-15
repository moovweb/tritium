module Matcher
  attr :opposite, true
  
  def match?(value)
    if @opposite == true
      !(value =~ self)
    else
      !!(value =~ self)
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
end
class String
  include Matcher
end