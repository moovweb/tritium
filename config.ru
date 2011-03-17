require 'rubygems'

$PROJECT_PATH ||= ENV["PROJECT_PATH"]

unless $PROJECT_PATH
  puts "Please specify PROJECT_PATH environment variable"
  exit
end

$LOAD_PATH << ::File.dirname(__FILE__)
$LOAD_PATH << ::File.join(::File.dirname(__FILE__), "lib")
$LOAD_PATH << $PROJECT_PATH

ENV["BUNDLE_GEMFILE"] = ::File.join(::File.dirname(__FILE__), "../../Gemfile")

require 'bundler'
Bundler.setup
Bundler.require

# ============= SIMPLE PROXY SETUP ===========

require ::File.dirname(__FILE__) + '/server'
run Larry::Server