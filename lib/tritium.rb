
require 'nokogiri'
require_relative 'engines/base'
require_relative 'engines/debug/engine'
require_relative 'engines/reference/engine'

module Tritium
  def self.spec
    @@spec ||= YAML.load(File.read(File.dirname(__FILE__) + "/../spec.yml"))
  end
end