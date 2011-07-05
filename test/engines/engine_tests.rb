# If you want to only run one of these scripts, then just run
#
#  rake SCRIPT=asset
#
# Where asset is the name of the script you want to run



ENV["TEST"] = "true"

require_relative '../../lib/tritium/config'

require 'minitest/unit'
require 'minitest/mock'
require 'yaml'
require 'logger'

module  EngineTests
  def self.functional_dirs
    Tritium.test_api_levels.collect do |ver|
      File.join(File.dirname(__FILE__), "../functional/v#{ver}")
    end
  end

  include Tritium::Engines
  
  def engine_class
    throw "Must override"
  end
  
  def test_log
    @logger = MiniTest::Mock.new
    @logger.expect("info", nil, ['hi mom!'])
    engine = engine_class.new("log('hi') { append(' mom!') }", :logger => @logger)
    engine.run("")
    @logger.verify
  end
  
  def test_log_dump
    @logger = MiniTest::Mock.new
    @logger.expect("info", nil, ['<a>hi mom!</a>'])
    engine = engine_class.new("doc('html') { $('//a') { dump() } }", :logger => @logger)
    engine.run("<html><body><a>hi mom!</a></body></html>")
    @logger.verify
  end

  def test_import
    import("move.ts")
    import(" move.ts ")
    import("move.ts\t")
  end
  
  def import(file)
    engine = engine_class.new("@import #{file}", :path => EngineTests.functional_dirs.first + "/scripts")
    assert engine.processed_script.include?("select")
  end
  
  def self.test_version_folder(version_dir)
    version = File.basename(version_dir)
     puts "Testing scripts with version #{version}"
    Dir[version_dir + "/scripts/*"].each do |script_file_name|
      test_name = File.basename(script_file_name, ".ts")
      if ENV["SCRIPT"].nil? || test_name == ENV["SCRIPT"]
        # Writes a method that simply calls run_file with its name 
        eval "def test_#{version}_#{test_name}_script; run_test '#{version_dir}', '#{test_name}'; end"
      end
    end
  end
  self.functional_dirs.each do |version_dir|
    test_version_folder(version_dir)
  end

  def run_test(base_path, test_name)    
    input_file_name = Dir[base_path + "/input/#{test_name}*"].last
    ts_script = "@import #{test_name}.ts"

    log = Logger.new(STDOUT)
    log.level = Logger::ERROR
    
    tritium = engine_class.new(ts_script, :path => base_path + "/scripts", :script_name => test_name, :logger => log)
    
    env_file = base_path + "/vars/#{test_name}.yml"
    env = {}
    
    # If we have an var file, then set it up
    if File.exists?(env_file)
      env = YAML::load(File.read(env_file))
    end
    
    # Load up the expected input data (if any)
    input_file_path = Dir[base_path + "/input/#{test_name}.*"].first
    input = ""
    if input_file_path
      input = open(input_file_path).read
    end
    
    # Load up our expected output (if any)
    expected_output = ""
    expected_output_file_path = Dir[base_path + "/output/#{test_name}.*"].first
    if expected_output_file_path
      expected_output = open(expected_output_file_path).read.gsub("\n", "")
    end
    
    2.times do 
      env_copy = env.dup

      # Run the input through the tritium script.
      begin
        result, export_vars = tritium.run(input, :env => env_copy)
        result.gsub!("\n", "")
        
        
        if ENV['TEST_DEBUG']
          if expected_output != result
            puts "Expected:"
            puts expected_output
            puts "Result: "
            puts result
            puts "Script: "
            puts tritium.to_script
          end
        end
        
        assert_equal expected_output, result
      rescue SyntaxError => e
        puts tritium.to_script
        raise e
      end
    end
  end
  
  def test_export_function
    script = "export('Content-Type', 'html/js'); export('cookie', 'a'); export('cookie', 'b')"
    log = Logger.new(STDOUT)
    log.level = Logger::ERROR
    tritium = engine_class.new(script, :path => EngineTests.functional_dirs.last + "/scripts", :script_name => "export_function", :logger => log)
    result, export_vars = tritium.run("")
    assert_equal [['Content-Type', 'html/js'], ['cookie', 'a'], ['cookie', 'b']], export_vars
  end
end
