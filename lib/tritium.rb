
require 'nokogiri'
require_relative 'engines/base'

module Tritium
  def self.spec
    @@spec ||= YAML.load(File.read(File.dirname(__FILE__) + "/../spec.yml"))
  end
end