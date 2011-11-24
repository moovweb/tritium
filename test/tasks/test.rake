$LOAD_PATH.unshift File.expand_path("../lib", __FILE__)
version = File.read("VERSION").strip

require 'rake/gempackagetask'
require 'rake/testtask'

desc 'Run all of the tests'
Rake::TestTask.new(:test) do |t|
  t.libs << 'test'
  if ENV["SCRIPT"]
    t.pattern = '**/test/**/*engine_test.rb'
  else
    t.pattern = '**/test/**/*_test.rb'
  end
  t.verbose = true
end

task :benchmark do
  puts `ruby #{File.dirname(__FILE__)}/../engine/benchmarks.rb`
end
