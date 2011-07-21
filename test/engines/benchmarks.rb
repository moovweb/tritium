ENV["TEST"] = "true"

require_relative '../../lib/tritium'

include Tritium::Engines

base_path = Tritium.functional_test_location

log = Logger.new(STDOUT)
log.level = Logger::ERROR

totals = {}

Dir[base_path + "/scripts/*.ts"].each do |script_file_name|
  test_name = File.basename(script_file_name, ".ts")
  
  input_file_name = Dir[base_path + "/input/#{test_name}*"].last
  ts_script = "@import #{test_name}.ts"
  
  env_file = base_path + "/vars/#{test_name}.yml"
  env = {}
  
  # If we have an var file, then set it up
  if File.exists?(env_file)
    env = YAML::load(File.read(env_file))
  end
  
  # Load up the expected input data (if any)
  input_file_path = Dir[base_path + "/input/#{test_name}*"].first
  input = ""
  if input_file_path
    input = open(input_file_path).read
  end
  
  print "#{test_name}:#{' ' * (25 - test_name.size)}"

  [Debug, Reference, Standard].each do |engine_class|
    tritium = engine_class.new(ts_script, :path => base_path + "/scripts", :script_name => test_name, :logger => log)

    totals[engine_class] ||= 0

    start = Time.now
    50.times do 
      env_copy = env.dup
      # Run the input through the tritium script.
      result, export_vars = tritium.run(input, :env => env_copy)
    end
    took = Time.now - start
    totals[engine_class] += took
    result = "(#{engine_class.to_s.split("::").last} #{took})"
    print("#{result}#{' ' * (30 - result.size)}")
  end
  print("\n")
end

totals.each do |engine, time|
  puts "#{engine}: #{time}"
end
