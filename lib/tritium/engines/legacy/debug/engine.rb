# coding: utf-8

require 'yajl'

module Tritium
  module Engines
    require_relative '../legacy_base'
    class Debug < Engines::LegacyBase
      require_relative 'database'
      require_relative 'step'
      attr :root_step
      
      def initialize(script_string, options = {})
        super
        if ENV["TEST"].nil?
          @tmp_dir = configure_debug_log_folder() || File.join(@script_path, "../tmp")
          Dir.mkdir(@tmp_dir) unless File.directory?(@tmp_dir)
          
          # Dump the compiled script to the /tmp folder as script.ts
          script_file = File.join(@tmp_dir, "script.ts")
          File.open(script_file, "w+") { |f| f.write(@root_instruction.to_script) }

          debug_file = File.join(@tmp_dir, "debug.sqlite")
          @db = Database.new(debug_file, @root_instruction)
        else
          @db = nil
        end
      end

      def run(doc, options = {})
        env = options["env"] || options[:env] || {}
        
        # Set this so that we run a full debug stack on every execution
        env["debug"] = "main"

        # Actually run the code
        @root_step = Step::Text.new(@root_instruction)
        @root_step.logger = @logger
        global_debug = {}
        export_vars = []
        @root_step.execute(doc.fix_encoding.dup, env, global_debug, export_vars)

        #return [@root_step.object, export_vars] if ENV["TEST"]

        # If we called debug(), then do all of this
        
        print_stats(@root_step)
        
        #dump steps into DB if needed 
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
          time = (step.debug[:search_time] * 1000 * 1000).to_i
          @logger.info "##{index + 1} #{time} µs - #{step.instruction.args.first.inspect} in #{step.instruction.location}"
        end
      end

      def configure_debug_log_folder
        debug_config_fname = File.join(@script_path, "../config/debug.yml")
        return nil unless File.exist?(debug_config_fname)

        debug_config = YAML::load(File.read(debug_config_fname))
        run_mode = ENV["RUN_MODE"] || "debug"
        return nil if debug_config[run_mode].nil?

        debug_log_folder = debug_config[run_mode][:debug_log_folder]

        return nil if debug_log_folder.nil?
            
        FileUtils.mkdir_p(debug_log_folder) unless File.exist?(debug_log_folder)
        timestamp = Time.now.strftime("%m_%d_%Y")
        debug_log_folder = File.join(debug_log_folder, timestamp)
        FileUtils.mkdir_p(debug_log_folder) unless File.exist?(debug_log_folder)
    
        test_info = {}
        test_info_fname = File.join(debug_log_folder, "test_info.yml")
        if File.exist?(test_info_fname)
          test_info = YAML::load(File.read(test_info_fname))
        end
        if test_info[:current_test].nil?
          return debug_log_folder
        else
          return File.join(debug_log_folder, test_info[:current_test])
        end
      end
      
      def reader_klass
        Tritium::Parser::ExpansionReader
      end
    end
  end
end
