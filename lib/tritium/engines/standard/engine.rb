require 'nokogiri'
require 'logger'
require_relative '../base'
require_relative 'context'
require_relative 'run'

module Tritium
  module Engines
    class Standard < Base
      
      def run(input, options = {})
        run = Run.new(options)
        ctx = Context[@root_instruction, input]
        run.process(@root_instruction, ctx)
        ctx.value
      end
    end
  end
end