require_relative 'spec/spec'

module Tritium

  def self.spec_file(version)
    File.read(File.dirname(__FILE__) + "/../../spec.#{version}.yml")
  end

  def self.spec(version = nil)
    @@specs ||= {}
    version ||= current_api_version.to_s.gsub(".", "-")
    @@specs[version] ||= Tritium::Spec.load(spec_file(version), version)
  end
  
  def self.functional_test_location
    File.dirname(__FILE__) + "/../../test/functional/v2"
  end
  
  def self.current_api_version
    2
  end
  
  def self.supported_api_levels
    [2]
  end
  
  def self.test_api_levels
    #if ENV["experimental"]
    #  supported_api_levels + [2]
    #else
      supported_api_levels
    #end
  end
end