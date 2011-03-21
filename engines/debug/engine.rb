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
        debug = !($TEST || !ENV["TRITIUM_DEBUG"] || !env["content_type"].include?("html"))
        
        tmp_dir = File.join(@script_path, "../tmp")
        Dir.mkdir(tmp_dir) unless File.directory?(tmp_dir)

        if debug
          # Write out the whole parsed script to the tmp folder for debugging!
          File.open(File.join(tmp_dir, "script.ts"), "w+") do |f|
            f.write @root_instruction.to_script
          end
        end
        
        @root_step = Step::Text.new(@root_instruction)
        @root_step.execute(xhtml_file, env)

        return @root_step.object if !debug
        

        trace = File.join(tmp_dir, "debug.json")

        
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
