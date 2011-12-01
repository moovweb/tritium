require 'nokogiri'

module Tritium
  class << self
    def version
      build_version_path = File.join(File.dirname(__FILE__), "../BUILD_VERSION")
      major_version_path = File.join(File.dirname(__FILE__), "../VERSION")

      version = nil
      if File.exists?(build_version_path)
        version = File.read(build_version_path).strip
      elsif File.exists?(major_version_path)
        version = File.read(major_version_path).strip + ".dev"
      else
        "0"
      end
    end
  end
end

require_relative 'tritium/config'
require_relative 'tritium/extensions/object'
require_relative 'tritium/extensions/matcher'
require_relative 'tritium/extensions/hash'
require_relative 'tritium/extensions/array'
require_relative 'tritium/engine/base'
require_relative 'tritium/engine/standard/engine'