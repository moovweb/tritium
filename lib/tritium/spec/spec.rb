require 'yaml'
require_relative '../config'

module Tritium
  class Spec
    require_relative 'scope'

    attr :scopes
    
    def initialize(data)
      @scopes = {}
      data.each do |scope_name, scope_data|
        @scopes[scope_name] = Scope.new(scope_name, scope_data, self)
      end
    end
    
    def self.load(spec_file)
      Spec.new(YAML::load(spec_file))
    end
    
    def [](scope_name)
      @scopes[scope_name]
    end
  end
end