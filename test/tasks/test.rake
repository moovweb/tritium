$LOAD_PATH.unshift File.expand_path("../lib", __FILE__)
version = File.read("VERSION").strip

require 'rake/gempackagetask'
require 'rake/testtask'
 
desc 'Run all of the tests'
Rake::TestTask.new(:test) do |t|
  t.libs << 'test'
  t.pattern = '**/test/**/*_test.rb'
  t.verbose = true
end

task :benchmark do
  puts `ruby #{File.dirname(__FILE__)}/../engines/benchmarks.rb`
end
