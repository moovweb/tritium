# Default Rakefile
# Loads the project rake tasks from either the manhattan workspace on jenkins, 
# or from the manhattan gem.
manhattan_version = File.read(File.join(File.dirname(__FILE__), "MANHATTAN_VERSION")).strip

puts "Loading Manhattan Version #{manhattan_version}"

begin
  gem "manhattan", manhattan_version
rescue Exception => e
  puts "Couldn't find version #{manhattan_version}... installing"
  cmd = "gem install manhattan --no-rdoc --no-ri --source='http://gems.moovweb.org' --version='#{manhattan_version}'"
  puts "please try running: "
  puts cmd
  # Run the command again!
  #`rake #{ARGV.join(" ")}`
end

require "manhattan/project/tasks"