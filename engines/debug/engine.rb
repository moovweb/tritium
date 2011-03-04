require_relative '../../parser/expansion_reader'

module Tritium
  module Engines
    require_relative '../base'
    class Debug < Engines::Base
      require_relative 'step'
      attr :root_step

      def run(xhtml_file, options = {})
        env = options["env"] || options[:env] || {}
        
        @root_step = Step::Text.new(@root_instruction)
        @root_step.execute(xhtml_file, env)
        
        @root_step.object
      end
      
      def debug
        @root_step.debug
      end
      
      def reader_klass
        Tritium::Parser::ExpansionReader
      end
    end
  end
end