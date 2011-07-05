require 'yaml'
require_relative '../config'

module Tritium
  class Spec
    attr :scopes
    
    def initialize(data)
      @data = data
    end
    
    def self.load(spec_file)
      Spec.new(YAML::load(spec_file))
    end
    
    def [](key)
      @data[key]
    end
  end
end