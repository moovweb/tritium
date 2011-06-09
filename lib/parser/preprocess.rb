# The seventh circle of hell.
#
# This handles imports, $var expansion, $("hello") expansion, and the insertion
# of debug lines that the Parser ends up using.
#
# This thing is slow, finicky, and annoying.
# 
# Its tests are primarily in reader_test.rb


module Tritium
  module Parser
    class Preprocess
      def self.run(script, path, name)
        inner_run(script, path, name).gsub("\\$", "$")
      end

      def self.inner_run(script, path, name)
        path = File.absolute_path(path)
        self.imports(self.post_debug(self.variable_expansion(self.else_expansion(self.not_expansion(self.select_expansion(self.pre_debug(script, name)))))), path)
      end
    
      def self.select_expansion(script)
        script.gsub(/^([^@#]*)\$\(/, '\1select(')
      end
    
      def self.imports(script, root_path)
        script.gsub(/^([ ]*)\@import[ ]+([^\n\s]*)/).each do 
          spacer = $1
          file_name = $2
          new_root_path = File.dirname(File.join(root_path, file_name)) # IF we are passed @import scripts/me.ts, then make sure our new path has /scripts/ on it for successive imports!
          (self.run(File.read(File.join(root_path, file_name)), new_root_path, file_name).lines.collect do |line|
            spacer + line
          end).join("\n")
        end
      end
      
      def self.else_expansion(script)
        script.gsub("else()", "else_do()")
      end
      
      def self.not_expansion(script)
        tmp = script.gsub(/with\([ ]?not\((.*)\)\)/, "with(not_matcher(\\1))")
        tmp.gsub(/,[ ]?not\((.*)\)/, ", not_matcher(\\1)")
      end

      def self.variable_expansion(script)
        script.gsub(/([^\\"]+)\$([^"_\(\/, ][a-zA-Z0-9_\-]*)/, '\1var(\'\2\')')
      end

      # we can debug easier
      def self.pre_debug(script, name = "main")
        count = 0
        (script.split("\n").collect do |line|
          escaped_line = line.inspect.gsub('$', '\\$')
          "@_line_number = #{count += 1}; @_script = '#{name}'; @_line = #{escaped_line}\n " + line
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