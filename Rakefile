####################################
# Rakefile for projects -*- ruby -*-
####################################

require 'bundler'
Bundler.setup
Bundler.require(:default)

require 'moov_build_tasks'
Moov::BuildTasks.load!

Dir['test/tasks/*.rake'].each { |t| load t }

task :default => [:test]

task :set_experimental do
  ENV["experimental"] = "true"
end

task :bm do
  require_relative 'test/engines/benchmarks'
end

desc("Run the current supported API tests, plus the *next* one")
task :experimental => [:set_experimental, :test]
