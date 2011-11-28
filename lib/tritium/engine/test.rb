module Tritium
  module Engine
    module Test
    end
  end
end

require 'bundler'
Bundler.require(:test)

require_relative 'test/gauntlet'