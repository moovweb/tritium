require_relative '../../parser/expansion_reader'

require 'yajl'

module Tritium
  module Engines
    require_relative '../base'
    class Debug < Engines::Base
      require_relative 'database'
      require_relative 'step'
      attr :root_step

      def run(xhtml_file, options = {})
        env = options["env"] || options[:env] || {}
        debug = !($TEST || !ENV["TRITIUM_DEBUG"] || !env["content_type"].include?("html"))

        if debug
          tmp_dir = File.join(@script_path, "../tmp")
          Dir.mkdir(tmp_dir) unless File.directory?(tmp_dir)
          
          db = Database.new(File.join(tmp_dir, "debug.sqlite"))
  
          db.insert_instruction(@root_instruction)
        end
        
        @root_step = Step::Text.new(@root_instruction)
        @root_step.logger = @logger
        @root_step.execute(xhtml_file, env)

        return @root_step.object if !debug
        
        db.insert_step(@root_step)
        
        @root_step.object
      end

      
      def reader_klass
        Tritium::Parser::ExpansionReader
      end
    end
  end
end
