ENV["TEST"] = "true"

require 'bundler'
Bundler.setup()

require_relative '../../lib/tritium'
require_relative '../../lib/tritium/engines/standard/engine'
require 'rainbow'

include Tritium::Engines
require_relative '../../../nagual/lib/judy'
require_relative '../../../viper/lib/viper'

#ENV["CSV"] = "true"

base_path = File.expand_path(File.join(File.dirname(__FILE__), "../functional"))

log = Logger.new(STDOUT)
log.level = Logger::ERROR

totals = {}
print("\nscript_name")
engines = [Standard, Judy::Engine, Viper::Engine]
engines.each do |engine_class|
  print(",")
  print(engine_class.name)
end
print("\n")

search = File.join(base_path, "/*")
Dir[search].each do |test_folder|
  #puts test_folder.inspect
  test_name = File.basename(test_folder)
  
  env_file = test_folder + "/vars.yml"
  env = {}
  
  # If we have an var file, then set it up
  if File.exists?(env_file)
    env = YAML::load(File.read(env_file))
  end
  
  # Load up the expected input data (if any)
  input_file_name = Dir[File.join(test_folder, "/input*")].last
  input = ""
  if File.exists?(input_file_name || "")
    input = open(input_file_name).read
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
      tritium = engine_class.new(:path => test_folder, :logger => log)

      totals[engine_class] ||= 0
      start = Time.now
      5000.times do 
        env_copy = env.dup
        # Run the input through the tritium script.
        result, export_vars = tritium.run(input, :env => env_copy)
        #puts engine_class.name + result.inspect
      end
      took = Time.now - start
      if tritium.respond_to?(:total_time)
        took = tritium.total_time / 1000000000.0
      end
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
