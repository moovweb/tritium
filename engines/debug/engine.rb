
module Tritium
  module Engines
    require_relative '../base'
    class Debug < Engines::Base
      require_relative 'step'

      def run(xhtml_file, options = {})
        env = options["env"] || options[:env] || {}
        doc = @xml_parser.parse(xhtml_file)
        
        debug = {}
        
        doc
      end
    end
  end
end