require 'nokogiri'
require 'logger'
require_relative '../base'
require_relative 'run'

module Tritium
  module Engines
    class Standard < Base
      
      def run(input, options = {})
        run = Run.new(options)
        run.process(@root_instruction, input)
      end
    end
  end
end