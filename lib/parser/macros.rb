module Tritium::Parser
  def unquote(node)
    if Literal === node then
      val = eval(node.to_s)
      return Regexp === val ? val.inspect : val
    else
      return node.to_s
    end
  end

  def splice(tbl)
    result = ""
    tbl.each { |k,v| result << ", #{k}: #{v}" }
    result[0,2] = ""
    return result
  end
end
