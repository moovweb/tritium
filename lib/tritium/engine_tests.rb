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
  module EngineTests
    include Tritium::Engines

    # We should break up the functional tests. This should return an hash of test sets
    # Right now, we only have one, so we will just return that
    def self.test_sets
      {:functional => File.absolute_path(File.join(File.dirname(__FILE__), "../../test/functiona*")),
       :irl => File.absolute_path(File.join(File.dirname(__FILE__), "../../test/irl"))}
    end

    def engine_class
      throw "Must override"
    end

    test_set = ENV["TESTSET"] || "functional"

    self.test_sets.each do |set_name, tests_directory|
      if set_name.to_s == test_set
        Dir[tests_directory + "/*"].each do |test_dir|
          test_name = test_dir.split("/").last
          if ENV["SCRIPT"].nil? || test_name == ENV["SCRIPT"]
            # Writes a method that simply calls run_file with its name 
            eval "def test_#{set_name}_#{test_name}_script; run_test('#{test_dir}'); end"
          end
        end
      end
    end
  
    def read_file(path)
      @files ||= {}
      return @files[path] if @files[path] 
      @files[path] = open(path).read
    end
  
    def fetch_env(path)
      @envs ||= {}
      return @envs[path] if @envs[path]
      if File.exists?(path)
        @envs[path] = YAML::load(read_file(path))
      else
        @envs[path] = {}
      end
    end

    def run_test(test_path, test_name = test_path.split("/").last)
      input_file_name = Dir[test_path + "/input.*"].last

      log = Logger.new(STDOUT)
      log.level = Logger::ERROR
    
      tritium = engine_class.new(:path => test_path, :script_name => "main.ts", :logger => log)
    
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
    
      2.times do |time|
        env_copy = env.dup

        # Run the input through the tritium script.
        begin
          result, export_vars = tritium.run(input, :env => env_copy)
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
    
    def diff_as_string(data_new, data_old)
      require 'diff/lcs'
      require 'diff/lcs/hunk'

      data_old = data_old.split(/\n/).map! { |e| e.chomp }
      data_new = data_new.split(/\n/).map! { |e| e.chomp }
      output = ""
      diffs = ::Diff::LCS.diff(data_old, data_new)
      return output if diffs.empty?
      oldhunk = hunk = nil  
      file_length_difference = 0
      diffs.each do |piece|
        begin
          hunk = ::Diff::LCS::Hunk.new(
            data_old, data_new, piece, context_lines, file_length_difference
          )
          file_length_difference = hunk.file_length_difference      
          next unless oldhunk      
          # Hunks may overlap, which is why we need to be careful when our
          # diff includes lines of context. Otherwise, we might print
          # redundant lines.
          if (context_lines > 0) and hunk.overlaps?(oldhunk)
            hunk.unshift(oldhunk)
          else
            output << oldhunk.diff(format)
          end
        ensure
          oldhunk = hunk
          output << "\n"
        end
      end  
      #Handle the last remaining hunk
      output << oldhunk.diff(format) << "\n"
    end
    
    def format
      :unified
    end

    def context_lines
      3
    end
    
  
    if ENV["SCRIPT"].nil?
      def test_log
        @logger = MiniTest::Mock.new
        @logger.expect("info", nil, ['hi mom!'])
        engine = engine_class.new("log('h', 'i', ' ' ) { append('mom!') }", :logger => @logger)
        engine.run("")
        @logger.verify
      end
  
      def test_log_dump
        @logger = MiniTest::Mock.new
        @logger.expect("info", nil, ['<a>hi mom!</a>'])
        engine = engine_class.new("html() { $('//a') { log(dump()) } }", :logger => @logger)
        engine.run("<html><body><a>hi mom!</a></body></html>")
        @logger.verify
      end
    
      def test_time
        logger = log = Logger.new(nil)
        engine = engine_class.new("set(time() { replace(/a/, 'b') })", :logger => logger)
        result, env = engine.run("")
        assert result.to_f > 0.0
      end
    
      def test_bm
        @logger =  MiniTest::Mock.new
        @logger.expect("info", nil, ['<a>hi mom!</a>'])
        engine = engine_class.new("bm('bench') { set('doc') }", :logger => @logger)
        #puts engine.root_instruction.to_script
        result, env = engine.run("")
        assert_equal 'doc', result
        log = @logger.instance_eval("@actual_calls")["info"].first[:args].first
        name, value = log.split(": ")
        assert_equal 'bench', name.strip
        assert value.to_f > 0.0, "Should be a float of some sort"
      end
  
      def test_export_function
        script = "export('Content-Type', 'html/js'); export('cookie', 'a'); export('cookie', 'b')"
        log = Logger.new(nil)
        log.level = Logger::ERROR
        tritium = engine_class.new(script, :path => EngineTests.test_sets.values.last + "/scripts", :logger => log)
        result, export_vars = tritium.run("")
        assert_equal [['Content-Type', 'html/js'], ['cookie', 'a'], ['cookie', 'b']], export_vars
      end
    end
  end
end
