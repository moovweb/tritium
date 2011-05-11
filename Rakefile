####################################
# Rakefile for projects -*- ruby -*-
####################################

$LOAD_PATH << File.join(File.dirname(__FILE__), 'tasks')

Dir['test/tasks/*.rake'].each { |t| load t }

task :default do
  sh %{rake -T}
end
