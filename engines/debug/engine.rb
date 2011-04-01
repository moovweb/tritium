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

        # Now we will return if there is global debug info.
        #debug = !($TEST || !ENV["TRITIUM_DEBUG"] || !env["content_type"].include?("html"))

        @root_step = Step::Text.new(@root_instruction)
        @root_step.logger = @logger
        global_debug = {}
        @root_step.execute(xhtml_file, env, global_debug)

        return @root_step.object if !global_debug.any?
        
        
        
        tmp_dir = File.join(@script_path, "../tmp")
        Dir.mkdir(tmp_dir) unless File.directory?(tmp_dir)
        debug_file = File.join(tmp_dir, "debug.sqlite")
        
        puts "DEBUG START! (to #{debug_file})"

        db = Database.new(debug_file)

        db.insert_instruction(@root_instruction)
        
        db.process_debug(global_debug)
        
        puts "DEBUG FINISHED!"
        
        @root_step.object
      end

      
      def reader_klass
        Tritium::Parser::ExpansionReader
      end
    end
  end
end
