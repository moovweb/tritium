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
        if options[:tr_dbg_to_db]
          debug_file = File.join(@tmp_dir, "debug.sqlite")
          @db = Database.new(debug_file, @root_instruction)
        else
          @db = nil
        end
      end

      def run(doc, options = {})
        env = options["env"] || options[:env] || {}
        
        puts "Tritium env keys:"
        puts env.keys
        puts "Request ID: #{env["request_id"]}"

        # Set this so that we run a full debug stack on every execution
        env["debug"] = "main"

        # Actually run the code
        @root_step = Step::Text.new(@root_instruction)
        @root_step.logger = @logger
        global_debug = {}
        export_vars = []
        @root_step.execute(doc.dup, env, global_debug, export_vars)

        #return [@root_step.object, export_vars] if ENV["TEST"]

        # If we called debug(), then do all of this
        
        print_stats(@root_step)
        
        #dump steps into DB if needed 
        puts "global debug info: #{global_debug.keys}"
        puts "contents: #{global_debug[global_debug.keys.first].class}"
        puts "contents: #{global_debug[global_debug.keys.first].size}"
        puts "contents: #{global_debug[global_debug.keys.first][0].class}"
        @db.process_debug(global_debug, env["request_id"]) unless @db.nil? 

        ## Return the result object
        [@root_step.object, export_vars]
      end

      def print_stats(root_step)
        selectors = []

        root_step.each do |step|
          if step.debug[:search_time]
            selectors << step
          end
        end
        
        selectors = selectors.sort_by { |s| s.debug[:search_time] }
        selectors.reverse!
        @logger.info "Slowest Searches:"

        selectors[0..8].each_with_index do |step, index|
          @logger.info "##{index + 1} #{(step.debug[:search_time] * 1000).to_i}ms - #{step.instruction.args.first.inspect} in #{step.instruction.location}"
        end
      end

      
      def reader_klass
        Tritium::Parser::ExpansionReader
      end
    end
  end
end
