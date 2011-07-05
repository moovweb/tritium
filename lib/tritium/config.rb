module Tritium
  
  def self.spec_file
    File.read(File.dirname(__FILE__) + "/../../spec.1-1.yml")
  end

  def self.spec
    @@spec ||= Spec.load(spec_file)
  end
  
  def self.functional_test_location
    File.dirname(__FILE__) + "/../test/functional"
  end
  
  def self.current_api_version
    1
  end
  
  def self.supported_api_levels
    [1]
  end
  
  def self.test_api_levels
    if ENV["experimental"]
      supported_api_levels + [current_api_version + 1]
    else
      supported_api_levels
    end
  end
end