module Tritium
  def self.spec
    @@spec ||= YAML.load(File.read(File.dirname(__FILE__) + "/../../spec.yml"))
  end
  
  def self.functional_test_location
    File.dirname(__FILE__) + "/../test/functional"
  end
end