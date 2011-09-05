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
  
  def self.version_folder_test(version_dir)
    version = File.basename(version_dir)
    puts "Testing legacy engines against version #{version}"
    Dir[version_dir + "/scripts/*.ts"].each do |script_file_name|
      test_name = File.basename(script_file_name, ".ts")
      if ENV["SCRIPT"].nil? || test_name == ENV["SCRIPT"]
        # Writes a method that simply calls run_file with its name 
        eval "def test_#{version}_#{test_name}_script; run_test '#{version_dir}', '#{test_name}'; end"
      end
    end
  end
  self.functional_dirs.each do |version_dir|
    version_folder_test(version_dir)
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

  def run_test(base_path, test_name)    
    input_file_name = Dir[base_path + "/input/#{test_name}*"].last

    log = Logger.new(STDOUT)
    log.level = Logger::ERROR
    
    tritium = engine_class.new(:path => base_path + "/scripts", :script_name => test_name + ".ts", :logger => log)
    
    env = fetch_env(base_path + "/vars/#{test_name}.yml")
    
    # Load up the expected input data (if any)
    input_file_path = Dir[base_path + "/input/#{test_name}.*"].first
    input = ""
    if input_file_path
      input = read_file(input_file_path)
    end
    
    # Load up our expected output (if any)
    expected_output = ""
    expected_output_file_path = Dir[base_path + "/output/#{test_name}.*"].first
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
            puts "Input:"
            puts input
            puts "Expected:"
            puts expected_output
            puts "Result: "
            puts result
            #puts "Script: "
            puts tritium.to_script
          end
          
          if time > 0
            puts "ERROR ON SECOND RUN ONLY! #{time}"
            puts tritium.to_script
          end
        end
        
        assert_equal expected_output, result
      rescue SyntaxError => e
        puts tritium.to_script
        raise e
      rescue StandardError => e
        #puts env_copy.inspect
        raise e
      end
    end
  end
  
  if ENV["SCRIPT"].nil?
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
      engine = engine_class.new("html() { $('//a') { dump() } }", :logger => @logger)
      engine.run("<html><body><a>hi mom!</a></body></html>")
      @logger.verify
    end
    
    def test_time
      logger = log = Logger.new(nil)
      engine = engine_class.new("set(time())", :logger => logger)
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
      tritium = engine_class.new(script, :path => EngineTests.functional_dirs.last + "/scripts", :script_name => "export_function", :logger => log)
      result, export_vars = tritium.run("")
      assert_equal [['Content-Type', 'html/js'], ['cookie', 'a'], ['cookie', 'b']], export_vars
    end
  end
end
