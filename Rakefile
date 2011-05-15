####################################
# Rakefile for projects -*- ruby -*-
####################################

require 'moov_build_tasks'
Moov::BuildTasks.load!

Dir['test/tasks/*.rake'].each { |t| load t }

task :default => [:test]
