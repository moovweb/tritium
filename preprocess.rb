module Tritium
  class Preprocess
    def self.run(script)
      self.debug(self.variable_expansion(self.select_expansion(script)))
    end
    
    def self.select_expansion(script)
      script.gsub("$(", "select(")
    end
    
    def self.variable_expansion(script)
      script.gsub(/\$([a-zA-Z_\-]*)/, 'var("\1")')
    end
    
    # we can debug easier
    def self.debug(script, name = "main")
      count = 0
      (script.split("\n").collect do |line|
        "$line = #{count += 1}; $script = '#{name}'\n" + line
      end).join("\n")
    end
  end
end