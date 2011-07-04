
require 'nokogiri'

module Tritium
end

require_relative 'tritium/config'
require_relative 'tritium/extensions/regexp'
require_relative 'tritium/engines/base'
require_relative 'tritium/engines/debug/engine'
require_relative 'tritium/engines/reference/engine'
require_relative 'tritium/engines/tidy/engine'