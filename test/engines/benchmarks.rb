ENV["TEST"] = "true"

require_relative '../../lib/tritium'
require 'rainbow'

include Tritium::Engines
require_relative '../../../nagual/lib/judy'
require_relative '../../../blitz/lib/blitz'

#ENV["CSV"] = "true"

base_path = File.expand_path(File.join(File.dirname(__FILE__), "../functional"))

log = Logger.new(STDOUT)
log.level = Logger::ERROR

totals = {}
print("\nscript_name")
engines = [Standard, Judy::Engine, Blitz::Engine]
engines.each do |engine_class|
  print(",")
  print(engine_class.name)
end
print("\n")

search = File.join(base_path, "/scripts/not_*.ts")
Dir[search].each do |script_file_name|
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
  
  if ENV["CSV"]
    print test_name
  else
    print "#{test_name}:#{' ' * (25 - test_name.size)}"
  end

  results = {}
  fastest_time = 10000000
  fastest_engine = nil
  engines.each do |engine_class|
    begin
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
      results[engine_class] = took
      if took < fastest_time
        fastest_time = took
        fastest_engine = engine_class
      end
    #rescue
    #  print("(#{engine_class.name} !)")
    end
  end
  results.each do |engine, took|
    if ENV["CSV"]
      print("," + took.to_s)
    else
      took_string = took.to_s[0..5]
      result = "(#{engine.name} #{took_string})"
      size = result.size
      if engine == fastest_engine
        result = result.underline
      end
      print("#{result}#{' ' * (20 - size)}")
    end
  end
  print("\n")
end

totals.each do |engine, time|
  puts "#{engine}: #{time}"
end
