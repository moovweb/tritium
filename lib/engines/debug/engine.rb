require 'yajl'

module Tritium
  module Engines
    require_relative '../base'
    class Debug < Engines::Base
      require_relative 'database'
      require_relative 'step'
      attr :root_step
      
      def initialize(script_string, options = {})
        super
        
        if ENV["TEST"].nil?
          @tmp_dir = File.join(@script_path, "../tmp")
          Dir.mkdir(@tmp_dir) unless File.directory?(@tmp_dir)
          
          # Dump the compiled script to the /tmp folder as script.ts
          script_file = File.join(@tmp_dir, "script.ts")
          File.open(script_file, "w+") { |f| f.write(@root_instruction.to_script) }
        end
      end

      def run(doc, options = {})
        env = options["env"] || options[:env] || {}
        
        start = Time.now

        # Actually run the code
        @root_step = Step::Text.new(@root_instruction)
        @root_step.logger = @logger
        global_debug = {}
        export_vars = []
        @root_step.execute(doc.dup, env, global_debug, export_vars)
        
        took = Time.now - start
        unless ENV["TEST"]
          @logger.stats("Script took #{took} sec to process") if @logger.respond_to? :stats
        end

        return [@root_step.object, export_vars] if !global_debug.any? || ENV["TEST"]

        # If we called debug(), then do all of this

        debug_file = File.join(@tmp_dir, "debug.sqlite")

        puts "DEBUG START! (to #{debug_file})"

        # Build the new DB object
        db = Database.new(debug_file)

        # Insert everything into the DB
        db.insert_instruction(@root_instruction)
        db.process_debug(global_debug)

        puts "DEBUG FINISHED!"
        
        # Return the result object
        [@root_step.object, []]
      end

      
      def reader_klass
        Tritium::Parser::ExpansionReader
      end
    end
  end
end
