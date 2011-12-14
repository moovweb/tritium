module Tritium
  
  def self.functional_test_location
    File.dirname(__FILE__) + "/../../test/functional"
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