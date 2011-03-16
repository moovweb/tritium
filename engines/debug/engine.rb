require_relative '../../parser/expansion_reader'
require 'yajl'

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

        return @root_step.object unless @root_step.debug[:env]["content_type"].include?("html")
        

        trace = File.join(@script_path, "../tmp/debug.json")

        
        f = File.open(trace, "w+")
        
        Yajl::Encoder.encode(@root_step.debug, f, :pretty => true, :indent => '  ')
        f.close
        
        @root_step.object
      end

      
      def reader_klass
        Tritium::Parser::ExpansionReader
      end
    end
  end
end