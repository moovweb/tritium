ENV["BUNDLE_GEMFILE"] = ::File.join(::File.dirname(__FILE__), "../Gemfile")
require 'bundler'

begin
  Bundler.setup(:default)
  Bundler.require(:default)
  #puts "Initialized..."
rescue Exception => e
  puts e.message
  puts "Please make sure to run: bundle install"
  exit(2)
end