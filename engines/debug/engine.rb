require_relative '../../parser/expansion_reader'

module Tritium
  module Engines
    require_relative '../base'
    class Debug < Engines::Base
      require_relative 'step'
      attr :root_step

      def run(xhtml_file, options = {})
        env = options["env"] || options[:env] || {}
        doc = @xml_parser.parse(xhtml_file)
        
        @root_step = Step::Node.new(@root_instruction)
        @root_step.execute(doc, env)
        
        doc
      end
      
      def reader_klass
        Tritium::Parser::ExpansionReader
      end
    end
  end
end