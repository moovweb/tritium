# If you want to only run one of these scripts, then just run
#
#  rake SCRIPT=asset
#
# Where asset is the name of the script you want to run

ENV["TEST"] = "true"

require_relative 'config'

require 'minitest/unit'
require 'minitest/mock'
require 'yaml'
require 'logger'

module Tritium
  module Engine

    # We should break up the functional tests. This should return an hash of test sets
    # Right now, we only have one, so we will just return that
    def self.test_sets
      sets = {}
      Dir[File.join(File.dirname(__FILE__), "../../test/functional/*")].each do |test_dir|
        sets[test_dir.split("/").last.to_sym] = File.absolute_path(test_dir)
      end
      sets
    end

    def engine_class
      throw "Must override"
    end
    
    class RecordingLogger
      attr :logs
      def initialize
        clear
      end
      def info(message)
        @logs << message.to_s
      end
      def clear
        @logs = []
      end
    end

    self.test_sets.each do |set_name, tests_directory|
      if ENV["SET"].nil? || (set_name.to_s == ENV["SET"])
        Dir[tests_directory + "/*"].each do |test_dir|
          test_name = test_dir.split("/").last
          if ENV["SCRIPT"].nil? || test_name == ENV["SCRIPT"]
            # Writes a method that simply calls run_file with its name 
            eval "def test_#{set_name}_#{test_name}_script; run_test('#{test_dir}'); end"
          end
        end
        puts "SET=#{set_name}"
      end
    end
  
    def read_file(path)
      @files ||= {}
      return @files[path] if @files[path] 
      @files[path] = open(path).read
    end
    
    def read_yaml(path)
      if File.exists?(path)
        YAML::load(read_file(path))
      else
        nil
      end
    end
  
    def fetch_env(path)
      @envs ||= {}
      @envs[path] ||= (read_yaml(path) || {})
    end
    
    def fetch_exports(path)
      @exports ||= {}
      @exports[path] ||= (read_yaml(path) || [])
    end
    
    def fetch_logs(path)
      @logs ||= {}
      @logs[path] ||= (read_yaml(path) || [])
    end

    def run_test(test_path, test_name = test_path.split("/").last)
      input_file_name = Dir[test_path + "/input.*"].last
      
      # Setup the Mock logger to pass into the engine
      logger = RecordingLogger.new
      tritium = engine_class.new(:path => test_path, :script_name => "main.ts", :logger => logger)
    
      env = fetch_env(test_path + "/vars.yml")
    
      # Load up the expected input data (if any)
      input_file_path = Dir[test_path + "/input.*"].first
      input = ""
      if input_file_path
        input = read_file(input_file_path)
      end
    
      # Load up our expected output (if any)
      expected_output = ""
      expected_output_file_path = Dir[test_path + "/output.*"].first
      if expected_output_file_path
        expected_output = read_file(expected_output_file_path).strip
      end
      
      expected_exports = fetch_exports(File.join(test_path, "exports.yml"))
      expected_logs = fetch_logs(File.join(test_path, "logs.yml"))
  
      2.times do |time|
        env_copy = env.dup

        # Run the input through the tritium script.
        begin
          result, export_vars = tritium.run(input, :env => env_copy)
          
          # Compare exports
          expected_exports.each_with_index do |export_set, index|
            assert_equal export_set, export_vars[index]
          end
          #assert_equal expected_exports.size, export_vars.size, :message => "Exports didn't match up"
          
          # Check the logs!
          expected_logs.each_with_index do |expected_message, index|
            assert_equal expected_message, logger.logs[index]
          end
          #assert_equal expected_logs.size, logger.logs.size, :message => "Number of log messages was wrong"
          logger.clear
          
          result.strip!
        
          if ENV['TEST_DEBUG'] || ENV["SCRIPT"]
            if expected_output != result
              puts "Diff:"
              puts diff_as_string(result, expected_output)
              script = tritium.to_script
              if script.size < 2000
                puts script
              else
                puts "Result too big!"
              end
            end
          elsif ENV['RUN'] == "perfect" && expected_output != result
            # if we know that the output will differ... and we WANT that, then this will
            # update the expected output
            puts "Updating #{test_name}"
            File.open(expected_output_file_path, "w+") do |f|
              f.write(result)
            end
          end
        
          assert_equal expected_output, result
        rescue SyntaxError => e
          #puts tritium.to_script
          tritium.close
          raise e
        rescue StandardError => e
          tritium.close
          #puts env_copy.inspect
          raise e
        end
      end

      tritium.close
    end
    
    
  end
end
