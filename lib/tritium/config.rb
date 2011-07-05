module Tritium
  
  def self.spec_file
    File.read(File.dirname(__FILE__) + "/../../spec.yml")
  end

  def self.spec
    @@spec ||= Spec.load(spec_file)
  end
  
  def self.functional_test_location
    File.dirname(__FILE__) + "/../test/functional"
  end
end