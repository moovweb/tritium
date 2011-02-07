module Tritium
  class Preprocess
    def self.run(script, path, name)
      self.imports(self.variable_expansion(self.select_expansion(self.debug(script, name))), path)
    end
    
    def self.select_expansion(script)
      script.gsub("$(", "select(")
    end
    
    def self.imports(script, root_path)
      script.gsub(/([ ]*)\@import[ ]+([^\n]*)/).each do 
        spacer = $1
        file_name = $2
        (self.run(File.open(File.join(root_path, file_name)).read, root_path, file_name).lines.collect do |line|
          spacer + line
        end).join("\n")
      end
    end
    
    def self.variable_expansion(script)
      script.gsub(/\$([^_].[a-zA-Z_\-]*)/, 'var("\1")')
    end
    
    # we can debug easier
    def self.debug(script, name = "main")
      return script unless $DEBUG_SCRIPT
      count = 0
      (script.split("\n").collect do |line|
        "$_line = #{count += 1}; \$_script = '#{name}'\n" + line
      end).join("\n")
    end
  end
end