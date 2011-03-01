require_relative '../parser/preprocess'

module Tritium
  module Engines
    class Base
      PARSERS = {"xml" =>  Nokogiri::XML, "html" =>  Nokogiri::HTML, "xhtml" => Nokogiri::XML}

      def initialize(script_string, options = {})
        parser_name = options["parser"] || options[:parser]
        path = options["path"] || options[:path] || File.dirname(__FILE__)
        @script_string = Parser::Preprocess::run(script_string, path, "main")
        @parser = PARSERS[parser_name || "xml"] || throw("Invalid parser")
      end

      def compiled_script
        @script_string
      end

      def run(xhtml_file, options = {})
        # Setup options
        env = options["env"] || options[:env] || {}

        doc = @parser.parse(xhtml_file)

        root_scope = Scope::Node.new(doc)
        root_scope.env.merge! env
        root_scope.instance_eval(@script_string)

        doc
      rescue StandardError => e
        e.message.gsub!(/$/, " on script line #{$_line.to_s}")
        raise e
      end
    end
  end
end
