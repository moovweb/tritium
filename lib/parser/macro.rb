module Tritium::Parser
  class Macro
    def initialize(name, arg_length, &block)
      @name, @arg_length = name, arg_length
    end
    
    def self.load_macro_file(filename)
    end
    
    def self.load_macro_rb_file(filename)
    end
    
    def self.load(*files)
      files.each do |file|
      end
    end
    
    def self.unquote(node)
      if Literal === node then
        val = eval(node.to_s)
        return Regexp === val ? val.inspect : val
      else
        return node.to_s
      end
    end

    def self.splice(tbl)
      result = ""
      tbl.each { |k,v| result << ", #{k}: #{v}" }
      result[0,2] = ""
      return result
    end
  end
end
