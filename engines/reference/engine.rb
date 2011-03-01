
module Tritium
  module Engines
    require_relative '../base'

    class Reference < Engines::Base
      require_relative 'scope'
      require_relative '../../parser/preprocess'
      
      
      def compiled_script
        Parser::Preprocess::run(@script_string, @script_path, "main")
      end

      def run(xhtml_file, options = {})
        # Setup options
        env = options["env"] || options[:env] || {}

        doc = @xml_parser.parse(xhtml_file)

        root_scope = Scope::Node.new(doc)
        root_scope.env.merge! env
        root_scope.instance_eval(processed_script)

        doc
      rescue StandardError => e
        e.message.gsub!(/$/, " on script line #{$_line.to_s}")
        raise e
      end
    end
  end
end