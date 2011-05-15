####################################
# Rakefile for projects -*- ruby -*-
####################################

$LOAD_PATH << File.join(File.dirname(__FILE__), 'tasks')

require 'bundler'
Bundler.setup

require 'moov_build_tasks'
Moov::BuildTasks.load!

Dir['test/tasks/*.rake'].each { |t| load t }

task :default => [:test]
