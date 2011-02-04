module Tritium
  class Engine
    PARSERS = {"xml" =>  Nokogiri::XML, "html" =>  Nokogiri::HTML}
    
    def initialize(script_string, parser_name = nil)
      @script_string = debug_prefilter(script_string)
      @parser = PARSERS[parser_name || "xml"] || throw("Invalid parser")
    end

    def run(xhtml_file, options = {})
      # Setup options
      encoding = options["encoding"] || options[:encoding] || "UTF-8"
      env = options["env"] || options[:env] || {}

      doc = @parser.parse(xhtml_file, nil, encoding)
      
      root_scope = NodesetScope.new(doc)
      root_scope.env.merge! env
      root_scope.instance_eval(@script_string)
      doc
    rescue StandardError => e
      e.message.gsub!(/$/, " on script line #{$line}")
      raise e
    end
    
    def debug_prefilter(script, name = "main")
      count = 0
      (script.split("\n").collect do |line|
        "$line = #{count += 1}; $script = '#{name}'\n" + line
      end).join("\n")
    end
  end
end