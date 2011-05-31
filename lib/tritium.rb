
require 'nokogiri'

module Tritium
end

require_relative 'config'
require_relative 'extensions/regexp'
require_relative 'engines/base'
require_relative 'engines/debug/engine'
require_relative 'engines/reference/engine'
require_relative 'engines/tidy/engine'