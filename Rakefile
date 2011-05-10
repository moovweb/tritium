$LOAD_PATH.unshift File.expand_path("../lib", __FILE__)
version = File.read("VERSION").strip

require 'rake/gempackagetask'
require 'rake/testtask'
 
spec = eval(File.read('tritium.gemspec'))
Rake::GemPackageTask.new(spec) do |pkg|
  pkg.gem_spec = spec
end

desc 'Run all of the tests'
Rake::TestTask.new(:test) do |t|
  t.libs << 'test'
  t.pattern = '**/test/**/*_test.rb'
  t.verbose = true
end

task :benchmark do
  puts `ruby #{File.dirname(__FILE__)}/test/tritium/engines/benchmarks.rb`
end

desc 'bundle the gems'
task :bundle do
  puts `bundle install`
end

desc 'bundle the gems for deployment'
task :vendorbundle do
  puts `bundle install --deployment`
end

desc 'build the production gem'
task :prodgem do
  puts `gem build production.gemspec`
end

desc 'build the developer gem'
task :devgem do
  puts `gem build manhattan.gemspec`
end

desc 'upload the gem to the production gemserver'
task :upload do
  puts `scp *.gem gemserver@50.19.39.205:/mnt/gems/public/gems`
end

desc 'upload the required gems so they can all be pulled easily from one place'
task :uploaddep do
  puts `scp vendor/bundle/ruby/*/cache/*.gem gemserver@50.19.39.205:/mnt/gems/public/gems`
end


desc 'kick the production gemserver'
task :gemupdate do
  puts `ssh gemserver@50.19.39.205 /mnt/gems/genit`
end

desc 'clean up after ourselves'
task :cleanup do
  puts `rm *.gem`
  puts `rm -rf vendor`
end

desc 'all of the stuff we want jenkins to do'
task :jenkins => [:vendorbundle, :test, :prodgem, :devgem, :upload, :uploaddep, :gemupdate, :cleanup] do
  puts "Go Go Jenkins"
end


task :default => :test
