module Tritium
  module Parser
    class Preprocess
      def self.run(script, path, name)
        path = File.absolute_path(path)
        self.imports(self.post_debug(self.variable_expansion(self.select_expansion(self.pre_debug(script, name)))), path)
      end
    
      def self.select_expansion(script)
        script.gsub(/^([^@]+)\$\(/, '\1select(')
      end
    
      def self.imports(script, root_path)
        script.gsub(/^([ ]*)\@import[ ]+([^\n]*)/).each do 
          spacer = $1
          file_name = $2
          puts root_path.inspect
          (self.run(File.open(File.join(root_path, file_name)).read, root_path, file_name).lines.collect do |line|
            spacer + line
          end).join("\n")
        end
      end

      def self.variable_expansion(script)
        script.gsub(/([^\\]+)\$([^_\(].[a-zA-Z_\-]*)/, '\1var(\'\2\')')
      end

      # we can debug easier
      def self.pre_debug(script, name = "main")
        count = 0
        (script.split("\n").collect do |line|
          "@_line_number = #{count += 1}; @_script = '#{name}'; @_line = #{line.inspect}\n " + line
        end).join("\n")
      end

      def self.post_debug(script)
        count = 0
        (script.split("\n").collect do |line|
          count += 1 
          if (count % 2) == 0
            line = "@_processed_line = #{line.inspect}\n" + line
          end
          line
        end).join("\n")
      end
    end
  end
end