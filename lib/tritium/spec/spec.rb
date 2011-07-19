require 'yaml'

module Tritium
  class Spec
    require_relative 'scope'

    attr :scopes
    attr :api_version
    
    def initialize(data, version)
      @api_version = version
      @scopes = {}
      data.each do |scope_name, scope_data|
        @scopes[scope_name] = Scope.new(scope_name, scope_data, self)
      end
    end
    
    def default_scope
      self["Text"]
    end
    
    def self.load(spec_file, version)
      Spec.new(YAML::load(spec_file), version)
    end
    
    def verify(instructions)
    end
    
    def [](scope_name)
      @scopes[scope_name]
    end
  end
end